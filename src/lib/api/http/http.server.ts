/**
 * Server-only Axios Instance
 * - Auth interceptor (토큰 주입)
 * - Refresh interceptor (401 자동 갱신)
 * - Error interceptor (공용)
 * 
 * 사용처: Server Actions, API Routes (server-only)
 */

'use server';

import { setupAuthInterceptor } from '@/lib/api/interceptors/auth.server';
import { setupErrorInterceptor } from '@/lib/api/interceptors/error';
import { setupRefreshInterceptor } from '@/lib/api/interceptors/refresh.server';

import { createBaseAxiosInstance, DEFAULT_API_BASE_URL } from './http.base';

// 싱글톤: 서버 인스턴스는 요청당 한 번만 생성
let serverInstance: ReturnType<typeof createBaseAxiosInstance> | null = null;

async function getServerInstance() {
  if (!serverInstance) {
    serverInstance = createBaseAxiosInstance(DEFAULT_API_BASE_URL);

    // 인터셉터 등록 순서: 요청 → 응답 → 에러
    await setupAuthInterceptor(serverInstance);
    await setupRefreshInterceptor(serverInstance);
    setupErrorInterceptor(serverInstance);
  }

  return serverInstance;
}

// Server Actions / API Routes에서만 import해서 사용
export { getServerInstance };
