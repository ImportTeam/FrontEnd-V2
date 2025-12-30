"use server";

import { analyticsClient } from "@/lib/api/clients/analytics.server";
import { dashboardClient } from "@/lib/api/clients/dashboard.server";

export async function loadDashboardChartsData() {
  try {
    const [monthlySavings, recommendations] = await Promise.all([
      dashboardClient.getMonthlySavingsChart(),
      analyticsClient.getPersonalizedRecommendations(),
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
    return summary as Record<string, unknown>;
  } catch (error) {
    console.error("[SUMMARY_DATA] Failed to load:", error);
    return null;
  }
}

export async function loadRecentActivityData() {
  try {
    const transactions = await analyticsClient.getPersonalizedRecommendations();
    return transactions || [];
  } catch (error) {
    console.error("[ACTIVITY_DATA] Failed to load:", error);
    return [];
  }
}

export async function loadRecentTransactionsData(_limit = 10) {
  try {
    const response = await analyticsClient.getSpendingAnalysis({
      period: "monthly",
    });
    // 반환된 데이터 구조에 따라 처리
    return response?.categoryBreakdown || [];
  } catch (error) {
    console.error("[TRANSACTIONS_DATA] Failed to load:", error);
    return [];
  }
}
