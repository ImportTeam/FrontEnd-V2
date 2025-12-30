"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { userClient } from "@/lib/api/clients/user.server";

import type { UserCurrentResponse } from "@/lib/api/types";

export const getCurrentUser = cache(async (): Promise<UserCurrentResponse | null> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    return await userClient.getCurrent();
  } catch {
    return null;
  }
});

export const requireCurrentUser = cache(async (): Promise<UserCurrentResponse> => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
});
