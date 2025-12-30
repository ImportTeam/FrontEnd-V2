"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/use-auth-store";

import type { Route } from "next";

interface AuthPageClientProps {
    initialSignup?: boolean;
}

export function AuthPageClient({ initialSignup = false }: AuthPageClientProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const [isSignup, setIsSignup] = useState(initialSignup);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // 🔴 인증된 사용자는 로그인 페이지에서 대시보드로 즉시 리다이렉트
    useEffect(() => {
        if (!isAuthenticated) {
            console.warn('[AUTH_PAGE] User not authenticated, staying on auth page');
            return;
        }

        console.warn('[AUTH_PAGE] User authenticated, redirecting to dashboard');
        
        const params = new URLSearchParams(window.location.search);
        const next = params.get("next");
        const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : null;

        if (safeNext) {
            console.warn('[AUTH_PAGE] Redirecting to:', safeNext);
            router.replace(safeNext as unknown as Route);
            return;
        }
        
        console.warn('[AUTH_PAGE] Redirecting to /dashboard');
        router.replace("/dashboard");
    }, [isAuthenticated, router]);

    useEffect(() => {
        setIsSignup(pathname === "/signup");
    }, [pathname]);

    useEffect(() => {
        const handlePopState = () => {
            setIsSignup(window.location.pathname === "/signup");
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    const handleSwitch = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            const newIsSignup = !isSignup;
            setIsSignup(newIsSignup);
            window.history.pushState(null, "", newIsSignup ? "/signup" : "/login");
            setTimeout(() => setIsTransitioning(false), 50);
        }, 150);
    };

    return (
        <div className="relative flex min-h-screen w-full overflow-hidden bg-background">
            {/* === DESKTOP LAYOUT === */}
            
            {/* Form Panel - Always on the left initially, slides right when signup */}
            <div 
                className={`hidden lg:flex absolute top-0 h-full w-1/2 items-center justify-center bg-background p-16 transition-transform duration-500 ease-in-out ${
                    isSignup ? "translate-x-full" : "translate-x-0"
                }`}
                style={{ left: 0 }}
            >
                <div className="w-full max-w-100 mx-auto">
                    <div 
                        className={`transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
                    >
                        {isSignup ? <SignupForm /> : <LoginForm />}
                    </div>
                </div>
            </div>

            {/* Overlay Panel - Always on the right initially, slides left when signup */}
            <div 
                className={`hidden lg:block absolute top-0 h-full w-1/2 overflow-hidden transition-transform duration-500 ease-in-out ${
                    isSignup ? "-translate-x-full" : "translate-x-0"
                }`}
                style={{ right: 0 }}
            >
                {/* Background - Solid color based on theme */}
                <div className="absolute inset-0 bg-[#6366f1] dark:bg-[#2d3136]">  
                    <div 
                        className="absolute inset-0 opacity-20" 
                        style={{ 
                            backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)", 
                            backgroundSize: "30px 30px" 
                        }} 
                    />
                    {/* CSS-animated blobs */}
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white/20 blur-3xl opacity-40 animate-pulse-slow" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-white/10 blur-3xl opacity-40 animate-pulse-slow-delayed" />
                </div>
                
                {/* Overlay Text Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative z-10 w-full max-w-lg min-w-112.5 mx-auto px-6 text-center text-white mb-40">
                        <div 
                            className={`space-y-4 w-full transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
                        >
                            <h2 className="text-5xl font-bold drop-shadow-md break-keep mb-10">
                                {isSignup ? "Welcome!" : "Join Our PicSel"}
                            </h2>
                            <p className="text-lg text-white/90 leading-normal break-keep">
                            {isSignup 
                            ? "PicSel과 함께 더 스마트한 소비 생활을 시작하세요. 지금 바로 가입하세요."
                            : "이미 계정이 있으신가요? 로그인하고 PicSel의 스마트한 소비 분석을 경험하세요." }
                        </p>
                        <div className="pt-4">
                            <Button 
                                variant="outline" 
                                onClick={handleSwitch}
                                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 rounded-full px-10 py-6 text-lg font-semibold transition-all hover:scale-105"
                            >
                                {isSignup ? "로그인하기" : "회원가입하기"}
                            </Button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            {/* === MOBILE LAYOUT === */}
            <div className="flex lg:hidden flex-col min-h-screen w-full">
                <div className="flex items-start bg-background p-6 pt-20">
                    <div className="w-full max-w-100">
                        <div 
                            className={`transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
                        >
                            {isSignup ? <SignupForm /> : <LoginForm />}
                        </div>
                    </div>
                </div>

                <div className="bg-background p-4 text-center border-t">
                    <button onClick={handleSwitch} className="text-sm text-zinc-600 dark:text-zinc-400">
                        {isSignup ? "이미 계정이 있으신가요? 로그인하기" : "계정이 없으신가요? 회원가입하기"}
                    </button>
                </div>
            </div>
        </div>
    );
}
