"use client";

import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api/client";

import type { PaymentCard } from "@/lib/api/types";

// CardType to SVG icon mapping for credit/debit cards
const cardTypeToIcon: Record<string, string> = {
  // Visa variants
  VISA: "visaCard",
  "VISA CLASSIC": "visaCard",
  "VISA GOLD": "visaCard",
  "VISA PLATINUM": "visaCard",
  "VISA INFINITE": "visaCard",
  
  // Mastercard variants
  MASTERCARD: "masterCard",
  "MASTERCARD STANDARD": "masterCard",
  "MASTERCARD GOLD": "masterCard",
  "MASTERCARD PLATINUM": "masterCard",
  "MASTERCARD BLACK": "masterCard",
  
  // American Express
  AMEX: "visaCard", // Fallback to Visa icon if no AMEX icon
  "AMERICAN EXPRESS": "visaCard",
  
  // Korean cards
  BC: "bcCard",
  HANA: "hanaCard",
  HYUNDAI: "hyundaiCard",
  KB: "kbCard",
  "KB국민": "kbCard",
  LOTTE: "lotteCard",
  "롯데카드": "lotteCard",
  SAMSUNG: "samsungCard",
  "삼성카드": "samsungCard",
  SHINHAN: "shinhanCard",
  "신한카드": "shinhanCard",
  WOORI: "wooriCard",
  "우리카드": "wooriCard",
  
  // Other variants
  DEBIT: "visaCard",
  CHECK: "visaCard",
};

// Payment method provider mapping (for payment apps like Apple Pay, Kakao Pay, etc)
const paymentProviderToIcon: Record<string, { icon: string; folder: string }> = {
  APPLE_PAY: { icon: "apple.webp", folder: "payments/apple" },
  "APPLE PAY": { icon: "apple.webp", folder: "payments/apple" },
  
  KAKAO_PAY: { icon: "kakaoPay.webp", folder: "payments/kakao" },
  "KAKAO PAY": { icon: "kakaoPay.webp", folder: "payments/kakao" },
  
  NAVER_PAY: { icon: "naver.webp", folder: "payments/naver" },
  "NAVER PAY": { icon: "naver.webp", folder: "payments/naver" },
  
  PAYCO: { icon: "payco.webp", folder: "payments/payco" },
  
  SAMSUNG_PAY: { icon: "Samsung Pay.webp", folder: "payments/samsung" },
  "SAMSUNG PAY": { icon: "Samsung Pay.webp", folder: "payments/samsung" },
  
  TOSS: { icon: "Toss.webp", folder: "payments/toss" },
};

// Get icon path for both credit cards and payment methods
const getIconPath = (
  cardType: string,
  paymentProvider?: string
): { src: string; alt: string } | null => {
  // If it's a payment provider (Apple Pay, Kakao Pay, etc)
  if (paymentProvider) {
    const providerKey = paymentProvider.toUpperCase();
    const provider = paymentProviderToIcon[providerKey];
    
    if (provider) {
      return {
        src: `/assets/${provider.folder}/${provider.icon}`,
        alt: paymentProvider,
      };
    }
  }
  
  // Otherwise treat as card type
  const cardTypeKey = cardType.toUpperCase();
  const iconName = cardTypeToIcon[cardTypeKey];
  
  if (iconName) {
    return {
      src: `/assets/card/${iconName}.webp`,
      alt: cardType,
    };
  }
  
  return null;
};

export function RecentActivity() {
  const [paymentCards, setPaymentCards] = useState<PaymentCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPaymentMethods() {
      try {
        setLoading(true);
        setError(null);
        console.log("[RECENT_ACTIVITY] Fetching payment methods...");
        
        const response = await api.paymentMethods.list();
        console.log("[RECENT_ACTIVITY] Payment methods response:", response);
        
        // Validate response is an array
        if (!Array.isArray(response)) {
          throw new Error("Invalid response format: expected array of payment cards");
        }
        
        // Validate each card has required fields
        const validCards = response.filter((card): card is PaymentCard => {
          if (!card || typeof card !== "object") {
            console.warn("[RECENT_ACTIVITY] Skipping invalid card:", card);
            return false;
          }
          return true;
        });
        
        if (validCards.length === 0 && response.length > 0) {
          console.warn("[RECENT_ACTIVITY] No valid cards found in response");
        }
        
        setPaymentCards(validCards);
      } catch (err) {
        console.error("[RECENT_ACTIVITY] Error fetching payment methods:", err);
        const errorMsg = err instanceof Error ? err.message : "결제 수단 조회 중 오류가 발생했습니다.";
        setError(errorMsg);
        setPaymentCards([]); // Reset to empty on error
      } finally {
        setLoading(false);
      }
    }

    fetchPaymentMethods();
  }, []);

  if (loading) {
    return (
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>최근 이용 사이트별 결제수단</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-muted/50 rounded-lg animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>최근 이용 사이트별 결제수단</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground text-center py-8">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!paymentCards || paymentCards.length === 0) {
    return (
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>최근 이용 사이트별 결제수단</CardTitle>
          <p className="text-sm text-muted-foreground">
            등록된 결제 수단이 없습니다.
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground text-center py-8">
            결제 수단을 등록해주세요.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>결제 수단</CardTitle>
        <p className="text-sm text-muted-foreground">
          등록된 결제 수단 목록입니다. {paymentCards.length}개의 카드가 등록되어 있습니다.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {paymentCards.map((method) => {
            const iconPath = getIconPath(method.cardType);
            const createdDate = method.createdAt ? new Date(method.createdAt).toLocaleDateString("ko-KR") : "알 수 없음";
            const isPrimary = method.isPrimary ?? false;
            
            return (
              <div 
                key={method.uuid} 
                className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                {/* Card/Payment Icon */}
                <div className="relative h-10 w-16 shrink-0 rounded bg-muted/30 flex items-center justify-center overflow-hidden">
                  {iconPath ? (
                    <div className="relative h-8 w-14 dark:invert">
                      <Image
                        src={iconPath.src}
                        alt={iconPath.alt}
                        fill
                        sizes="56px"
                        className="object-contain"
                        priority={false}
                        onError={(e) => {
                          console.warn(`[RECENT_ACTIVITY] Failed to load image: ${iconPath.src}`);
                          // Fallback to SVG version if webp fails
                          const img = e.currentTarget as HTMLImageElement;
                          const svgPath = iconPath.src.replace(/\.webp$/, '.svg');
                          img.src = svgPath;
                        }}
                      />
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">
                      {method.cardType.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Card Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">
                      {method.alias}
                    </p>
                    {isPrimary ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-xs font-medium text-blue-700 dark:text-blue-300 shrink-0">
                        주결제수단
                      </span>
                    ) : null}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {method.cardType} •••• {method.last4}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {createdDate}에 등록됨
                  </p>
                </div>

                {/* Badge Icon */}
                <div className="shrink-0">
                  <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
