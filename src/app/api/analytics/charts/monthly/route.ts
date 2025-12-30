import { NextResponse } from "next/server";

import { analyticsClient } from "@/lib/api/clients/analytics.server";

import type { ApiEnvelope, MonthlySavingsChartResponse } from "@/lib/api/types";

export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse<ApiEnvelope<MonthlySavingsChartResponse[]>>> {
  const data = await analyticsClient.getMonths();
  return NextResponse.json({ data });
}
