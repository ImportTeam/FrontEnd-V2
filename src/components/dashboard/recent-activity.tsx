import { AlertCircle, ShoppingBag, Sparkles } from "lucide-react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import type { RecentTransactionItem } from "@/lib/api/types";

interface RecentActivityProps {
  items?: RecentTransactionItem[];
  error?: string | null;
}

function formatKrw(value: number) {
  return `${(value ?? 0).toLocaleString()}원`;
}

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return "-";
  }
}

export function RecentActivity({ items = [], error }: RecentActivityProps) {
  // Error state
  if (error) {
    return (
      <DashboardCard>
        <CardHeader>
          <CardTitle className="text-lg font-bold">최근 이용 사이트별 결제수단</CardTitle>
          <CardDescription className="text-sm">최근 결제 내역을 불러오지 못했습니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
            <AlertCircle className="h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm">{error}</p>
          </div>
        </CardContent>
      </DashboardCard>
    );
  }

  // Empty state
  if (!items || items.length === 0) {
    return (
      <DashboardCard>
        <CardHeader>
          <CardTitle className="text-lg font-bold">최근 이용 사이트별 결제수단</CardTitle>
          <CardDescription className="text-sm">최근 결제 내역이 없습니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
            <AlertCircle className="h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm">최근 결제 내역이 없습니다.</p>
          </div>
        </CardContent>
      </DashboardCard>
    );
  }

  // Success state
  return (
    <DashboardCard>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          <CardTitle className="text-lg font-bold">최근 이용 사이트별 결제수단</CardTitle>
        </div>
        <CardDescription className="text-sm">최근 결제 내역과 사용된 결제수단입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {items.map((tx, index) => (
            <div key={`${tx.merchantName}_${tx.paidAt}_${index}`}>
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors shrink-0">
                    <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <p className="text-sm font-medium leading-none text-foreground truncate">
                      {tx.merchantName || "거래"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(tx.paidAt)}
                    </p>
                  </div>
                </div>
                <div className="text-right space-y-1 shrink-0">
                  <p className="text-sm font-bold text-foreground">
                    {formatKrw(tx.paidAmount)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {tx.paymentMethodName || "결제 수단"}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    {formatKrw(tx.discountOrRewardAmount)}
                  </p>
                </div>
              </div>
              {index < items.length - 1 ? <div className="h-px w-full bg-border my-6" /> : null}
            </div>
          ))}
        </div>
      </CardContent>
    </DashboardCard>
  );
}
