/**
 * ✅ 실무 표준: 모든 API 응답은 이 구조를 따름
 * 
 * 규칙:
 * - 배열 API: ApiEnvelope<T[]>
 * - 객체 API: ApiEnvelope<T>
 * - 에러: error 객체 포함
 */
export interface ApiEnvelope<T> {
  data: T;
  message?: string;
  statusCode?: number;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

/**
 * ❌ DEPRECATED: ApiResponse는 더 이상 사용하지 않음
 * 대신 ApiEnvelope 사용
 * 
 * 사유: data가 optional이면 FE에서 항상 방어 코드 필요
 */
export interface ApiResponse<T> {
  message?: string;
  data?: T;
  statusCode?: number;
  errorType?: string;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

// --- Auth Types ---
/**
 * API 응답 (snake_case, 래핑 없음)
 */
export interface AuthResponse {
  message: string;
  access_token: string;
  refresh_token: string;
  issued_at: string;
  user: {
    id: string;
    uuid: string;
    email: string;
    name: string;
  };
}

/**
 * UI용 정규화된 타입 (camelCase)
 */
export interface AuthResponseNormalized {
  accessToken: string;
  refreshToken: string;
  issuedAt: string;
  user: UserProfile;
}

// OAuth Social Login Response (different structure from regular auth)
export interface OAuthResponse {
  message?: string;
  access_token: string;
  refresh_token: string;
  issued_at: string;
  user: {
    id: string;
    uuid: string;
    email: string;
    name: string;
    provider?: string;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface UserProfile {
  id: string;
  uuid: string;
  email: string;
  name: string;
  profileImage?: string | null;
}

export interface RefreshTokenResponse {
  accessToken: string;
  issuedAt: string;
}

// --- Dashboard Types ---
export interface SavingsMetric {
  month: string;
  totalSavings: number;
  currency: string;
}

export interface TopMerchantMetric {
  merchant: string;
  transactionCount: number;
  totalAmount: number;
}

export interface TopPaymentMethodMetric {
  paymentMethodId: string;
  cardName: string;
  usageCount: number;
  totalAmount: number;
}

export interface AiBenefitSummary {
  summary: string;
  recommendedCard: string;
  expectedMonthlySavings: number;
}

export interface MonthlySavingsChartData {
  month: string;
  savings: number;
}

export interface RecommendedPaymentMethodChartData {
  rank: number;
  cardName: string;
  expectedSavings: number;
}

export interface MerchantTransactionSummary {
  merchant: string;
  recentTransactions: {
    amount: number;
    paymentMethod: string;
    paidAt: string;
  }[];
}

export interface SummaryData {
    totalSavings: string;
    totalSavingsChange: string;
    monthlySpending: string;
    monthlySpendingChange: string;
    topCategory?: string;
    topCategoryPercent?: string;
    topPaymentMethod?: string;
    topPaymentMethodCount?: number;
    aiBenefit?: string;
    aiBenefitAmount?: string;
}

// --- Payment Method Types ---
export type PaymentMethodType = 'CARD' | 'BANK';

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  cardCompany?: string;
  cardName: string;
  isPrimary: boolean;
  maskedCardNumber?: string; // Optional in list view, present in some contexts
  createdAt?: string;
}

export interface PaymentMethodStatistics {
  totalCount: number;
  primaryType: string;
  cardCompanyUsage: Record<string, number>;
}

export interface CardDetails {
  cardCompany: string;
  cardName: string;
  cardType: string;
  billingDay: number;
}

// --- Payment/Transaction Types ---
export interface TransactionRecord {
  id: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELED' | 'REFUNDED';
  paidAt: string;
  createdAt: string;
}

// --- Analytics Types ---
export interface CategoryExpense {
  category: string;
  totalAmount: number;
  ratio: number;
}

export interface MonthlyExpense {
  month: string;
  totalAmount: number;
}

export interface TransactionDetail {
  transactionId: string;
  merchant: string;
  category: string;
  amount: number;
  paymentMethod: string;
  paidAt: string;
}

// --- Type Aliases for existing components (Adpater layer) ---
// These help existing components work with new API types with minimal changes
export interface CardData {
  id: number | string; // Adjusted to accept string IDs from backend
  bankName: string;
  cardName: string;
  cardNumber: string; // Will be masked
  imageSrc?: string;
  balance?: string; // Might not be in new API
  limit?: string; // Might not be in new API
  textColor?: string;
  usagePercent?: number;
  isPrimary?: boolean; // Added
}

export interface TransactionData {
  id: number | string;
  merchant: string;
  category: string;
  amount: string; // Formatting required
  date: string;
  paidAt?: string;
  cardName: string;
  benefit?: string;
}

export interface RecommendationData {
  id: number;
  rank: number;
  cardName: string;
  benefit: string;
  isRecommended: boolean;
  expectedSavings?: number;
}

// --- Session Types ---
export interface SessionData {
  id: string;
  deviceInfo: string;
  createdAt: string;
  expiresAt: string;
}

// --- Analytics Types ---
export interface TopMerchantData {
  range: string;
  merchantName: string;
  totalSpent: number;
  totalSpentKrw: string;
}

export interface MonthlySavingsData {
  month: string;
  totalSpent: number;
}

export interface TransactionListItem {
  id: string;
  merchantName: string;
  category: string;
  transactionAt: string;
  spendAmount: number;
  paidAmount: number;
  discountOrRewardAmount: number;
  paymentMethodId: number;
  paymentMethodName: string;
}

export interface TransactionListResponse {
  data: TransactionListItem[];
  pagination: {
    page: number;
    size: number;
    totalCount: number;
    hasNext: boolean;
  };
}

// --- User Types ---
export interface UserCurrentResponse {
  id: string;
  uuid: string;
  email: string;
  name: string;
  socialProvider: string;
  isVerified: boolean;
  verifiedAt?: string;
  createdAt: string;
  settings: {
    darkMode: boolean;
    notificationEnabled: boolean;
    compareMode: string;
    currencyPreference: string;
    updatedAt: string;
  };
}

// --- New API Response Types (Updated BE Integration) ---

// 1. Monthly Savings Chart Response
export interface MonthlySavingsChartItem {
  month: string;
  name: string;
  totalSpent: number;
  spent: number;
  totalBenefit: number;
  benefit: number;
  savingsAmount: number;
  saved: number;
  value: number;
}

export interface MonthlySavingsChartResponse {
  data: MonthlySavingsChartItem[];
  ai: {
    summary: string;
    highlights: string[];
  };
}

// 2. AI Top 3 Metrics Response
export interface AIMetricItem {
  paymentMethodId: number;
  paymentMethodName: string;
  name: string;
  score: number;
  value: number;
  reasonSummary: string;
}

export interface AIMetricsResponse {
  data: AIMetricItem[];
}

// 3. Recent Transactions Response
export interface RecentTransactionItem {
  merchantName: string;
  paidAt: string; // ISO 8601 format
  paymentMethodName: string;
  paidAmount: number;
  discountOrRewardAmount: number;
}

export interface PaginationMeta {
  page: number;
  size: number;
  totalCount: number;
  hasNext: boolean;
}

export interface RecentTransactionsResponse {
  data: RecentTransactionItem[];
  pagination: PaginationMeta;
}

// 4. Category Spending Response
export interface CategorySpendingItem {
  label: string;
  value: number;
  ratioPercent: number;
}

export interface CategorySpendingResponse {
  rangeLabel: string;
  totalValue: number;
  data: CategorySpendingItem[];
}

// --- Payment Card Methods ---
export interface PaymentCard {
  seq: number;
  uuid: string;
  last4: string;
  cardType: string; // VISA, MASTERCARD, AMEX, etc.
  alias: string;
  isPrimary: boolean;
  createdAt: string;
}

export interface PaymentCardsResponse {
  message: string;
  data: PaymentCard[];
}