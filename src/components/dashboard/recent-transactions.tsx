"use client";

import { ShoppingBag, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";


import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { api } from "@/lib/api/client";

import type { TransactionData } from "@/lib/api/types";

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const txList = await api.transactions.list();
        console.warn("[TRANSACTIONS] Full list:", txList);
        // Take only recent 3 for the dashboard widget
        const recentTx = txList.slice(0, 3);
        console.warn("[TRANSACTIONS] Recent 3:", recentTx);
        setTransactions(recentTx);
      } catch (error) {
        console.error("Failed to load transactions:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <DashboardCard>
      <CardHeader>
        <CardTitle className="text-lg font-bold">최근 이용 사이트별 결제수단</CardTitle>
        <CardDescription className="text-sm">최근 30일간의 결제 내역과 적용된 혜택입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
            {loading ? (
                 // Loading Skeletons
                 [1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4 w-full">
                            <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                            <div className="space-y-1 w-full max-w-[150px]">
                                <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                                <div className="h-3 w-1/2 bg-muted animate-pulse rounded" />
                            </div>
                        </div>
                    </div>
                 ))
            ) : (
                transactions.length > 0 ? (
                    transactions.map((tx, index) => (
                        <div key={tx.id || index}>
                            <div className="flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                                        <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none text-foreground">{tx.merchant}</p>
                                        <p className="text-xs text-muted-foreground">{tx.date}</p>
                                    </div>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="text-sm font-bold text-foreground">{tx.amount}</p>
                                    <p className="text-xs text-muted-foreground">{tx.cardName}</p>
                                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{tx.benefit}</p>
                                </div>
                            </div>
                            {index < transactions.length - 1 && <div className="h-px w-full bg-border my-6" />}
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                        <AlertCircle className="h-8 w-8 mb-2 opacity-50" />
                        <p className="text-sm">최근 결제 내역이 없습니다.</p>
                    </div>
                )
            )}
        </div>
      </CardContent>
    </DashboardCard>
  );
}

