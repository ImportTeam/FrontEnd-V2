/**
 * Dashboard API Client (7/9)
 * 대시보드 데이터 (요약, 차트 등) - 명확한 반환 타입
 * 
 * ✅ 규칙:
 * - 객체 반환 메서드: Promise<Object> 또는 Promise<Object | null>
 * - 배열 반환 메서드: Promise<Array> (실패 시 [])
 * - 각 메서드마다 try/catch로 명확한 에러 처리
 * - ApiEnvelope<T> 타입 명시
 */

import { createServerClient } from '@/lib/api/createServerClient';

import type {
  ApiEnvelope,
  MonthlySavingsChartResponse,
  RecentTransactionItem,
  RecentTransactionsResponse,
  SummaryData,
  TopMerchantData,
} from '@/lib/api/types';

type DashboardSavingsMetricPRD = {
  savingsAmount: number;
  savingsAmountKrw: string;
  lastYearSameMonthSavingsAmount: number;
  savingsDeltaAmount: number;
  savingsDeltaDirection: string;
  compareMessage: string;
  savingsRatePercent: number;
};

type DashboardTopPaymethodPRD = {
  paymentMethodId: number;
  paymentMethodName: string;
  thisMonthTotalAmount: number;
  thisMonthTotalAmountKrw: string;
  basis: string;
};

type AIMetricItem = {
  paymentMethodId: number;
  paymentMethodName: string;
  reasonSummary: string;
  score: number;
  value: number;
};

type DashboardAiBenefitsPRD = {
  recommendation: string;
  reasonSummary: string;
};

/**
 * 객체 응답 처리
 * ApiEnvelope<T> → T
 */
function unwrapObject<T>(data: unknown): T | null {
  if (!data) return null;

  // ApiEnvelope<T> 구조
  if (typeof data === 'object' && 'data' in data) {
    const envelope = data as { data?: T };
    if (envelope.data) return envelope.data;
  }

  // 혹시 직접 객체인 경우
  if (typeof data === 'object' && !Array.isArray(data)) {
    return data as T;
  }

  console.error('[unwrapObject] Unexpected data structure:', data);
  return null;
}

/**
 * 배열 응답 처리
 * ApiEnvelope<T[]> → T[]
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

  console.error('[unwrapArray] Unexpected data structure:', data);
  return [];
}

export const dashboardClient = {
  /**
   * 대시보드 요약 데이터 (객체)
   * 
   * @returns SummaryData 객체 (실패 시 기본값)
   */
  getSummary: async (): Promise<SummaryData> => {
    try {
      const instance = await createServerClient();

      const [savingsRes, topPaymethodRes] = await Promise.all([
        instance.get<ApiEnvelope<DashboardSavingsMetricPRD>>(
          '/dashboard/metrics/savings'
        ),
        instance.get<ApiEnvelope<DashboardTopPaymethodPRD>>(
          '/dashboard/metrics/top-paymethod'
        ),
      ]);

      const savings = unwrapObject<DashboardSavingsMetricPRD>(savingsRes.data);
      const topPaymethod = unwrapObject<DashboardTopPaymethodPRD>(topPaymethodRes.data);

      const totalSavings = savings?.savingsAmountKrw ?? '0원';
      const savingsDeltaPercent = savings?.savingsRatePercent ?? 0;

      return {
        totalSavings,
        totalSavingsChange: `${savingsDeltaPercent.toFixed(2)}%`,
        monthlySpending: topPaymethod?.thisMonthTotalAmountKrw ?? '0원',
        monthlySpendingChange: `${savingsDeltaPercent.toFixed(2)}%`,
        topPaymentMethod: topPaymethod?.paymentMethodName ?? '데이터 없음',
        topPaymentMethodCount: undefined,
        aiBenefit: '',
        aiBenefitAmount: '',
        topCategory: '',
        topCategoryPercent: '',
      };
    } catch (error) {
      console.error('[dashboardClient] getSummary failed:', error);
      return {
        totalSavings: '0원',
        totalSavingsChange: '0%',
        monthlySpending: '0원',
        monthlySpendingChange: '0%',
        topPaymentMethod: '데이터 없음',
      };
    }
  },

  /**
   * 월별 절약액 차트 (배열)
   * 
   * @returns 월별 차트 데이터 배열
   */
  getMonthlySavingsChart: async (months = 6): Promise<MonthlySavingsChartResponse[]> => {
    try {
      const instance = await createServerClient();

      const response = await instance.get<
        ApiEnvelope<MonthlySavingsChartResponse[]>
      >('/dashboard/charts/monthly-savings');

      const all = unwrapArray<MonthlySavingsChartResponse>(response.data);
      return months > 0 ? all.slice(-months) : all;
    } catch (error) {
      console.error('[dashboardClient] getMonthlySavingsChart failed:', error);
      return [];
    }
  },

  /**
   * 카드별 추천 순위 (배열)
   * 
   * @returns 카드 추천 데이터 배열
   */
  getRecommendedCards: async () => {
    try {
      const instance = await createServerClient();

      const response = await instance.get<ApiEnvelope<AIMetricItem[]>>(
        '/dashboard/metrics/ai-top3'
      );

      const items = unwrapArray<AIMetricItem>(response.data);
      return items.map((item, index) => ({
        id: String(item.paymentMethodId),
        rank: index + 1,
        cardName: item.paymentMethodName,
        benefit: item.reasonSummary,
        isRecommended: index === 0,
      }));
    } catch (error) {
      console.error('[dashboardClient] getRecommendedCards failed:', error);
      return [];
    }
  },

  /**
   * AI 혜택 분석 (객체)
   * 
   * @returns AI 분석 데이터 또는 null
   */
  getAIAnalysis: async (): Promise<DashboardAiBenefitsPRD | null> => {
    try {
      const instance = await createServerClient();
      const response = await instance.get<ApiEnvelope<DashboardAiBenefitsPRD>>(
        '/dashboard/metrics/ai-benefits'
      );
      return unwrapObject<DashboardAiBenefitsPRD>(response.data);
    } catch (error) {
      console.error('[dashboardClient] getAIAnalysis failed:', error);
      return null;
    }
  },

  /**
   * 상위 가맹점 정보 (배열)
   * 
   * @returns 가맹점 데이터 배열
   */
  getTopMerchants: async (limit = 5): Promise<TopMerchantData[]> => {
    try {
      const instance = await createServerClient();
      const response = await instance.get<ApiEnvelope<TopMerchantData>>(
        '/dashboard/metrics/top-merchant'
      );
      const single = unwrapObject<TopMerchantData>(response.data);
      return single ? [single].slice(0, limit) : [];
    } catch (error) {
      console.error('[dashboardClient] getTopMerchants failed:', error);
      return [];
    }
  },

  /**
   * 최근 결제 내역 (배열)
   * 
   * @returns 거래 내역 배열 (RecentTransactionItem[])
   */
  getRecentBySite: async (): Promise<RecentTransactionItem[]> => {
    try {
      const instance = await createServerClient();
      const response = await instance.get<ApiEnvelope<RecentTransactionsResponse>>(
        '/dashboard/transactions/recent-site'
      );
      const data = unwrapObject<RecentTransactionsResponse>(response.data);
      return data?.data ?? [];
    } catch (error) {
      console.error('[dashboardClient] getRecentBySite failed:', error);
      return [];
    }
  },

  /**
   * AI 혜택 분석 (배열 형식)
   * 
   * @returns AI 혜택 데이터 배열
   */
  getAIBenefits: async (): Promise<DashboardAiBenefitsPRD[]> => {
    try {
      const instance = await createServerClient();
      const response = await instance.get<ApiEnvelope<DashboardAiBenefitsPRD[]>>(
        '/dashboard/metrics/ai-benefits'
      );
      return unwrapArray<DashboardAiBenefitsPRD>(response.data);
    } catch (error) {
      console.error('[dashboardClient] getAIBenefits failed:', error);
      return [];
    }
  },
};
