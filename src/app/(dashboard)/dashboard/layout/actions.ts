"use server";

import { cookies } from "next/headers";

import { authClient } from "@/lib/api/clients/auth.server";

const STORAGE_KEYS = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
};

export async function logoutAction(): Promise<{ success: boolean; error?: string }> {
  try {
    // Call logout API
    await authClient.logout();

    // Clear tokens from HttpOnly cookies
    const cookieStore = await cookies();
    cookieStore.delete(STORAGE_KEYS.accessToken);
    cookieStore.delete(STORAGE_KEYS.refreshToken);

    return { success: true };
  } catch (error) {
    console.error("[LOGOUT] Failed to logout:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "로그아웃에 실패했습니다.",
    };
  }
}
