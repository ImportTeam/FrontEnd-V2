"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { HowToUse } from "@/components/landing/how-to-use";
import { useAuthStore } from "@/store/use-auth-store";

import type { Route } from "next";

// eslint-disable-next-line no-restricted-syntax
export default function Home() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  useEffect(() => {
    // Auto-redirect to dashboard if already logged in
    if (isAuthenticated) {
      router.push("/login" as Route);
    }
  }, [isAuthenticated, router]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <HowToUse />
      <section id="features">
        <Features />
      </section>
    </div>
  );
}
