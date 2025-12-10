"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/signup";

    if (pathname?.startsWith("/dashboard")) {
        return null;
    }

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <Image 
                            src="/assets/icon/logo.png" 
                            alt="PicSel Logo" 
                            width={100} 
                            height={100}
                            priority
                            sizes="40px"
                            className="rounded-sm"
                        />
                    </Link>
                    {!isAuthPage && (
                        <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-zinc-700 dark:text-zinc-300" aria-label="주요 메뉴">
                            <a 
                                href="#features" 
                                onClick={(e) => handleScrollTo(e, "features")}
                                className="hover:text-foreground transition-colors cursor-pointer"
                            >
                                주요 기능
                            </a>
                            <a 
                                href="#usage" 
                                onClick={(e) => handleScrollTo(e, "usage")}
                                className="hover:text-foreground transition-colors cursor-pointer"
                                aria-label="사용 방법 보기"
                            >
                                사용 방법
                            </a>
                        </nav>
                    )}
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
