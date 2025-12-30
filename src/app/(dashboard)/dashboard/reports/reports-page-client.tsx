"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { logger } from "@/lib/logger";

import { loadTransactionsForMonth } from "./actions";
import { ReportsCategoryCard } from "./reports-category-card";
import { ReportsHeader } from "./reports-header";
import { ReportsMonthlyCard } from "./reports-monthly-card";
import { ReportsTransactionsCard } from "./reports-transactions-card";
import {
  buildCategoryChartDataFromTransactions,
  lastNMonths,
  monthToRange,
  normalizeMonthlyData,
  pickCategoryRange,
} from "./reports-utils";

import type {
  CategorySpendingResponse,
  MonthlySavingsChartResponse,
  TransactionListItem,
} from "@/lib/api/types";

type ReportsPageClientProps = {
  initialSelectedMonth: string;
  initialTransactions: TransactionListItem[];
  initialCategoryResponses: CategorySpendingResponse[];
  initialMonthlyResponses: MonthlySavingsChartResponse[];
};

function toCsvCell(value: unknown): string {
  const raw = value === null || value === undefined ? "" : String(value);
  const escaped = raw.replaceAll('"', '""');
  return `"${escaped}"`;
}

export function ReportsPageClient(props: ReportsPageClientProps) {
  const {
    initialSelectedMonth,
    initialTransactions,
    initialCategoryResponses,
    initialMonthlyResponses,
  } = props;

  const log = useMemo(() => logger.scope("REPORTS_PAGE"), []);
  const didHydrateRef = useRef(false);

  const [selectedMonth, setSelectedMonth] = useState<string>(
    () => initialSelectedMonth
  );
  const [isDownloading, setIsDownloading] = useState(false);
  const [transactions, setTransactions] = useState<TransactionListItem[]>(
    () => initialTransactions
  );
  const [categoryResponses] = useState<CategorySpendingResponse[]>(
    () => initialCategoryResponses
  );
  const [monthlyResponses] = useState<MonthlySavingsChartResponse[]>(
    () => initialMonthlyResponses
  );

  const [isChartsLoading, setIsChartsLoading] = useState(false);
  const [monthlyFallbackData, setMonthlyFallbackData] = useState<
    Array<{ month: string; totalSpent: number }>
  >([]);

  useEffect(() => {
    // Avoid a duplicate roundtrip on first paint: we already prefetched
    // the initial month transactions on the server.
    if (!didHydrateRef.current) {
      didHydrateRef.current = true;
      return;
    }

    let cancelled = false;

    async function run() {
      try {
        const { from, to } = monthToRange(selectedMonth);
        const list = await loadTransactionsForMonth(from, to);
        if (cancelled) return;
        setTransactions(list ?? []);
      } catch (error) {
        if (cancelled) return;
        log.error("Failed to load transactions:", error);
        setTransactions([]);
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [selectedMonth, log]);

  const selectedCategory = useMemo(
    () => pickCategoryRange(categoryResponses, selectedMonth),
    [categoryResponses, selectedMonth]
  );

  const categoryChartDataFromApi = useMemo(
    () =>
      (selectedCategory?.data ?? []).map((item) => ({
        label: item.label,
        value: item.value,
        ratioPercent: item.ratioPercent,
      })),
    [selectedCategory]
  );

  const categoryChartDataFallback = useMemo(
    () => buildCategoryChartDataFromTransactions(transactions),
    [transactions]
  );

  const categoryChartData =
    categoryChartDataFromApi.length > 0
      ? categoryChartDataFromApi
      : categoryChartDataFallback;

  const monthlyDataFromApi = useMemo(
    () => normalizeMonthlyData(monthlyResponses),
    [monthlyResponses]
  );

  useEffect(() => {
    if (monthlyDataFromApi.length > 0) return;

    let cancelled = false;

    async function buildFallback() {
      setIsChartsLoading(true);
      try {
        const months = lastNMonths(selectedMonth, 6);
        const results = await Promise.all(
          months.map(async (monthKey) => {
            const { from, to } = monthToRange(monthKey);
            const list = await loadTransactionsForMonth(from, to);
            const totalSpent = (list ?? []).reduce(
              (sum, tx) => sum + (tx.paidAmount ?? tx.spendAmount ?? 0),
              0
            );
            return { month: monthKey, totalSpent };
          })
        );

        if (cancelled) return;
        setMonthlyFallbackData(results);
      } catch (error) {
        if (cancelled) return;
        log.error("Failed to build monthly fallback data:", error);
        setMonthlyFallbackData([]);
      } finally {
        if (!cancelled) setIsChartsLoading(false);
      }
    }

    void buildFallback();
    return () => {
      cancelled = true;
    };
  }, [monthlyDataFromApi.length, selectedMonth, log]);

  const monthlyData =
    monthlyDataFromApi.length > 0 ? monthlyDataFromApi : monthlyFallbackData;

  const downloadJSON = () => {
    setIsDownloading(true);
    try {
      const reportData = {
        month: selectedMonth,
        transactions,
        categoryChartData,
        monthlyData,
        summary: {
          totalCount: transactions.length,
          totalAmount: transactions.reduce(
            (sum, tx) => sum + (tx.paidAmount ?? 0),
            0
          ),
        },
      };

      const dataStr = JSON.stringify(reportData, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `report_${selectedMonth}.json`;
      link.click();
      URL.revokeObjectURL(url);
      log.warn("JSON download completed:", selectedMonth);
    } catch (error) {
      log.error("Failed to download JSON:", error);
      alert("JSON 다운로드에 실패했습니다.");
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadCSV = () => {
    setIsDownloading(true);
    try {
      const headers = [
        "거래처",
        "카테고리",
        "거래일시",
        "결제금액",
        "혜택금액",
        "결제수단",
      ];

      const rows = transactions.map((tx) => [
        toCsvCell(tx.merchantName),
        toCsvCell(tx.category),
        toCsvCell(new Date(tx.transactionAt).toLocaleString("ko-KR")),
        toCsvCell(tx.paidAmount ?? 0),
        toCsvCell(tx.discountOrRewardAmount ?? 0),
        toCsvCell(tx.paymentMethodName),
      ]);

      const csv = [
        headers.map(toCsvCell).join(","),
        ...rows.map((r) => r.join(",")),
      ].join("\n");

      const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `report_${selectedMonth}.csv`;
      link.click();
      URL.revokeObjectURL(url);
      log.warn("CSV download completed:", selectedMonth);
    } catch (error) {
      log.error("Failed to download CSV:", error);
      alert("CSV 다운로드에 실패했습니다.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <ReportsHeader
        selectedMonth={selectedMonth}
        isDownloading={isDownloading}
        hasTransactions={transactions.length > 0}
        onMonthChange={setSelectedMonth}
        onDownloadJSON={downloadJSON}
        onDownloadCSV={downloadCSV}
      />

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <ReportsCategoryCard
          isChartsLoading={isChartsLoading}
          categoryChartData={categoryChartData}
        />
        <ReportsMonthlyCard isChartsLoading={isChartsLoading} monthlyData={monthlyData} />
      </div>

      <ReportsTransactionsCard
        selectedMonth={selectedMonth}
        transactions={transactions}
      />
    </div>
  );
}
