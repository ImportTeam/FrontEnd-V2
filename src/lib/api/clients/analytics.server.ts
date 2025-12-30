/**
 * Analytics API Client (8/9)
 * 소비 분석 및 통계
 * 
 * 특징: Server-only 유틸 객체
 */

import { getServerInstance } from '@/lib/api/http/http.server';

import type {
  ApiResponse,
  CategorySpendingResponse,
  MonthlySavingsChartResponse,
  TransactionListItem,
  TransactionListResponse,
} from '@/lib/api/types';

function unwrapApiResponse<T>(body: unknown): T {
  if (body && typeof body === 'object' && 'data' in body) {
    const maybe = body as { data?: T };
    if (maybe.data !== undefined) return maybe.data;
  }
  return body as T;
}

export const analyticsClient = {
  /**
   * 카테고리별 소비 차트
   * GET /api/analytics/charts/category
   */
  getCategories: async () => {
    const instance = await getServerInstance();

    const response = await instance.get<
      ApiResponse<CategorySpendingResponse> | CategorySpendingResponse
    >('/analytics/charts/category');

    const body = unwrapApiResponse<CategorySpendingResponse>(response.data);
    return body?.data ?? [];
  },

  /**
   * 월별 지출 추이 차트
   * GET /api/analytics/charts/monthly
   */
  getMonths: async () => {
    const instance = await getServerInstance();

    const response = await instance.get<
      ApiResponse<MonthlySavingsChartResponse> | MonthlySavingsChartResponse
    >('/analytics/charts/monthly');

    const body = unwrapApiResponse<MonthlySavingsChartResponse>(response.data);
    return body?.data ?? [];
  },

  /**
   * 상세 지출 내역(거래 단위)
   * GET /api/analytics/transactions
   */
  getTransactions: async (options?: { startDate?: string; endDate?: string; page?: number; size?: number }) => {
    const instance = await getServerInstance();

    const response = await instance.get<
      ApiResponse<TransactionListResponse> | TransactionListResponse
    >('/analytics/transactions', { params: options });

    const body = unwrapApiResponse<TransactionListResponse>(response.data);
    return (body?.data ?? []) as TransactionListItem[];
  },
};
