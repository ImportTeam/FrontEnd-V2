"use server";

import { cookies } from "next/headers";

import { authClient } from "@/lib/api/clients/auth.server";

const STORAGE_KEYS = {
  accessToken: "access_token",
  refreshToken: "refresh_token",
};

export async function logoutAction(): Promise<{ success: boolean; error?: string }> {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(STORAGE_KEYS.refreshToken)?.value;

    // Call logout API (best-effort)
    if (refreshToken) {
      await authClient.logout(refreshToken);
    }

    // Clear tokens from HttpOnly cookies
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
