import Image from "next/image";

const steps = [
    {
        id: "01",
        title: "설치하기",
        description: "크롬 익스텐션에서 PicSel을 추가하세요.\n주요 쇼핑몰에서 자동으로 작동합니다.",
        image: "/assets/how/install.png",
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
        <section id="usage" className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold tracking-tight mb-6">사용 방법</h2>
                </div>

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="flex flex-col items-center text-center group animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Image Box */}
                            <div className="w-full aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-2xl mb-8 shadow-sm group-hover:shadow-md transition-all duration-300 overflow-hidden relative">
                                {step.image ? (
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-linear-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900" />
                                )}
                            </div>

                            <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                            <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line hidden sm:block">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
