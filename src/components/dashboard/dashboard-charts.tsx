"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";



import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { api } from "@/lib/api/client";

import type { RecommendationData, MonthlySavingsChartData } from "@/lib/api/types";


export function DashboardCharts() {
  const [recommendations, setRecommendations] = useState<RecommendationData[]>([]);
  const [chartData, setChartData] = useState<MonthlySavingsChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [topRecs, monthlyChart] = await Promise.all([
          api.recommendations.getTop(3),
          api.dashboard.getMonthlySavingsChart(),
        ]);
        setRecommendations(topRecs);
        setChartData(monthlyChart);
      } catch (error) {
        console.error("Failed to load recommendations:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-7">
      {/* Chart Section (Left 4/7) */}
      <DashboardCard className="col-span-full lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-lg font-bold">월간 절약 변화 추이</CardTitle>
          <CardDescription className="text-sm">AI가 분석한 지난 6개월간의 혜택 적용 내역입니다.</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[300px] w-full">
            {loading ? (
              <div className="h-full w-full bg-muted/50 animate-pulse rounded-xl" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: "#71717a" }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: "#71717a" }}
                    tickFormatter={(value) => `${(value / 10000).toLocaleString()}만`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    formatter={(value?: number) => [value ? `${value.toLocaleString()}원` : "0원", "절약 금액"]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="savings" 
                    stroke="#2563eb" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorSavings)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
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
            ) : (
                recommendations.map((item, index) => (
                    <div 
                        key={item.id} 
                        className={`flex items-center p-4 rounded-xl transition-colors ${
                            index === 0 ? "bg-muted/50 hover:bg-muted" : "bg-background hover:bg-muted/50"
                        }`}
                    >
                        <div className={`flex h-9 w-9 items-center justify-center rounded-full font-bold text-sm mr-4 ${
                            index === 0 
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" 
                            : "bg-muted text-zinc-700 dark:text-zinc-300"
                        }`}>
                            {item.rank}
                        </div>
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none text-foreground">{item.cardName}</p>
                            <p className="text-xs text-zinc-700 dark:text-zinc-300">{item.benefit}</p>
                        </div>
                        {!!item.isRecommended && (
                            <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50">추천</Badge>
                        )}
                    </div>
                ))
            )}
            
            {!loading && recommendations.length === 0 && (
                 <div className="text-center py-8 text-muted-foreground text-sm">
                    추천 데이터가 없습니다.
                 </div>
            )}
          </div>
        </CardContent>
      </DashboardCard>
    </div>
  );
}

