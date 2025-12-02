import { Sidebar } from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full bg-muted/20">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
                    <div className="flex-1">
                        {/* Search or Breadcrumbs could go here */}
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-600" />
                            <span className="sr-only">알림</span>
                        </Button>
                        <div className="h-8 w-8 rounded-full bg-muted" />
                    </div>
                </header>
                <main className="flex-1 p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
