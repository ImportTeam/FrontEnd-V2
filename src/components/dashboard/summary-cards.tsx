"use client";

import { ArrowRight, CreditCard, ShoppingBag, Wallet } from "lucide-react";
import { useEffect, useState } from "react";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api/client";

import type { SummaryData } from "@/lib/api/types";

export function SummaryCards() {
  const [data, setData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const summary = await api.dashboard.getSummary();
        setData(summary);
      } catch (error) {
        console.error("Failed to load dashboard summary:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="h-40 animate-pulse bg-muted/50 border-zinc-200 dark:border-zinc-800" />
        ))}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {/* Card 1: Total Savings (Black Theme) */}
      <Card className="bg-zinc-900 text-white border-zinc-800 shadow-lg dark:bg-zinc-950 dark:border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-semibold text-zinc-300">
            이번 달 총 절약 금액
          </CardTitle>
          <div className="h-4 w-4 text-zinc-600 dark:text-zinc-300 font-serif italic">$</div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl sm:text-4xl font-bold">{data.totalSavings}</div>
          <p className="text-xs text-emerald-400 flex items-center mt-1">
            <ArrowRight className="h-3 w-3 mr-1" />
            {data.totalSavingsChange} <span className="text-zinc-600 dark:text-zinc-300 ml-1">지난달 대비</span>
          </p>
        </CardContent>
      </Card>

      {/* Card 2: Top Spending Category */}
      <Card className="bg-white border-zinc-200 shadow-sm hover:shadow-md transition-shadow dark:bg-zinc-900 dark:border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            가장 많이 쓴 곳
          </CardTitle>
          <ShoppingBag className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 truncate">
            {data.topCategory || "분석 중"}
          </div>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-1">
            {data.monthlySpending}
          </p>
        </CardContent>
      </Card>

      {/* Card 3: Most Used Card */}
      <Card className="bg-white border-zinc-200 shadow-sm hover:shadow-md transition-shadow dark:bg-zinc-900 dark:border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            최다 사용 결제수단
          </CardTitle>
          <CreditCard className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 truncate">
            {data.topPaymentMethod || "없음"}
          </div>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-1">
            {data.topPaymentMethodCount && typeof data.topPaymentMethodCount === 'number' 
              ? `${data.topPaymentMethodCount.toLocaleString()}원` 
              : "분석 중"}
          </p>
        </CardContent>
      </Card>

      {/* Card 4: AI Recommendation */}
      <Card className="bg-white border-zinc-200 shadow-sm hover:shadow-md transition-shadow dark:bg-zinc-900 dark:border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            AI 추천 혜택
          </CardTitle>
          <Wallet className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2">
            {data.aiBenefit || "분석 중"}
          </div>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-1 line-clamp-2">
            {data.aiBenefitAmount || "분석 중"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
