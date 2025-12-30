"use client";

import { Plus, MoreHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { CreditCardVisual } from "@/components/dashboard/credit-card-visual";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  deletePaymentMethod,
  loadPaymentMethods,
  setDefaultPaymentMethod,
  startCardRegistration,
} from "./actions";

import type { PaymentCard } from "@/lib/api/types";

// CardData 타입 정의
interface CardData {
  id: string;
  bankName: string;
  cardName: string;
  cardNumber: string;
  imageSrc?: string;
  balance?: string;
  limit?: string;
  textColor?: string;
  usagePercent?: number;
  isPrimary: boolean;
}

function formatPercent(value: number) {
  const clamped = Math.max(0, Math.min(100, value));
  return `${clamped.toFixed(0)}%`;
}

/**
 * Convert PaymentCard from backend API to CardData for UI rendering
 * Maps backend payment card data to the expected CardData structure
 */
function paymentCardToCardData(payment: PaymentCard): CardData {
  return {
    id: payment.seq?.toString() || "unknown",
    bankName: payment.cardType?.split(" ")[0] || "Unknown",
    cardName: payment.alias || `${payment.cardType} ${payment.last4}`,
    cardNumber: `•••• ${payment.last4}`, // Masked card number
    imageSrc: undefined, // Payment API doesn't provide image
    balance: undefined, // Payment API doesn't provide balance
    limit: undefined, // Payment API doesn't provide limit
    textColor: undefined, // Will use default
    usagePercent: undefined, // Payment API doesn't provide usage
    isPrimary: payment.isPrimary ?? false,
  };
}

// eslint-disable-next-line no-restricted-syntax
export default function CardsPage() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sortedCards = useMemo(() => {
    return [...cards].sort((a, b) => Number(Boolean(b.isPrimary)) - Number(Boolean(a.isPrimary)));
  }, [cards]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const list = await loadPaymentMethods();
        if (!list) {
          throw new Error("결제수단을 불러오지 못했습니다.");
        }

        const cardDataList = list.map((payment: PaymentCard) => {
          try {
            return paymentCardToCardData(payment);
          } catch (e) {
            console.error("[CARDS_PAGE] Error converting payment card:", payment, e);
            // Return minimal CardData on conversion error
            return {
              id: payment.uuid || "unknown",
              bankName: "Unknown",
              cardName: "카드 정보 오류",
              cardNumber: "•••• ••••",
              isPrimary: false,
            };
          }
        });
        
        setCards(cardDataList);
      } catch (e) {
        const errorMsg = e instanceof Error ? e.message : "결제수단을 불러오지 못했습니다.";
        console.error("[CARDS_PAGE] Error loading payment methods:", errorMsg, e);
        setError(errorMsg);
        setCards([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleStartRegistration = async () => {
    try {
      const returnUrl = `${window.location.origin}/dashboard/cards`;
      const result = await startCardRegistration(returnUrl);
      if (!result.success) {
        throw new Error(result.error);
      }
      window.location.href = result.redirectUrl;
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : "카드 등록을 시작할 수 없습니다.";
      console.error("[CARDS_PAGE] Error starting card registration:", errorMsg, e);
      setError(errorMsg);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      if (!id) {
        throw new Error("유효하지 않은 카드 ID입니다.");
      }
      const result = await deletePaymentMethod(id);
      if (!result.success) {
        throw new Error(result.error ?? "삭제에 실패했습니다.");
      }
      setCards((prev) => prev.filter((c) => c.id !== id));
      setError(null);
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : "삭제에 실패했습니다.";
      console.error("[CARDS_PAGE] Error deleting card:", id, errorMsg, e);
      setError(errorMsg);
    }
  };

  const handleSetPrimary = async (id: string) => {
    try {
      if (!id) {
        throw new Error("유효하지 않은 카드 ID입니다.");
      }
      const result = await setDefaultPaymentMethod(id);
      if (!result.success) {
        throw new Error(result.error ?? "주 결제수단 설정에 실패했습니다.");
      }
      setCards((prev) => prev.map((c) => ({ ...c, isPrimary: c.id === id })));
      setError(null);
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : "주 결제수단 설정에 실패했습니다.";
      console.error("[CARDS_PAGE] Error setting primary card:", id, errorMsg, e);
      setError(errorMsg);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <PageHeader 
          title="결제수단 관리" 
          description="등록된 카드와 계좌를 한눈에 관리하세요." 
        />
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
          onClick={handleStartRegistration}
        >
          <Plus className="mr-2 h-4 w-4" />
          새 카드 추가
        </Button>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300" role="alert">
          {error}
        </div>
      ) : null}

      {/* Cards Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6 animate-pulse">
              <div className="aspect-[1.586] w-full rounded-2xl bg-muted" />
              <div className="mt-6 space-y-3">
                <div className="h-4 w-32 rounded bg-muted" />
                <div className="h-3 w-48 rounded bg-muted/70" />
                <div className="h-2 w-full rounded bg-muted/60" />
              </div>
            </div>
          ))
        ) : (
        sortedCards.map((card) => (
          <div key={card.id} className="group relative flex flex-col gap-4">
            {/* Card Visual */}
            <div className="relative">
                <CreditCardVisual
                    bankName={card.bankName}
                    cardName={card.cardName}
                    cardNumber={card.cardNumber}
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
                            <DropdownMenuItem disabled>수정</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(card.id)}>삭제</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSetPrimary(card.id)}>
                              {card.isPrimary ? "주카드" : "주카드 설정"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Card Details */}
            <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">이번 달 사용금액</span>
                <span className="text-sm md:text-base font-bold text-zinc-900 dark:text-zinc-100">{card.balance || "-"}</span>
                </div>
                <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full" 
                  style={{ width: formatPercent(card.usagePercent ?? 0) }}
                    />
                </div>
                <div className="flex justify-between items-center text-xs text-zinc-400 dark:text-zinc-500">
                <span>한도 {card.limit || "-"}</span>
                <span>{formatPercent(card.usagePercent ?? 0)} 사용</span>
                </div>
            </div>
          </div>
          )))}
      </div>
    </div>
  );
}
