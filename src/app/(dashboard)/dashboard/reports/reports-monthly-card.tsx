import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatKrw } from "./reports-utils";

type MonthlyChartDatum = { month: string; totalSpent: number };

type ReportsMonthlyCardProps = {
  isChartsLoading: boolean;
  monthlyData: MonthlyChartDatum[];
};

export function ReportsMonthlyCard(props: ReportsMonthlyCardProps) {
  const { isChartsLoading, monthlyData } = props;

  return (
    <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
          월별 지출 추이
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          지난 6개월간의 변화입니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
        <div className="h-50 sm:h-62.5 md:h-75 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
          {isChartsLoading ? (
            <div className="h-full w-full bg-muted/50 animate-pulse rounded-xl" />
          ) : monthlyData.length === 0 ? (
            <div className="h-full w-full flex items-center justify-center border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-xl">
              <span className="text-zinc-400 text-xs sm:text-sm">
                차트 데이터가 없습니다.
              </span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%" minHeight={260}>
              <BarChart
                data={monthlyData.slice(-6)}
                margin={{ top: 12, right: 12, left: -8, bottom: 4 }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="var(--color-border)"
                  strokeDasharray="3 3"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fill: "var(--color-muted-foreground)",
                    fontWeight: 500,
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fill: "var(--color-muted-foreground)",
                    fontWeight: 500,
                  }}
                  tickFormatter={(value: number) =>
                    `${Math.round(value / 10000).toLocaleString()}만`
                  }
                />
                <Tooltip
                  formatter={(value) => formatKrw(Number(value))}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-card)",
                    color: "var(--color-card-foreground)",
                  }}
                />
                <Bar
                  dataKey="totalSpent"
                  fill="var(--color-primary)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
