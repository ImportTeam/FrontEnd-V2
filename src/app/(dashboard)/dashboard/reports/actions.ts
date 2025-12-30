"use server";

import { analyticsClient } from "@/lib/api/clients/analytics.server";
import { reportsClient } from "@/lib/api/clients/reports.server";

export async function loadTransactionsForMonth(
  startDate: string,
  endDate: string
): Promise<unknown[] | null> {
  try {
    const response = await analyticsClient.getSpendingAnalysis({
      startDate,
      endDate,
      period: "monthly",
    });
    return response?.categoryBreakdown || [];
  } catch (error) {
    console.error("[REPORTS] Failed to load transactions:", error);
    return null;
  }
}

export async function generateReport(
  startDate: string,
  endDate: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const report = await reportsClient.createReport({
      type: "monthly",
      startDate,
      endDate,
    });
    // URL 생성 로직
    const downloadUrl = await reportsClient.generateDownloadUrl(report.id);
    return { success: true, url: downloadUrl };
  } catch (error) {
    console.error("[REPORTS] Failed to generate report:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "리포트 생성에 실패했습니다.",
    };
  }
}
