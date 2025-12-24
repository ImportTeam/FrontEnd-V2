"use client";

import { Suspense } from "react";

import { OAuthHandler } from "./oauth-handler";

/**
 * OAuth Callback Page
 * Wrapped with Suspense for useSearchParams() hook
 */
export function OAuthCallbackPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Suspense
        fallback={
          <div className="text-center space-y-4">
            <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />
            <p className="text-zinc-600 dark:text-zinc-400">로그인 처리 중...</p>
          </div>
        }
      >
        <OAuthHandler />
      </Suspense>
    </div>
  );
}

export default OAuthCallbackPage;
