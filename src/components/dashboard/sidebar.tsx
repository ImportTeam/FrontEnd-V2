"use client";


import {
    LayoutDashboard,
    CreditCard,
    PieChart,
    User,
    Settings,
    LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";

interface SidebarItem {
    title: string;
    href: string;
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

    return (
        <>
            {/* Mobile sidebar backdrop */}
            <div 
                className={cn(
                    "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity",
                    "opacity-0 pointer-events-none"
                )}
            />
            
            {/* Desktop Sidebar */}
            <aside className="hidden w-64 flex-col bg-white md:flex dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 h-full">
            <div className="flex h-16 items-center px-8">
                <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-foreground">
                    PicSel
                </Link>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-6">
                <nav className="grid gap-2">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <a
                                key={item.href}
                                href={item.href}
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
                            </a>
                        );
                    })}
                </nav>
            </div>
            <div className="p-6">
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
