import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-12 max-w-[1600px] mx-auto overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
