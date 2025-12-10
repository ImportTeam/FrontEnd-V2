"use client";

import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
    const pathname = usePathname();
    const router = useRouter();
    const isSignup = pathname === "/signup";

    const handleSwitch = () => {
        router.push(isSignup ? "/login" : "/signup");
    };

    return (
        <div className="flex min-h-screen w-full bg-background lg:flex-row flex-col">
            {/* Image Panel - Hidden on mobile, 50% on desktop */}
            <div
                className={`hidden lg:flex lg:w-1/2 min-h-screen relative items-center justify-center overflow-hidden ${isSignup ? "lg:order-2" : "lg:order-1"} bg-zinc-900`}
            >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-purple-900">
                     {/* Abstract Pattern */}
                     <div className="absolute inset-0 opacity-20" 
                          style={{ 
                              backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)", 
                              backgroundSize: "30px 30px"
                          }} 
                     /> 
                     
                     {/* CSS Animated Shapes */}
                     <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-500 blur-3xl opacity-40 animate-pulse-slow" />
                     <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-400 blur-3xl opacity-40 animate-pulse-slow-delayed" />
                </div>
                
                {/* Overlay Content - Fixed width, centered */}
                <div className="relative z-10 w-full max-w-lg mx-auto px-6 text-center text-white mb-24">
                    <div className="space-y-4 w-full animate-fade-in-up">
                        <h2 className="text-3xl font-bold drop-shadow-md break-keep">
                            {isSignup ? "Welcome Back!" : "Join Our Community"}
                        </h2>
                        <p className="text-base text-white/90 leading-normal break-keep">
                            {isSignup 
                                ? "이미 계정이 있으신가요? 로그인하고 PicSel의 스마트한 소비 분석을 경험하세요." 
                                : "PicSel과 함께 더 스마트한 소비 생활을 시작하세요. 지금 바로 가입하세요."}
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

            {/* Form Panel - 50% Width */}
            <div
                className={`w-full lg:w-1/2 flex items-center justify-center bg-background p-8 lg:p-16 ${isSignup ? "lg:order-1" : "lg:order-2"}`}
            >
                <div className="w-full max-w-[400px] mx-auto space-y-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
