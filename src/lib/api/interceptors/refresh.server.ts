/**
 * Refresh Token Interceptor (Server-Only)
 * 401 응답 시 자동 토큰 갱신 및 재시도
 * 
 * Server Actions / API Routes에서만 실행됨
 * Client에서 실행하면 race condition 발생
 */

'use server';

import { cookies } from 'next/headers';

import type { AxiosInstance, AxiosResponse } from 'axios';

const STORAGE_KEYS = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token',
} as const;

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

function notifyTokenRefresh(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

async function getServerRefreshToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(STORAGE_KEYS.refreshToken)?.value ?? null;
  } catch {
    return null;
  }
}

async function saveTokens(accessToken: string, refreshToken: string) {
  try {
    const cookieStore = await cookies();
    cookieStore.set(STORAGE_KEYS.accessToken, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600, // 1시간
    });
    if (refreshToken) {
      cookieStore.set(STORAGE_KEYS.refreshToken, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 604800, // 7일
      });
    }
  } catch {
    console.error('Failed to save tokens');
  }
}

async function clearTokens() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(STORAGE_KEYS.accessToken);
    cookieStore.delete(STORAGE_KEYS.refreshToken);
  } catch {
    console.error('Failed to clear tokens');
  }
}

/**
 * API 호출을 통해 새 토큰 발급
 * 이 함수는 refresh.server.ts 내에서만 호출되어야 함
 */
async function refreshAccessTokenFromServer(
  instance: AxiosInstance
): Promise<string | null> {
  try {
    const refreshToken = await getServerRefreshToken();
    if (!refreshToken) {
      return null;
    }

    // refresh API 호출 (interceptor 미적용)
    const response = await instance.post<unknown>('/auth/refresh', { 
      refresh_token: refreshToken 
    });

    const data = response.data as any;

    // Support both camelCase (accessToken) and snake_case (access_token)
    const accessToken = data?.accessToken ?? data?.access_token;

    if (accessToken) {
      // Refresh endpoint may not return a new refresh token.
      await saveTokens(accessToken, refreshToken);
      return accessToken;
    }

    return null;
  } catch {
    await clearTokens();
    return null;
  }
}

export async function setupRefreshInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const originalRequest = error.config;

      // Prevent infinite loop when refresh endpoint itself fails with 401.
      if (
        error.response?.status === 401 &&
        typeof originalRequest?.url === 'string' &&
        originalRequest.url.includes('/auth/refresh')
      ) {
        await clearTokens();
        return Promise.reject(error);
      }

      // 401 에러이고, 아직 재시도하지 않은 경우
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          // 이미 갱신 중이면 대기
          return new Promise((resolve) => {
            subscribeTokenRefresh((token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(instance(originalRequest));
            });
          });
        }

        isRefreshing = true;

        try {
          const newToken = await refreshAccessTokenFromServer(instance);

          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            notifyTokenRefresh(newToken);
            return instance(originalRequest);
          }

          // Refresh 실패 → 로그아웃
          await clearTokens();
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
}
