"use client";

import { LazyMotion, m } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const loadFeatures = () => import("framer-motion").then((mod) => mod.domAnimation);

export function Hero() {
    return (
        <LazyMotion features={loadFeatures}>
        <section className="relative min-h-screen w-full overflow-hidden bg-background flex items-start pt-24 lg:pt-12">
            {/* Background Gradients - Cross-fade implementation */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Dark Mode Gradient (Visible in dark mode) */}
                <div className="absolute inset-0 bg-linear-to-b from-blue-950/20 via-background/80 to-background opacity-0 dark:opacity-100 transition-opacity duration-500 ease-in-out" />
                
                {/* Light Mode Gradient (Visible in light mode) */}
                <div className="absolute inset-0 bg-linear-to-b from-blue-50 via-background/80 to-background dark:opacity-0 transition-opacity duration-500 ease-in-out" />
            </div>

            <div className="container relative z-10">
                {/* 6:4 ratio grid */}
                <div className="grid gap-8 lg:grid-cols-10 lg:gap-12 xl:gap-16 items-center">
                    {/* Left Content - 6 columns */}
                    <div className="lg:col-span-6 flex flex-col justify-center space-y-10 lg:pl-8 xl:pl-22">
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-300 mb-6">
                                <Sparkles className="mr-2 h-4 w-4" />
                                AI 기반 스마트 소비 분석
                            </div>
                            <h1 className="text-5xl font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-muted-foreground mb-6">
                                결제 순간,<br />
                                가장 유리한 선택
                            </h1>
                            <p className="max-w-[600px] text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                복잡한 카드 혜택, 더 이상 고민하지 마세요.<br />
                                PicSel이 당신의 소비 패턴을 분석하여<br />
                                최적의 결제 수단을 실시간으로 추천해드립니다.
                            </p>
                        </m.div>

                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col gap-4 sm:flex-row"
                        >
                            <Link href="/login">
                                <Button size="lg" className="h-12 px-6 lg:h-14 lg:px-8 text-base lg:text-lg rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 group 2xl:h-16 2xl:px-10 2xl:text-xl">
                                    내 결제수단에 맞는 혜택 보러가기
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 2xl:h-6 2xl:w-6" />
                                </Button>
                            </Link>
                        </m.div>

                        <div className="flex items-center gap-4 text-sm text-zinc-700 dark:text-zinc-300 2xl:text-base">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted 2xl:h-10 2xl:w-10" />
                                ))}
                            </div>
                            <p>이미 50,000+ 명이 스마트한 소비를 시작했습니다</p>
                        </div>
                    </div>

                    {/* Right Visual - 4 columns - Real Cards */}
                    <m.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-4 relative h-[400px] sm:h-[500px] lg:h-[550px] xl:h-[600px] flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-[450px] sm:max-w-[500px] lg:max-w-[480px] 2xl:max-w-[600px] aspect-square">
                            {/* Abstract Background Blobs */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-linear-to-br from-blue-100/50 to-purple-100/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl" />
                            
                            {/* Main Hero Icon - Static Large Image */}
                            <div className="relative w-full h-full flex items-center justify-center z-10">
                                <div className="relative w-[90%] h-[90%] rounded-3xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/assets/icon/heroIcon.png"
                                        alt="PicSel Benefits Display"
                                        fill
                                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 450px"
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </m.div>
                </div>
            </div>
        </section>
        </LazyMotion>
    );
}
