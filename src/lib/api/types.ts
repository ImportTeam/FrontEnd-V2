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
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  issuedAt: string;
  user: UserProfile;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}
export interface UserProfile {
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
