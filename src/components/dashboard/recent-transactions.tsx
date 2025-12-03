"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";

export function RecentTransactions() {
  return (
    <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-100">최근 이용 사이트별 결제수단</CardTitle>
        <CardDescription className="text-zinc-500 dark:text-zinc-400">최근 30일간의 결제 내역과 적용된 혜택입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
            {/* Transaction Item 1 */}
            <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                        <ShoppingBag className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-100">쿠팡</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">2025.11.19</p>
                    </div>
                </div>
                <div className="text-right space-y-1">
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">45,000원</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">신한 Deep Dream</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">1,500원 적립</p>
                </div>
            </div>
            
            {/* Divider */}
            <div className="h-[1px] w-full bg-zinc-100 dark:bg-zinc-800" />

             {/* Transaction Item 2 */}
             <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                        <ShoppingBag className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-100">배달의민족</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">2025.11.18</p>
                    </div>
                </div>
                <div className="text-right space-y-1">
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">28,000원</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">현대카드 ZERO</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">200원 할인</p>
                </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] w-full bg-zinc-100 dark:bg-zinc-800" />

             {/* Transaction Item 3 */}
             <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                        <ShoppingBag className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-100">스타벅스</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">2025.11.17</p>
                    </div>
                </div>
                <div className="text-right space-y-1">
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">9,800원</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">삼성카드 taptap O</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">50% 할인</p>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
