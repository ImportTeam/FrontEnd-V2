/**
 * Reports API Client (9/9)
 * 리포트 생성, 조회 등
 * 
 * 특징: Server-only 유틸 객체
 */

import { createServerClient } from '@/lib/api/createServerClient';

import type { ApiResponse } from '@/lib/api/types';

export interface Report {
  id: string;
  title: string;
  type: 'monthly' | 'quarterly' | 'annual' | 'custom';
  period: {
    startDate: string;
    endDate: string;
  };
  status: 'generating' | 'ready' | 'failed';
  downloadUrl?: string;
  createdAt: string;
  expiresAt?: string;
}

export const reportsClient = {
  /**
   * 리포트 목록 조회
   */
  listReports: async (options?: { type?: string; status?: string }) => {
    const instance = await createServerClient();
    const response = await instance.get<ApiResponse<Report[]>>('/reports', {
      params: options,
    });
    return response.data.data ?? [];
  },

  /**
   * 리포트 상세 조회
   */
  getReport: async (id: string) => {
    const instance = await createServerClient();
    const response = await instance.get<Report>(`/reports/${id}`);
    return response.data;
  },

  /**
   * 리포트 생성 요청
   */
  createReport: async (data: {
    type: 'monthly' | 'quarterly' | 'annual' | 'custom';
    startDate?: string;
    endDate?: string;
  }) => {
    const instance = await createServerClient();
    const response = await instance.post<Report>('/reports', data);
    return response.data;
  },

  /**
   * 리포트 다운로드 URL 생성
   */
  generateDownloadUrl: async (id: string) => {
    const instance = await createServerClient();
    const response = await instance.post<{ downloadUrl: string }>(
      `/reports/${id}/download`
    );
    return response.data.downloadUrl;
  },

  /**
   * 리포트 삭제
   */
  deleteReport: async (id: string) => {
    const instance = await createServerClient();
    await instance.delete(`/reports/${id}`);
  },
};
