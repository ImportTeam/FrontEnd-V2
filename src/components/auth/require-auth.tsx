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

  if (!hasHydrated) {
    return (
      <div className="min-h-[60vh] w-full grid place-items-center">
        <div className="w-full max-w-md space-y-3 px-6">
          <div className="h-4 w-40 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          <div className="h-10 w-full rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          <div className="h-10 w-full rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        </div>
      </div>
    );
  }
  if (!isAuthenticated) return null;

  return children;
}
