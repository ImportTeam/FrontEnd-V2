"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface AuthLayoutProps {
    children: React.ReactNode;
    isSignup?: boolean;
}

export function AuthLayout({ children, isSignup = false }: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background p-4 lg:p-8">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 dark:from-zinc-950 dark:via-blue-950/20 dark:to-indigo-950/20" />
            
            {/* Animated Mesh Gradient Blobs */}
            <motion.div 
                className="absolute top-0 -left-4 w-72 h-72 bg-purple-300/30 dark:bg-purple-500/10 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl"
                animate={{
                    x: [0, 100, 0],
                    y: [0, -100, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <motion.div 
                className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300/30 dark:bg-yellow-500/10 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl"
                animate={{
                    x: [0, -100, 0],
                    y: [0, 100, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <motion.div 
                className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300/30 dark:bg-pink-500/10 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl"
                animate={{
                    x: [0, -50, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Main Card Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 flex w-full max-w-6xl overflow-hidden rounded-3xl shadow-2xl backdrop-blur-3xl"
            >
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl" />
                <div className="absolute inset-0 border border-white/20 dark:border-white/10 rounded-3xl" />

                <div className="relative z-10 flex w-full">
                    {/* Left Side - Brand & Illustration */}
                    <div className="relative hidden w-[45%] flex-col justify-between bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-12 text-white lg:flex overflow-hidden">
                        {/* Animated geometric shapes */}
                        <div className="absolute inset-0 overflow-hidden">
                            <motion.div 
                                className="absolute w-64 h-64 border-2 border-white/20 rounded-3xl rotate-12"
                                style={{ top: '10%', left: '-10%' }}
                                animate={{ rotate: [12, 22, 12], y: [0, 20, 0] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div 
                                className="absolute w-96 h-96 border-2 border-white/10 rounded-full"
                                style={{ bottom: '-20%', right: '-15%' }}
                                animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
                                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div 
                                className="absolute w-32 h-32 bg-white/10 rounded-2xl rotate-45"
                                style={{ top: '60%', right: '10%' }}
                                animate={{ rotate: [45, 135, 45], scale: [1, 1.2, 1] }}
                                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            <Link href="/" className="inline-block">
                                <motion.h2 
                                    className="text-3xl font-bold tracking-tight"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    PicSel
                                </motion.h2>
                            </Link>
                        </div>
                        
                        <div className="relative z-10 space-y-6 max-w-md">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                <h1 className="text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                    {isSignup ? "스마트한 소비의\n시작" : "다시 오셨군요"}
                                </h1>
                                <p className="text-lg text-blue-50/90 leading-relaxed font-light">
                                    {isSignup 
                                        ? "PicSel과 함께 모든 결제를 더 현명하게 만들어보세요. AI가 분석한 맞춤 혜택을 확인하세요." 
                                        : "당신을 위해 준비된 맞춤 혜택과 AI 분석 리포트가 기다리고 있습니다."}
                                </p>
                            </motion.div>

                            {/* Feature Pills */}
                            <motion.div 
                                className="flex flex-wrap gap-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                            >
                                {["AI 추천", "실시간 분석", "최저가 보장"].map((feature, i) => (
                                    <div key={i} className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                                        {feature}
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        <div className="relative z-10 text-sm text-blue-50/60 font-light">
                            © {new Date().getFullYear()} PicSel. All rights reserved.
                        </div>
                    </div>

                    {/* Right Side - Form with Glassmorphism */}
                    <div className="flex w-full flex-col items-center justify-center p-8 lg:w-[55%] lg:p-16">
                        <div className="w-full max-w-md">
                            {children}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Bottom decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
    );
}
