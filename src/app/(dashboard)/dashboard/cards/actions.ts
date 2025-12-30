"use server";

import { paymentMethodClient } from "@/lib/api/clients/payment-method.server";

import type { PaymentCard } from "@/lib/api/types";

export async function loadPaymentMethods(): Promise<PaymentCard[] | null> {
  try {
    const cards = await paymentMethodClient.listPaymentMethods();
    // Map client PaymentCard to API PaymentCard type
    return cards.map((card) => ({
      seq: parseInt(card.id),
      uuid: card.id,
      last4: card.cardNumber?.slice(-4) || "",
      cardType: card.cardBrand,
      alias: card.cardName,
      isPrimary: card.isDefault,
      createdAt: card.createdAt,
    }));
  } catch (error) {
    console.error("[CARDS_PAGE] Failed to load payment methods:", error);
    return null;
  }
}

export async function setDefaultPaymentMethod(
  paymentMethodId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await paymentMethodClient.setDefaultPaymentMethod(paymentMethodId);
    return { success: true };
  } catch (error) {
    console.error("[CARDS_PAGE] Failed to set default payment method:", error);
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
  try {
    await paymentMethodClient.deletePaymentMethod(paymentMethodId);
    return { success: true };
  } catch (error) {
    console.error("[CARDS_PAGE] Failed to delete payment method:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "결제수단 삭제에 실패했습니다.",
    };
  }
}
