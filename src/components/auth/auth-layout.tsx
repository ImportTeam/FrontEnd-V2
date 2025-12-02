"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
    children: React.ReactNode;
    image?: React.ReactNode;
    isSignup?: boolean;
}

export function AuthLayout({ children, isSignup = false }: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen w-full overflow-hidden bg-background">
            {/* Left Side (Brand) - Fixed on Left */}
            <div className="relative hidden w-1/2 flex-col justify-between bg-zinc-900 p-10 text-white lg:flex">
                {/* Background Gradient/Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-zinc-900 to-zinc-900" />
                <div className="absolute inset-0 bg-grid-white/[0.02]" />

                {/* Content */}
                <div className="relative z-10 flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
                        PicSel
                    </Link>
                </div>
                
                <div className="relative z-10 max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-bold leading-tight tracking-tight mb-4">
                            {isSignup ? "스마트한 소비의 시작" : "다시 오셨군요!"}
                        </h1>
                        <p className="text-lg text-zinc-400 leading-relaxed">
                            {isSignup 
                                ? "PicSel과 함께 당신의 모든 결제 순간을\n가장 현명한 선택으로 만들어보세요." 
                                : "PicSel이 분석한 당신만의 혜택이\n기다리고 있습니다."}
                        </p>
                    </motion.div>
                </div>

                <div className="relative z-10 text-sm text-zinc-500">
                    © {new Date().getFullYear()} PicSel. All rights reserved.
                </div>
            </div>

            {/* Right Side (Form) */}
            <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2 bg-background relative">
                <div className="absolute left-4 top-4 md:left-8 md:top-8">
                    <Link
                        href="/"
                        className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        메인으로
                    </Link>
                </div>
                
                <div className="absolute right-4 top-4 md:right-8 md:top-8">
                    <Link 
                        href={isSignup ? "/login" : "/signup"}
                        className="text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                        {isSignup ? "이미 계정이 있으신가요? 로그인" : "계정이 없으신가요? 회원가입"}
                    </Link>
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full max-w-sm space-y-6"
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
}
