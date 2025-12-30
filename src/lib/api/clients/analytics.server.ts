/**
 * Analytics API Client (8/9)
 * 소비 분석 및 통계 - 배열 반환만 처리
 * 
 * ✅ 규칙:
 * - 모든 메서드는 Promise<Array> 반환
 * - 실패 시 빈 배열 반환
 * - unwrapArray로 명확하게 처리
 */

import { createServerClient } from '@/lib/api/createServerClient';

import type {
  ApiEnvelope,
  CategorySpendingResponse,
  MonthlySavingsChartResponse,
  TransactionListItem,
  TransactionListResponse,
} from '@/lib/api/types';

/**
 * 배열 응답만 처리
 * - ApiEnvelope<T[]> 구조 가정
 * - T[] 타입 보장
 * - 실패 시 []
 */
function unwrapArray<T>(data: unknown): T[] {
  if (!data) return [];

  // 직접 배열인 경우
  if (Array.isArray(data)) return data;

  // ApiEnvelope<T[]> 구조
  if (typeof data === 'object' && 'data' in data) {
    const envelope = data as { data?: unknown };
    if (Array.isArray(envelope.data)) return envelope.data;
  }

  // 예상 밖의 구조
  console.error('[unwrapArray] Unexpected data structure:', data);
  return [];
}

/**
 * TransactionListResponse 특수 처리
 * { data: { data: [...], pagination: {...} } } 구조
 */
function unwrapTransactionList(data: unknown): TransactionListItem[] {
  if (!data) return [];

  // 직접 배열인 경우
  if (Array.isArray(data)) return data;

  // TransactionListResponse 구조
  if (typeof data === 'object' && 'data' in data) {
    const envelope = data as { data?: unknown };
    if (envelope.data && typeof envelope.data === 'object' && 'data' in envelope.data) {
      const innerData = (envelope.data as { data?: unknown }).data;
      if (Array.isArray(innerData)) return innerData;
    }
    if (Array.isArray(envelope.data)) return envelope.data;
  }

  console.error('[unwrapTransactionList] Unexpected data structure:', data);
  return [];
}

export const analyticsClient = {
  /**
   * 카테고리별 소비 차트
   * GET /api/analytics/charts/category
   * 
   * @returns 카테고리별 소비 데이터 배열
   */
  getCategories: async (): Promise<CategorySpendingResponse[]> => {
    try {
      const instance = await createServerClient();
      const response = await instance.get<ApiEnvelope<CategorySpendingResponse[]>>(
        '/analytics/charts/category'
      );
      return unwrapArray<CategorySpendingResponse>(response.data);
    } catch (error) {
      console.error('[analyticsClient] getCategories failed:', error);
      return [];
    }
  },

  /**
   * 월별 지출 추이 차트
   * GET /api/analytics/charts/monthly
   * 
   * @returns 월별 지출 데이터 배열
   */
  getMonths: async (): Promise<MonthlySavingsChartResponse[]> => {
    try {
      const instance = await createServerClient();
      const response = await instance.get<ApiEnvelope<MonthlySavingsChartResponse[]>>(
        '/analytics/charts/monthly'
      );
      return unwrapArray<MonthlySavingsChartResponse>(response.data);
    } catch (error) {
      console.error('[analyticsClient] getMonths failed:', error);
      return [];
    }
  },

  /**
   * 상세 지출 내역 (거래 단위)
   * GET /api/analytics/transactions
   * 
   * @returns 거래 내역 배열 (pagination 정보 제외)
   */
  getTransactions: async (options?: {
    startDate?: string;
    endDate?: string;
    page?: number;
    size?: number;
  }): Promise<TransactionListItem[]> => {
    try {
      const instance = await createServerClient();
      const response = await instance.get<ApiEnvelope<TransactionListResponse>>(
        '/analytics/transactions',
        { params: options }
      );
      return unwrapTransactionList(response.data);
    } catch (error) {
      console.error('[analyticsClient] getTransactions failed:', error);
      return [];
    }
  },
};
