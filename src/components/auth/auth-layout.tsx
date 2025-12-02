import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    image?: React.ReactNode;
    isSignup?: boolean;
}

export function AuthLayout({ children, title, subtitle, isSignup = false }: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen w-full overflow-hidden bg-background">
            {/* Left Side (Dark) - Moves to Right on Signup */}
            <div
                className={cn(
                    "relative hidden w-1/2 flex-col justify-between bg-[#4B5563] p-10 text-white lg:flex transition-all duration-500 ease-in-out",
                    isSignup ? "order-2 bg-[#4B5563]" : "order-1"
                )}
            >
                {/* Curved Overlay */}
                <div
                    className={cn(
                        "absolute inset-y-0 -right-16 w-32 bg-background",
                        isSignup ? "-left-16 right-auto rotate-180" : "-right-16"
                    )}
                    style={{
                        borderRadius: "50%",
                        transform: isSignup ? "scaleX(-1)" : "none"
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
                        PicSel
                    </Link>
                </div>
                <div className="relative z-10 flex flex-col gap-6 pl-12">
                    <h1 className="text-5xl font-bold leading-tight">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-xl text-zinc-300">
                            {subtitle}
                        </p>
                    )}
                    <div className="mt-8">
                        <Link href={isSignup ? "/login" : "/signup"}>
                            <button className="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-lg font-medium backdrop-blur-sm transition-colors hover:bg-white/20">
                                {isSignup ? "로그인으로 가기" : "회원가입 하러 가기"}
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="relative z-10 text-sm text-zinc-400">
                    © {new Date().getFullYear()} PicSel. All rights reserved.
                </div>

                {/* Background Pattern (Abstract Lines) */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 0 C 50 100 80 100 100 0 Z" fill="none" stroke="white" strokeWidth="0.5" />
                        <path d="M0 100 C 50 0 80 0 100 100 Z" fill="none" stroke="white" strokeWidth="0.5" />
                    </svg>
                </div>
            </div>

            {/* Right Side (Form) - Moves to Left on Signup */}
            <div className={cn(
                "flex w-full flex-col items-center justify-center p-8 lg:w-1/2 transition-all duration-500",
                isSignup ? "order-1" : "order-2"
            )}>
                <div className="absolute left-4 top-4 md:left-8 md:top-8">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        메인으로
                    </Link>
                </div>
                <div className="w-full max-w-sm space-y-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
