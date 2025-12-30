"use server";

import { analyticsClient } from "@/lib/api/clients/analytics.server";

import type { TransactionListItem } from "@/lib/api/types";

export async function loadTransactionsForMonth(
  startDate: string,
  endDate: string
): Promise<TransactionListItem[] | null> {
  try {
    return await analyticsClient.getTransactions({ startDate, endDate });
  } catch (error) {
    console.error("[REPORTS] Failed to load transactions:", error);
    return null;
  }
}
