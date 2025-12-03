"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export function DashboardCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-7">
      {/* Chart Section (Left 4/7) */}
      <Card className="col-span-4 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-100">월간 절약 변화 추이</CardTitle>
          <CardDescription className="text-zinc-500 dark:text-zinc-400">AI가 분석한 지난 6개월간의 혜택 적용 내역입니다.</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          {/* Empty State Placeholder for Chart */}
          <div className="h-[300px] w-full rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500">
            <div className="w-16 h-16 mb-4 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-zinc-300 dark:text-zinc-600" />
            </div>
            <p className="font-medium text-zinc-600 dark:text-zinc-400">차트 영역 (Recharts 연동 필요)</p>
            <p className="text-sm mt-2 text-zinc-500 dark:text-zinc-500">데이터가 수집되면 이곳에 그래프가 표시됩니다.</p>
          </div>
        </CardContent>
      </Card>

      {/* Top 3 List Section (Right 3/7) */}
      <Card className="col-span-3 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400" />
            <CardTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-100">AI 추천 결제 수단 TOP 3</CardTitle>
          </div>
          <CardDescription className="text-zinc-500 dark:text-zinc-400">사용자의 소비 패턴을 분석하여 추천합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Item 1 */}
            <div className="flex items-center p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/30 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm mr-4">
                    1
                </div>
                <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-100">현대카드 ZERO Edition2</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">모든 가맹점 0.7% 할인</p>
                </div>
                <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50">추천</Badge>
            </div>

            {/* Item 2 */}
            <div className="flex items-center p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/20 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold text-sm mr-4">
                    2
                </div>
                <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-100">삼성카드 taptap O</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">쇼핑 7% 할인</p>
                </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/20 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold text-sm mr-4">
                    3
                </div>
                <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-100">신한카드 Mr.Life</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">공과금 10% 할인</p>
                </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
