/**
 * Signup Server Action (New Structure)
 * Server-only 인증 로직
 */

'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { authClient } from '@/lib/api/clients/auth.server';
import { parseApiError } from '@/lib/api/error-handler';
import { logger } from '@/lib/logger';
import { signupSchema } from '@/lib/schemas/auth';

function isNextRedirectError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  const digest = (err as { digest?: unknown }).digest;
  return typeof digest === 'string' && digest.startsWith('NEXT_REDIRECT');
}

export interface SignupActionState {
  status: 'idle' | 'error';
  message: string | null;
  fieldErrors?: Record<string, string>;
  popup?: 'EMAIL_EXISTS';
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
    secure: true,  // Always true (dev도 필요)
    sameSite: 'strict',  // Strong CSRF protection
    path: '/',
    maxAge: 3600, // 1시간
  });

  cookieStore.set('refresh_token', refreshToken, {
    httpOnly: true,
    secure: true,  // Always true
    sameSite: 'strict',  // Strong CSRF protection
    path: '/',
    maxAge: 604800, // 7일
  });
}

/**
 * Form action - <form action={signupAction}>에서 직접 호출
 * 성공하면 redirect, 실패하면 state 반환 (UI에서 에러 표시)
 */
export async function signupAction(
  prevState: SignupActionState,
  formData: FormData
): Promise<SignupActionState> {
  const log = logger.scope('SIGNUP_ACTION');
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validate inputs
    if (!name || !email || !password) {
      return {
        status: 'error',
        message: '모든 필드를 입력해주세요.',
        fieldErrors: {
          ...(name ? {} : { name: '이름을 입력해주세요.' }),
          ...(email ? {} : { email: '이메일을 입력해주세요.' }),
          ...(password ? {} : { password: '비밀번호를 입력해주세요.' }),
        },
        nonce: Date.now(),
      };
    }

    // Parse and validate with Zod
    const validationResult = signupSchema.safeParse({
      name,
      email,
      password,
    });
    if (!validationResult.success) {
      return {
        status: 'error',
        message: validationResult.error.issues.map((issue) => issue.message).join(', '),
        fieldErrors: toFieldErrors(validationResult.error.issues),
        nonce: Date.now(),
      };
    }

    // Call API through authClient (Server instance with interceptors)
    const response = await authClient.signup(name, email, password);

    log.debug('API Response:', {
      hasUser: !!response?.user,
      user: response?.user,
      hasAccessToken: !!response?.accessToken,
      hasRefreshToken: !!response?.refreshToken,
    });

    // Validate response structure
    if (!response?.user?.uuid) {
      log.error('Invalid response structure:', response);
      return {
        status: 'error',
        message: '회원가입 응답이 불완전합니다. 잠시 후 다시 시도해주세요.',
        nonce: Date.now(),
      };
    }

    // Save tokens to HttpOnly Cookies
    log.debug('Saving tokens to cookies...');
    await saveTokensToCookies(response.accessToken, response.refreshToken);
    log.debug('Tokens saved successfully');

    // 리다이렉트 (Server Action에서 자동 처리)
    redirect('/dashboard');
  } catch (err) {
    // redirect() throws a special error that must bubble up to Next.js
    if (isNextRedirectError(err)) {
      throw err;
    }

    const errorDetails = parseApiError(err);
    log.error('Parsed error:', errorDetails);

    const isEmailExists = errorDetails.type === 'CONFLICT' || errorDetails.statusCode === 409;

    return {
      status: 'error',
      message: errorDetails.message,
      fieldErrors: prevState.fieldErrors,
      popup: isEmailExists ? 'EMAIL_EXISTS' : undefined,
      nonce: Date.now(),
    };
  }

  // Unreachable because redirect throws, but keeps TS happy.
  return {
    status: 'idle',
    message: null,
    nonce: initialNonce,
  };
}