import axios from "axios";

import { useAuthStore } from "@/store/use-auth-store";

import type {
  CardData,
  RecommendationData,
  SummaryData,
  TransactionData,
  AuthResponse,
  ApiResponse,
  MonthlySavingsChartData,
  RefreshTokenResponse,
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
      config.headers.Authorization = `Bearer ${token}`;      console.log(`[API] Request to ${config.url} with token: ${token.substring(0, 20)}...`);
    } else {
      console.warn(`[API] Request to ${config.url} WITHOUT token`);    }
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
    /**
     * Get user's payment methods list
     * GET /api/payment-methods
     */
    async list(): Promise<CardData[]> {
      return withErrorHandling(async () => {
        const response = await apiClient.get(apiPath("/payment-methods"));
        
        // Backend may send array directly or wrapped
        const payload = (response.data.data || response.data) as unknown;
        const list = Array.isArray(payload) ? payload : [];
        
        return list.map((pm: Record<string, unknown>) => {
          const seq = pm.seq as number;
          const last4 = (pm.last4 as string) || "****";
          const cardType = (pm.cardType as string) || "";
          const alias = (pm.alias as string) || "카드";
          const isPrimary = (pm.isPrimary as boolean) || false;
          
          return {
            id: seq || "",
            bankName: cardType,
            cardName: alias,
            cardNumber: last4,
            balance: "0", 
            limit: "0",
            imageSrc: `/assets/card/${cardType.toLowerCase() || 'default'}.svg`,
            textColor: "text-zinc-900",
            usagePercent: 0,
            isPrimary
          };
        });
      });
    },

    async startCardRegistration(): Promise<{ redirectUrl: string }> {
      return withErrorHandling(async () => {
        const response = await apiClient.post(
          apiPath("/payment-methods/cards/registration/start")
        );

        const payload = (response.data.data || response.data) as Record<string, unknown>;
        const redirectUrl = (payload?.redirectUrl || payload?.redirect_url) as string | undefined;
        if (!redirectUrl) {
          throw new Error(response.data.message || "카드 등록 시작에 실패했습니다");
        }
        return { redirectUrl };
      });
    },

    async get(id: number | string): Promise<CardData | undefined> {
      return withErrorHandling(async () => {
        const response = await apiClient.get(apiPath(`/payment-methods/${id}`));
        const pm = (response.data.data || response.data) as Record<string, unknown>;
        return {
            id: (pm.id as string | number) || id,
            bankName: (pm.cardCompany as string) || "Unknown",
            cardName: (pm.cardName as string) || "Unknown Card",
            cardNumber: (pm.maskedCardNumber as string) || "****",
            balance: "N/A",
            limit: "N/A",
        };
      });
    },

    async create(card: Record<string, unknown>): Promise<CardData> {
      return withErrorHandling(async () => {
        const response = await apiClient.post(apiPath("/payment-methods"), card);
        const pm = (response.data.data || response.data) as Record<string, unknown>;
        return {
             id: (pm.id as string | number) || "",
            bankName: (pm.cardCompany as string) || "",
            cardName: (pm.cardName as string) || "",
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

    /**
     * Get payment method statistics
     * GET /api/payment-methods/statistics
     */
    async getStatistics(): Promise<Record<string, unknown>> {
      return withErrorHandling(async () => {
        const response = await apiClient.get(apiPath("/payment-methods/statistics"));
        return (response.data.data || response.data) as Record<string, unknown>;
      });
    },

    /**
     * Update payment method
     * PATCH /api/payment-methods/{id}
     */
    async update(id: number | string, data: Record<string, unknown>): Promise<void> {
      return withErrorHandling(async () => {
        await apiClient.patch(apiPath(`/payment-methods/${id}`), data);
      });
    },

    /**
     * Get card details
     * GET /api/payment-methods/{id}/details
     */
    async getDetails(id: number | string): Promise<Record<string, unknown>> {
      return withErrorHandling(async () => {
        const response = await apiClient.get(apiPath(`/payment-methods/${id}/details`));
        return (response.data.data || response.data) as Record<string, unknown>;
      });
    },
  },

  transactions: {
    /**
     * Get recent transactions by site
     * GET /api/dashboard/transactions/recentbysite
     */
    async list(): Promise<TransactionData[]> {
      return withErrorHandling(async () => {
        const response = await apiClient.get(
          apiPath("/dashboard/transactions/recentbysite"),
          { params: { page: 1, size: 10 } }
        );

        const payload = (response.data.data || response.data) as unknown;
        const list = Array.isArray(payload) ? payload : [];

        return list.map((tx: Record<string, unknown>) => {
          const merchantName = (tx.merchantName as string) || "Unknown";
          const paidAt = (tx.paidAt as string) || "";
          const paidAmount = (tx.paidAmount as number) || 0;
          const paymentMethodName = (tx.paymentMethodName as string) || "Unknown";
          const discountOrRewardAmount = (tx.discountOrRewardAmount as number) || 0;
          
          return {
            id: `${merchantName}-${paidAt}-${paidAmount}`,
            merchant: merchantName,
            category: "기타",
            amount: `${paidAmount.toLocaleString()}원`,
            date: paidAt ? new Date(paidAt).toLocaleDateString() : "-",
            paidAt,
            cardName: paymentMethodName,
            benefit: discountOrRewardAmount > 0 ? `${discountOrRewardAmount.toLocaleString()}원 혜택` : "분석 중",
          };
        });
      });
    },

    async getByDateRange(
      startDate: Date,
      endDate: Date
    ): Promise<TransactionData[]> {
      return withErrorHandling(async () => {
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
    /**
     * Get recommended payment methods (Top3)
     * GET /api/dashboard/charts/recommendedpaymentmethods
     */
    async getTop(limit = 3): Promise<RecommendationData[]> {
      return withErrorHandling(async () => {
        const response = await apiClient.get(
          apiPath("/dashboard/charts/recommendedpaymentmethods")
        );
        
        const payload = (response.data.data || response.data) as unknown;
        const list = Array.isArray(payload) ? payload : [];
        
        return list.slice(0, limit).map((rec: Record<string, unknown>, index: number) => {
          const paymentMethodId = (rec.paymentMethodId as number) || index + 1;
          const score = (rec.score as number) || 0;
          const paymentMethodName = (rec.paymentMethodName as string) || "Unknown";
          const reasonSummary = (rec.reasonSummary as string) || "";
          
          return {
            id: paymentMethodId,
            rank: index + 1,
            cardName: paymentMethodName,
            benefit: reasonSummary || `추천 점수 ${score}점`,
            isRecommended: index === 0,
            expectedSavings: score,
          };
        });
      });
    },
  },

  dashboard: {
    /**
     * Get monthly savings chart data (last 6 months)
     * GET /api/dashboard/charts/monthlysavings
     */
    async getMonthlySavingsChart(): Promise<MonthlySavingsChartData[]> {
      return withErrorHandling(async () => {
        const response = await apiClient.get(
          apiPath("/dashboard/charts/monthlysavings")
        );
        const payload = (response.data.data || response.data) as unknown;
        const list = Array.isArray(payload) ? payload : [];
        
        return list.map((item: Record<string, unknown>) => ({
          month: (item.month as string) || "",
          savings: (item.savingsAmount as number) || 0,
          spent: (item.totalSpent as number) || 0,
        }));
      });
    },

    /**
     * Get summary metrics for dashboard
     * Multiple API calls: savings, topmerchant, toppaymentmethod, aibenefitsummary
     */
    async getSummary(): Promise<SummaryData> {
      return withErrorHandling(async () => {
        const [savingsRes, topMerchantRes] = await Promise.all([
             apiClient.get(apiPath("/dashboard/metrics/savings")),
             apiClient.get(apiPath("/dashboard/metrics/topmerchant")), 
        ]);

        const savingsData = (savingsRes.data.data || savingsRes.data) as Record<string, unknown>;
        const merchantData = (topMerchantRes.data.data || topMerchantRes.data) as Record<string, unknown>;

        console.warn("[DASHBOARD] Savings data:", savingsData);
        console.warn("[DASHBOARD] Merchant data:", merchantData);

        let topPaymentMethodRes;
        let aiBenefitRes;
        
        try {
             const [pmRes, aiRes] = await Promise.all([
             apiClient.get(apiPath("/dashboard/metrics/toppaymentmethod")),
             apiClient.get(apiPath("/dashboard/metrics/aibenefitsummary"))
             ]);
             topPaymentMethodRes = pmRes;
             aiBenefitRes = aiRes;
        } catch (e) {
            console.warn("Additional metrics endpoints not available, using fallbacks", e);
        }

        const pmData = topPaymentMethodRes ? (topPaymentMethodRes.data.data || topPaymentMethodRes.data) as Record<string, unknown> : null;
        const aiData = aiBenefitRes ? (aiBenefitRes.data.data || aiBenefitRes.data) as Record<string, unknown> : null;

        console.warn("[DASHBOARD] Payment method data:", pmData);
        console.warn("[DASHBOARD] AI benefit data:", aiData);

        const savingsAmount = (savingsData.savingsAmount as number) || 0;
        const savingsAmountKrw = (savingsData.savingsAmountKrw as string) || `${savingsAmount.toLocaleString()}원`;
        const compareMessage = (savingsData.compareMessage as string) || "";
        
        return {
            totalSavings: savingsAmountKrw,
            totalSavingsChange: compareMessage,
            monthlySpending: (merchantData.totalSpentKrw as string) || "0원",
            monthlySpendingChange: (merchantData.range as string) === "THIS_MONTH" ? "이번 달" : "최근 6개월",
            
            topCategory: (merchantData.merchantName as string) || "분석 중",
            topCategoryPercent: "",

            topPaymentMethod: (pmData?.paymentMethodName as string) || "분석 중",
            topPaymentMethodCount: (pmData?.thisMonthTotalAmount as number) || 0,

            aiBenefit: (aiData?.recommendation as string) || "분석 중",
            aiBenefitAmount: (aiData?.reasonSummary as string) || "",
        };
      });
    },
  },

  users: {
    /**
     * Update current user profile
     * PATCH /api/users/current
     */
    async updateProfile(data: {
      name?: string;
      settings?: {
        notificationEnabled?: boolean;
        darkMode?: boolean;
        compareMode?: string;
        currencyPreference?: string;
      };
    }): Promise<void> {
      return withErrorHandling(async () => {
        await apiClient.patch(apiPath("/users/current"), data);
      });
    },

    /**
     * Get current user info
     * GET /api/users/current
     */
    async getCurrent(): Promise<Record<string, unknown>> {
      return withErrorHandling(async () => {
        const response = await apiClient.get(apiPath("/users/current"));
        return (response.data.data || response.data) as Record<string, unknown>;
      });
    },

    /**
     * Delete current user (withdrawal)
     * DELETE /api/users/current
     */
    async deleteAccount(): Promise<void> {
      return withErrorHandling(async () => {
        await apiClient.delete(apiPath("/users/current"));
        clearTokens();
      });
    },

    /**
     * Get my sessions
     * GET /api/users/sessions
     */
    async getSessions(): Promise<Array<Record<string, unknown>>> {
      return withErrorHandling(async () => {
        const response = await apiClient.get(apiPath("/users/sessions"));
        const payload = (response.data.data || response.data) as unknown;
        return Array.isArray(payload) ? payload : [];
      });
    },

    /**
     * Force logout a session
     * DELETE /api/users/sessions/{seq}
     */
    async deleteSession(seq: number | string): Promise<void> {
      return withErrorHandling(async () => {
        await apiClient.delete(apiPath(`/users/sessions/${seq}`));
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
