import { RequireAuth } from "@/components/auth/require-auth";
import { DashboardHeader } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { requireCurrentUser } from "@/lib/auth/current-user.server";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "대시보드",
    template: "%s | PicSel 대시보드",
  },
  description: "맞춤 결제 추천, 혜택 요약, 최근 결제 내역을 한눈에 확인하세요.",
  robots: {
    index: true,
    follow: true,
  },
};

// eslint-disable-next-line no-restricted-syntax
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Cached per request via React cache()
  const user = await requireCurrentUser();

  return (
    <RequireAuth>
      <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 relative">
          <DashboardHeader user={user} />
          <main className="flex-1 w-full p-4 md:p-6 lg:p-8 overflow-x-hidden">
              {children}
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
