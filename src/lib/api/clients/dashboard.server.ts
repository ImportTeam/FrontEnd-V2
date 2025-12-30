/**
 * Dashboard API Client (7/9)
 * 대시보드 데이터 (요약, 차트 등)
 * 
 * 특징: Server-only 유틸 객체
 */

import { getServerInstance } from '@/lib/api/http/http.server';

import type { ApiResponse, SummaryData } from '@/lib/api/types';

export interface DashboardSummary {
  totalSavings: string;
  monthlyAverage: string;
  topCard: string;
  recentTransactions: number;
}

export interface MonthlyChart {
  month: string;
  savings: number;
  transactions: number;
}

export const dashboardClient = {
  /**
   * 대시보드 요약 데이터
   */
  getSummary: async () => {
    const instance = await getServerInstance();
    const response = await instance.get<ApiResponse<SummaryData>>(
      '/dashboard/summary'
    );
    return response.data.data ?? {
      totalSavings: '0',
      monthlyAverage: '0',
      topCard: '',
      recentTransactions: 0,
    };
  },

  /**
   * 월별 절약액 차트
   */
  getMonthlySavingsChart: async (months = 6) => {
    const instance = await getServerInstance();
    const response = await instance.get<ApiResponse<MonthlyChart[]>>(
      '/dashboard/chart/monthly-savings',
      { params: { months } }
    );
    return response.data.data ?? [];
  },

  /**
   * 카드별 추천 순위
   */
  getRecommendedCards: async () => {
    const instance = await getServerInstance();
    const response = await instance.get<ApiResponse<unknown[]>>(
      '/dashboard/recommended-cards'
    );
    return response.data.data ?? [];
  },

  /**
   * AI 혜택 분석
   */
  getAIAnalysis: async () => {
    const instance = await getServerInstance();
    const response = await instance.get<ApiResponse<unknown>>(
      '/dashboard/ai-analysis'
    );
    return response.data.data ?? null;
  },

  /**
   * 상위 가맹점 정보
   */
  getTopMerchants: async (limit = 5) => {
    const instance = await getServerInstance();
    const response = await instance.get<ApiResponse<unknown[]>>(
      '/dashboard/top-merchants',
      { params: { limit } }
    );
    return response.data.data ?? [];
  },
};
