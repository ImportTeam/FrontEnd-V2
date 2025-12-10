import { ArrowRight, CreditCard, ShoppingBag, Wallet } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SummaryCards() {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {/* Card 1: Total Savings (Black Theme) */}
      <Card className="bg-zinc-900 text-white border-zinc-800 shadow-lg dark:bg-zinc-950 dark:border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-semibold text-zinc-300">
            이번 달 총 절약 금액
          </CardTitle>
          <div className="h-4 w-4 text-zinc-600 dark:text-zinc-300 font-serif italic">$</div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl sm:text-4xl font-bold">₩ 45,231</div>
          <p className="text-xs text-emerald-400 flex items-center mt-1">
            <ArrowRight className="h-3 w-3 mr-1" />
            +12.5% <span className="text-zinc-600 dark:text-zinc-300 ml-1">지난달 대비</span>
          </p>
        </CardContent>
      </Card>

      {/* Card 2: Top Spending Category */}
      <Card className="bg-white border-zinc-200 shadow-sm hover:shadow-md transition-shadow dark:bg-zinc-900 dark:border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            가장 많이 쓴 쇼핑몰
          </CardTitle>
          <ShoppingBag className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">쿠팡</div>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-1">
            총 지출의 34% 차지
          </p>
        </CardContent>
      </Card>

      {/* Card 3: Most Used Card */}
      <Card className="bg-white border-zinc-200 shadow-sm hover:shadow-md transition-shadow dark:bg-zinc-900 dark:border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            최다 사용 결제수단
          </CardTitle>
          <CreditCard className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">신한 Deep</div>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-1">
            이번 달 24회 사용
          </p>
        </CardContent>
      </Card>

      {/* Card 4: AI Recommendation */}
      <Card className="bg-white border-zinc-200 shadow-sm hover:shadow-md transition-shadow dark:bg-zinc-900 dark:border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            AI 추천 혜택
          </CardTitle>
          <Wallet className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">네이버페이</div>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-1">
            <span className="hidden sm:inline">다음 결제 시 </span>2,000P 적립 가능
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
