/**
 * Benefits API Client (6/9)
 * 혜택 정보 (캐시백, 포인트 등)
 * 
 * 특징: Server-only 유틸 객체
 */

import { createServerClient } from '@/lib/api/createServerClient';

export interface BenefitItem {
  type: 'PERCENT' | 'AMOUNT' | string;
  value: number;
  description: string;
}

export interface BenefitCardResult {
  cardUuid: string;
  cardName: string;
  last4: string;
  benefits: BenefitItem[];
  totalBenefit: number;
}

type DataWrapped<T> = { data: T };

function unwrapData<T>(body: unknown): T {
  if (body && typeof body === 'object' && 'data' in body) {
    const maybe = body as { data?: T };
    if (maybe.data !== undefined) return maybe.data;
  }
  return body as T;
}

export const benefitsClient = {
  /**
   * 국내 결제 혜택 비교
   * GET /api/benefits/comparisons
   */
  compareBenefits: async (options: {
    amount: number;
    category?: string;
    merchant?: string;
  }) => {
    const instance = await createServerClient();
    const response = await instance.get<DataWrapped<BenefitCardResult[]>>(
      '/benefits/comparisons',
      { params: options }
    );
    return unwrapData<BenefitCardResult[]>(response.data) ?? [];
  },

  /**
   * TOP3 결제수단 추천
   * GET /api/benefits/recommendations/top-three
   */
  getTopThreeRecommendations: async (options: {
    amount: number;
    merchant?: string;
  }) => {
    const instance = await createServerClient();
    const response = await instance.get<DataWrapped<BenefitCardResult[]>>(
      '/benefits/recommendations/top-three',
      { params: options }
    );
    return unwrapData<BenefitCardResult[]>(response.data) ?? [];
  },

  /**
   * HTML에서 혜택 추출
   * GET /api/benefits/extractions
   */
  extractBenefitsFromHtml: async (html: string) => {
    const instance = await createServerClient();
    const response = await instance.get<{ benefits: BenefitItem[] }>(
      '/benefits/extractions',
      { params: { html } }
    );
    return response.data;
  },

  /**
   * 페이지 HTML 반영 TOP3 추천
   * POST /api/benefits/recommendations/from-html
   */
  recommendFromHtml: async (data: {
    userUuid: string;
    merchant: string;
    amount: number;
    html: string;
  }) => {
    const instance = await createServerClient();
    const response = await instance.post<DataWrapped<BenefitCardResult[]>>(
      '/benefits/recommendations/from-html',
      data
    );
    return unwrapData<BenefitCardResult[]>(response.data) ?? [];
  },
};
