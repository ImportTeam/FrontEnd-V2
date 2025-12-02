"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
    LayoutDashboard,
    CreditCard,
    PieChart,
    User,
    Settings,
    LogOut,
} from "lucide-react";

type SidebarItem = {
    title: string;
    href: Route;
    icon: LucideIcon;
};

const sidebarItems: SidebarItem[] = [
    {
        title: "대시보드",
        href: "/dashboard" as Route,
        icon: LayoutDashboard,
    },
    {
        title: "결제수단 관리",
        href: "/dashboard/cards" as Route,
        icon: CreditCard,
    },
    {
        title: "소비 분석 리포트",
        href: "/dashboard/reports" as Route,
        icon: PieChart,
    },
    {
        title: "내 프로필",
        href: "/dashboard/profile" as Route,
        icon: User,
    },
    {
        title: "설정",
        href: "/dashboard/settings" as Route,
        icon: Settings,
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden w-64 flex-col border-r border-zinc-200 bg-white md:flex dark:bg-zinc-900 dark:border-zinc-800">
            <div className="flex h-20 items-center border-b border-zinc-200 px-8 dark:border-zinc-800">
                <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-zinc-900 dark:text-white">
                    PicSel
                </Link>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-6">
                <nav className="grid gap-2">
                    {sidebarItems.map((item, index) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                                    isActive 
                                        ? "bg-zinc-900 text-white shadow-md dark:bg-zinc-50 dark:text-zinc-900" 
                                        : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5", isActive ? "text-white dark:text-zinc-900" : "text-zinc-400 group-hover:text-zinc-900")} />
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="border-t border-zinc-200 p-6 dark:border-zinc-800">
                <Link
                    href="/"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                >
                    <LogOut className="h-5 w-5" />
                    로그아웃
                </Link>
            </div>
        </aside>
    );
}
