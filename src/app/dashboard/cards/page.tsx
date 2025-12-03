"use client";

import { CreditCardVisual } from "@/components/dashboard/credit-card-visual";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal } from "lucide-react";
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
    colorFrom: "#3b82f6", // blue-500
    colorTo: "#1d4ed8",   // blue-700
    balance: "350,000",
    limit: "500,000",
  },
  {
    id: 2,
    bankName: "Naver Financial",
    cardName: "Naver Pay Point",
    cardNumber: "5678",
    colorFrom: "#22c55e", // green-500
    colorTo: "#15803d",   // green-700
    balance: "12,500 P",
    limit: "Auto-Charge",
  },
  {
    id: 3,
    bankName: "Hyundai Card",
    cardName: "ZERO Edition2",
    cardNumber: "9012",
    colorFrom: "#f4f4f5", // zinc-100 (White card)
    colorTo: "#e4e4e7",   // zinc-200
    textColor: "text-zinc-900",
    balance: "890,000",
    limit: "2,000,000",
  },
  {
    id: 4,
    bankName: "Samsung Card",
    cardName: "taptap O",
    cardNumber: "3456",
    colorFrom: "#6366f1", // indigo-500
    colorTo: "#4338ca",   // indigo-700
    balance: "150,000",
    limit: "1,500,000",
  },
  {
    id: 5,
    bankName: "Kakao Bank",
    cardName: "Kakao Mini",
    cardNumber: "7890",
    colorFrom: "#facc15", // yellow-400
    colorTo: "#eab308",   // yellow-500
    textColor: "text-zinc-900",
    balance: "45,000",
    limit: "Check Card",
  },
];

export default function CardsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            결제수단 관리
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            등록된 카드와 계좌를 한눈에 관리하세요.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
          <Plus className="mr-2 h-4 w-4" />
          새 카드 추가
        </Button>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                className={card.textColor ? card.textColor : "text-white"}
                />
                {/* Edit Menu */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white shadow-sm">
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
            <div className="px-1 space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500 dark:text-zinc-400">이번 달 사용금액</span>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{card.balance}원</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full" 
                        style={{ width: '45%' }}
                    />
                </div>
                <div className="flex justify-between items-center text-xs text-zinc-400">
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
