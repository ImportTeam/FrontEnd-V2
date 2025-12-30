"use server";

import { dashboardClient } from "@/lib/api/clients/dashboard.server";
import { transactionsClient } from "@/lib/api/clients/transactions.server";

export async function loadDashboardCharts() {
  try {
    const summary = await dashboardClient.getSummary();
    const monthlySavings = await dashboardClient.getMonthlySavingsChart();
    return { summary, monthlySavings };
  } catch (error) {
    console.error("[CHARTS] Failed to load dashboard charts:", error);
    return null;
  }
}

export async function loadRecommendedCards() {
  try {
    return await dashboardClient.getRecommendedCards();
  } catch (error) {
    console.error("[CHARTS] Failed to load recommended cards:", error);
    return null;
  }
}

export async function loadTopMerchants() {
  try {
    return await dashboardClient.getTopMerchants();
  } catch (error) {
    console.error("[CHARTS] Failed to load top merchants:", error);
    return null;
  }
}

export async function loadRecentTransactions(limit = 10) {
  try {
    return await transactionsClient.getRecentTransactions(limit);
  } catch (error) {
    console.error("[CHARTS] Failed to load recent transactions:", error);
    return null;
  }
}
