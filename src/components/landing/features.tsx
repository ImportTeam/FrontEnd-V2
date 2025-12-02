import { CreditCard, Zap, BarChart3, ShieldCheck } from "lucide-react";

const features = [
    {
        icon: Zap,
        title: "실시간 혜택 비교",
        description: "결제 페이지에 진입하는 순간, 보유한 카드 중 가장 혜택이 좋은 카드를 자동으로 찾아줍니다.",
    },
    {
        icon: BarChart3,
        title: "AI 소비 분석",
        description: "지난달 소비 패턴을 분석하여 놓친 혜택을 계산하고, 더 나은 결제 습관을 제안합니다.",
    },
    {
        icon: CreditCard,
        title: "모든 결제수단 통합",
        description: "신용카드, 체크카드, 간편결제(네이버페이, 카카오페이 등) 모든 혜택을 한곳에서 관리하세요.",
    },
    {
        icon: ShieldCheck,
        title: "안전한 데이터 관리",
        description: "개인 금융 정보는 암호화되어 안전하게 저장되며, 결제 정보는 마케팅에 활용되지 않습니다.",
    },
];

export function Features() {
    return (
        <section id="features" className="bg-muted/30 py-20 md:py-32">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">주요 기능 소개</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        온라인 결제 상품 결제 전, PicSel이 더 스마트하게 비교합니다.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border shadow-sm hover:shadow-md transition-shadow">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 font-semibold">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
