import { Download, Plus, Sparkles } from "lucide-react";

import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { Button } from "@/components/ui/button";


// eslint-disable-next-line no-restricted-syntax
export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-[clamp(1.875rem,1rem+1.5vw,2.25rem)] font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                안녕하세요, 김픽셀님!
            </h1>
            <span className="text-2xl">👋</span>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            오늘도 스마트한 소비 생활을 응원합니다.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white hover:bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800">
            <Download className="mr-2 h-4 w-4" />
            리포트 다운로드
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
            <Plus className="mr-2 h-4 w-4" />
            새 결제수단 추가
          </Button>
        </div>
      </div>

      <h2 className="sr-only">요약 카드</h2>
      {/* Row 1: Summary Cards (KPIs) */}
      <SummaryCards />

      <h2 className="sr-only">차트와 추천 리스트</h2>
      {/* Row 2: Charts & Top Recommendations */}
      <DashboardCharts />

      <h2 className="sr-only">최근 결제 내역</h2>
      {/* Row 3: Recent Transactions */}
      <RecentTransactions />
    </div>
  );
}
