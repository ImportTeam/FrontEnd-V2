import { ShoppingBag, AlertCircle } from "lucide-react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface RecentTransactionsProps {
  transactionsData?: unknown[];
}

export function RecentTransactions({ transactionsData = [] }: RecentTransactionsProps) {
  const transactions = transactionsData || [];

  return (
    <DashboardCard>
      <CardHeader>
        <CardTitle className="text-lg font-bold">최근 이용 사이트별 결제수단</CardTitle>
        <CardDescription className="text-sm">최근 30일간의 결제 내역과 적용된 혜택입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
              <AlertCircle className="h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">최근 결제 내역이 없습니다.</p>
            </div>
          ) : (
            transactions.map((tx, index) => {
              const txData = tx as Record<string, string | number>;
              return (
                <div key={txData.id || index}>
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                        <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none text-foreground">
                          {(txData.merchant as string) || "거래"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(txData.date as string) || "미정"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-bold text-foreground">
                        {(txData.amount as string) || "0"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(txData.cardName as string) || "카드"}
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        {(txData.benefit as string) || "-"}
                      </p>
                    </div>
                  </div>
                  {index < transactions.length - 1 && (
                    <div className="h-px w-full bg-border my-6" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </DashboardCard>
  );
}

