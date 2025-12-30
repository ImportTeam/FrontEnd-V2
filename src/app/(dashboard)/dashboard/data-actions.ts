"use server";

import { dashboardClient } from "@/lib/api/clients/dashboard.server";

/**
 * Safe data loading with fallbacks
 * Returns empty/null data instead of throwing errors
 */

export async function loadDashboardChartsData() {
  try {
    const [monthlySavings, recommendations] = await Promise.allSettled([
      dashboardClient.getMonthlySavingsChart(),
      dashboardClient.getRecommendedCards(),
    ]);

    const chartData = monthlySavings.status === 'fulfilled' ? (monthlySavings.value as unknown[]) || [] : [];
    const recsData = recommendations.status === 'fulfilled' ? (recommendations.value as unknown[]) || [] : [];

    return {
      chartData,
      recommendations: recsData,
    };
  } catch (error) {
    console.error("[CHARTS_DATA] Failed to load:", error);
    return {
      chartData: [],
      recommendations: [],
    };
  }
}

export async function loadSummaryCardsData(): Promise<Record<string, unknown> | null> {
  try {
    const summary = await dashboardClient.getSummary();
    if (!summary) {
      return {
        totalSavings: "0원",
        monthlySpending: "0원",
        totalSavingsChange: "0%",
        topPaymentMethod: "데이터 없음",
        topPaymentMethodCount: 0,
      };
    }
    return summary as unknown as Record<string, unknown>;
  } catch (error) {
    console.error("[SUMMARY_DATA] Failed to load:", error);
    // Return placeholder data instead of null
    return {
      totalSavings: "0원",
      monthlySpending: "0원",
      totalSavingsChange: "0%",
      topPaymentMethod: "데이터 없음",
      topPaymentMethodCount: 0,
    };
  }
}

export async function loadRecentActivityData() {
  try {
    return [];
  } catch (error) {
    console.error("[ACTIVITY_DATA] Failed to load:", error);
    return [];
  }
}

export async function loadRecentTransactionsData(_limit = 10) {
  try {
    const items = await dashboardClient.getRecentBySite();
    if (!Array.isArray(items) || items.length === 0) {
      return [];
    }
    return items.map((item, index) => ({
      id: `${item.merchantName}_${index}`,
      merchant: item.merchantName || "알 수 없음",
      date: item.paidAt || new Date().toISOString(),
      amount: `${(item.paidAmount ?? 0).toLocaleString()}원`,
      cardName: item.paymentMethodName || "결제 수단",
      benefit: `${(item.discountOrRewardAmount ?? 0).toLocaleString()}원`,
    }));
  } catch (error) {
    console.error("[TRANSACTIONS_DATA] Failed to load:", error);
    return [];
  }
}

export async function loadAIAnalysisData() {
  try {
    const analysis = await dashboardClient.getAIAnalysis();
    if (!analysis) {
      return {
        recommendation: "AI 분석 데이터를 불러올 수 없습니다",
        reasonSummary: "나중에 다시 시도해주세요",
      };
    }
    return {
      recommendation: analysis.recommendation || "분석 중입니다",
      reasonSummary: analysis.reasonSummary || "",
    };
  } catch (error) {
    console.error("[AI_ANALYSIS_DATA] Failed to load:", error);
    return {
      recommendation: "AI 분석 데이터를 불러올 수 없습니다",
      reasonSummary: "나중에 다시 시도해주세요",
    };
  }
}
