"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuthStore } from "@/store/use-auth-store";

import type { Route } from "next";

interface RequireAuthProps {
  children: React.ReactNode;
}

/**
 * Client-side Auth Guard Component
 * - 인증 확인 후 보호된 콘텐츠 표시
 * - 미인증 사용자는 로그인 페이지로 리다이렉트
 */
export function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // 미인증 사용자 리다이렉트
    if (!isAuthenticated) {
      const loginUrl = pathname
        ? `/login?next=${encodeURIComponent(pathname)}`
        : "/login";
      router.replace(loginUrl as unknown as Route);
    }
  }, [isAuthenticated, pathname, router]);

  // 로딩 상태 - 페이지 전환 중 표시
  if (!isAuthenticated) {
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

  return children;
}
