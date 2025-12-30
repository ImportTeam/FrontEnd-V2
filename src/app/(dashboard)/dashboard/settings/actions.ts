"use server";

import { dashboardClient } from "@/lib/api/clients/dashboard.server";
import { userClient } from "@/lib/api/clients/user.server";
import { logger } from "@/lib/logger";

import type { SessionData } from "@/lib/api/types";

export async function loadUserSettings(): Promise<Record<string, unknown> | null> {
  const log = logger.scope("SETTINGS");
  try {
    return (await userClient.getSettings()) as Record<string, unknown>;
  } catch (error) {
    log.error("Failed to load user settings:", error);
    return null;
  }
}

export async function loadUserSessions(): Promise<SessionData[] | null> {
  const log = logger.scope("SETTINGS");
  try {
    return await userClient.listSessions();
  } catch (error) {
    log.error("Failed to load sessions:", error);
    return null;
  }
}

export async function deleteUserSession(
  id: string | number
): Promise<{ success: boolean; error?: string }> {
  const log = logger.scope("SETTINGS");
  try {
    await userClient.deleteSession(id);
    return { success: true };
  } catch (error) {
    log.error("Failed to delete session:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "기기 로그아웃에 실패했습니다.",
    };
  }
}

export async function updateUserSettings(
  data: Record<string, unknown>
): Promise<{ success: boolean; error?: string }> {
  const log = logger.scope("SETTINGS");
  try {
    await userClient.updateSettings(data);
    return { success: true };
  } catch (error) {
    log.error("Failed to update settings:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "설정 업데이트에 실패했습니다.",
    };
  }
}

export async function loadDashboardSummary() {
  const log = logger.scope("SETTINGS");
  try {
    return await dashboardClient.getSummary();
  } catch (error) {
    log.error("Failed to load dashboard summary:", error);
    return null;
  }
}
