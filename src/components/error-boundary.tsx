import { Suspense } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  return (
    <Suspense
      fallback={
        fallback || (
          <div className="flex items-center justify-center min-h-100">
            <div className="animate-pulse text-zinc-600 dark:text-zinc-400">
              로딩 중...
            </div>
          </div>
        )
      }
    >
      {children}
    </Suspense>
  );
}
