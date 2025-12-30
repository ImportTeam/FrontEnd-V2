/**
 * Client-side Axios Instance
 * - Error interceptor만 (공용 에러 로깅)
 * - 인증/토큰은 Server Actions에서 처리
 * 
 * 사용처: Client Components (읽기 전용, 공개 데이터)
 */

'use client';

import { setupErrorInterceptor } from '@/lib/api/interceptors/error';

import { createBaseAxiosInstance, DEFAULT_API_BASE_URL } from './http.base';

// 싱글톤: 클라이언트 인스턴스
let clientInstance: ReturnType<typeof createBaseAxiosInstance> | null = null;

function getClientInstance() {
  if (!clientInstance) {
    clientInstance = createBaseAxiosInstance(DEFAULT_API_BASE_URL);

    // 에러 인터셉터만 등록 (로깅용)
    setupErrorInterceptor(clientInstance);
  }

  return clientInstance;
}

export { getClientInstance };
