import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, CreditCard, Trash2, Edit2 } from "lucide-react";

// Simple SVG Icons for Card Companies
const ShinhanIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white">
        <circle cx="12" cy="12" r="10" fill="#0046FF" />
        <path d="M12 4L14 10H10L12 4Z" fill="white" />
    </svg>
);

const SamsungIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white">
        <rect x="2" y="6" width="20" height="12" rx="2" fill="#034EA2" />
        <ellipse cx="12" cy="12" rx="8" ry="4" fill="none" stroke="white" strokeWidth="1.5" transform="rotate(-15 12 12)" />
    </svg>
);

const NaverPayIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
        <rect width="24" height="24" rx="4" fill="#03C75A" />
        <path d="M7 7H10L14 13V7H17V17H14L10 11V17H7V7Z" fill="white" />
    </svg>
);

const cards = [
    {
        id: 1,
        name: "신한 Deep Dream",
        type: "신용카드",
        number: "**** **** **** 1234",
        color: "bg-blue-600",
        icon: ShinhanIcon,
    },
    {
        id: 2,
        name: "삼성카드 taptap O",
        type: "신용카드",
        number: "**** **** **** 5678",
        color: "bg-indigo-600",
        icon: SamsungIcon,
    },
    {
        id: 3,
        name: "네이버페이",
        type: "간편결제",
        number: "연동 완료",
        color: "bg-green-500",
        icon: NaverPayIcon,
    },
];

export default function PaymentMethodsPage() {
    return (
        <div className="flex flex-col gap-6">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">결제수단 관리</h1>
                    <p className="text-muted-foreground">
                        등록된 카드와 간편결제 수단을 관리하세요.
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    카드 추가하기
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cards.map((card) => (
                    <Card key={card.id} className="relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-2 h-full ${card.color}`} />
                        <CardHeader className="pl-6 text-white">
                            <div className="flex justify-between items-start">
                                <CardTitle>{card.name}</CardTitle>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/20">
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white/80 hover:text-red-300 hover:bg-white/20">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <CardDescription className="text-white/80">{card.type}</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                    <card.icon />
                                </div>
                                <p className="font-mono text-lg text-white/90">{card.number}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                <Button variant="outline" className="h-full min-h-[180px] flex flex-col gap-4 border-dashed">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <Plus className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <span className="font-medium">새 결제수단 등록</span>
                </Button>
            </div>
        </div>
    );
}
