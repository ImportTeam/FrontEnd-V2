import {
  loadCategorySpending,
  loadMonthlySpending,
  loadTransactionsForMonth,
} from "./actions";
import { ReportsPageClient } from "./reports-page-client";

import type {
  CategorySpendingResponse,
  MonthlySavingsChartResponse,
  TransactionListItem,
} from "@/lib/api/types";

export const dynamic = "force-dynamic";

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

// eslint-disable-next-line no-restricted-syntax
export default async function ReportsPage() {
  const now = new Date();
  const initialSelectedMonth = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;

  const { from, to } = monthToRange(initialSelectedMonth);

  const [initialTransactions, initialCategoryResponses, initialMonthlyResponses] =
    await Promise.all([
      loadTransactionsForMonth(from, to).catch(() => null),
      loadCategorySpending().catch(() => null),
      loadMonthlySpending().catch(() => null),
    ]);

  return (
    <ReportsPageClient
      initialSelectedMonth={initialSelectedMonth}
      initialTransactions={(initialTransactions ?? []) as TransactionListItem[]}
      initialCategoryResponses={(initialCategoryResponses ?? []) as CategorySpendingResponse[]}
      initialMonthlyResponses={(initialMonthlyResponses ?? []) as MonthlySavingsChartResponse[]}
    />
  );
}

