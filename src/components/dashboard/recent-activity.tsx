"use client";

import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api/client";
import { getPaymentIconPath, getPaymentTypeAbbr } from "@/lib/payment-icon-mapping";

import type { PaymentCard } from "@/lib/api/types";

export function RecentActivity() {
  const [paymentCards, setPaymentCards] = useState<PaymentCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPaymentMethods() {
      try {
        setLoading(true);
        setError(null);

        const response = await api.paymentMethods.list();

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
        setPaymentCards([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPaymentMethods();
  }, []);

  // Loading state
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

  // Error state
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

  // Empty state
  if (!paymentCards || paymentCards.length === 0) {
    return (
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>최근 이용 사이트별 결제수단</CardTitle>
          <p className="text-sm text-muted-foreground">등록된 결제 수단이 없습니다.</p>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground text-center py-8">결제 수단을 등록해주세요.</div>
        </CardContent>
      </Card>
    );
  }

  // Success state
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
          {paymentCards.map((method) => (
            <PaymentCardItem key={method.uuid} method={method} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface PaymentCardItemProps {
  method: PaymentCard;
}

function PaymentCardItem({ method }: PaymentCardItemProps) {
  const iconPath = getPaymentIconPath(method.cardType);
  const createdDate = method.createdAt
    ? new Date(method.createdAt).toLocaleDateString("ko-KR")
    : "알 수 없음";
  const isPrimary = method.isPrimary ?? false;

  return (
    <div className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
      {/* Icon */}
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
                const img = e.currentTarget as HTMLImageElement;
                const svgPath = iconPath.src.replace(/\.webp$/, ".svg");
                img.src = svgPath;
              }}
            />
          </div>
        ) : (
          <div className="text-xs font-semibold text-muted-foreground">
            {getPaymentTypeAbbr(method.cardType)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium truncate">{method.alias}</p>
          {isPrimary ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-xs font-medium text-blue-700 dark:text-blue-300 shrink-0">
              주 결제수단
            </span>
          ) : null}
        </div>
        <p className="text-xs text-muted-foreground">
          {method.cardType} •••• {method.last4}
        </p>
        <p className="text-xs text-muted-foreground">{createdDate}에 등록됨</p>
      </div>

      {/* Icon Badge */}
      <div className="shrink-0">
        <ShoppingBag className="h-5 w-5 text-muted-foreground" />
      </div>
    </div>
  );
}
