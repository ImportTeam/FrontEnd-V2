"use server";

import { dashboardClient } from "@/lib/api/clients/dashboard.server";
import { transactionsClient } from "@/lib/api/clients/transactions.server";
import { logger } from "@/lib/logger";

export async function loadDashboardCharts() {
  const log = logger.scope("CHARTS");
  try {
    const summary = await dashboardClient.getSummary();
    const monthlySavings = await dashboardClient.getMonthlySavingsChart();
    return { summary, monthlySavings };
  } catch (error) {
    log.error("Failed to load dashboard charts:", error);
    return null;
  }
}

export async function loadRecommendedCards() {
  const log = logger.scope("CHARTS");
  try {
    return await dashboardClient.getRecommendedCards();
  } catch (error) {
    log.error("Failed to load recommended cards:", error);
    return null;
  }
}

export async function loadTopMerchants() {
  const log = logger.scope("CHARTS");
  try {
    return await dashboardClient.getTopMerchants();
  } catch (error) {
    log.error("Failed to load top merchants:", error);
    return null;
  }
}

export async function loadRecentTransactions(limit = 10) {
  const log = logger.scope("CHARTS");
  try {
    return await transactionsClient.getRecentTransactions(limit);
  } catch (error) {
    log.error("Failed to load recent transactions:", error);
    return null;
  }
}
