"use client";

import { Plus, MoreHorizontal } from "lucide-react";

import { CreditCardVisual } from "@/components/dashboard/credit-card-visual";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MOCK_CARDS = [
  {
    id: 1,
    bankName: "Shinhan Card",
    cardName: "Deep Dream",
    cardNumber: "1234",
    imageSrc: "/assets/card/shinhanCard.svg",
    balance: "350,000",
    limit: "500,000",
    textColor: "text-white",
  },
  {
    id: 2,
    bankName: "Naver Financial",
    cardName: "Naver Pay Point",
    cardNumber: "5678",
    colorFrom: "#22c55e", 
    colorTo: "#15803d",
    balance: "12,500 P",
    limit: "Auto-Charge",
  },
  {
    id: 3,
    bankName: "Hyundai Card",
    cardName: "ZERO Edition2",
    cardNumber: "9012",
    imageSrc: "/assets/card/hyundaiCard.svg",
    balance: "890,000",
    limit: "2,000,000",
    textColor: "text-white",
  },
  {
    id: 4,
    bankName: "Samsung Card",
    cardName: "taptap O",
    cardNumber: "3456",
    imageSrc: "/assets/card/samsungCard.svg",
    balance: "150,000",
    limit: "1,500,000",
    textColor: "text-white",
  },
  {
    id: 5,
    bankName: "KB Kookmin",
    cardName: "KB Card",
    cardNumber: "7890",
    imageSrc: "/assets/card/kbCard.svg",
    balance: "45,000",
    limit: "Check Card",
    textColor: "text-zinc-900",
  },
  {
    id: 6,
    bankName: "Woori Card",
    cardName: "Woori Card",
    cardNumber: "1122",
    imageSrc: "/assets/card/wooriCard.svg",
    balance: "210,000",
    limit: "1,000,000",
    textColor: "text-white",
  },
];

// eslint-disable-next-line no-restricted-syntax
export default function CardsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <PageHeader 
          title="결제수단 관리" 
          description="등록된 카드와 계좌를 한눈에 관리하세요." 
        />
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
          <Plus className="mr-2 h-4 w-4" />
          새 카드 추가
        </Button>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {MOCK_CARDS.map((card) => (
          <div key={card.id} className="group relative flex flex-col gap-4">
            {/* Card Visual */}
            <div className="relative">
                <CreditCardVisual
                    bankName={card.bankName}
                    cardName={card.cardName}
                    cardNumber={card.cardNumber}
                    colorFrom={card.colorFrom}
                    colorTo={card.colorTo}
                    imageSrc={card.imageSrc}
                    className={card.textColor}
                />
                {/* Edit Menu */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white shadow-sm border-none">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>수정</DropdownMenuItem>
                            <DropdownMenuItem>삭제</DropdownMenuItem>
                            <DropdownMenuItem>주카드 설정</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Card Details */}
            <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">이번 달 사용금액</span>
                    <span className="text-sm md:text-base font-bold text-zinc-900 dark:text-zinc-100">{card.balance}원</span>
                </div>
                <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full" 
                        style={{ width: '45%' }}
                    />
                </div>
                <div className="flex justify-between items-center text-xs text-zinc-400 dark:text-zinc-500">
                    <span>한도 {card.limit}</span>
                    <span>45% 사용</span>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
