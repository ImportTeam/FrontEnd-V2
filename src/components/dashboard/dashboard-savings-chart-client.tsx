"use client";

import { useLayoutEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type DashboardSavingsChartClientProps = {
  chartData?: unknown[];
  loading?: boolean;
};

const TOOLTIP_CONTENT_STYLE: React.CSSProperties = {
  borderRadius: "8px",
  border: "none",
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
  backgroundColor: "#fff",
  color: "#000",
};

const TOOLTIP_LABEL_STYLE: React.CSSProperties = {
  color: "#000",
};

function formatYAxisTick(value: number) {
  return `${(value / 10000).toLocaleString()}만`;
}

function formatTooltipValue(value?: number) {
  return [value ? `${value.toLocaleString()}원` : "0원", "절약 금액"] as const;
}

export function DashboardSavingsChartClient({
  chartData = [],
  loading = false,
}: DashboardSavingsChartClientProps) {
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  // Recharts + SSR can cause hydration mismatch (React #418) in production.
  // Render a stable placeholder for SSR/first paint, then hydrate on client.
  if (!isMounted) {
    return <div className="h-full w-full bg-muted/50 animate-pulse rounded-xl" />;
  }

  if (loading) {
    return <div className="h-full w-full bg-muted/50 animate-pulse rounded-xl" />;
  }

  if (chartData.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">
        차트 데이터가 없습니다.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "#71717a", fontWeight: 500 }}
          dy={10}
          className="dark:[&_text]:fill-zinc-200"
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "#71717a", fontWeight: 500 }}
          tickFormatter={formatYAxisTick}
          className="dark:[&_text]:fill-zinc-200"
        />
        <Tooltip
          contentStyle={TOOLTIP_CONTENT_STYLE}
          formatter={formatTooltipValue}
          labelStyle={TOOLTIP_LABEL_STYLE}
        />
        <Area
          type="monotone"
          dataKey="savingsAmount"
          stroke="#2563eb"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorSavings)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
