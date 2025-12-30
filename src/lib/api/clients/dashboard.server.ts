/**
 * Dashboard API Client (7/9)
 * 대시보드 데이터 (요약, 차트 등)
 * 
 * 특징: Server-only 유틸 객체
 */

import { getServerInstance } from '@/lib/api/http/http.server';

import type {
  AIMetricsResponse,
  ApiResponse,
  MonthlySavingsChartResponse,
  RecentTransactionsResponse,
  SummaryData,
  TopMerchantData,
} from '@/lib/api/types';

type DashboardSavingsMetricPRD = {
  data: {
    savingsAmount: number;
    savingsAmountKrw: string;
    lastYearSameMonthSavingsAmount: number;
    savingsDeltaAmount: number;
    savingsDeltaDirection: string;
    compareMessage: string;
    savingsRatePercent: number;
  };
};

type DashboardTopMerchantPRD = {
  data: TopMerchantData;
};

type DashboardTopPaymethodPRD = {
  data: {
    paymentMethodId: number;
    paymentMethodName: string;
    thisMonthTotalAmount: number;
    thisMonthTotalAmountKrw: string;
    basis: string;
  };
};

type DashboardAiBenefitsPRD = {
  data: {
    recommendation: string;
    reasonSummary: string;
  };
};

function unwrapApiResponse<T>(body: unknown): T {
  if (body && typeof body === 'object' && 'data' in body) {
    const maybe = body as { data?: T };
    if (maybe.data !== undefined) return maybe.data;
  }
  return body as T;
}

export const dashboardClient = {
  /**
   * 대시보드 요약 데이터
   */
  getSummary: async () => {
    const instance = await getServerInstance();

    const [savingsRes, topPaymethodRes, recentRes] = await Promise.all([
      instance.get<ApiResponse<DashboardSavingsMetricPRD> | DashboardSavingsMetricPRD>(
        '/dashboard/metrics/savings'
      ),
      instance.get<ApiResponse<DashboardTopPaymethodPRD> | DashboardTopPaymethodPRD>(
        '/dashboard/metrics/top-paymethod'
      ),
      instance.get<ApiResponse<RecentTransactionsResponse> | RecentTransactionsResponse>(
        '/dashboard/transactions/recent-site'
      ),
    ]);

    const savings = unwrapApiResponse<DashboardSavingsMetricPRD>(savingsRes.data)?.data;
    const topPaymethod = unwrapApiResponse<DashboardTopPaymethodPRD>(topPaymethodRes.data)?.data;
    const recent = unwrapApiResponse<RecentTransactionsResponse>(recentRes.data);

    const totalSavings = savings?.savingsAmountKrw ?? `${(savings?.savingsAmount ?? 0).toLocaleString()}원`;
    const savingsDeltaPercent = savings?.savingsRatePercent;
    const totalRecentTransactions = recent?.data?.length ?? 0;

    const summary: SummaryData = {
      totalSavings,
      totalSavingsChange: typeof savingsDeltaPercent === 'number' ? `${savingsDeltaPercent.toFixed(2)}%` : '0%',
      monthlySpending: topPaymethod?.thisMonthTotalAmountKrw ?? '0원',
      monthlySpendingChange: typeof savingsDeltaPercent === 'number' ? `${savingsDeltaPercent.toFixed(2)}%` : '0%',
      topPaymentMethod: topPaymethod?.paymentMethodName ?? '',
      topPaymentMethodCount: undefined,
      aiBenefit: '',
      aiBenefitAmount: '',
      topCategory: '',
      topCategoryPercent: '',
    };

    return {
      ...summary,
      topCard: topPaymethod?.paymentMethodName ?? '',
      recentTransactions: totalRecentTransactions,
    } as unknown as SummaryData;
  },

  /**
   * 월별 절약액 차트
   */
  getMonthlySavingsChart: async (months = 6) => {
    const instance = await getServerInstance();

    const response = await instance.get<
      ApiResponse<MonthlySavingsChartResponse> | MonthlySavingsChartResponse
    >('/dashboard/charts/monthly-savings');

    const body = unwrapApiResponse<MonthlySavingsChartResponse>(response.data);
    const all = body?.data ?? [];
    const sliced = months > 0 ? all.slice(-months) : all;
    return sliced.map((point) => ({
      month: point.month,
      savingsAmount: point.savingsAmount,
    }));
  },

  /**
   * 카드별 추천 순위
   */
  getRecommendedCards: async () => {
    const instance = await getServerInstance();

    const response = await instance.get<ApiResponse<AIMetricsResponse> | AIMetricsResponse>(
      '/dashboard/metrics/ai-top3'
    );

    const body = unwrapApiResponse<AIMetricsResponse>(response.data);
    const items = body?.data ?? [];
    return items.map((item, index) => ({
      id: String(item.paymentMethodId),
      rank: index + 1,
      cardName: item.paymentMethodName,
      benefit: item.reasonSummary,
      isRecommended: index === 0,
    }));
  },

  /**
   * AI 혜택 분석
   */
  getAIAnalysis: async () => {
    const instance = await getServerInstance();
    const response = await instance.get<ApiResponse<DashboardAiBenefitsPRD> | DashboardAiBenefitsPRD>(
      '/dashboard/metrics/ai-benefits'
    );
    return unwrapApiResponse<DashboardAiBenefitsPRD>(response.data)?.data ?? null;
  },

  /**
   * 상위 가맹점 정보
   */
  getTopMerchants: async (limit = 5) => {
    const instance = await getServerInstance();
    const response = await instance.get<ApiResponse<DashboardTopMerchantPRD> | DashboardTopMerchantPRD>(
      '/dashboard/metrics/top-merchant'
    );
    const body = unwrapApiResponse<DashboardTopMerchantPRD>(response.data);
    const single = body?.data;
    return single ? [single].slice(0, limit) : [];
  },

  /**
   * 최근 결제 내역 (사이트별 그룹)
   * GET /api/dashboard/transactions/recentbysite
   */
  getRecentBySite: async () => {
    const instance = await getServerInstance();
    const response = await instance.get<ApiResponse<RecentTransactionsResponse> | RecentTransactionsResponse>(
      '/dashboard/transactions/recent-site'
    );
    const body = unwrapApiResponse<RecentTransactionsResponse>(response.data);
    return body?.data ?? [];
  },
};
