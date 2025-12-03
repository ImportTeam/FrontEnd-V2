"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
    const pathname = usePathname();

    if (pathname?.startsWith("/dashboard")) {
        return null;
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-6 md:px-12 max-w-screen-2xl">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                        <span className="text-[clamp(1.25rem,0.875rem+0.5vw,1.5rem)] font-bold tracking-tight">PicSel</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                        <Link href="#features" className="hover:text-foreground transition-colors">
                            주요 기능
                        </Link>
                        <Link href="#usage" className="hover:text-foreground transition-colors">
                            사용 방법
                        </Link>
                        <Link href="#guide" className="hover:text-foreground transition-colors">
                            이용 가이드
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <Link href="/login">
                        <Button variant="ghost" size="sm">
                            로그인
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button size="sm">가입하여 시작하기</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
