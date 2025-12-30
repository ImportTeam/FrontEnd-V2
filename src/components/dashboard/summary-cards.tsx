"use client";

import { ArrowRight, CreditCard, ShoppingBag, Wallet } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardsProps {
  summaryData?: Record<string, unknown> | null;
}

/**
 * Safely extract string values from summary data
 */
function getSafeString(value: unknown, fallback: string): string {
  if (typeof value === 'string' && value.length > 0) {
    return value;
  }
  return fallback;
}

/**
 * Safely extract numeric values from summary data
 */
function getSafeNumber(value: unknown, fallback: number = 0): number {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? fallback : parsed;
  }
  return fallback;
}

export function SummaryCards({ summaryData }: SummaryCardsProps) {
  // Show skeletons while loading or if data is null
  if (!summaryData) {
    return (
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="h-40 animate-pulse bg-muted/50 border-zinc-200 dark:border-zinc-800" />
        ))}
      </div>
    );
  }

  // Safe value extraction with fallbacks
  const totalSavings = getSafeString(summaryData.totalSavings, "0원");
  const monthlySpending = getSafeString(summaryData.monthlySpending, "0원");
  const monthlySpendingChange = getSafeString(summaryData.totalSavingsChange, "0%");
  const topCard = getSafeString(summaryData.topPaymentMethod, "데이터 없음");
  const recentTransactions = getSafeNumber(summaryData.topPaymentMethodCount, 0);

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {/* Card 1: Total Savings (Black Theme) */}
      <Card className="bg-zinc-900 text-white border-zinc-800 shadow-lg hover:shadow-xl transition-shadow dark:bg-zinc-950 dark:border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-semibold text-zinc-300">
            이번 달 총 절약 금액
          </CardTitle>
          <div className="h-4 w-4 text-zinc-600 dark:text-zinc-300 font-serif italic">$</div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl sm:text-4xl font-bold truncate">{totalSavings}</div>
          <p className="text-xs text-emerald-400 flex items-center mt-2">
            <ArrowRight className="h-3 w-3 mr-1 flex-shrink-0" />
            <span>{monthlySpendingChange}</span>
            <span className="text-zinc-600 dark:text-zinc-300 ml-1">지난달 대비</span>
          </p>
        </CardContent>
      </Card>

      {/* Card 2: Monthly Spending */}
      <Card className="bg-white border-zinc-200 shadow-sm hover:shadow-md transition-shadow dark:bg-zinc-900 dark:border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            월간 지출액
          </CardTitle>
          <ShoppingBag className="h-4 w-4 text-zinc-600 dark:text-zinc-300 flex-shrink-0" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 truncate">
            {monthlySpending}
          </div>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-2">
            분석 중
          </p>
        </CardContent>
      </Card>

      {/* Card 3: Most Used Card */}
      <Card className="bg-white border-zinc-200 shadow-sm hover:shadow-md transition-shadow dark:bg-zinc-900 dark:border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            최다 사용 결제수단
          </CardTitle>
          <CreditCard className="h-4 w-4 text-zinc-600 dark:text-zinc-300 flex-shrink-0" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 truncate">
            {topCard}
          </div>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-2">
            분석 중
          </p>
        </CardContent>
      </Card>

      {/* Card 4: Recent Transactions Count */}
      <Card className="bg-white border-zinc-200 shadow-sm hover:shadow-md transition-shadow dark:bg-zinc-900 dark:border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            최근 거래
          </CardTitle>
          <Wallet className="h-4 w-4 text-yellow-500 flex-shrink-0" />
        </CardHeader>
        <CardContent>
          <div className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {recentTransactions.toString()}건
          </div>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-2">
            분석 중
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
