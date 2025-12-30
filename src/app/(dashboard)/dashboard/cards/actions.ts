"use server";

import { paymentMethodClient } from "@/lib/api/clients/payment-method.server";
import { logger } from "@/lib/logger";

import type { PaymentCard } from "@/lib/api/types";

export async function loadPaymentMethods(): Promise<PaymentCard[] | null> {
  const log = logger.scope("CARDS_PAGE");
  try {
    return await paymentMethodClient.listPaymentMethods();
  } catch (error) {
    log.error("Failed to load payment methods:", error);
    return null;
  }
}

export async function startCardRegistration(returnUrl: string): Promise<
  { success: true; redirectUrl: string } | { success: false; error: string }
> {
  const log = logger.scope("CARDS_PAGE");
  try {
    const result = await paymentMethodClient.startCardRegistration(returnUrl);
    if (!result.redirectUrl) {
      return { success: false, error: "카드 등록 URL을 받지 못했습니다." };
    }
    return { success: true, redirectUrl: result.redirectUrl };
  } catch (error) {
    log.error("Failed to start card registration:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "카드 등록을 시작할 수 없습니다.",
    };
  }
}

export async function setDefaultPaymentMethod(
  paymentMethodId: string
): Promise<{ success: boolean; error?: string }> {
  const log = logger.scope("CARDS_PAGE");
  try {
    await paymentMethodClient.setPrimaryPaymentMethod(paymentMethodId);
    return { success: true };
  } catch (error) {
    log.error("Failed to set default payment method:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "기본 결제수단 설정에 실패했습니다.",
    };
  }
}

export async function deletePaymentMethod(
  paymentMethodId: string
): Promise<{ success: boolean; error?: string }> {
  const log = logger.scope("CARDS_PAGE");
  try {
    await paymentMethodClient.deletePaymentMethod(paymentMethodId);
    return { success: true };
  } catch (error) {
    log.error("Failed to delete payment method:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "결제수단 삭제에 실패했습니다.",
    };
  }
}
