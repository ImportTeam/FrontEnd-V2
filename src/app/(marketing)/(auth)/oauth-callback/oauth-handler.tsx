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

  useEffect(() => {
    async function handleCallback() {
      try {
        // Get tokens from URL params
        const accessToken = searchParams.get("access_token") || searchParams.get("token");
        const refreshToken = searchParams.get("refresh_token");

        if (!accessToken) {
          throw new Error("No access token provided");
        }

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
        <h1 className="text-2xl font-bold text-red-600">로그인 오류</h1>
        <p className="text-zinc-600 dark:text-zinc-400">{error}</p>
        <a href="/login" className="text-blue-600 hover:underline">
          로그인 페이지로 돌아가기
        </a>
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />
      <p className="text-zinc-600 dark:text-zinc-400">로그인 중입니다...</p>
    </div>
  );
}
