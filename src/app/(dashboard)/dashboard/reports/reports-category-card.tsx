import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  colorForLabel,
  formatKrw,
  renderPieCalloutLabel,
  type CategoryChartDatum,
} from "./reports-utils";

type ReportsCategoryCardProps = {
  isChartsLoading: boolean;
  categoryChartData: CategoryChartDatum[];
};

export function ReportsCategoryCard(props: ReportsCategoryCardProps) {
  const { isChartsLoading, categoryChartData } = props;

  return (
    <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
          카테고리별 지출
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          어디에 가장 많이 썼을까요?
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
        <div className="h-50 sm:h-62.5 md:h-75 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
          {isChartsLoading ? (
            <div className="h-full w-full bg-muted/50 animate-pulse rounded-xl" />
          ) : categoryChartData.length === 0 ? (
            <div className="h-full w-full flex items-center justify-center border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-xl">
              <span className="text-zinc-400 text-xs sm:text-sm">
                차트 데이터가 없습니다.
              </span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%" minHeight={260}>
              <PieChart>
                <Tooltip
                  formatter={(value) => formatKrw(Number(value))}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-card)",
                    color: "var(--color-card-foreground)",
                  }}
                  itemStyle={{ color: "var(--color-card-foreground)" }}
                  labelStyle={{ color: "var(--color-muted-foreground)" }}
                  wrapperStyle={{ outline: "none" }}
                />
                <Pie
                  data={categoryChartData}
                  dataKey="value"
                  nameKey="label"
                  innerRadius="55%"
                  outerRadius="80%"
                  paddingAngle={2}
                  stroke="var(--color-card)"
                  strokeWidth={2}
                  // Recharts passes a wider prop shape; we accept a subset and guard.
                  label={
                    renderPieCalloutLabel as unknown as (
                      props: unknown
                    ) => React.ReactNode
                  }
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell
                      key={`${entry.label}-${index}`}
                      fill={colorForLabel(entry.label)}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {categoryChartData.length > 0 ? (
          <div className="mt-4 grid gap-2">
            {categoryChartData.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 text-xs sm:text-sm"
              >
                <span
                  className="mt-1 h-3 w-3 rounded-sm shrink-0"
                  style={{ backgroundColor: colorForLabel(item.label) }}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate text-zinc-700 dark:text-zinc-200">
                      {item.label}
                    </span>
                    <span className="shrink-0 tabular-nums text-zinc-700 dark:text-zinc-200">
                      {formatKrw(item.value)}
                    </span>
                  </div>
                  <div
                    className="mt-1 h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden"
                    aria-hidden
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.max(2, Math.min(100, item.ratioPercent))}%`,
                        backgroundColor: colorForLabel(item.label),
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
