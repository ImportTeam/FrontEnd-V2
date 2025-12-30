/**
 * Benefits API Client (6/9)
 * 혜택 정보 (캐시백, 포인트 등)
 * 
 * 특징: Server-only 유틸 객체
 */

import { getServerInstance } from '@/lib/api/http/http.server';

import type { ApiResponse } from '@/lib/api/types';

export interface Benefit {
  id: string;
  cardId: string;
  category: string;
  type: 'cashback' | 'points' | 'mileage' | 'discount';
  percentage: number;
  amount?: number;
  description: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
}

export interface BenefitSummary {
  totalCashback: number;
  totalPoints: number;
  totalMileage: number;
  activeOffers: number;
}

export const benefitsClient = {
  /**
   * 사용자의 모든 혜택 조회
   */
  listBenefits: async (options?: { cardId?: string; category?: string }) => {
    const instance = await getServerInstance();
    const response = await instance.get<ApiResponse<Benefit[]>>('/benefits', {
      params: options,
    });
    return response.data.data ?? [];
  },

  /**
   * 혜택 상세 조회
   */
  getBenefit: async (id: string) => {
    const instance = await getServerInstance();
    const response = await instance.get<Benefit>(`/benefits/${id}`);
    return response.data;
  },

  /**
   * 혜택 요약 (캐시백, 포인트 통계)
   */
  getBenefitSummary: async () => {
    const instance = await getServerInstance();
    const response = await instance.get<BenefitSummary>('/benefits/summary');
    return response.data;
  },

  /**
   * 카드별 최적 혜택 추천
   */
  getRecommendedBenefits: async (amount: number, category: string) => {
    const instance = await getServerInstance();
    const response = await instance.get<ApiResponse<Benefit[]>>(
      '/benefits/recommended',
      { params: { amount, category } }
    );
    return response.data.data ?? [];
  },

  /**
   * 진행 중인 프로모션
   */
  getActivePromotions: async () => {
    const instance = await getServerInstance();
    const response = await instance.get<ApiResponse<Benefit[]>>(
      '/benefits/promotions'
    );
    return response.data.data ?? [];
  },
};
