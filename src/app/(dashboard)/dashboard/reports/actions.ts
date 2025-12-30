"use server";

import { analyticsClient } from "@/lib/api/clients/analytics.server";
import { logger } from "@/lib/logger";

import type { CategorySpendingResponse, MonthlySavingsChartResponse, TransactionListItem } from "@/lib/api/types";

export async function loadTransactionsForMonth(
  startDate: string,
  endDate: string
): Promise<TransactionListItem[] | null> {
  const log = logger.scope("REPORTS");
  try {
    return await analyticsClient.getTransactions({ startDate, endDate });
  } catch (error) {
    log.error("Failed to load transactions:", error);
    return null;
  }
}

export async function loadCategorySpending(): Promise<CategorySpendingResponse[] | null> {
  const log = logger.scope("REPORTS");
  try {
    return await analyticsClient.getCategories();
  } catch (error) {
    log.error("Failed to load category spending:", error);
    return null;
  }
}

export async function loadMonthlySpending(): Promise<MonthlySavingsChartResponse[] | null> {
  const log = logger.scope("REPORTS");
  try {
    return await analyticsClient.getMonths();
  } catch (error) {
    log.error("Failed to load monthly spending:", error);
    return null;
  }
}
