import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { HowToUse } from "@/components/landing/how-to-use";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "PicSel - 스마트한 결제 가이드",
    description: "국내 쇼핑몰 결제 시 최적의 결제수단을 추천해드립니다. AI 기반 소비 분석으로 혜택을 놓치지 마세요.",
    alternates: {
      canonical: "https://picsel.vercel.app",
    },
  };
}

// eslint-disable-next-line no-restricted-syntax
export default function Home() {
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
