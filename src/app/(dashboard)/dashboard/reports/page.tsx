"use client";

import { Calendar, Download, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// eslint-disable-next-line no-restricted-syntax
export default function ReportsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            소비 분석 리포트
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            월별 소비 패턴과 절약 내역을 상세하게 분석해드립니다.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300">
            <Calendar className="mr-2 h-4 w-4" />
            2025년 11월
          </Button>
          <Button variant="outline" className="bg-white dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300">
            <Filter className="mr-2 h-4 w-4" />
            필터
          </Button>
          <Button variant="outline" className="bg-white dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300">
            <Download className="mr-2 h-4 w-4" />
            내보내기
          </Button>
        </div>
      </div>

      {/* Main Analysis Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-100">카테고리별 지출</CardTitle>
                <CardDescription>어디에 가장 많이 썼을까요?</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
                    <p className="text-zinc-400 text-sm">Pie Chart Placeholder</p>
                </div>
            </CardContent>
        </Card>

        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-100">월별 지출 추이</CardTitle>
                <CardDescription>지난 6개월간의 변화입니다.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
                    <p className="text-zinc-400 text-sm">Bar Chart Placeholder</p>
                </div>
            </CardContent>
        </Card>
      </div>

      {/* Detailed List */}
      <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
        <CardHeader>
            <CardTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-100">상세 지출 내역</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800" />
                            <div>
                                <p className="font-medium text-zinc-900 dark:text-zinc-100">거래 내역 {i}</p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">2025.11.{20-i}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-zinc-900 dark:text-zinc-100">-{i * 15000}원</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">신한카드</p>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
