/**
 * Analytics API Client (8/9)
 * 소비 분석 및 통계
 * 
 * 특징: Server-only 유틸 객체
 */

import { getServerInstance } from '@/lib/api/http/http.server';

import type { ApiResponse } from '@/lib/api/types';

export interface CategorySpending {
  category: string;
  amount: number;
  percentage: number;
  count: number;
}

export interface AnalyticsData {
  period: string;
  totalSpending: number;
  averageTransaction: number;
  topCategory: string;
  categoryBreakdown: CategorySpending[];
}

export const analyticsClient = {
  /**
   * 소비 분석 - 기간별
   */
  getSpendingAnalysis: async (options?: {
    startDate?: string;
    endDate?: string;
    period?: 'daily' | 'weekly' | 'monthly';
  }) => {
    const instance = await getServerInstance();
    const response = await instance.get<ApiResponse<AnalyticsData>>(
      '/analytics/spending',
      { params: options }
    );
    return response.data.data ?? {
      period: '',
      totalSpending: 0,
      averageTransaction: 0,
      topCategory: '',
      categoryBreakdown: [],
    };
  },

  /**
   * 카테고리별 소비 분석
   */
  getCategoryAnalysis: async (category: string) => {
    const instance = await getServerInstance();
    const response = await instance.get<ApiResponse<CategorySpending>>(
      `/analytics/category/${category}`
    );
    return response.data.data ?? {
      category: '',
      amount: 0,
      percentage: 0,
      count: 0,
    };
  },

  /**
   * 시간대별 소비 패턴
   */
  getTimePatternAnalysis: async () => {
    const instance = await getServerInstance();
    const response = await instance.get<ApiResponse<unknown[]>>(
      '/analytics/time-patterns'
    );
    return response.data.data ?? [];
  },

  /**
   * 예산 대비 실제 지출
   */
  getBudgetComparison: async () => {
    const instance = await getServerInstance();
    const response = await instance.get<ApiResponse<unknown>>(
      '/analytics/budget-comparison'
    );
    return response.data.data ?? null;
  },

  /**
   * 개인화된 추천 분석
   */
  getPersonalizedRecommendations: async () => {
    const instance = await getServerInstance();
    const response = await instance.get<ApiResponse<unknown[]>>(
      '/analytics/recommendations'
    );
    return response.data.data ?? [];
  },
};
