/**
 * Signup Server Action (New Structure)
 * Server-only 인증 로직
 */

'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { authClient } from '@/lib/api/clients/auth.server';
import { parseApiError } from '@/lib/api/error-handler';
import { signupSchema } from '@/lib/schemas/auth';
import { useAuthStore } from '@/store/use-auth-store';

function isNextRedirectError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  const digest = (err as { digest?: unknown }).digest;
  return typeof digest === 'string' && digest.startsWith('NEXT_REDIRECT');
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
 * 성공하면 redirect, 실패하면 에러 객체 반환
 */
export async function signupAction(formData: FormData): Promise<void> {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validate inputs
    if (!name || !email || !password) {
      throw new Error('모든 필드를 입력해주세요.');
    }

    // Parse and validate with Zod
    const validationResult = signupSchema.safeParse({
      name,
      email,
      password,
    });
    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues
        .map((issue) => issue.message)
        .join(', ');
      throw new Error(errorMessage);
    }

    // Call API through authClient (Server instance with interceptors)
    const response = await authClient.signup(name, email, password);

    console.warn('[SIGNUP] API Response:', {
      hasUser: !!response?.user,
      user: response?.user,
      hasAccessToken: !!response?.accessToken,
      hasRefreshToken: !!response?.refreshToken,
    });

    // Validate response structure
    if (!response?.user?.uuid) {
      console.error('[SIGNUP] Invalid response structure:', response);
      throw new Error('회원가입 응답이 불완전합니다. 잠시 후 다시 시도해주세요.');
    }

    // Save tokens to HttpOnly Cookies
    console.warn('[SIGNUP] Saving tokens to cookies...');
    await saveTokensToCookies(response.accessToken, response.refreshToken);
    console.warn('[SIGNUP] Tokens saved successfully');

    // Update Zustand store
    useAuthStore.getState().login({
      ...response.user,
      id: response.user.id || response.user.uuid,
    });

    // 리다이렉트 (Server Action에서 자동 처리)
    redirect('/dashboard');
  } catch (err) {
    // redirect() throws a special error that must bubble up to Next.js
    if (isNextRedirectError(err)) {
      throw err;
    }

    const errorDetails = parseApiError(err);
    throw new Error(errorDetails.message);
  }
}