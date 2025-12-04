import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowToUse } from "@/components/landing/how-to-use";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <HowToUse />
      <Features />
    </div>
  );
}
