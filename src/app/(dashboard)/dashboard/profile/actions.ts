"use server";

import { userClient } from "@/lib/api/clients/user.server";

import type { UserProfile } from "@/lib/api/types";

export async function loadUserProfile(): Promise<UserProfile | null> {
  try {
    return await userClient.getProfile();
  } catch (error) {
    console.error("[PROFILE] Failed to load user profile:", error);
    return null;
  }
}

export async function updateUserProfile(
  data: Partial<UserProfile>
): Promise<{ success: boolean; error?: string }> {
  try {
    await userClient.updateProfile(data);
    return { success: true };
  } catch (error) {
    console.error("[PROFILE] Failed to update profile:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "프로필 업데이트에 실패했습니다.",
    };
  }
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await userClient.changePassword(currentPassword, newPassword);
    return { success: true };
  } catch (error) {
    console.error("[PROFILE] Failed to change password:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "비밀번호 변경에 실패했습니다.",
    };
  }
}
