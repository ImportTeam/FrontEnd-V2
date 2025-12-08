export interface CardData {
  id: number;
  bankName: string;
  cardName: string;
  cardNumber: string;
  imageSrc?: string;
  colorFrom?: string;
  colorTo?: string;
  balance: string;
  limit: string;
  textColor?: string;
  usagePercent?: number;
}

export const MOCK_CARDS: CardData[] = [
  {
    id: 1,
    bankName: "Shinhan Card",
    cardName: "Deep Dream",
    cardNumber: "1234",
    imageSrc: "/assets/card/shinhanCard.svg",
    balance: "350,000",
    limit: "500,000",
    textColor: "text-white",
    usagePercent: 70,
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
    usagePercent: 0,
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
    usagePercent: 45,
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
    usagePercent: 10,
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
    usagePercent: 100,
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
    usagePercent: 21,
  },
];

export interface TransactionData {
  id: number;
  merchant: string;
  category: string;
  amount: string;
  date: string;
  cardName: string;
  benefit: string;
}

export const MOCK_TRANSACTIONS: TransactionData[] = [
  {
    id: 1,
    merchant: "스타벅스 강남점",
    category: "카페",
    amount: "-5,500원",
    date: "오늘 10:30",
    cardName: "현대카드 ZERO",
    benefit: "5% 할인 적용",
  },
  {
    id: 2,
    merchant: "쿠팡",
    category: "온라인쇼핑",
    amount: "-45,000원",
    date: "오늘 09:15",
    cardName: "삼성카드 taptap O",
    benefit: "7% 할인 적용",
  },
  {
    id: 3,
    merchant: "GS25 역삼점",
    category: "편의점",
    amount: "-3,200원",
    date: "어제 22:40",
    cardName: "신한카드 Deep Dream",
    benefit: "10% 적립",
  },
  {
    id: 4,
    merchant: "CGV 코엑스",
    category: "영화",
    amount: "-14,000원",
    date: "어제 19:00",
    cardName: "KB국민카드",
    benefit: "2천원 할인",
  },
  {
    id: 5,
    merchant: "배달의민족",
    category: "배달",
    amount: "-23,500원",
    date: "어제 12:30",
    cardName: "현대카드 ZERO",
    benefit: "3% 할인 적용",
  },
];

export interface RecommendationData {
  id: number;
  rank: number;
  cardName: string;
  benefit: string;
  isRecommended: boolean;
}

export const MOCK_RECOMMENDATIONS: RecommendationData[] = [
  {
    id: 1,
    rank: 1,
    cardName: "현대카드 ZERO Edition2",
    benefit: "모든 가맹점 0.7% 할인",
    isRecommended: true,
  },
  {
    id: 2,
    rank: 2,
    cardName: "삼성카드 taptap O",
    benefit: "쇼핑 7% 할인",
    isRecommended: false,
  },
  {
    id: 3,
    rank: 3,
    cardName: "신한카드 Mr.Life",
    benefit: "공과금 10% 할인",
    isRecommended: false,
  },
];

export interface SummaryData {
  totalSavings: string;
  totalSavingsChange: string;
  monthlySpending: string;
  monthlySpendingChange: string;
  cardsCount: number;
  activeCards: number;
  recommendationAccuracy: string;
}

export const MOCK_SUMMARY: SummaryData = {
  totalSavings: "125,000원",
  totalSavingsChange: "+12.5%",
  monthlySpending: "1,250,000원",
  monthlySpendingChange: "-5.2%",
  cardsCount: 6,
  activeCards: 4,
  recommendationAccuracy: "94%",
};
