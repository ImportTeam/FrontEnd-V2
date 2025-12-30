"use client";

import { FileJson, FileText } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { logger } from "@/lib/logger";

import { loadCategorySpending, loadMonthlySpending, loadTransactionsForMonth } from "./actions";

import type {
  CategorySpendingItem,
  CategorySpendingResponse,
  MonthlySavingsChartItem,
  MonthlySavingsChartResponse,
  TransactionListItem,
} from "@/lib/api/types";

const CHART_COLORS = [
  "var(--color-primary)",
  "var(--color-secondary)",
  "var(--color-accent-foreground)",
  "var(--color-muted-foreground)",
  "var(--color-foreground)",
  "var(--color-border)",
];

function colorForLabel(label: string): string {
  let hash = 0;
  for (let i = 0; i < label.length; i += 1) {
    hash = (hash * 31 + label.charCodeAt(i)) >>> 0;
  }
  return CHART_COLORS[hash % CHART_COLORS.length];
}

function formatKrw(value: number): string {
  return `${new Intl.NumberFormat("ko-KR").format(value)}원`;
}

type PieLabelProps = {
  cx?: number;
  cy?: number;
  midAngle?: number;
  outerRadius?: number;
  payload?: {
    label?: string;
    ratioPercent?: number;
    value?: number;
  };
};

function renderPieCalloutLabel(props: PieLabelProps): React.ReactNode {
  const { cx, cy, midAngle, outerRadius, payload } = props;
  if (cx === undefined || cy === undefined || midAngle === undefined || outerRadius === undefined) return null;
  const label = payload?.label ?? "";
  const ratio = payload?.ratioPercent;

  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);

  const x0 = cx + outerRadius * cos;
  const y0 = cy + outerRadius * sin;
  const x1 = cx + (outerRadius + 10) * cos;
  const y1 = cy + (outerRadius + 10) * sin;
  const x2 = x1 + (cos >= 0 ? 18 : -18);
  const y2 = y1;

  const textAnchor = cos >= 0 ? "start" : "end";
  const tx = x2 + (cos >= 0 ? 6 : -6);
  const ty = y2;
  const ratioText = typeof ratio === "number" ? `${ratio.toFixed(1)}%` : "";

  return (
    <g>
      <path d={`M${x0},${y0}L${x1},${y1}L${x2},${y2}`} stroke="var(--color-muted-foreground)" fill="none" />
      <circle cx={x0} cy={y0} r={3} fill="var(--color-muted-foreground)" />
      <text x={tx} y={ty} textAnchor={textAnchor} dominantBaseline="central" fill="var(--color-foreground)" fontSize={12}>
        <tspan x={tx} dy={-6}>
          {label}
        </tspan>
        <tspan x={tx} dy={14} fill="var(--color-muted-foreground)">
          {ratioText}
        </tspan>
      </text>
    </g>
  );
}

function pickCategoryRange(
  responses: CategorySpendingResponse[],
  selectedMonth: string
): CategorySpendingResponse | null {
  if (responses.length === 0) return null;

  const [year, month] = selectedMonth.split("-");
  const monthNumber = Number(month);
  const koreanLabel = `${year}년 ${monthNumber}월`;

  return (
    responses.find((r) => r.rangeLabel?.includes(selectedMonth)) ??
    responses.find((r) => r.rangeLabel?.includes(koreanLabel)) ??
    responses[0] ??
    null
  );
}

function normalizeMonthlyData(responses: MonthlySavingsChartResponse[]): Array<{ month: string; totalSpent: number }> {
  const series: MonthlySavingsChartItem[] = responses[0]?.data ?? [];
  return series.map((item) => {
    const totalSpent =
      (typeof item.totalSpent === "number" ? item.totalSpent : undefined) ??
      (typeof item.spent === "number" ? item.spent : undefined) ??
      (typeof item.value === "number" ? item.value : 0);

    return {
      month: item.month,
      totalSpent,
    };
  });
}

function buildCategoryChartDataFromTransactions(transactions: TransactionListItem[]):
  Array<{ label: string; value: number; ratioPercent: number }> {
  const totals = new Map<string, number>();
  for (const tx of transactions) {
    const label = tx.category?.trim() || "기타";
    const value = (tx.paidAmount ?? tx.spendAmount ?? 0) || 0;
    totals.set(label, (totals.get(label) ?? 0) + value);
  }

  const entries = Array.from(totals.entries())
    .map(([label, value]) => ({ label, value }))
    .filter((x) => x.value > 0)
    .sort((a, b) => b.value - a.value);

  const total = entries.reduce((sum, x) => sum + x.value, 0);
  if (total <= 0) return [];

  return entries.map((x) => ({
    label: x.label,
    value: x.value,
    ratioPercent: Math.round((x.value / total) * 1000) / 10,
  }));
}

function monthToRange(monthKey: string): { from: string; to: string } {
  const [year, month] = monthKey.split("-");
  const from = `${year}-${month}-01T00:00:00.000Z`;
  const lastDay = new Date(Number.parseInt(year, 10), Number.parseInt(month, 10), 0).getDate();
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

// eslint-disable-next-line no-restricted-syntax
export default function ReportsPage() {
  const log = useMemo(() => logger.scope("REPORTS_PAGE"), []);
  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const [transactions, setTransactions] = useState<TransactionListItem[]>([]);
  const [categoryResponses, setCategoryResponses] = useState<CategorySpendingResponse[]>([]);
  const [monthlyResponses, setMonthlyResponses] = useState<MonthlySavingsChartResponse[]>([]);
  const [isChartsLoading, setIsChartsLoading] = useState(false);
  const [monthlyFallbackData, setMonthlyFallbackData] = useState<Array<{ month: string; totalSpent: number }>>([]);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const [year, month] = selectedMonth.split('-');
        const from = `${year}-${month}-01T00:00:00.000Z`;
        const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
        const to = `${year}-${month}-${lastDay}T23:59:59.999Z`;

        const list = await loadTransactionsForMonth(from, to);
        setTransactions(list ?? []);
        log.warn("Loaded transactions:", list);
      } catch (error) {
        log.error("Failed to load transactions:", error);
      }
    }
    void loadTransactions();
  }, [selectedMonth, log]);

  useEffect(() => {
    async function loadCharts() {
      setIsChartsLoading(true);
      try {
        const [categories, months] = await Promise.all([
          loadCategorySpending(),
          loadMonthlySpending(),
        ]);
        setCategoryResponses(categories ?? []);
        setMonthlyResponses(months ?? []);

        const normalized = normalizeMonthlyData(months ?? []);
        if (normalized.length === 0) {
          const monthKeys = lastNMonths(selectedMonth, 6);
          const totals = await Promise.all(
            monthKeys.map(async (monthKey) => {
              const { from, to } = monthToRange(monthKey);
              const list = await loadTransactionsForMonth(from, to);
              const txs = list ?? [];
              const totalSpent = txs.reduce((sum, tx) => sum + ((tx.paidAmount ?? tx.spendAmount ?? 0) || 0), 0);
              return { month: monthKey, totalSpent };
            })
          );
          setMonthlyFallbackData(totals);
        } else {
          setMonthlyFallbackData([]);
        }
      } catch (error) {
        log.error("Failed to load charts:", error);
        setCategoryResponses([]);
        setMonthlyResponses([]);
        setMonthlyFallbackData([]);
      } finally {
        setIsChartsLoading(false);
      }
    }

    void loadCharts();
  }, [selectedMonth, log]);

  const selectedCategory = pickCategoryRange(categoryResponses, selectedMonth);
  const categoryData: CategorySpendingItem[] = selectedCategory?.data ?? [];
  const categoryChartDataFromApi = categoryData.map((item) => ({
    label: item.label,
    value: item.value,
    ratioPercent: item.ratioPercent,
  }));

  const categoryChartDataFromTransactions = useMemo(
    () => buildCategoryChartDataFromTransactions(transactions),
    [transactions]
  );

  const categoryChartData =
    categoryChartDataFromApi.length > 0 ? categoryChartDataFromApi : categoryChartDataFromTransactions;

  const monthlyDataFromApi = normalizeMonthlyData(monthlyResponses);
  const monthlyData = monthlyDataFromApi.length > 0 ? monthlyDataFromApi : monthlyFallbackData;

  const downloadJSON = () => {
    setIsDownloading(true);
    try {
      const reportData = {
        month: selectedMonth,
        generatedAt: new Date().toISOString(),
        transactions: transactions,
        summary: {
          totalCount: transactions.length,
          totalAmount: transactions.reduce((sum, tx) => sum + (tx.paidAmount || 0), 0),
        },
      };

      const dataStr = JSON.stringify(reportData, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
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
      const headers = ['거래처', '카테고리', '거래일시', '결제금액', '혜택금액', '결제수단'];
      const rows = transactions.map((tx) => [
        tx.merchantName || '',
        tx.category || '',
        new Date(tx.transactionAt).toLocaleString('ko-KR'),
        (tx.paidAmount || 0).toLocaleString(),
        (tx.discountOrRewardAmount || 0).toLocaleString(),
        tx.paymentMethodName || '',
      ]);

      const csv = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
      ].join('\n');

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
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
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            소비 분석 리포트
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-1">
            <span className="hidden sm:inline">월별 소비 패턴과 절약 내역을 상세하게 분석해드립니다.</span>
            <span className="sm:hidden">월별 소비 패턴을 분석합니다.</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 text-xs sm:text-sm rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
          />
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs sm:text-sm bg-white dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300"
            onClick={downloadJSON}
            disabled={isDownloading || transactions.length === 0}
          >
            <FileJson className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">JSON</span>
            <span className="sm:hidden">JSON</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs sm:text-sm bg-white dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300"
            onClick={downloadCSV}
            disabled={isDownloading || transactions.length === 0}
          >
            <FileText className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">CSV</span>
            <span className="sm:hidden">CSV</span>
          </Button>
        </div>
      </div>

      {/* Main Analysis Section - Placeholder */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">카테고리별 지출</CardTitle>
                <CardDescription className="text-xs sm:text-sm">어디에 가장 많이 썼을까요?</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="h-50 sm:h-62.5 md:h-75 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
                  {isChartsLoading ? (
                    <div className="h-full w-full bg-muted/50 animate-pulse rounded-xl" />
                  ) : categoryChartData.length === 0 ? (
                    <div className="h-full w-full flex items-center justify-center border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-xl">
                      <span className="text-zinc-400 text-xs sm:text-sm">차트 데이터가 없습니다.</span>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%" minHeight={260}>
                      <PieChart>
                        <Tooltip
                          formatter={(value) => formatKrw(Number(value))}
                          contentStyle={{
                            borderRadius: "12px",
                            border: "1px solid var(--color-border)",
                            background: "var(--color-card)",
                            color: "var(--color-card-foreground)",
                          }}
                        />
                        <Pie
                          data={categoryChartData}
                          dataKey="value"
                          nameKey="label"
                          innerRadius="55%"
                          outerRadius="80%"
                          paddingAngle={2}
                          stroke="var(--color-card)"
                          strokeWidth={2}
                          // Recharts passes a wider prop shape; we accept a subset and guard.
                          label={renderPieCalloutLabel as unknown as (props: unknown) => React.ReactNode}
                        >
                          {categoryChartData.map((entry, index) => (
                            <Cell
                              key={`${entry.label}-${index}`}
                              fill={colorForLabel(entry.label)}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>

                {categoryChartData.length > 0 ? (
                  <div className="mt-4 grid gap-2">
                    {categoryChartData.map((item) => (
                      <div key={item.label} className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="h-2.5 w-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: colorForLabel(item.label) }}
                            aria-hidden
                          />
                          <span className="truncate text-zinc-700 dark:text-zinc-200">{item.label}</span>
                        </div>
                        <div className="shrink-0 text-right">
                          <span className="tabular-nums text-zinc-700 dark:text-zinc-200">
                            {formatKrw(item.value)}
                          </span>
                          <span className="ml-2 tabular-nums text-zinc-500 dark:text-zinc-400">
                            {item.ratioPercent.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
            </CardContent>
        </Card>

        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">월별 지출 추이</CardTitle>
                <CardDescription className="text-xs sm:text-sm">지난 6개월간의 변화입니다.</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="h-50 sm:h-62.5 md:h-75 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
                  {isChartsLoading ? (
                    <div className="h-full w-full bg-muted/50 animate-pulse rounded-xl" />
                  ) : monthlyData.length === 0 ? (
                    <div className="h-full w-full flex items-center justify-center border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-xl">
                      <span className="text-zinc-400 text-xs sm:text-sm">차트 데이터가 없습니다.</span>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%" minHeight={260}>
                      <BarChart data={monthlyData.slice(-6)} margin={{ top: 12, right: 12, left: -8, bottom: 4 }}>
                        <CartesianGrid
                          vertical={false}
                          stroke="var(--color-border)"
                          strokeDasharray="3 3"
                        />
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "var(--color-muted-foreground)", fontWeight: 500 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "var(--color-muted-foreground)", fontWeight: 500 }}
                          tickFormatter={(value: number) => `${Math.round(value / 10000).toLocaleString()}만`}
                        />
                        <Tooltip
                          formatter={(value) => formatKrw(Number(value))}
                          contentStyle={{
                            borderRadius: "12px",
                            border: "1px solid var(--color-border)",
                            background: "var(--color-card)",
                            color: "var(--color-card-foreground)",
                          }}
                        />
                        <Bar dataKey="totalSpent" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
            </CardContent>
        </Card>
      </div>

      {/* Detailed List */}
      <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
        <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">상세 지출 내역 ({transactions.length}건)</CardTitle>
            <CardDescription className="text-xs sm:text-sm">{selectedMonth} 월간 거래 내역</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            {transactions.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-zinc-500">해당 기간에 거래 내역이 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 sm:p-4 rounded-lg border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                        <div className="flex items-center gap-2 sm:gap-4">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 shrink-0 flex items-center justify-center text-xs font-medium text-zinc-600 dark:text-zinc-400">
                              {tx.category?.[0]?.toUpperCase() || '거'}
                            </div>
                            <div className="min-w-0">
                        <p className="font-medium text-sm sm:text-base text-zinc-900 dark:text-zinc-100 truncate">{tx.merchantName}</p>
                        <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400">{new Date(tx.transactionAt).toLocaleString('ko-KR')}</p>
                                <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400">{tx.category}</p>
                            </div>
                        </div>
                        <div className="text-right shrink-0 ml-2">
                      <p className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">-{(tx.paidAmount || 0).toLocaleString()}원</p>
                      <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400">{tx.paymentMethodName}</p>
                        </div>
                    </div>
                ))}
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}

