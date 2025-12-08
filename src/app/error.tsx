"use client";

import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

// Next.js error boundary requires a default export
// eslint-disable-next-line no-restricted-syntax
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error("Global error boundary", error);
  }, [error]);

  const handleRetry = () => {
    reset();
    router.refresh();
  };

  return (
    <html lang="ko">
      <body className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="max-w-lg w-full rounded-2xl border border-border bg-card shadow-sm p-8 text-center space-y-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-300">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">문제가 발생했습니다</h1>
            <p className="text-sm text-muted-foreground">
              페이지를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도하거나, 문제가 지속되면 문의해 주세요.
            </p>
            {error.digest ? (
              <p className="text-[11px] text-muted-foreground">오류 코드: {error.digest}</p>
            ) : null}
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" onClick={() => router.push("/")}>홈으로</Button>
            <Button onClick={handleRetry}>다시 시도</Button>
          </div>
        </div>
      </body>
    </html>
  );
}
