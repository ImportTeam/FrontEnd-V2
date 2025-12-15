"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuthStore } from "@/store/use-auth-store";

import type { Route } from "next";

interface RequireAuthProps {
  children: React.ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated) return;
    if (isAuthenticated) return;

    const loginUrl = pathname ? `/login?next=${encodeURIComponent(pathname)}` : "/login";
    router.replace(loginUrl as unknown as Route);
  }, [hasHydrated, isAuthenticated, pathname, router]);

  if (!hasHydrated) return null;
  if (!isAuthenticated) return null;

  return children;
}
