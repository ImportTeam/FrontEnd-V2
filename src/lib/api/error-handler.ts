/**
 * Comprehensive API Error Handling
 * Handles network errors, validation errors, server errors, and timeouts
 */

export type ApiErrorType =
  | "NETWORK_ERROR"
  | "TIMEOUT"
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "SERVER_ERROR"
  | "CLOUDFLARE_CHALLENGE"
  | "UNKNOWN_ERROR";

export interface ApiErrorDetails {
  type: ApiErrorType;
  message: string;
  statusCode?: number;
  originalError?: unknown;
  isRetryable: boolean;
}

/**
 * Parse API error to standardized format
 */
export function parseApiError(error: unknown): ApiErrorDetails {
  // Network error (no response)
  if (error instanceof Error) {
    if (error.message === "Network Error" || error.message.includes("Failed to fetch")) {
      return {
        type: "NETWORK_ERROR",
        message: "네트워크 연결을 확인해주세요.",
        isRetryable: true,
        originalError: error,
      };
    }

    if (error.message.includes("timeout")) {
      return {
        type: "TIMEOUT",
        message: "요청 시간이 초과되었습니다. 다시 시도해주세요.",
        isRetryable: true,
        originalError: error,
      };
    }
  }

  // Axios error
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as {
      response?: {
        status: number;
        data: unknown;
      };
    };
    const status = axiosError.response?.status;
    const data = axiosError.response?.data;

    // Validation error (422)
    if (status === 422) {
      const errorData = data as Record<string, unknown> | undefined;
      return {
        type: "VALIDATION_ERROR",
        message: (errorData?.message as string) || "입력값이 올바르지 않습니다.",
        statusCode: status,
        isRetryable: false,
        originalError: error,
      };
    }

    // Unauthorized (401)
    if (status === 401) {
      const errorData = data as Record<string, unknown> | undefined;
      return {
        type: "UNAUTHORIZED",
        message: (errorData?.message as string) || "인증이 필요합니다. 다시 로그인해주세요.",
        statusCode: status,
        isRetryable: false, // Interceptor handles retry
        originalError: error,
      };
    }

    // Forbidden (403)
    if (status === 403) {
      const errorData = data as Record<string, unknown> | undefined;
      
      // Check if it's Cloudflare challenge
      if (errorData?.code === "CLOUDFLARE_CHALLENGE") {
        return {
          type: "CLOUDFLARE_CHALLENGE",
          message: (errorData?.message as string) || "API 서버가 보호 중입니다. 잠시 후 다시 시도해주세요.",
          statusCode: status,
          isRetryable: true,
          originalError: error,
        };
      }
      
      return {
        type: "FORBIDDEN",
        message: (errorData?.message as string) || "접근 권한이 없습니다.",
        statusCode: status,
        isRetryable: false,
        originalError: error,
      };
    }

    // Not found (404)
    if (status === 404) {
      return {
        type: "NOT_FOUND",
        message: "요청한 리소스를 찾을 수 없습니다.",
        statusCode: status,
        isRetryable: false,
        originalError: error,
      };
    }

    // Server error (5xx)
    if (status && status >= 500) {
      const errorData = data as Record<string, unknown> | undefined;
      return {
        type: "SERVER_ERROR",
        message: (errorData?.message as string) || "서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
        statusCode: status,
        isRetryable: true,
        originalError: error,
      };
    }

    // Other 4xx errors
    if (status && status >= 400 && status < 500) {
      const errorData = data as Record<string, unknown> | undefined;
      return {
        type: "UNKNOWN_ERROR",
        message: (errorData?.message as string) || `요청 오류가 발생했습니다. (${status})`,
        statusCode: status,
        isRetryable: false,
        originalError: error,
      };
    }
  }

  // Unknown error
  return {
    type: "UNKNOWN_ERROR",
    message: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
    isRetryable: false,
    originalError: error,
  };
}

/**
 * Determine if error should be retried
 */
export function shouldRetry(error: ApiErrorDetails, attemptCount: number = 0): boolean {
  if (!error.isRetryable) return false;
  if (attemptCount >= 3) return false;
  return true;
}

/**
 * Get user-friendly error message
 */
export function getErrorMessage(error: ApiErrorDetails): string {
  return error.message;
}

/**
 * Create delay for exponential backoff retry
 */
export function getRetryDelay(attemptCount: number): number {
  // 1s, 2s, 4s
  return Math.min(1000 * Math.pow(2, attemptCount), 8000);
}
