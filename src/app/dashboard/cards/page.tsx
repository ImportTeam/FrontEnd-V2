"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, CreditCard, MoreHorizontal } from "lucide-react";

export default function CardsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            결제수단 관리
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            등록된 카드와 계좌를 관리하고 혜택을 확인하세요.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          카드 추가하기
        </Button>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Card Item 1 */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
                <MoreHorizontal className="h-4 w-4" />
             </Button>
          </div>
          <CardHeader className="pb-2">
            <div className="w-12 h-8 rounded bg-blue-600 mb-4" />
            <CardTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-100">신한 Deep Dream</CardTitle>
            <CardDescription>신용카드</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                <div className="flex justify-between text-sm">
                    <span className="text-zinc-500 dark:text-zinc-400">이번 달 실적</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">350,000원 / 500,000원</span>
                </div>
                <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-[70%]" />
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    다음 구간 혜택까지 150,000원 남았습니다.
                </p>
            </div>
          </CardContent>
        </Card>

        {/* Card Item 2 */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
                <MoreHorizontal className="h-4 w-4" />
             </Button>
          </div>
          <CardHeader className="pb-2">
            <div className="w-12 h-8 rounded bg-green-500 mb-4" />
            <CardTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-100">네이버페이 포인트</CardTitle>
            <CardDescription>선불전자지급수단</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                <div className="flex justify-between text-sm">
                    <span className="text-zinc-500 dark:text-zinc-400">보유 포인트</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">12,500 P</span>
                </div>
                <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[100%]" />
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    자동 충전 설정이 켜져있습니다.
                </p>
            </div>
          </CardContent>
        </Card>

        {/* Add New Placeholder */}
        <button className="flex flex-col items-center justify-center gap-4 h-full min-h-[250px] rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
            <div className="h-12 w-12 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                <Plus className="h-6 w-6" />
            </div>
            <span className="font-medium">새 결제수단 연결</span>
        </button>
      </div>
    </div>
  );
}
