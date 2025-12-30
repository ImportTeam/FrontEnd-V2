import { Sparkles } from "lucide-react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { DashboardSavingsChartClient } from "./dashboard-savings-chart-client";



interface DashboardChartsProps {
  chartData?: unknown[];
  recommendations?: unknown[];
  loading?: boolean;
}

export function DashboardCharts({
  chartData = [],
  recommendations = [],
  loading = false,
}: DashboardChartsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-7">
      {/* Chart Section (Left 4/7) */}
      <DashboardCard className="col-span-full lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-lg font-bold">월간 절약 변화 추이</CardTitle>
          <CardDescription className="text-sm">AI가 분석한 지난 6개월간의 혜택 적용 내역입니다.</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-72 w-full min-h-72">
            <DashboardSavingsChartClient chartData={chartData} loading={loading} />
          </div>
        </CardContent>
      </DashboardCard>

      {/* Top 3 List Section (Right 3/7) */}
      <DashboardCard className="col-span-full lg:col-span-3">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400" />
            <CardTitle className="text-lg font-bold">AI 추천 결제 수단 TOP 3</CardTitle>
          </div>
          <CardDescription className="text-sm">사용자의 소비 패턴을 분석하여 추천합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
               // Loading Skeletons
               [1, 2, 3].map((i) => (
                <div key={i} className="h-16 rounded-xl bg-muted/50 animate-pulse" />
               ))
            ) : recommendations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                추천 데이터가 없습니다.
              </div>
            ) : (
              recommendations.map((item: unknown, index: number) => {
                const rec = item as Record<string, unknown>;
                return (
                  <div
                    key={String((rec.id as string) || index)}
                    className={`flex items-center p-4 rounded-xl transition-colors ${
                      index === 0 ? "bg-muted/50 hover:bg-muted" : "bg-background hover:bg-muted/50"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full font-bold text-sm mr-4 ${
                        index === 0
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "bg-muted text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      {String((rec.rank as number) || index + 1)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none text-foreground">
                        {String((rec.cardName as string) || "카드")}
                      </p>
                      <p className="text-xs text-zinc-700 dark:text-zinc-300">
                        {String((rec.benefit as string) || "혜택")}
                      </p>
                    </div>
                    {!!(rec.isRecommended as boolean) && (
                      <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50">
                        추천
                      </Badge>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </DashboardCard>
    </div>
  );
}

