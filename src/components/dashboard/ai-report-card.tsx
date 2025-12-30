import { Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AIReportCardProps {
  data?: {
    recommendation?: string;
    reasonSummary?: string;
  } | null;
}

export function AIReportCard({ data }: AIReportCardProps) {
  const recommendation = data?.recommendation || "네이버페이";
  const reason = data?.reasonSummary || "다음 결제 시 최대 혜택을 받을 수 있어요.";

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-zinc-300">AI 추천 혜택</CardTitle>
        <Sparkles className="h-4 w-4 text-yellow-400" />
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          <h3 className="text-2xl font-bold mb-1">{recommendation}</h3>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            {reason}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
