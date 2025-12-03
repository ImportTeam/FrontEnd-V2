"use client";

import { motion } from "framer-motion";

const steps = [
    {
        id: "01",
        title: "설치하기",
        description: "크롬 익스텐션에서 PicSel을 추가하세요.\n주요 쇼핑몰에서 자동으로 작동합니다.",
    },
    {
        id: "02",
        title: "등록하기",
        description: "자주 사용하는 카드의 기본 정보를 등록하세요.\nPicSel이 혜택 데이터를 자동으로 매칭합니다.",
    },
    {
        id: "03",
        title: "비교하기",
        description: "결제 시 PicSel이 자동으로 혜택을 비교하여\n가장 유리한 결제 수단을 알려줍니다.",
    },
    {
        id: "04",
        title: "사용하기",
        description: "알려드린 최적의 결제 수단으로 결제하고,\n놓치던 포인트와 할인을 모두 챙기세요!",
    }
];

export function HowToUse() {
    return (
        <section className="py-32 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="container mx-auto px-6 md:px-12 max-w-screen-2xl">
                <div className="text-center mb-24">
                    <h2 className="text-[clamp(1.875rem,1rem+1.5vw,2.5rem)] font-bold tracking-tight mb-6">사용 방법</h2>
                </div>

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center text-center group"
                        >
                            {/* Image Placeholder - Matching the grey box in reference */}
                            <div className="w-full aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-2xl mb-8 shadow-sm group-hover:shadow-md transition-all duration-300 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900" />
                                {/* Optional: Add an icon or illustration here later */}
                            </div>
                            
                            <h3 className="text-[clamp(1.125rem,0.875rem+0.5vw,1.375rem)] font-bold mb-4">{step.title}</h3>
                            <p className="text-[clamp(0.875rem,0.75rem+0.25vw,1rem)] text-zinc-500 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
