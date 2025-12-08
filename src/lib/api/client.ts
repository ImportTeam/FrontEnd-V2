import {
  MOCK_CARDS,
  MOCK_RECOMMENDATIONS,
  MOCK_SUMMARY,
  MOCK_TRANSACTIONS,
} from "@/data/mock";

import type {
  CardData,
  RecommendationData,
  SummaryData,
  TransactionData,
} from "@/data/mock";

/**
 * API abstraction layer
 * Currently uses mock data, can be easily replaced with real API calls
 */

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const withErrorHandling = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    // Surface meaningful errors while keeping a friendly fallback
    console.error("[API] request failed", error);
    throw error instanceof Error
      ? error
      : new Error("요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
};

export const api = {
  cards: {
    async list(): Promise<CardData[]> {
      return withErrorHandling(async () => {
        await delay(100);
        return MOCK_CARDS;
      });
    },

    async get(id: number): Promise<CardData | undefined> {
      return withErrorHandling(async () => {
        await delay(50);
        return MOCK_CARDS.find((card) => card.id === id);
      });
    },

    async create(card: Omit<CardData, "id">): Promise<CardData> {
      return withErrorHandling(async () => {
        await delay(200);
        const newCard = { ...card, id: Date.now() };
        // In real implementation, this would POST to API
        return newCard;
      });
    },

    async delete(_id: number): Promise<boolean> {
      return withErrorHandling(async () => {
        await delay(100);
        // In real implementation, this would DELETE from API
        return true;
      });
    },
  },

  transactions: {
    async list(): Promise<TransactionData[]> {
      return withErrorHandling(async () => {
        await delay(100);
        return MOCK_TRANSACTIONS;
      });
    },

    async getByDateRange(
      _startDate: Date,
      _endDate: Date
    ): Promise<TransactionData[]> {
      return withErrorHandling(async () => {
        await delay(150);
        // In real implementation, this would filter by date
        return MOCK_TRANSACTIONS;
      });
    },
  },

  recommendations: {
    async getTop(limit = 3): Promise<RecommendationData[]> {
      return withErrorHandling(async () => {
        await delay(100);
        return MOCK_RECOMMENDATIONS.slice(0, limit);
      });
    },
  },

  dashboard: {
    async getSummary(): Promise<SummaryData> {
      return withErrorHandling(async () => {
        await delay(100);
        return MOCK_SUMMARY;
      });
    },
  },

  auth: {
    async login(email: string, password: string): Promise<{ token: string; user: { id: string; name: string; email: string } }> {
      return withErrorHandling(async () => {
        await delay(500);
        // In real implementation, this would POST to /api/auth/login
        if (password.length < 6) {
          throw new Error("비밀번호가 올바르지 않습니다.");
        }
        return {
          token: "mock-jwt-token",
          user: {
            id: "1",
            name: "Test User",
            email,
          },
        };
      });
    },

    async signup(name: string, email: string, password: string): Promise<{ token: string; user: { id: string; name: string; email: string } }> {
      return withErrorHandling(async () => {
        await delay(500);
        // In real implementation, this would POST to /api/auth/signup
        if (password.length < 8) {
          throw new Error("비밀번호는 8자 이상이어야 합니다.");
        }
        return {
          token: "mock-jwt-token",
          user: {
            id: "2",
            name,
            email,
          },
        };
      });
    },

    async logout(): Promise<void> {
      return withErrorHandling(async () => {
        await delay(100);
        // In real implementation, this would call logout endpoint
      });
    },
  },
};

export type Api = typeof api;
