import { SummaryCards } from "@/components/dashboard/summary-cards";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            안녕하세요, 김픽셀님! 👋
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            오늘도 스마트한 소비 생활을 응원합니다.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white hover:bg-zinc-50 text-zinc-700 border-zinc-200">
            <Download className="mr-2 h-4 w-4" />
            리포트 다운로드
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            새 결제수단 추가
          </Button>
        </div>
      </div>

      {/* Row 1: Summary Cards (KPIs) */}
      <SummaryCards />

      {/* Row 2: Charts & Top Recommendations */}
      <DashboardCharts />

      {/* Row 3: Recent Transactions */}
      <RecentTransactions />
    </div>
  );
}
