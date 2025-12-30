/**
 * Error Interceptor (공용 - Server & Client 모두 사용 가능)
 * 공통 에러 포매팅 및 로깅
 */

import type { AxiosInstance } from 'axios';

// Cloudflare challenge detection
function isCloudflareChallenge(data: unknown): boolean {
  if (typeof data !== 'string') return false;
  return data.includes('challenge-platform') || data.includes('Just a moment');
}

export function setupErrorInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Axios error handling
      if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;
        
        // Cloudflare DDoS protection detection
        if (isCloudflareChallenge(data)) {
          console.error('[API Error] Cloudflare Challenge detected - API may be protected by DDoS protection');
          return Promise.reject({
            ...error,
            response: {
              ...error.response,
              data: {
                message: 'API 서버가 보호 중입니다. 잠시 후 다시 시도해주세요.',
                code: 'CLOUDFLARE_CHALLENGE',
              },
            },
          });
        }
        
        console.error(`[API Error] ${status}:`, {
          message: data?.message || data?.error?.message,
          code: data?.error?.code,
          details: data?.error?.details,
        });
      } else if (error.request) {
        // Request made but no response received
        console.error('[API Error] No response:', error.message);
      } else {
        // Error setting up the request
        console.error('[API Error] Request setup failed:', error.message);
      }

      return Promise.reject(error);
    }
  );
}
