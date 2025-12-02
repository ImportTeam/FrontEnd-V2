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
        <aside className="hidden w-64 flex-col border-r bg-background md:flex">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    PicSel
                </Link>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
                <nav className="grid gap-1">
                    {sidebarItems.map((item, index) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="border-t p-4">
                <Link
                    href="/"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50"
                >
                    <LogOut className="h-4 w-4" />
                    로그아웃
                </Link>
            </div>
        </aside>
    );
}
