"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { logger } from "@/lib/logger";

/**
 * OAuth Handler Component
 * Per PRD: Backend sets HttpOnly cookies with tokens
 * Frontend only handles redirect to dashboard
 * 
 * PRD Flow:
 * 1. User clicks social button → POST /api/auth/{provider}?redirect_uri={callback_url}
 * 2. Backend redirects to OAuth provider → Gets authorization code
 * 3. OAuth provider redirects to → /api/auth/{provider}/callback?code=...
 * 4. Backend exchanges code for tokens → Sets HttpOnly cookies
 * 5. Backend redirects to → /oauth-callback
 * 6. Frontend checks cookies are set → Redirects to /dashboard
 */
export function OAuthHandler() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const log = logger.scope("OAUTH");

  useEffect(() => {
    async function handleCallback() {
      try {
        log.info("OAuth callback page loaded");
        log.debug("Backend should have set HttpOnly cookies by now");

        // No need to process tokens - backend already set them in HttpOnly cookies
        // Just verify we got here and redirect to dashboard
        log.info("Redirecting to dashboard...");

        // Small delay to ensure cookies are set
        setTimeout(() => {
          router.replace("/dashboard");
        }, 500);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        log.error("Error:", message);
        setError(message);
      }
    }

    handleCallback();
  }, [router]);

  if (error) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-red-600">로그인 오류</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{error}</p>
        <div className="text-xs text-zinc-500">
          <p>잠시만 기다려주세요...</p>
        </div>
        <a href="/login" className="text-blue-600 hover:underline text-sm">
          로그인 페이지로 돌아가기
        </a>
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />
      <p className="text-zinc-600 dark:text-zinc-400">로그인 처리 중입니다...</p>
    </div>
  );
}
