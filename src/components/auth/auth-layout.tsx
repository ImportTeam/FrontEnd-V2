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
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4 lg:p-8">
            <div className="flex w-full max-w-[1000px] overflow-hidden rounded-[2rem] bg-white dark:bg-zinc-900 shadow-2xl ring-1 ring-zinc-900/5 dark:ring-white/10">
                
                {/* Left Side (Brand/Gradient) */}
                <div className="relative hidden w-1/2 flex-col justify-between bg-zinc-900 p-12 text-white lg:flex">
                    {/* Background Gradient - Matching the reference image style (Blue/Purple/Blur) */}
                    <div className="absolute inset-0 bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-blue-700 via-indigo-600 to-violet-500 opacity-80" />
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-soft-light" />
                    <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-blue-500/30 blur-[100px]" />
                    <div className="absolute -bottom-20 -right-20 h-[500px] w-[500px] rounded-full bg-purple-500/30 blur-[100px]" />

                    {/* Content */}
                    <div className="relative z-10">
                        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
                            PicSel
                        </Link>
                    </div>
                    
                    <div className="relative z-10 max-w-md space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <h1 className="text-4xl font-bold leading-tight tracking-tight mb-4">
                                {isSignup ? "Get started with PicSel" : "Welcome back"}
                            </h1>
                            <p className="text-lg text-blue-100/90 leading-relaxed">
                                {isSignup 
                                    ? "Access your personal dashboard for smarter spending habits." 
                                    : "Access your tasks, notes, and projects anytime, anywhere."}
                            </p>
                        </motion.div>
                    </div>

                    <div className="relative z-10 text-sm text-blue-200/60">
                        © {new Date().getFullYear()} PicSel. All rights reserved.
                    </div>
                </div>

                {/* Right Side (Form) */}
                <div className="flex w-full flex-col items-center justify-center bg-white dark:bg-zinc-900 p-8 lg:w-1/2 lg:p-12">
                    <div className="w-full max-w-sm space-y-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
        </div>
    );
}
