/**
 * Payments API Client (5/9)
 * 결제 내역 기록 (결제 승인 결과 영속화)
 *
 * 특징: Server-only 유틸 객체
 *
 * Endpoints:
 * - POST /api/payments
 */

import { createServerClient } from '@/lib/api/createServerClient';

type DataWrapped<T> = { data: T };

function unwrapData<T>(body: unknown): T {
  if (body && typeof body === 'object' && 'data' in body) {
    const maybe = body as { data?: T };
    if (maybe.data !== undefined) return maybe.data;
  }
  return body as T;
}

export interface RecordPaymentInput {
  userUuid: string;
  merchant: string;
  amount: string | number;
  paymentMethodSeq: number;
}

export const paymentsClient = {
  /**
   * 결제 내역 기록
   * POST /api/payments
   */
  recordPayment: async (data: RecordPaymentInput) => {
    const instance = await createServerClient();
    const response = await instance.post<DataWrapped<Record<string, unknown>> | Record<string, unknown>>(
      '/payments',
      data
    );
    return unwrapData<Record<string, unknown>>(response.data);
  },
};
