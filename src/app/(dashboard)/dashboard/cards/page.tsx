import { loadPaymentMethods } from "./actions";
import { CardsPageClient } from "./cards-page-client";

import type { PaymentCard } from "@/lib/api/types";

export const dynamic = "force-dynamic";

// eslint-disable-next-line no-restricted-syntax
export default async function CardsPage() {
  const list = await loadPaymentMethods().catch(() => null);
  const initialError = list
    ? null
    : "결제수단을 불러오지 못했습니다.";

  return (
    <CardsPageClient
      initialPayments={(list ?? []) as PaymentCard[]}
      initialError={initialError}
    />
  );
}
