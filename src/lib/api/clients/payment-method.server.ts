/**
 * Payment Method API Client (4/9)
 * 카드, 계좌 등 결제수단 관리
 * 
 * 특징: Server-only 유틸 객체
 */

import { getServerInstance } from '@/lib/api/http/http.server';

import type { PaymentCard, PaymentCardsResponse } from '@/lib/api/types';

export interface PaymentMethodStatisticsResponse {
  totalCount: number;
  byCardType: Record<string, number>;
  primary: PaymentCard | null;
}

export interface PaymentMethodDetailsResponse {
  seq: number;
  uuid: string;
  last4: string;
  cardType: string;
  alias: string;
  isPrimary: boolean;
  createdAt: string;
}

function unwrapCards(body: PaymentCardsResponse | PaymentCard[]): PaymentCard[] {
  if (Array.isArray(body)) return body;
  return body.data ?? [];
}

export const paymentMethodClient = {
  /**
   * 새 카드 추가 (연동 시작)
   * POST /api/payment-methods/cards/registration/start
   */
  startCardRegistration: async (returnUrl: string) => {
    const instance = await getServerInstance();
    const response = await instance.post<{ redirectUrl: string }>(
      '/payment-methods/cards/registration/start',
      { returnUrl }
    );
    return response.data;
  },

  /**
   * 등록된 결제수단 목록 조회
   */
  listPaymentMethods: async () => {
    const instance = await getServerInstance();
    const response = await instance.get<PaymentCardsResponse | PaymentCard[]>(
      '/payment-methods'
    );
    return unwrapCards(response.data);
  },

  /**
   * 결제수단 상세 조회
   */
  getPaymentMethod: async (id: string) => {
    const instance = await getServerInstance();
    const response = await instance.get<PaymentMethodDetailsResponse>(
      `/payment-methods/${id}`
    );
    return response.data;
  },

  /**
   * 결제수단 추가
   */
  addPaymentMethod: async (data: {
    alias: string;
    cardToken: string;
    isPrimary: boolean;
  }) => {
    const instance = await getServerInstance();
    const response = await instance.post<PaymentMethodDetailsResponse>(
      '/payment-methods',
      data
    );
    return response.data;
  },

  /**
   * 결제수단 수정
   */
  updatePaymentMethod: async (
    id: string,
    data: Partial<Pick<PaymentMethodDetailsResponse, 'alias' | 'isPrimary'>>
  ) => {
    const instance = await getServerInstance();
    const response = await instance.patch<PaymentMethodDetailsResponse>(
      `/payment-methods/${id}`,
      data
    );
    return response.data;
  },

  /**
   * 결제수단 삭제
   */
  deletePaymentMethod: async (id: string) => {
    const instance = await getServerInstance();
    await instance.delete(`/payment-methods/${id}`);
  },

  /**
   * 기본 결제수단 설정
   */
  setPrimaryPaymentMethod: async (id: string) => {
    const instance = await getServerInstance();
    await instance.patch(`/payment-methods/${id}`, { isPrimary: true });
  },

  /**
   * 결제수단 통계 조회
   * GET /api/payment-methods/statistics
   */
  getStatistics: async () => {
    const instance = await getServerInstance();
    const response = await instance.get<PaymentMethodStatisticsResponse>(
      '/payment-methods/statistics'
    );
    return response.data;
  },

  /**
   * 결제수단 상세 정보 조회
   * GET /api/payment-methods/{id}/details
   */
  getDetails: async (id: string) => {
    const instance = await getServerInstance();
    const response = await instance.get<Record<string, unknown>>(
      `/payment-methods/${id}/details`
    );
    return response.data;
  },
};
