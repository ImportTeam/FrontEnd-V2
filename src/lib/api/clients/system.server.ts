/**
 * System API Client (1/9)
 * 헬스체크, 버전 정보 등 시스템 관련
 * 
 * 특징: Server-only 유틸 객체
 */

import { getServerInstance } from '@/lib/api/http/http.server';

export interface SystemHealthResponse {
  status: 'ok' | 'degraded' | 'down';
  timestamp: string;
  version?: string;
}

export const systemClient = {
  /**
   * 시스템 헬스체크
   */
  getHealth: async () => {
    const instance = await getServerInstance();
    const response = await instance.get<SystemHealthResponse>('/system/health');
    return response.data;
  },

  /**
   * API 버전 정보
   */
  getVersion: async () => {
    const instance = await getServerInstance();
    const response = await instance.get<{ version: string }>('/system/version');
    return response.data;
  },
};
