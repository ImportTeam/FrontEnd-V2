"use client";

import { Bell, User as UserIcon, Settings, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { logoutAction } from "@/app/(dashboard)/dashboard/layout/actions";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { logger } from "@/lib/logger";
import { useAuthStore } from "@/store/use-auth-store";
import { useUIStore } from "@/store/use-ui-store";

export function DashboardHeader() {
  const log = logger.scope("DASHBOARD_HEADER");
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const result = await logoutAction();
      if (result.success) {
        logout();
        router.push("/");
      } else {
        log.error("Logout failed:", result.error);
      }
    } catch (error) {
      log.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 bg-white/80 dark:bg-zinc-950/80 px-6 backdrop-blur-xl shadow-sm border-b border-zinc-100 dark:border-zinc-800">
      {/* Mobile Menu Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleSidebar}
        aria-label="메뉴 열기"
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      <div className="flex-1" />
      <div className="flex items-center gap-2 md:gap-4">
        <ModeToggle />
        
        <IconButton>
          <Bell className="h-5 w-5" />
          <span className="sr-only">알림</span>
        </IconButton>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <Avatar className="h-9 w-9 border border-zinc-200 dark:border-zinc-800">
                <AvatarImage src="/placeholder-avatar.jpg" alt="@picsel" />
                <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                  {user?.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-100">
                  {user?.name || "게스트"} 님
                </p>
                <p className="text-xs leading-none text-zinc-700 dark:text-zinc-300">
                  {user?.email || "로그인이 필요합니다"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800" />
            <DropdownMenuItem asChild className="focus:bg-zinc-100 dark:focus:bg-zinc-800 cursor-pointer">
                <Link href="/dashboard/profile" className="flex items-center w-full">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>내 프로필</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="focus:bg-zinc-100 dark:focus:bg-zinc-800 cursor-pointer">
                <Link href="/dashboard/settings" className="flex items-center w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>설정</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800" />
            <DropdownMenuItem 
              className="text-red-600 dark:text-red-400 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>로그아웃</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
