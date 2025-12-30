import { NextResponse } from "next/server";

import { analyticsClient } from "@/lib/api/clients/analytics.server";

import type { ApiEnvelope, CategorySpendingResponse } from "@/lib/api/types";

export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse<ApiEnvelope<CategorySpendingResponse[]>>> {
  const data = await analyticsClient.getCategories();
  return NextResponse.json({ data });
}
