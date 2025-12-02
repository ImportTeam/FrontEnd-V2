"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";

export function RecentTransactions() {
  return (
    <Card className="bg-white border-zinc-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-zinc-900">최근 이용 사이트별 결제수단</CardTitle>
        <CardDescription>최근 30일간의 결제 내역과 적용된 혜택입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
            {/* Transaction Item 1 */}
            <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-200 transition-colors">
                        <ShoppingBag className="h-5 w-5 text-zinc-500" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none text-zinc-900">쿠팡</p>
                        <p className="text-xs text-zinc-500">2025.11.19</p>
                    </div>
                </div>
                <div className="text-right space-y-1">
                    <p className="text-sm font-bold text-zinc-900">45,000원</p>
                    <p className="text-xs text-zinc-500">신한 Deep Dream</p>
                    <p className="text-xs text-blue-600 font-medium">1,500원 적립</p>
                </div>
            </div>
            
            {/* Divider */}
            <div className="h-[1px] w-full bg-zinc-100" />

             {/* Transaction Item 2 */}
             <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-200 transition-colors">
                        <ShoppingBag className="h-5 w-5 text-zinc-500" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none text-zinc-900">배달의민족</p>
                        <p className="text-xs text-zinc-500">2025.11.18</p>
                    </div>
                </div>
                <div className="text-right space-y-1">
                    <p className="text-sm font-bold text-zinc-900">28,000원</p>
                    <p className="text-xs text-zinc-500">현대카드 ZERO</p>
                    <p className="text-xs text-blue-600 font-medium">200원 할인</p>
                </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] w-full bg-zinc-100" />

             {/* Transaction Item 3 */}
             <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-200 transition-colors">
                        <ShoppingBag className="h-5 w-5 text-zinc-500" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none text-zinc-900">스타벅스</p>
                        <p className="text-xs text-zinc-500">2025.11.17</p>
                    </div>
                </div>
                <div className="text-right space-y-1">
                    <p className="text-sm font-bold text-zinc-900">9,800원</p>
                    <p className="text-xs text-zinc-500">삼성카드 taptap O</p>
                    <p className="text-xs text-blue-600 font-medium">50% 할인</p>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
