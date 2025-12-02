import { Download, Search, MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    id: "01",
    title: "설치하기",
    description: "크롬 웹스토어에서 PicSel 확장 프로그램을 추가하세요.\n3초면 설치가 완료됩니다.",
    icon: Download,
    image: "bg-blue-500/10", // Placeholder for image
  },
  {
    id: "02",
    title: "자동 분석",
    description: "쇼핑몰 결제 페이지에 진입하면,\nPicSel이 자동으로 혜택을 분석합니다.",
    icon: Search,
    image: "bg-purple-500/10",
  },
  {
    id: "03",
    title: "최적의 선택",
    description: "가장 유리한 결제수단을 클릭 한 번으로 확인하고,\n놓친 혜택을 챙기세요.",
    icon: MousePointerClick,
    image: "bg-green-500/10",
  },
];

export function HowToUse() {
  return (
    <section id="usage" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            복잡한 과정 없이,<br />
            <span className="text-primary">설치 한 번으로 시작하세요</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            PicSel이 당신의 쇼핑을 더 스마트하게 만들어드립니다.
          </p>
        </div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              <div className="flex-1 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl mb-4">
                  {step.id}
                </div>
                <h3 className="text-3xl font-bold">{step.title}</h3>
                <p className="text-xl text-muted-foreground whitespace-pre-line leading-relaxed">
                  {step.description}
                </p>
                {index === 0 && (
                  <div className="pt-4">
                    <Button size="lg" className="rounded-full px-8">
                      무료로 시작하기
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="flex-1 w-full max-w-xl">
                <div className={`aspect-video rounded-2xl border border-border/50 shadow-2xl ${step.image} flex items-center justify-center relative overflow-hidden group`}>
                   {/* Placeholder Visuals */}
                   <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-transparent" />
                   <step.icon className="w-24 h-24 text-primary/20 transition-transform duration-500 group-hover:scale-110" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
