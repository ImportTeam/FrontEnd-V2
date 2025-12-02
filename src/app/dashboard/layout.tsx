export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Sidebar would go here if implemented as a separate component, 
          but for now we assume it's handled in the main layout or we focus on the content area */}
      <main className="p-8 lg:p-12 max-w-[1600px] mx-auto">
        {children}
      </main>
    </div>
  );
}
