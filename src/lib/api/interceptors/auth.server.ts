/**
 * Auth Interceptor (Server-Only)
 * HttpOnly Cookie에서 토큰을 읽어 Authorization 헤더에 주입
 * 
 * 💡 Server Actions / API Routes에서만 실행됨
 * ❌ Client Component에서는 실행 불가
 */

'use server';

import { cookies } from 'next/headers';

import type { AxiosInstance } from 'axios';

const STORAGE_KEYS = {
  accessToken: 'access_token',
} as const;

/**
 * Server-side: HttpOnly Cookie에서 토큰 읽기
 * 클라이언트 JS에서 접근 불가능한 보안 저장소
 */
async function getServerAccessToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(STORAGE_KEYS.accessToken)?.value ?? null;
  } catch {
    return null;
  }
}

export async function setupAuthInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use(
    async (config) => {
      const token = await getServerAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}
