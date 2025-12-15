"use client";

import {
    LayoutDashboard,
    CreditCard,
    PieChart,
    User,
    Settings,
    LogOut,
    X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/use-ui-store";

import type { LucideIcon } from "lucide-react";
import type { Route } from "next";


interface SidebarItem {
    title: string;
    href: Route;
    icon: LucideIcon;
}

const sidebarItems: SidebarItem[] = [
    {
        title: "대시보드",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "결제수단 관리",
        href: "/dashboard/cards",
        icon: CreditCard,
    },
    {
        title: "소비 분석 리포트",
        href: "/dashboard/reports",
        icon: PieChart,
    },
    {
        title: "내 프로필",
        href: "/dashboard/profile",
        icon: User,
    },
    {
        title: "설정",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const { isSidebarOpen, closeSidebar } = useUIStore();

    return (
        <>
            {/* Mobile sidebar backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300",
                    isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={closeSidebar}
                aria-hidden="true"
            />
            
            {/* Sidebar */}
            <aside className={cn(
                "fixed md:sticky md:top-0 inset-y-0 left-0 z-50 w-64 flex-col bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 h-screen transition-transform duration-300 md:translate-x-0 shrink-0",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full",
                "md:flex"
            )}>
            {/* Mobile Close Button */}
            <div className="flex h-16 items-center justify-between px-8 md:justify-start shrink-0">
                <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-foreground">
                    PicSel
                </Link>
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={closeSidebar}
                    aria-label="메뉴 닫기"
                >
                    <X className="h-5 w-5" />
                </Button>
            </div>
            <div className="flex flex-1 flex-col p-6 overflow-y-auto">
                <nav className="grid gap-2">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => closeSidebar()}
                                aria-current={isActive ? "page" : undefined}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                                    isActive 
                                        ? "bg-primary text-primary-foreground shadow-md" 
                                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            {/* Logout - pushed to bottom */}
            <div className="p-6 mt-auto shrink-0 border-t border-zinc-100 dark:border-zinc-800 md:border-t-0">
                <Link
                    href="/"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                >
                    <LogOut className="h-5 w-5" />
                    로그아웃
                </Link>
            </div>
        </aside>
        </>
    );
}
