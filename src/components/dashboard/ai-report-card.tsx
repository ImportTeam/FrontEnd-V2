import { Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AIReportCard() {
    return (
        <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-300">AI 추천 혜택</CardTitle>
                <Sparkles className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
                <div className="mt-2">
                    <h3 className="text-2xl font-bold mb-1">네이버페이</h3>
                    <p className="text-sm text-zinc-400">
                        다음 결제 시 2,000P 추가 적립 가능
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
