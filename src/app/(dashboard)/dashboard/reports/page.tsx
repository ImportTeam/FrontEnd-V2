"use client";

import { Calendar, Download, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// eslint-disable-next-line no-restricted-syntax
export default function ReportsPage() {
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
          <Button variant="outline" size="sm" className="text-xs sm:text-sm bg-white dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300">
            <Calendar className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">2025년 11월</span>
            <span className="sm:hidden">11월</span>
          </Button>
          <Button variant="outline" size="sm" className="text-xs sm:text-sm bg-white dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300">
            <Filter className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            필터
          </Button>
          <Button variant="outline" size="sm" className="text-xs sm:text-sm bg-white dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300">
            <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">내보내기</span>
            <span className="sm:hidden">저장</span>
          </Button>
        </div>
      </div>

      {/* Main Analysis Section */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">카테고리별 지출</CardTitle>
                <CardDescription className="text-xs sm:text-sm">어디에 가장 많이 썼을까요?</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="h-[200px] sm:h-[250px] md:h-[300px] flex items-center justify-center border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
                    <p className="text-zinc-400 text-xs sm:text-sm">Pie Chart Placeholder</p>
                </div>
            </CardContent>
        </Card>

        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">월별 지출 추이</CardTitle>
                <CardDescription className="text-xs sm:text-sm">지난 6개월간의 변화입니다.</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="h-[200px] sm:h-[250px] md:h-[300px] flex items-center justify-center border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
                    <p className="text-zinc-400 text-xs sm:text-sm">Bar Chart Placeholder</p>
                </div>
            </CardContent>
        </Card>
      </div>

      {/* Detailed List */}
      <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
        <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">상세 지출 내역</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            <div className="space-y-2 sm:space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 sm:p-4 rounded-lg border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                        <div className="flex items-center gap-2 sm:gap-4">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 shrink-0" />
                            <div className="min-w-0">
                                <p className="font-medium text-sm sm:text-base text-zinc-900 dark:text-zinc-100 truncate">거래 내역 {i}</p>
                                <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400">2025.11.{20-i}</p>
                            </div>
                        </div>
                        <div className="text-right shrink-0 ml-2">
                            <p className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">-{(i * 15000).toLocaleString()}원</p>
                            <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400">신한카드</p>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

