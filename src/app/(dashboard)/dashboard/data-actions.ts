"use server";

import { dashboardClient } from "@/lib/api/clients/dashboard.server";

export async function loadDashboardChartsData() {
  try {
    const [monthlySavings, recommendations] = await Promise.all([
      dashboardClient.getMonthlySavingsChart(),
      dashboardClient.getRecommendedCards(),
    ]);

    return {
      chartData: (monthlySavings as unknown[]) || [],
      recommendations: (recommendations as unknown[]) || [],
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
    return summary as unknown as Record<string, unknown>;
  } catch (error) {
    console.error("[SUMMARY_DATA] Failed to load:", error);
    return null;
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
    return items.map((item, index) => ({
      id: `${item.merchantName}_${index}`,
      merchant: item.merchantName,
      date: item.paidAt,
      amount: `${(item.paidAmount ?? 0).toLocaleString()}원`,
      cardName: item.paymentMethodName,
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
    if (!analysis) return null;
    return {
      recommendation: analysis.recommendation,
      reasonSummary: analysis.reasonSummary,
    };
  } catch (error) {
    console.error("[AI_ANALYSIS_DATA] Failed to load:", error);
    return null;
  }
}
