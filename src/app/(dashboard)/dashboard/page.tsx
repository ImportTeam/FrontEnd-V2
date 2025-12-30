import { Download, Plus, Sparkles } from "lucide-react";

import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { Button } from "@/components/ui/button";

import {
  loadDashboardChartsData,
  loadRecentTransactionsData,
  loadSummaryCardsData,
} from "./data-actions";

// eslint-disable-next-line no-restricted-syntax
export default async function DashboardPage() {
  // Load all data server-side
  const [chartsData, summaryData, transactionsData] = await Promise.all([
    loadDashboardChartsData(),
    loadSummaryCardsData(),
    loadRecentTransactionsData(10),
  ]);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                대시보드
            </h1>
            <span className="text-2xl sm:text-3xl">👋</span>
          </div>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span className="hidden sm:inline">오늘도 스마트한 소비 생활을 응원합니다.</span>
            <span className="sm:hidden">스마트한 소비 생활 응원합니다!</span>
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <Button variant="outline" size="sm" className="text-xs sm:text-sm bg-white hover:bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800">
            <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">리포트 다운로드</span>
            <span className="sm:hidden">리포트</span>
          </Button>
          <Button size="sm" className="text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
            <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">새 결제수단 추가</span>
            <span className="sm:hidden">추가</span>
          </Button>
        </div>
      </div>

      <h2 className="sr-only">요약 카드</h2>
      {/* Row 1: Summary Cards (KPIs) */}
      <SummaryCards summaryData={summaryData} />

      <h2 className="sr-only">차트와 추천 리스트</h2>
      {/* Row 2: Charts & Top Recommendations */}
      <DashboardCharts
        chartData={chartsData?.chartData}
        recommendations={chartsData?.recommendations}
      />

      <h2 className="sr-only">최근 결제 내역</h2>
      {/* Row 3: Recent Transactions */}
      <RecentTransactions transactionsData={transactionsData} />
    </div>
  );
}
