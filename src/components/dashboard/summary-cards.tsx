"use client";

import { ArrowRight, CreditCard, ShoppingBag, Sparkles, ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardsProps {
  summaryData?: Record<string, unknown> | null;
  aiBenefits?: { recommendation: string; reasonSummary: string } | null;
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
 * Truncate text with ellipsis
 */
function truncateText(text: string, maxLength: number = 50): { display: string; full: string; isTruncated: boolean } {
  if (text.length <= maxLength) {
    return { display: text, full: text, isTruncated: false };
  }
  return {
    display: text.substring(0, maxLength) + "...",
    full: text,
    isTruncated: true,
  };
}

export function SummaryCards({ summaryData, aiBenefits }: SummaryCardsProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

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

  // AI Benefits data
  const aiBenefitText = aiBenefits?.recommendation || "AI 분석 중입니다";
  const truncatedBenefit = truncateText(aiBenefitText, 50);
  const isExpanded = expandedCard === 'ai-benefit';

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
            <ArrowRight className="h-3 w-3 mr-1 shrink-0" />
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
          <ShoppingBag className="h-4 w-4 text-zinc-600 dark:text-zinc-300 shrink-0" />
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

      {/* Card 3: Top Payment Method */}
      <Card className="bg-white border-zinc-200 shadow-sm hover:shadow-md transition-shadow dark:bg-zinc-900 dark:border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            최다 사용 결제수단
          </CardTitle>
          <CreditCard className="h-4 w-4 text-zinc-600 dark:text-zinc-300 shrink-0" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 truncate">
            {getSafeString(summaryData.topPaymentMethod, "데이터 없음")}
          </div>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-2">
            분석 중
          </p>
        </CardContent>
      </Card>

      {/* Card 4: AI Benefits (New) */}
      <Card className="bg-white border-zinc-200 shadow-sm hover:shadow-md transition-shadow dark:bg-zinc-900 dark:border-zinc-800">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-zinc-600 dark:text-zinc-300 shrink-0" />
            <CardTitle className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-200">
              AI 추천 혜택
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 leading-snug">
            {isExpanded ? truncatedBenefit.full : truncatedBenefit.display}
          </div>

          {truncatedBenefit.isTruncated ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpandedCard(isExpanded ? null : 'ai-benefit')}
              className="w-full h-8 px-2 text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {isExpanded ? '접기' : '펼쳐보기'}
              <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </Button>
          ) : null}

          {aiBenefits?.reasonSummary ? (
            <p className="text-xs text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/40 rounded px-2 py-1.5 border border-zinc-200/60 dark:border-zinc-800/60">
              {aiBenefits.reasonSummary}
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
