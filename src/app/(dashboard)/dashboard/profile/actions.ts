"use server";

import { userClient } from "@/lib/api/clients/user.server";

import type { UserCurrentResponse } from "@/lib/api/types";

type UpdateCurrentUserInput = Partial<Omit<UserCurrentResponse, "settings">> & {
  settings?: Partial<UserCurrentResponse["settings"]>;
};

export async function loadCurrentUser(): Promise<UserCurrentResponse | null> {
  try {
    return await userClient.getCurrent();
  } catch (error) {
    console.error("[PROFILE] Failed to load user profile:", error);
    return null;
  }
}

export async function updateCurrentUser(
  data: UpdateCurrentUserInput
): Promise<{ success: boolean; profile?: UserCurrentResponse; error?: string }> {
  try {
    const profile = await userClient.updateCurrent(data);
    return { success: true, profile };
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

export async function deleteAccount(): Promise<{ success: boolean; error?: string }> {
  try {
    await userClient.deleteCurrent();
    return { success: true };
  } catch (error) {
    console.error("[PROFILE] Failed to delete account:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "계정 삭제에 실패했습니다.",
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
