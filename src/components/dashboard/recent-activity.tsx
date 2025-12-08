import { ShoppingBag } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
    {
        store: "쿠팡",
        date: "2025.11.19",
        card: "신한 Deep Dream",
        benefit: "1,500원 적립",
        amount: "45,000원",
    },
    {
        store: "배달의민족",
        date: "2025.11.18",
        card: "현대카드 ZERO",
        benefit: "280원 할인",
        amount: "28,000원",
    },
    {
        store: "무신사",
        date: "2025.11.15",
        card: "네이버페이",
        benefit: "1,200원 적립",
        amount: "89,000원",
    },
];

export function RecentActivity() {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>최근 이용 사이트별 결제수단</CardTitle>
                <p className="text-sm text-muted-foreground">
                    최근 30일간의 결제 내역과 적용된 혜택입니다.
                </p>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {activities.map((activity, index) => (
                        <div key={index} className="flex items-center">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">{activity.store}</p>
                                <p className="text-xs text-muted-foreground">{activity.date}</p>
                            </div>
                            <div className="ml-auto text-right">
                                <p className="text-sm font-medium">{activity.amount}</p>
                                <div className="flex flex-col items-end">
                                    <p className="text-xs text-muted-foreground">{activity.card}</p>
                                    <p className="text-xs font-medium text-blue-600">{activity.benefit}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
