/**
 * Payment Icon Mapping Utilities
 * Manages card type and payment provider to icon path mappings
 */

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
  KAKAO_PAY: { icon: "kakaoPay.webp", folder: "payments/kakao" },
  NAVER_PAY: { icon: "naver.webp", folder: "payments/naver" },
  PAYCO: { icon: "payco.webp", folder: "payments/payco" },
  SAMSUNG_PAY: { icon: "Samsung Pay.webp", folder: "payments/samsung" },
  TOSS: { icon: "Toss.webp", folder: "payments/toss" },

  // Alias / locale variants
  "애플페이": { icon: "apple.webp", folder: "payments/apple" },
  "APPLE PAY": { icon: "apple.webp", folder: "payments/apple" },

  "카카오페이": { icon: "kakaoPay.webp", folder: "payments/kakao" },
  "KAKAOPAY": { icon: "kakaoPay.webp", folder: "payments/kakao" },
  "KAKAO PAY": { icon: "kakaoPay.webp", folder: "payments/kakao" },

  "네이버페이": { icon: "naver.webp", folder: "payments/naver" },
  "NAVERPAY": { icon: "naver.webp", folder: "payments/naver" },
  "NAVER PAY": { icon: "naver.webp", folder: "payments/naver" },

  "삼성페이": { icon: "Samsung Pay.webp", folder: "payments/samsung" },
  "SAMSUNG PAY": { icon: "Samsung Pay.webp", folder: "payments/samsung" },

  "토스": { icon: "Toss.webp", folder: "payments/toss" },
  "토스페이": { icon: "Toss.webp", folder: "payments/toss" },
  "TOSS PAY": { icon: "Toss.webp", folder: "payments/toss" },

  "페이코": { icon: "payco.webp", folder: "payments/payco" },
};

export interface IconPath {
  src: string;
  alt: string;
}

function normalizeKey(input: string): string {
  return input
    .trim()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/카드$/u, "")
    .toUpperCase();
}

/**
 * Get icon path for both credit cards and payment methods
 * @param cardType - Card type (VISA, MASTERCARD, etc)
 * @param paymentProvider - Payment provider (Apple Pay, Kakao Pay, etc) - optional
 * @returns Icon path object with src and alt text, or null if not found
 */
export function getPaymentIconPath(
  cardType: string | null | undefined,
  paymentProvider?: string | null
): IconPath | null {
  // Try payment provider resolution first (explicit provider, then cardType as provider)
  const rawProvider = paymentProvider ?? cardType ?? null;
  if (rawProvider) {
    const providerKey = normalizeKey(rawProvider);
    const provider = paymentProviderToIcon[providerKey];
    if (provider) {
      const encodedIcon = encodeURIComponent(provider.icon);
      return {
        src: `/assets/${provider.folder}/${encodedIcon}`,
        alt: rawProvider,
      };
    }
  }

  // Otherwise treat as card type
  if (!cardType) return null;
  const cardTypeKey = normalizeKey(cardType);
  const iconName = cardTypeToIcon[cardTypeKey];

  // Fuzzy match for variants (e.g. "KB국민카드", "SHINHAN CREDIT")
  const fuzzyIconName =
    iconName ??
    Object.entries(cardTypeToIcon).find(([key]) => cardTypeKey.includes(key))?.[1];

  if (fuzzyIconName) {
    return {
      src: `/assets/card/${fuzzyIconName}.webp`,
      alt: cardType,
    };
  }

  return null;
}

/**
 * Get fallback display name for unknown card/payment types
 * @param cardType - Card type string
 * @returns Abbreviated display name (first 2 chars uppercase)
 */
export function getPaymentTypeAbbr(cardType: string): string {
  if (!cardType) return "??";
  return cardType.substring(0, 2).toUpperCase() || "??";
}
