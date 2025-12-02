"use client";

import { motion } from "framer-motion";
import { CreditCard, Smartphone, TrendingUp, Check } from "lucide-react";

const steps = [
    {
        id: "01",
        title: "설치하기",
        description: "크롬 익스텐션에서 PicSel을 추가하세요. 주요 쇼핑몰에서 자동으로 작동합니다.",
        icon: Smartphone,
        color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
        id: "02",
        title: "등록하기",
        description: "자주 사용하는 카드의 기본 정보를 등록하세요. PicSel이 혜택 데이터를 자동으로 매칭합니다.",
        icon: CreditCard,
        color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
    },
    {
        id: "03",
        title: "비교하기",
        description: "결제 시 PicSel이 자동으로 혜택을 비교하여 가장 유리한 결제 수단을 알려줍니다.",
        icon: TrendingUp,
        color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
    },
    {
        id: "04",
        title: "사용하기",
        description: "알려드린 최적의 결제 수단으로 결제하고, 놓치던 포인트와 할인을 모두 챙기세요!",
        icon: Check,
        color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
    }
];

export function HowToUse() {
    return (
        <section className="py-24 bg-white dark:bg-zinc-900">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">사용 방법</h2>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
                        복잡한 설정 없이, 평소처럼 쇼핑하세요. 나머지는 PicSel이 알아서 합니다.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="h-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 p-6 hover:shadow-lg transition-shadow">
                                <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mb-6`}>
                                    <step.icon className="w-6 h-6" />
                                </div>
                                <div className="text-4xl font-bold text-zinc-200 dark:text-zinc-800 mb-4 absolute top-6 right-6">
                                    {step.id}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
