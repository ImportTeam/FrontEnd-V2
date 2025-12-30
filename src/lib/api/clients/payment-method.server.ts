/**
 * Payment Method API Client (4/9)
 * 카드, 계좌 등 결제수단 관리
 * 
 * 특징: Server-only 유틸 객체
 */

import { getServerInstance } from '@/lib/api/http/http.server';

import type { ApiResponse } from '@/lib/api/types';

export interface PaymentCard {
  id: string;
  cardName: string;
  cardNumber: string;
  cardBrand: string;
  expiryDate: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
}

export const paymentMethodClient = {
  /**
   * 등록된 결제수단 목록 조회
   */
  listPaymentMethods: async () => {
    const instance = await getServerInstance();
    const response = await instance.get<ApiResponse<PaymentCard[]>>(
      '/payment-methods'
    );
    return response.data.data ?? [];
  },

  /**
   * 결제수단 상세 조회
   */
  getPaymentMethod: async (id: string) => {
    const instance = await getServerInstance();
    const response = await instance.get<PaymentCard>(
      `/payment-methods/${id}`
    );
    return response.data;
  },

  /**
   * 결제수단 추가
   */
  addPaymentMethod: async (data: Omit<PaymentCard, 'id' | 'createdAt'>) => {
    const instance = await getServerInstance();
    const response = await instance.post<PaymentCard>(
      '/payment-methods',
      data
    );
    return response.data;
  },

  /**
   * 결제수단 수정
   */
  updatePaymentMethod: async (id: string, data: Partial<PaymentCard>) => {
    const instance = await getServerInstance();
    const response = await instance.patch<PaymentCard>(
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
  setDefaultPaymentMethod: async (id: string) => {
    const instance = await getServerInstance();
    const response = await instance.patch<PaymentCard>(
      `/payment-methods/${id}/default`,
      {}
    );
    return response.data;
  },
};
