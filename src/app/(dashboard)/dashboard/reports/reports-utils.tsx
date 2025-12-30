import type {
  CategorySpendingResponse,
  MonthlySavingsChartItem,
  MonthlySavingsChartResponse,
  TransactionListItem,
} from "@/lib/api/types";
import type { ReactNode } from "react";

// Vivid, distinct RGB colors for high visibility
export const CHART_COLORS = [
  "#2563EB", // blue
  "#DC2626", // red
  "#16A34A", // green
  "#F97316", // orange
  "#9333EA", // purple
  "#0891B2", // cyan
  "#CA8A04", // amber
  "#DB2777", // pink
] as const;

const colorCache = new Map<string, string>();
const krwFormatter = new Intl.NumberFormat("ko-KR");

export function colorForLabel(label: string): string {
  const cached = colorCache.get(label);
  if (cached) return cached;

  let hash = 0;
  for (let i = 0; i < label.length; i += 1) {
    hash = (hash * 31 + label.charCodeAt(i)) >>> 0;
  }

  const color = CHART_COLORS[hash % CHART_COLORS.length];
  colorCache.set(label, color);
  return color;
}

export function formatKrw(value: number): string {
  return `${krwFormatter.format(value)}원`;
}

export type CategoryChartDatum = {
  label: string;
  value: number;
  ratioPercent: number;
};

export type PieLabelProps = {
  cx?: number;
  cy?: number;
  midAngle?: number;
  outerRadius?: number;
  payload?: {
    label?: string;
    ratioPercent?: number;
    value?: number;
  };
};

export function renderPieCalloutLabel(props: PieLabelProps): ReactNode {
  const { cx, cy, midAngle, outerRadius, payload } = props;
  if (
    cx === undefined ||
    cy === undefined ||
    midAngle === undefined ||
    outerRadius === undefined
  ) {
    return null;
  }
  const label = payload?.label ?? "";
  const value = typeof payload?.value === "number" ? payload.value : undefined;

  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);

  const x0 = cx + outerRadius * cos;
  const y0 = cy + outerRadius * sin;
  const x1 = cx + (outerRadius + 10) * cos;
  const y1 = cy + (outerRadius + 10) * sin;
  const x2 = x1 + (cos >= 0 ? 18 : -18);
  const y2 = y1;

  const textAnchor = cos >= 0 ? "start" : "end";
  const tx = x2 + (cos >= 0 ? 6 : -6);
  const ty = y2;
  const valueText = typeof value === "number" ? formatKrw(value) : "";

  return (
    <g>
      <path
        d={`M${x0},${y0}L${x1},${y1}L${x2},${y2}`}
        stroke="var(--color-muted-foreground)"
        fill="none"
      />
      <circle
        cx={x0}
        cy={y0}
        r={3}
        fill="var(--color-muted-foreground)"
      />
      <text
        x={tx}
        y={ty}
        textAnchor={textAnchor}
        dominantBaseline="central"
        fill="var(--color-foreground)"
        fontSize={12}
      >
        <tspan x={tx} dy={-6}>
          {label}
        </tspan>
        {valueText ? (
          <tspan x={tx} dy={14} fill="var(--color-muted-foreground)">
            {valueText}
          </tspan>
        ) : null}
      </text>
    </g>
  );
}

export function pickCategoryRange(
  responses: CategorySpendingResponse[],
  selectedMonth: string
): CategorySpendingResponse | null {
  if (responses.length === 0) return null;

  const [year, month] = selectedMonth.split("-");
  const monthNumber = Number(month);
  const koreanLabel = `${year}년 ${monthNumber}월`;

  return (
    responses.find((r) => r.rangeLabel?.includes(selectedMonth)) ??
    responses.find((r) => r.rangeLabel?.includes(koreanLabel)) ??
    responses[0] ??
    null
  );
}

export function normalizeMonthlyData(
  responses: MonthlySavingsChartResponse[]
): Array<{ month: string; totalSpent: number }> {
  const series: MonthlySavingsChartItem[] = responses[0]?.data ?? [];
  return series.map((item) => {
    const totalSpent =
      (typeof item.totalSpent === "number" ? item.totalSpent : undefined) ??
      (typeof item.spent === "number" ? item.spent : undefined) ??
      (typeof item.value === "number" ? item.value : 0);

    return {
      month: item.month,
      totalSpent,
    };
  });
}

export function buildCategoryChartDataFromTransactions(
  transactions: TransactionListItem[]
): CategoryChartDatum[] {
  const totals = new Map<string, number>();
  for (const tx of transactions) {
    const label = tx.category?.trim() || "기타";
    const value = (tx.paidAmount ?? tx.spendAmount ?? 0) || 0;
    totals.set(label, (totals.get(label) ?? 0) + value);
  }

  const entries = Array.from(totals.entries())
    .map(([label, value]) => ({ label, value }))
    .filter((x) => x.value > 0)
    .sort((a, b) => b.value - a.value);

  const total = entries.reduce((sum, x) => sum + x.value, 0);
  if (total <= 0) return [];

  return entries.map((x) => ({
    label: x.label,
    value: x.value,
    ratioPercent: Math.round((x.value / total) * 1000) / 10,
  }));
}

export function monthToRange(monthKey: string): { from: string; to: string } {
  const [year, month] = monthKey.split("-");
  const from = `${year}-${month}-01T00:00:00.000Z`;
  const lastDay = new Date(
    Number.parseInt(year, 10),
    Number.parseInt(month, 10),
    0
  ).getDate();
  const to = `${year}-${month}-${lastDay}T23:59:59.999Z`;
  return { from, to };
}

export function lastNMonths(endMonthKey: string, n: number): string[] {
  const [yearStr, monthStr] = endMonthKey.split("-");
  const year = Number.parseInt(yearStr, 10);
  const monthIndex = Number.parseInt(monthStr, 10) - 1;

  const result: string[] = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    const d = new Date(Date.UTC(year, monthIndex - i, 1));
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    result.push(`${y}-${m}`);
  }
  return result;
}
