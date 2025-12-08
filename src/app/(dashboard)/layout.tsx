import { DashboardHeader } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-8 lg:p-12 max-w-screen-2xl mx-auto w-full">
            {children}
        </main>
      </div>
    </div>
  );
}
