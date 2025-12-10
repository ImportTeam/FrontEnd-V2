import { ShoppingBag } from "lucide-react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function RecentTransactions() {
  return (
    <DashboardCard>
      <CardHeader>
        <CardTitle className="text-lg font-bold">최근 이용 사이트별 결제수단</CardTitle>
        <CardDescription className="text-sm">최근 30일간의 결제 내역과 적용된 혜택입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
            {/* Transaction Item 1 */}
            <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                        <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none text-foreground">쿠팡</p>
                        <p className="text-xs text-muted-foreground">2025.11.19</p>
                    </div>
                </div>
                <div className="text-right space-y-1">
                    <p className="text-sm font-bold text-foreground">45,000원</p>
                    <p className="text-xs text-muted-foreground">신한 Deep Dream</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">1,500원 적립</p>
                </div>
            </div>
            
            {/* Divider */}
            <div className="h-px w-full bg-border" />

             {/* Transaction Item 2 */}
             <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                        <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none text-foreground">배달의민족</p>
                        <p className="text-xs text-muted-foreground">2025.11.18</p>
                    </div>
                </div>
                <div className="text-right space-y-1">
                    <p className="text-sm font-bold text-foreground">28,000원</p>
                    <p className="text-xs text-muted-foreground">현대카드 ZERO</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">200원 할인</p>
                </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-border" />

             {/* Transaction Item 3 */}
             <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                        <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none text-foreground">스타벅스</p>
                        <p className="text-xs text-muted-foreground">2025.11.17</p>
                    </div>
                </div>
                <div className="text-right space-y-1">
                    <p className="text-sm font-bold text-foreground">9,800원</p>
                    <p className="text-xs text-muted-foreground">삼성카드 taptap O</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">50% 할인</p>
                </div>
            </div>
        </div>
      </CardContent>
    </DashboardCard>
  );
}

