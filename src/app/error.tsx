"use client";

import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { logger } from "@/lib/logger";

// Next.js error boundary requires a default export
// eslint-disable-next-line no-restricted-syntax
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();
  const log = logger.scope("GLOBAL_ERROR");

  useEffect(() => {
    // Log error details only in development
    if (process.env.NODE_ENV === 'development') {
      log.error("Global error boundary:", error);
    }
  }, [error]);

  const handleRetry = () => {
    reset();
    router.refresh();
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <div className="w-screen h-screen bg-linear-to-br from-red-50 to-red-100/50 dark:from-red-950/20 dark:to-red-900/10 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Error Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-red-400 rounded-full blur-xl opacity-20 animate-pulse" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-white dark:bg-zinc-950 shadow-lg p-8 space-y-6">
          <div className="space-y-3 text-center">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              문제가 발생했습니다
            </h1>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              페이지를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도하거나, 문제가 지속되면 문의해 주세요.
            </p>
            {error.digest ? <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-xs font-mono text-red-700 dark:text-red-300 break-all">
                  오류 코드: {error.digest}
                </p>
              </div> : null}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleHome}
              className="flex-1 flex items-center justify-center gap-2 h-11"
            >
              <Home className="h-4 w-4" />
              <span>홈으로</span>
            </Button>
            <Button
              onClick={handleRetry}
              className="flex-1 flex items-center justify-center gap-2 h-11 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
            >
              <RotateCcw className="h-4 w-4" />
              <span>다시 시도</span>
            </Button>
          </div>

          {/* Help Text */}
          <div className="text-center pt-2">
            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              문제가 계속되면{" "}
              <a href="mailto:support@picsel.kr" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                고객 지원
              </a>
              으로 연락해주세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
