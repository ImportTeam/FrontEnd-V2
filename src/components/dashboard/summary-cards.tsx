import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, CreditCard } from "lucide-react";

export function SummaryCards() {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-black text-white border-zinc-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-zinc-300">이번 달 총 절약 금액</CardTitle>
                    <DollarSign className="h-4 w-4 text-zinc-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold mb-2">₩ 45,231</div>
                    <p className="text-xs text-zinc-400 flex items-center">
                        <span className="text-green-500 font-medium mr-2">↗ +12.5%</span> 지난달 대비
                    </p>
                </CardContent>
            </Card>
            <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-zinc-600">가장 많이 쓴 쇼핑몰</CardTitle>
                    <ShoppingBag className="h-4 w-4 text-zinc-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold mb-2">쿠팡</div>
                    <p className="text-xs text-zinc-500">
                        총 지출의 34% 차지
                    </p>
                </CardContent>
            </Card>
            <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-zinc-600">최다 사용 결제수단</CardTitle>
                    <CreditCard className="h-4 w-4 text-zinc-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold mb-2">신한 Deep</div>
                    <p className="text-xs text-zinc-500">
                        이번 달 24회 사용
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
