"use client";

import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// eslint-disable-next-line no-restricted-syntax
export default function DashboardError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Dashboard Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        {/* Error Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          문제가 발생했습니다
        </h2>
        <p className="mt-2 text-muted-foreground">
          대시보드를 불러오는 중 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-4 w-full rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-left">
            <p className="text-sm font-mono text-red-800 dark:text-red-300 break-all">
              {error.message}
            </p>
            {error.digest ? <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                Error ID: {error.digest}
              </p> : null}
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <Button variant="outline" onClick={reset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            다시 시도
          </Button>
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              홈으로
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
