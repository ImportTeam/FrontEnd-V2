import axios from "axios";

import { useAuthStore } from "@/store/use-auth-store";

import type {
  CardData,
  RecommendationData,
  SummaryData,
  TransactionData,
  AuthResponse,
  PaymentMethod,
  ApiResponse,
  SavingsMetric,
  RecommendedPaymentMethodChartData,
  TopMerchantMetric,
  MonthlySavingsChartData,
  TopPaymentMethodMetric,
  AiBenefitSummary,
  RefreshTokenResponse,
  MerchantTransactionSummary,
} from "./types";

// Base URL handling
// NOTE:
// - Docs use base: https://api.picsel.kr + path: /api/...
// - This project may set NEXT_PUBLIC_API_URL to either https://api.picsel.kr OR https://api.picsel.kr/api
// To avoid double "/api", we compute a prefix based on the env value.
const RAW_API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_BASE_URL = (RAW_API_URL ?? "").replace(/\/$/, "");
const ENDS_WITH_API = API_BASE_URL.endsWith("/api");

function apiPath(pathname: string): string {
  // Always ensure pathname starts with /
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  // If baseURL already ends with /api, don't add it again
  if (ENDS_WITH_API) {
    return normalized;
  }
  // Otherwise prepend /api
  return `/api${normalized}`;
}

const STORAGE_KEYS = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
} as const;

function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEYS.accessToken);
}

function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEYS.refreshToken);
}

function hasHttpOnlyCookieAuth(): boolean {
  // When backend uses HttpOnly cookies for refresh, we cannot read it in JS.
  // We still keep withCredentials=true so the cookie is sent automatically.
  return typeof window !== "undefined";
}

function setTokens(tokens: { accessToken: string; refreshToken?: string }) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.accessToken, tokens.accessToken);
  if (tokens.refreshToken) {
    localStorage.setItem(STORAGE_KEYS.refreshToken, tokens.refreshToken);
  }
}

function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.accessToken);
  localStorage.removeItem(STORAGE_KEYS.refreshToken);

  // Keep UI auth state consistent with token state.
  // This prevents a stale 'isAuthenticated=true' while Authorization header is missing.
  useAuthStore.getState().logout();
}

function extractLast4Digits(masked: string | undefined): string | undefined {
  if (!masked) return undefined;
  const digits = masked.replace(/\D/g, "");
  if (digits.length >= 4) return digits.slice(-4);
  return undefined;
}

const apiClient = axios.create({
  baseURL: API_BASE_URL || "https://api.picsel.kr/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor to add token if exists
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Ensure Content-Type is always set for POST/PATCH/PUT
    if (!config.headers["Content-Type"] && (config.method === "post" || config.method === "patch" || config.method === "put")) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: try refreshing token once on 401
let isRefreshing = false;
let refreshQueue: Array<(token: string | null) => void> = [];

function resolveRefreshQueue(token: string | null) {
  refreshQueue.forEach((resolve) => resolve(token));
  refreshQueue = [];
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as (typeof error.config & { _retry?: boolean }) | undefined;
    const status: number | undefined = error?.response?.status;

    if (!originalRequest || status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Only attempt refresh in the browser.
    if (typeof window === "undefined") {
      return Promise.reject(error);
    }

    const refreshToken = getRefreshToken();
    // Swagger: refresh may be cookie-based. If we have neither cookie nor stored refresh token, stop.
    if (!refreshToken && !hasHttpOnlyCookieAuth()) {
      clearTokens();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push((token) => {
          if (!token) {
            reject(error);
            return;
          }
          originalRequest._retry = true;
          originalRequest.headers = {
            ...(originalRequest.headers ?? {}),
            Authorization: `Bearer ${token}`,
          };
          resolve(apiClient(originalRequest));
        });
      });
    }

    isRefreshing = true;
    originalRequest._retry = true;

    try {
      const refreshResponse = await apiClient.post<ApiResponse<RefreshTokenResponse>>(
        apiPath("/auth/refresh"),
        refreshToken ? { refresh_token: refreshToken } : undefined
      );

      const refreshPayload = refreshResponse.data.data as unknown as Record<string, unknown> | undefined;
      const newAccessToken = (refreshPayload?.["accessToken"] ??
        refreshPayload?.["access_token"] ??
        refreshPayload?.["token"]) as string | undefined;
      if (!newAccessToken) {
        clearTokens();
        resolveRefreshQueue(null);
        return Promise.reject(error);
      }

      setTokens({ accessToken: newAccessToken });
      resolveRefreshQueue(newAccessToken);

      originalRequest.headers = {
        ...(originalRequest.headers ?? {}),
        Authorization: `Bearer ${newAccessToken}`,
      };

      return apiClient(originalRequest);
    } catch (refreshError) {
      clearTokens();
      resolveRefreshQueue(null);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

// Helper for error handling
function getApiErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : "Unknown error";
  }

  // Network/CSP/CORS errors often surface here.
  if (!error.response) {
    return error.message || "Network error";
  }

  const status = error.response.status;
  const data: unknown = error.response.data;

  // Status-code based fallback messages (prioritized for clarity)
  let statusMessage = "";
  if (status === 400) statusMessage = "잘못된 요청입니다";
  else if (status === 401) statusMessage = "로그인이 필요하거나 인증이 만료되었습니다";
  else if (status === 403) statusMessage = "접근 권한이 없습니다";
  else if (status === 404) statusMessage = "요청한 리소스를 찾을 수 없습니다";
  else if (status === 409) statusMessage = "이미 존재하는 데이터이거나 충돌이 발생했습니다";
  else if (status >= 500) statusMessage = "서버 오류가 발생했습니다";
  else statusMessage = `요청 실패 (${status})`;

  // For error responses (4xx, 5xx), try reading body but filter nonsense
  if (status >= 400) {
    let messageFromBody: string | undefined;

    if (typeof data === "string" && data) {
      messageFromBody = data;
    } else if (typeof data === "object" && data !== null) {
      const obj = data as Record<string, unknown>;
      const topMessage = typeof obj.message === "string" ? obj.message : undefined;

      let nestedMessage: string | undefined;
      let nestedCode: string | undefined;
      const nestedError = obj.error;
      if (typeof nestedError === "object" && nestedError !== null) {
        const nested = nestedError as Record<string, unknown>;
        nestedMessage = typeof nested.message === "string" ? nested.message : undefined;
        nestedCode = typeof nested.code === "string" ? nested.code : undefined;
      }

      messageFromBody = nestedMessage || topMessage || nestedCode;
    }

    // CRITICAL: Filter out backend messages that contain "성공" in error responses (backend bug)
    if (messageFromBody) {
      const normalized = messageFromBody.toLowerCase();
      const isSuspicious = normalized.includes("성공") || normalized.includes("success");
      if (!isSuspicious) {
        return messageFromBody;
      }
    }
  }

  // Return status-based message if body is empty/suspicious
  return statusMessage || error.message || `Request failed (${status})`;
}

async function withErrorHandling<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    const message = getApiErrorMessage(error);
    console.error("API Error:", error);
    throw new Error(message);
  }
}

export const api = {
  paymentMethods: {
    async list(): Promise<CardData[]> {
      return withErrorHandling(async () => {
        const response = await apiClient.get<PaymentMethod[]>(apiPath("/payment-methods"));
        
        return response.data.map(pm => ({
            id: pm.id,
            bankName: pm.cardCompany || pm.cardName.split(' ')[0] || "Bank", 
            cardName: pm.cardName,
            cardNumber: extractLast4Digits(pm.maskedCardNumber) || "****",
            // Mocking UI fields not present in API yet
            balance: "0", 
            limit: "0",
            imageSrc: `/assets/card/${pm.cardCompany?.toLowerCase() || 'default'}.svg`, // Placeholder logic
            textColor: "text-zinc-900",
            usagePercent: 0,
            isPrimary: pm.isPrimary
        }));
      });
    },

    async startCardRegistration(): Promise<{ redirectUrl: string }> {
      return withErrorHandling(async () => {
        const response = await apiClient.post<ApiResponse<{ redirectUrl: string }>>(
          apiPath("/payment-methods/cards/registration/start")
        );

        const redirectUrl = response.data.data?.redirectUrl;
        if (!redirectUrl) {
          throw new Error(response.data.message || "Card registration start failed");
        }
        return { redirectUrl };
      });
    },

    async get(id: number | string): Promise<CardData | undefined> {
      return withErrorHandling(async () => {
        const response = await apiClient.get<PaymentMethod>(apiPath(`/payment-methods/${id}`));
        const pm = response.data;
        return {
            id: pm.id,
            bankName: pm.cardCompany || "Unknown",
            cardName: pm.cardName,
            cardNumber: pm.maskedCardNumber || "****",
            balance: "N/A",
            limit: "N/A",
        };
      });
    },

    async create(card: Record<string, unknown>): Promise<CardData> {
      return withErrorHandling(async () => {
        // First, start registration flow (as per docs) - strictly this should be a redirect
        // For now, we'll assume direct registration for simplicity unless full flow is needed
        const response = await apiClient.post<PaymentMethod>(apiPath("/payment-methods"), card);
        const pm = response.data;
        return {
             id: pm.id,
            bankName: pm.cardCompany || "",
            cardName: pm.cardName,
            cardNumber: "****",
            balance: "0",
            limit: "0"
        };
      });
    },

    async delete(id: number | string): Promise<boolean> {
      return withErrorHandling(async () => {
        await apiClient.delete(apiPath(`/payment-methods/${id}`));
        return true;
      });
    },

    async setPrimary(id: number | string): Promise<void> {
      return withErrorHandling(async () => {
        await apiClient.patch(apiPath(`/payment-methods/${id}/primary`));
      });
    },
  },

  transactions: {
    // Docs: GET /api/dashboard/transactions/recentbysite
    // UI expects a flat list, so we flatten grouped results.
    async list(): Promise<TransactionData[]> {
      return withErrorHandling(async () => {
        const response = await apiClient.get<MerchantTransactionSummary[]>(
          apiPath("/dashboard/transactions/recentbysite")
        );

        const items = response.data.flatMap((group) =>
          group.recentTransactions.map((tx) => ({
            merchant: group.merchant,
            tx,
          }))
        );

        // Keep most recent first using ISO timestamp
        items.sort((a, b) => (a.tx.paidAt < b.tx.paidAt ? 1 : -1));

        return items.map(({ merchant, tx }) => ({
          id: `${merchant}-${tx.paidAt}-${tx.amount}`,
          merchant,
          category: "UNKNOWN",
          amount: `${tx.amount.toLocaleString()}원`,
          date: new Date(tx.paidAt).toLocaleDateString(),
          paidAt: tx.paidAt,
          cardName: tx.paymentMethod,
          benefit: "분석 중",
        }));
      });
    },

    async getByDateRange(
      startDate: Date,
      endDate: Date
    ): Promise<TransactionData[]> {
      return withErrorHandling(async () => {
        // Not documented yet. Keeping a safe fallback that reuses list().
        // If/when the backend supports date filtering, replace with a dedicated endpoint.
        const all = await api.transactions.list();
        const start = startDate.getTime();
        const end = endDate.getTime();
        return all.filter((tx) => {
          const t = tx.paidAt ? new Date(tx.paidAt).getTime() : NaN;
          return Number.isFinite(t) && t >= start && t <= end;
        });
      });
    },
  },

  recommendations: {
    async getTop(limit = 3): Promise<RecommendationData[]> {
      return withErrorHandling(async () => {
        const response = await apiClient.get<RecommendedPaymentMethodChartData[]>(
          apiPath("/dashboard/charts/recommendedpaymentmethods")
        );
        
        return response.data.slice(0, limit).map(rec => ({
            id: rec.rank,
            rank: rec.rank,
            cardName: rec.cardName,
            benefit: `예상 절약 ${rec.expectedSavings.toLocaleString()}원`,
            isRecommended: rec.rank === 1,
            expectedSavings: rec.expectedSavings
        }));
      });
    },
  },

  dashboard: {
    async getMonthlySavingsChart(): Promise<MonthlySavingsChartData[]> {
      return withErrorHandling(async () => {
        const response = await apiClient.get<MonthlySavingsChartData[]>(
          apiPath("/dashboard/charts/monthlysavings")
        );
        return response.data;
      });
    },

    async getSummary(): Promise<SummaryData> {
      return withErrorHandling(async () => {
        // Aggregate multiple API calls
        const [savingsRes, topMerchantRes, _chartsRes] = await Promise.all([
             apiClient.get<SavingsMetric>(apiPath("/dashboard/metrics/savings")),
             apiClient.get<TopMerchantMetric>(apiPath("/dashboard/metrics/topmerchant")), 
             apiClient.get<MonthlySavingsChartData[]>(apiPath("/dashboard/charts/monthlysavings"))
        ]);

        // Attempt to fetch other metrics if endpoints exist, otherwise mock/calculate for now
        // Based on docs, we might have /dashboard/metrics/toppaymentmethod and /dashboard/metrics/aibenefit
        let topPaymentMethodRes;
        let aiBenefitRes;
        
        try {
             const [pmRes, aiRes] = await Promise.all([
             apiClient.get<TopPaymentMethodMetric>(apiPath("/dashboard/metrics/toppaymentmethod")),
             apiClient.get<AiBenefitSummary>(apiPath("/dashboard/metrics/aibenefitsummary"))
             ]);
             topPaymentMethodRes = pmRes;
             aiBenefitRes = aiRes;
        } catch (e) {
            console.warn("Additional metrics endpoints not available, using fallbacks", e);
        }

        const totalSavings = savingsRes.data.totalSavings;
        const currentMonthSpending = 1250000; // Mock or calculate if available in other APIs
        
        return {
            totalSavings: `${totalSavings.toLocaleString()}원`,
            totalSavingsChange: "+12.5%", // Need calculation logic
            monthlySpending: `${currentMonthSpending.toLocaleString()}원`,
            monthlySpendingChange: "-5.2%",
            
            topCategory: topMerchantRes.data.merchant, // Using merchant as proxy for category per UI
            topCategoryPercent: "34%", // Mocked for now

            topPaymentMethod: topPaymentMethodRes?.data.cardName || "신한 Deep",
            topPaymentMethodCount: topPaymentMethodRes?.data.usageCount || 24,

            aiBenefit: aiBenefitRes?.data.recommendedCard || "네이버페이",
            aiBenefitAmount: aiBenefitRes?.data.expectedMonthlySavings.toLocaleString() || "2,000",
        };
      });
    },
  },

  auth: {
    async login(email: string, password: string): Promise<{ token: string; user: AuthResponse['user'] }> {
      return withErrorHandling(async () => {
        // Matches POST /api/auth/login response structure
        const response = await apiClient.post<ApiResponse<AuthResponse>>(apiPath("/auth/login"), { email, password });
        
        // Debug: log response structure to understand backend format
        console.warn("[AUTH] Login response:", JSON.stringify(response.data, null, 2));

        // Backend may send tokens in data.data OR directly in data
        const payload = (response.data.data || response.data) as unknown as Record<string, unknown>;
        const accessToken = (payload["accessToken"] ?? payload["access_token"] ?? payload["token"]) as string | undefined;
        const refreshToken = (payload["refreshToken"] ?? payload["refresh_token"]) as string | undefined;
        const user = payload["user"] as AuthResponse["user"] | undefined;

        if (accessToken && user) {
          setTokens({ accessToken, refreshToken });
          console.warn("[AUTH] Login success, tokens saved");
          return { token: accessToken, user };
        }

        console.error("[AUTH] Login response missing required fields:", { hasAccessToken: !!accessToken, hasUser: !!user });

        // NEVER throw a success message as error
        const msg = response.data.message || "";
        if (msg.toLowerCase().includes("성공") || msg.toLowerCase().includes("success")) {
          throw new Error("로그인 응답 형식이 올바르지 않습니다 (토큰 또는 사용자 정보 누락)");
        }
        throw new Error(msg || "로그인에 실패했습니다");
      });
    },

    async signup(name: string, email: string, password: string): Promise<{ token: string; user: AuthResponse['user'] }> {
      return withErrorHandling(async () => {
        // Swagger: POST /api/auth/register
        const response = await apiClient.post<ApiResponse<AuthResponse>>(
          apiPath("/auth/register"),
          { name, email, password }
        );

        // Debug: log response structure to understand backend format
        console.warn("[AUTH] Signup response:", JSON.stringify(response.data, null, 2));

        // Backend may send tokens in data.data OR directly in data
        const payload = (response.data.data || response.data) as unknown as Record<string, unknown>;
        const accessToken = (payload["accessToken"] ?? payload["access_token"] ?? payload["token"]) as string | undefined;
        const refreshToken = (payload["refreshToken"] ?? payload["refresh_token"]) as string | undefined;
        const user = payload["user"] as AuthResponse["user"] | undefined;

        if (accessToken && user) {
          setTokens({ accessToken, refreshToken });
          console.warn("[AUTH] Signup success, tokens saved");
          return { token: accessToken, user };
        }

        console.error("[AUTH] Signup response missing required fields:", { hasAccessToken: !!accessToken, hasUser: !!user });

        // NEVER throw a success message as error
        const msg = response.data.message || "";
        if (msg.toLowerCase().includes("성공") || msg.toLowerCase().includes("success")) {
          throw new Error("회원가입 응답 형식이 올바르지 않습니다 (토큰 또는 사용자 정보 누락)");
        }
        throw new Error(msg || "회원가입에 실패했습니다");
      });
    },

    async logout(): Promise<void> {
      return withErrorHandling(async () => {
        // Swagger: logout may be cookie-based (no body). Docs: refresh_token body.
        // Support both.
        const refreshToken = getRefreshToken();
        await apiClient.post(apiPath("/auth/logout"), refreshToken ? { refresh_token: refreshToken } : undefined);
        clearTokens();
      });
    },

    async refresh(): Promise<string> {
      return withErrorHandling(async () => {
        const refreshToken = getRefreshToken();
        const response = await apiClient.post<ApiResponse<RefreshTokenResponse>>(
          apiPath("/auth/refresh"),
          refreshToken ? { refresh_token: refreshToken } : undefined
        );
        const payload = response.data.data as unknown as Record<string, unknown> | undefined;
        const accessToken = (payload?.["accessToken"] ?? payload?.["access_token"] ?? payload?.["token"]) as string | undefined;
        if (!accessToken) {
          throw new Error(response.data.message || "Refresh failed");
        }
        setTokens({ accessToken });
        return accessToken;
      });
    },
  },
};

export type Api = typeof api;
