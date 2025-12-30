/**
 * Public API Index
 * 모든 API 클라이언트와 유틸리티를 공개
 */

// HTTP Instances
export { getServerInstance } from '@/lib/api/http/http.server';
export { getClientInstance } from '@/lib/api/http/http.client';

// API Clients (Server-only)
export { authClient } from '@/lib/api/clients/auth.server';
export { systemClient } from '@/lib/api/clients/system.server';
export { userClient } from '@/lib/api/clients/user.server';
export { paymentMethodClient } from '@/lib/api/clients/payment-method.server';
export { transactionsClient } from '@/lib/api/clients/transactions.server';
export { paymentsClient } from '@/lib/api/clients/payments.server';
export { benefitsClient } from '@/lib/api/clients/benefits.server';
export { dashboardClient } from '@/lib/api/clients/dashboard.server';
export { analyticsClient } from '@/lib/api/clients/analytics.server';

// Normalizers
export { normalizeArray, normalizeMultipleArrays } from '@/lib/api/normalizers/array';

// Types
export type {
  ApiResponse,
  AuthResponse,
  UserProfile,
  RefreshTokenResponse,
  SavingsMetric,
  TopMerchantMetric,
  TopPaymentMethodMetric,
  AiBenefitSummary,
  MonthlySavingsChartData,
  RecommendedPaymentMethodChartData,
} from '@/lib/api/types';
