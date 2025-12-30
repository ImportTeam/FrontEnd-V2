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
    const token = cookieStore.get(STORAGE_KEYS.accessToken)?.value;
    
    if (token) {
      console.warn('[AUTH_INTERCEPTOR] Token found:', {
        length: token.length,
        prefix: token.substring(0, 10) + '...',
      });
    } else {
      console.warn('[AUTH_INTERCEPTOR] No access token in cookies');
    }
    
    return token ?? null;
  } catch (error) {
    console.error('[AUTH_INTERCEPTOR] Error reading token:', error);
    return null;
  }
}

export async function setupAuthInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use(
    async (config) => {
      const token = await getServerAccessToken();
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.warn('[AUTH_INTERCEPTOR] Authorization header set');
      } else {
        console.warn('[AUTH_INTERCEPTOR] No token, request without auth');
      }
      
      return config;
    },
    (error) => {
      console.error('[AUTH_INTERCEPTOR] Request error:', error);
      return Promise.reject(error);
    }
  );
}
