/**
 * Transactions API Client (5/9)
 * 결제 내역 조회
 * 
 * 특징: Server-only 유틸 객체
 */

import { getServerInstance } from '@/lib/api/http/http.server';

import type { ApiResponse } from '@/lib/api/types';

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  merchant: string;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'failed' | 'cancelled';
  category: string;
  paidAt: string;
  description?: string;
}

export interface TransactionListResponse {
  items: Transaction[];
  total: number;
  page: number;
  pageSize: number;
}

export const transactionsClient = {
  /**
   * 결제 내역 목록 (페이지네이션)
   */
  listTransactions: async (options?: {
    page?: number;
    pageSize?: number;
    status?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    const instance = await getServerInstance();
    const response = await instance.get<ApiResponse<TransactionListResponse>>(
      '/transactions',
      { params: options }
    );
    return response.data.data ?? { items: [], total: 0, page: 1, pageSize: 10 };
  },

  /**
   * 결제 내역 상세 조회
   */
  getTransaction: async (id: string) => {
    const instance = await getServerInstance();
    const response = await instance.get<Transaction>(`/transactions/${id}`);
    return response.data;
  },

  /**
   * 카테고리별 결제 내역
   */
  getTransactionsByCategory: async (category: string) => {
    const instance = await getServerInstance();
    const response = await instance.get<ApiResponse<Transaction[]>>(
      `/transactions/category/${category}`
    );
    return response.data.data ?? [];
  },

  /**
   * 최근 결제 내역 (대시보드용)
   */
  getRecentTransactions: async (limit = 10) => {
    const instance = await getServerInstance();
    const response = await instance.get<ApiResponse<Transaction[]>>(
      '/transactions/recent',
      { params: { limit } }
    );
    return response.data.data ?? [];
  },
};
