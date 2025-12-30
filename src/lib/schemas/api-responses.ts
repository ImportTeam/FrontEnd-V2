/**
 * API Response Validation Schemas
 * Runtime validation for all API responses using Zod
 */

import { z } from "zod";

// Base schemas
const uuidSchema = z.string().uuid();
const isoDateSchema = z.string().datetime();

// Auth Response
export const authResponseSchema = z.object({
  accessToken: z.string().min(1, "Access token is required"),
  refreshToken: z.string().min(1, "Refresh token is required"),
  issuedAt: z.string(),
  user: z.object({
    uuid: uuidSchema,
    email: z.string().email(),
    name: z.string(),
    profileImage: z.string().nullable().optional(),
  }),
});

// Payment Card
export const paymentCardSchema = z.object({
  seq: z.number(),
  uuid: uuidSchema,
  last4: z.string().length(4, "Last 4 digits must be exactly 4 characters"),
  cardType: z.string().min(1, "Card type is required"),
  alias: z.string().min(1, "Alias is required"),
  isPrimary: z.boolean(),
  createdAt: isoDateSchema,
});

export const paymentCardsResponseSchema = z.object({
  message: z.string().optional(),
  data: z.array(paymentCardSchema),
});

// Summary Data
export const summaryDataSchema = z.object({
  totalSpent: z.number(),
  totalSpentKrw: z.string(),
  budgetRemaining: z.number(),
  budgetRemainingKrw: z.string(),
  monthlyBudgetKrw: z.string(),
});

export const summaryDataResponseSchema = z.object({
  message: z.string().optional(),
  data: summaryDataSchema.optional(),
});

// Chart Data (Monthly Savings)
export const monthlySavingsItemSchema = z.object({
  month: z.string(),
  savingsAmount: z.number(),
});

export const monthlySavingsChartResponseSchema = z.union([
  z.array(monthlySavingsItemSchema),
  z.object({
    message: z.string().optional(),
    data: z.array(monthlySavingsItemSchema),
  }),
]);

// Transaction
export const transactionItemSchema = z.object({
  transactionId: z.string(),
  merchant: z.string(),
  amount: z.number(),
  category: z.string(),
  paymentMethod: z.string(),
  paidAt: isoDateSchema,
});

export const recentTransactionsResponseSchema = z.union([
  z.array(transactionItemSchema),
  z.object({
    message: z.string().optional(),
    data: z.array(transactionItemSchema),
  }),
]);

// Error Response
export const apiErrorResponseSchema = z.object({
  message: z.string(),
  statusCode: z.number().optional(),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional(),
  }).optional(),
});

// Generic API Response wrapper
export const apiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    message: z.string().optional(),
    data: dataSchema.optional(),
    statusCode: z.number().optional(),
  });

// Type exports
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type PaymentCard = z.infer<typeof paymentCardSchema>;
export type PaymentCardsResponse = z.infer<typeof paymentCardsResponseSchema>;
export type SummaryData = z.infer<typeof summaryDataSchema>;
export type TransactionItem = z.infer<typeof transactionItemSchema>;
