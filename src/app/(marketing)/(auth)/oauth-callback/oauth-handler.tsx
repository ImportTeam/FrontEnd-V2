"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuthStore } from "@/store/use-auth-store";

/**
 * OAuth Handler Component
 * Handles token extraction and auth state setup
 */
export function OAuthHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    async function handleCallback() {
      try {
        // 1. Try to get tokens from URL params (direct redirect from backend)
        const accessToken = searchParams.get("access_token") || searchParams.get("token");
        const refreshToken = searchParams.get("refresh_token");

        // Log all URL params for debugging
        const allParams = Array.from(searchParams.entries());
        console.warn("[OAUTH] All URL params:", allParams);
        setDebugInfo(`Params: ${JSON.stringify(Object.fromEntries(allParams))}`);

        // 2. If no tokens, check for OAuth code (Google/Kakao/Naver callback)
        const code = searchParams.get("code");

        if (code) {
          console.warn("[OAUTH] Authorization code detected:", code);
          // Note: Backend should handle /api/auth/{provider}/callback
          // For now, we'll wait for the backend to redirect with tokens
          throw new Error("Backend is processing OAuth. Waiting for redirect with access_token...");
        }

        if (!accessToken) {
          throw new Error("No access token in URL params. Backend redirect required.");
        }

        console.warn("[OAUTH] Access token found, processing...");

        // Store tokens in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", accessToken);
          if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
          }
        }

        // Decode token to get user info (basic JWT parsing)
        try {
          const parts = accessToken.split(".");
          if (parts.length === 3) {
            const decodedPayload = JSON.parse(atob(parts[1]));
            console.warn("[OAUTH] Token decoded:", decodedPayload);

            // Set auth state with user info
            login({
              id: decodedPayload.uuid || "",
              name: decodedPayload.name || "사용자",
              email: decodedPayload.email || "",
            });
          }
        } catch (decodeError) {
          console.warn("[OAUTH] Could not decode token, setting auth anyway", decodeError);
          login({
            id: "",
            name: "사용자",
            email: "",
          });
        }

        console.warn("[OAUTH] Redirecting to dashboard...");
        router.replace("/dashboard");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("[OAUTH] Error:", message);
        setError(message);
      }
    }

    handleCallback();
  }, [searchParams, router, login]);

  if (error) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-red-600">로그인 처리 중</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{error}</p>
        {debugInfo ? <div className="text-xs bg-zinc-900 text-zinc-100 p-3 rounded font-mono max-w-md mx-auto overflow-auto">
            {debugInfo}
          </div> : null}
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
