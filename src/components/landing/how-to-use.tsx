import { Download, CreditCard, Search, MousePointerClick } from "lucide-react";

const steps = [
    {
        icon: Download,
        title: "설치하기",
        description: "크롬 웹스토어에서 확장 프로그램을 추가하세요. 3초면 설치가 완료됩니다.",
    },
    {
        icon: CreditCard,
        title: "등록하기",
        description: "자주 사용하는 카드와 간편결제 수단을 PicSel 계정에 안전하게 등록하세요.",
    },
    {
        icon: Search,
        title: "비교하기",
        description: "쇼핑 시 결제 페이지에 진입하면, PicSel이 자동으로 혜택을 분석합니다.",
    },
    {
        icon: MousePointerClick,
        title: "사용하기",
        description: "가장 유리한 결제수단을 클릭 한 번으로 확인하고, 놓친 혜택을 챙기세요.",
    },
];

export function HowToUse() {
    return (
        <section id="usage" className="py-24 bg-black text-white">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-2xl text-center mb-20">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">사용 방법</h2>
                    <p className="text-lg text-zinc-400">
                        복잡한 과정 없이, 설치 한 번으로 시작하세요.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <div key={index} className="group relative flex flex-col items-center text-center">
                            <div className="mb-8 flex h-48 w-full items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 transition-all duration-300 group-hover:border-zinc-600 group-hover:bg-zinc-800">
                                <step.icon className="h-16 w-16 text-zinc-500 transition-colors duration-300 group-hover:text-white" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-zinc-100">{step.title}</h3>
                            <p className="text-sm text-zinc-400 leading-relaxed px-2">
                                {step.description}
                            </p>

                            {/* Connector Line (Desktop only, except last item) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-24 -right-4 w-8 h-[2px] bg-zinc-800" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
