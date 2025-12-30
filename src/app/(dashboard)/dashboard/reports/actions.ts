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

function monthToRange(monthKey: string): { from: string; to: string } {
  const [year, month] = monthKey.split("-");
  const from = `${year}-${month}-01T00:00:00.000Z`;
  const lastDay = new Date(
    Number.parseInt(year, 10),
    Number.parseInt(month, 10),
    0
  ).getDate();
  const to = `${year}-${month}-${lastDay}T23:59:59.999Z`;
  return { from, to };
}

function lastNMonths(endMonthKey: string, n: number): string[] {
  const [yearStr, monthStr] = endMonthKey.split("-");
  const year = Number.parseInt(yearStr, 10);
  const monthIndex = Number.parseInt(monthStr, 10) - 1;

  const result: string[] = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    const d = new Date(Date.UTC(year, monthIndex - i, 1));
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    result.push(`${y}-${m}`);
  }
  return result;
}

export async function loadMonthlyFallbackFromTransactions(
  endMonthKey: string,
  months: number
): Promise<Array<{ month: string; totalSpent: number }>> {
  const log = logger.scope("REPORTS");
  try {
    const keys = lastNMonths(endMonthKey, months);
    const results = await Promise.all(
      keys.map(async (monthKey) => {
        const { from, to } = monthToRange(monthKey);
        const list = await analyticsClient.getTransactions({
          startDate: from,
          endDate: to,
        });
        const totalSpent = (list ?? []).reduce(
          (sum, tx) => sum + (tx.paidAmount ?? tx.spendAmount ?? 0),
          0
        );
        return { month: monthKey, totalSpent };
      })
    );

    return results;
  } catch (error) {
    log.error("Failed to build monthly fallback from transactions:", error);
    return [];
  }
}
