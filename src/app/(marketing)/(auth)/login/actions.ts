/**
 * Login Server Action (New Structure)
 * Server-only 인증 로직
 */

'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { authClient } from '@/lib/api/clients/auth.server';
import { parseApiError } from '@/lib/api/error-handler';
import { loginSchema } from '@/lib/schemas/auth';

function isNextRedirectError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  const digest = (err as { digest?: unknown }).digest;
  return typeof digest === 'string' && digest.startsWith('NEXT_REDIRECT');
}

export interface AuthActionState {
  status: 'idle' | 'error';
  message: string | null;
  fieldErrors?: Record<string, string>;
  nonce: number;
}

const initialNonce = 0;

function toFieldErrors(
  issues: Array<{ path: ReadonlyArray<PropertyKey>; message: string }>
): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of issues) {
    const key = String(issue.path?.[0] ?? 'form');
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

/**
 * 토큰을 HttpOnly Cookie에 저장
 */
async function saveTokensToCookies(
  accessToken: string,
  refreshToken: string
) {
  const cookieStore = await cookies();

  cookieStore.set('access_token', accessToken, {
    httpOnly: true,
    secure: true,  // Always true in prod, accept in dev
    sameSite: 'strict',  // Strong CSRF protection
    path: '/',
    maxAge: 3600, // 1시간
  });

  cookieStore.set('refresh_token', refreshToken, {
    httpOnly: true,
    secure: true,  // Always true in prod
    sameSite: 'strict',
    path: '/',
    maxAge: 604800, // 7일
  });
}

/**
 * Form action - <form action={loginAction}>에서 직접 호출
 * 성공하면 redirect, 실패하면 state 반환 (UI에서 에러 표시)
 */
export async function loginAction(
  prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validate inputs
    if (!email || !password) {
      return {
        status: 'error',
        message: '이메일과 비밀번호를 입력해주세요.',
        fieldErrors: {
          ...(email ? {} : { email: '이메일을 입력해주세요.' }),
          ...(password ? {} : { password: '비밀번호를 입력해주세요.' }),
        },
        nonce: Date.now(),
      };
    }

    // Parse and validate with Zod
    const validationResult = loginSchema.safeParse({ email, password });
    if (!validationResult.success) {
      return {
        status: 'error',
        message: validationResult.error.issues.map((issue) => issue.message).join(', '),
        fieldErrors: toFieldErrors(validationResult.error.issues),
        nonce: Date.now(),
      };
    }

    // Call API through authClient (Server instance with interceptors)
    const response = await authClient.login(email, password);

    console.warn('[LOGIN] API Response:', {
      hasUser: !!response?.user,
      user: response?.user,
      hasAccessToken: !!response?.accessToken,
      hasRefreshToken: !!response?.refreshToken,
    });

    // Validate response structure
    if (!response?.user?.uuid) {
      console.error('[LOGIN] Invalid response structure:', response);
      return {
        status: 'error',
        message: '로그인 응답이 불완전합니다. 잠시 후 다시 시도해주세요.',
        nonce: Date.now(),
      };
    }

    // Save tokens to HttpOnly Cookies
    console.warn('[LOGIN] Saving tokens to cookies...');
    await saveTokensToCookies(response.accessToken, response.refreshToken);
    console.warn('[LOGIN] Tokens saved successfully');

    // 리다이렉트 (Server Action에서 자동 처리)
    redirect('/dashboard');
  } catch (err) {
    // redirect() throws a special error that must bubble up to Next.js
    if (isNextRedirectError(err)) {
      throw err;
    }

    console.error("[LOGIN] Error details:", {
      error: err,
      errorType: err instanceof Error ? err.constructor.name : typeof err,
      errorMessage: err instanceof Error ? err.message : String(err),
    });
    const errorDetails = parseApiError(err);
    console.error("[LOGIN] Parsed error:", errorDetails);

    // IMPORTANT: Never throw here (except NEXT_REDIRECT). Return error state so UI can render it.
    return {
      status: 'error',
      message: errorDetails.message,
      nonce: Date.now(),
      fieldErrors: prevState.fieldErrors,
    };
  }

  // Unreachable because redirect throws, but keeps TS happy.
  return {
    status: 'idle',
    message: null,
    nonce: initialNonce,
  };
}
