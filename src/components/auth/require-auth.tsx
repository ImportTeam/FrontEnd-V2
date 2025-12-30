'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface RequireAuthProps {
  children: React.ReactNode;
}

/**
 * Server-side Auth Guard Component
 * - 서버에서 HttpOnly 토큰 확인
 * - 미인증 사용자는 로그인 페이지로 리다이렉트
 */
export async function RequireAuth({ children }: RequireAuthProps) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  // 토큰이 없으면 로그인으로 리다이렉트
  if (!accessToken) {
    redirect('/login');
  }

  // 토큰이 있으면 콘텐츠 표시
  return children;
}
