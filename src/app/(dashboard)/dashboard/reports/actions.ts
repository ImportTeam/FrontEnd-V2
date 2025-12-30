"use server";

import { analyticsClient } from "@/lib/api/clients/analytics.server";
import { logger } from "@/lib/logger";

import type { TransactionListItem } from "@/lib/api/types";

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
