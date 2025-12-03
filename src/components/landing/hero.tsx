"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative min-h-[90vh] w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950 flex items-center">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-blue-50 to-transparent dark:from-blue-950/20 dark:to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-white to-transparent dark:from-zinc-950 dark:to-transparent" />

            <div className="container relative z-10 mx-auto px-4 md:px-6">
                {/* Changed from lg:grid-cols-2 to custom 7:3 ratio */}
                <div className="grid gap-12 lg:grid-cols-10 lg:gap-8 items-center">
                    {/* Left Content - 7 columns */}
                    <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-300 mb-6">
                                <Sparkles className="mr-2 h-3.5 w-3.5" />
                                AI 기반 스마트 소비 분석
                            </div>
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 mb-6">
                                결제 순간,<br />
                                가장 유리한 선택
                            </h1>
                            <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400 leading-relaxed">
                                복잡한 카드 혜택, 더 이상 고민하지 마세요.<br />
                                PicSel이 당신의 소비 패턴을 분석하여<br />
                                최적의 결제 수단을 실시간으로 추천해드립니다.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col gap-4 sm:flex-row"
                        >
                            <Link href="/login">
                                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 group">
                                    내 결제수단에 맞는 혜택 보러가기
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </motion.div>

                        <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white dark:border-zinc-950 bg-zinc-200 dark:bg-zinc-800" />
                                ))}
                            </div>
                            <p>이미 10,000+ 명이 스마트한 소비를 시작했습니다</p>
                        </div>
                    </div>

                    {/* Right Visual - 3 columns */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-3 relative lg:h-[600px] flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-[400px] aspect-square">
                            {/* Abstract Background Blobs */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-blue-100/50 to-purple-100/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl" />
                            
                            {/* Main Visual Container */}
                            <div className="relative w-full h-full perspective-1000">
                                {/* Floating Cards Composition */}
                                <motion.div 
                                    className="absolute top-[10%] right-[10%] w-[70%] aspect-[1.586] rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 shadow-2xl border border-white/10 p-6 flex flex-col justify-between z-20"
                                    animate={{ y: [0, -20, 0], rotateY: [-5, 5, -5] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="w-12 h-8 rounded bg-yellow-500/80" />
                                        <div className="text-white/50 font-mono">PicSel Card</div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex gap-2">
                                            <div className="w-12 h-2 rounded-full bg-white/20" />
                                            <div className="w-8 h-2 rounded-full bg-white/20" />
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div className="text-white text-xl font-mono tracking-widest">**** **** **** 1234</div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div 
                                    className="absolute bottom-[20%] left-[5%] w-[60%] aspect-[1.586] rounded-2xl bg-white dark:bg-zinc-100 shadow-xl border border-zinc-200 p-6 flex flex-col justify-between z-10"
                                    animate={{ y: [0, 20, 0], rotate: [-10, -5, -10] }}
                                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                            <Sparkles className="w-5 h-5 text-blue-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-zinc-500 text-xs mb-1">이번 달 혜택</div>
                                        <div className="text-zinc-900 text-2xl font-bold">₩ 125,000</div>
                                    </div>
                                </motion.div>

                                {/* Decorative Elements */}
                                <motion.div 
                                    className="absolute top-[30%] left-[0%] w-20 h-20 rounded-2xl bg-blue-500/10 backdrop-blur-md border border-blue-500/20 z-30"
                                    animate={{ rotate: [0, 90, 0] }}
                                    transition={{ duration: 10, repeat: Infinity }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
