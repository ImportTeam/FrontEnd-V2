"use client";

import { LazyMotion, m } from "framer-motion";

const loadFeatures = () => import("framer-motion").then((mod) => mod.domAnimation);


export function Features() {
    return (
        <LazyMotion features={loadFeatures}>
        <section className="py-32 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 max-w-screen-2xl space-y-40">

                {/* Section 1: Image 0 - Text Left, Image Right */}
                <div className="grid gap-16 lg:grid-cols-2 items-center">
                    <m.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <h2 className="text-[clamp(1.875rem,1rem+1.5vw,2.5rem)] font-bold tracking-tight">주요 기능 소개</h2>
                            <div className="inline-block rounded-full bg-orange-100 px-4 py-1.5 text-sm font-medium text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 2xl:text-base">
                                무료 브라우저 확장 프로그램
                            </div>
                        </div>
                        <h3 className="text-[clamp(1.75rem,1rem+1.5vw,2.75rem)] font-bold leading-tight bg-clip-text text-transparent bg-linear-to-r from-orange-500 to-red-600">
                            온라인 결제 상품 결제 전,<br />
                            PicSel이 더 스마트하게 비교합니다.
                        </h3>
                        <p className="text-[clamp(1rem,0.875rem+0.5vw,1.125rem)] text-zinc-700 dark:text-zinc-300 leading-relaxed">
                            여러 결제 페이지에서 고민하지 마세요.<br />
                            PicSel이 카드 혜택부터 적립 혜택까지 자동 분석해,<br />
                            한눈에 가장 유리한 결제수단을 추천합니다.<br />
                            전체 정보를 자동 파악하고, 더 많은 포인트와 캐시백까지 챙기세요.
                        </p>
                    </m.div>
                    <m.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative aspect-square lg:aspect-4/3 bg-zinc-200 dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-linear-to-br from-zinc-100 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900" />
                    </m.div>
                </div>

                {/* Section 2: Image 3 - Image Left, Text Right */}
                <div className="grid gap-16 lg:grid-cols-2 items-center">
                    <m.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="order-2 lg:order-1 relative aspect-square lg:aspect-4/3 bg-zinc-200 dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-linear-to-br from-zinc-100 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900" />
                    </m.div>
                    <m.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="order-1 lg:order-2 space-y-8"
                    >
                        <div className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 2xl:text-base">
                            AI 기반 소비 분석 리포트
                        </div>
                        <h3 className="text-[clamp(1.75rem,1rem+1.5vw,2.75rem)] font-bold leading-tight">
                            매일 가격 확인도, 계산도 이제 그만.<br />
                            PicSel이 당신의 결제 데이터를<br />
                            자동으로 분석합니다.
                        </h3>
                        <p className="text-[clamp(1rem,0.875rem+0.5vw,1.125rem)] text-zinc-700 dark:text-zinc-300 leading-relaxed">
                            PicSel은 카드와 간편결제 데이터를 실시간으로 분석해<br />
                            놓친 혜택, 절약 가능한 금액, 내 효율적인 결제 습관을 한눈에 보여드립니다.<br />
                            매주 업데이트되는 AI 리포트로<br />
                            당신의 소비 습관에 맞는 절약 방법을 추천해드립니다.
                        </p>
                    </m.div>
                </div>

                {/* Section 3: Image 1 - Text Left, Image Right */}
                <div className="grid gap-16 lg:grid-cols-2 items-center">
                    <m.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div className="inline-block rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 2xl:text-base">
                            전 혜택 자동 추적 및 알림 기능
                        </div>
                        <h3 className="text-[clamp(1.75rem,1rem+1.5vw,2.75rem)] font-bold leading-tight">
                            놓치는 혜택 없이,<br />
                            <span className="text-purple-600 dark:text-purple-400">당신의 결제가 더 알뜰해집니다.</span>
                        </h3>
                        <p className="text-[clamp(1rem,0.875rem+0.5vw,1.125rem)] text-zinc-700 dark:text-zinc-300 leading-relaxed">
                            매월 제공되는 구독 혜택부터 은행 캐시백까지<br />
                            PicSel이 모든 카드·페이 혜택을 자동으로 추적합니다.<br />
                            시작일부터 만료 닿은 혜택을 알림으로 알려주고,<br />
                            곧 만료될 포인트 미리 챙겨드립니다.
                        </p>
                    </m.div>
                    <m.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative aspect-square lg:aspect-4/3 bg-zinc-200 dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-linear-to-br from-zinc-100 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900" />
                    </m.div>
                </div>

            </div>
        </section>
        </LazyMotion>
    );
}
