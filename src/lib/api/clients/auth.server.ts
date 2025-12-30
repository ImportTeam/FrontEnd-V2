/**
 * Auth API Client (1/9)
 * 로그인, 회원가입, OAuth, 로그아웃, 토큰 갱신
 * 
 * Server Actions에서만 호출 (Server-only)
 * 
 * Endpoints:
 * - POST /api/auth/register - 회원가입
 * - POST /api/auth/login - 로그인
 * - POST /api/auth/refresh - 토큰 갱신
 * - POST /api/auth/logout - 로그아웃
 * - POST /api/auth/{provider} - OAuth 시작
 * - POST /api/auth/{provider}/callback - OAuth 콜백
 */

import { createServerClient } from '@/lib/api/createServerClient';

import type { AuthResponse, AuthResponseNormalized, RefreshTokenResponse, UserProfile } from '@/lib/api/types';

/**
 * API snake_case 응답을 UI camelCase로 변환
 */
function normalizeAuthResponse(raw: AuthResponse): AuthResponseNormalized {
  return {
    accessToken: raw.access_token,
    refreshToken: raw.refresh_token,
    issuedAt: raw.issued_at,
    user: {
      id: raw.user.id,
      uuid: raw.user.uuid,
      email: raw.user.email,
      name: raw.user.name,
    },
  };
}

export const authClient = {
  /**
   * 회원가입
   * POST /api/auth/register
   */
  signup: async (name: string, email: string, password: string) => {
    const instance = await createServerClient();
    const response = await instance.post<AuthResponse>('/auth/register', {
      name,
      email,
      password,
    });
    return normalizeAuthResponse(response.data);
  },

  /**
   * 로그인
   * POST /api/auth/login
   */
  login: async (email: string, password: string) => {
    const instance = await createServerClient();
    const response = await instance.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    return normalizeAuthResponse(response.data);
  },

  /**
   * 토큰 갱신 (Refresh Interceptor에서 호출됨)
   * POST /api/auth/refresh
   */
  refreshToken: async (refreshToken: string) => {
    const instance = await createServerClient();
    const response = await instance.post<RefreshTokenResponse>('/auth/refresh', { 
      refresh_token: refreshToken 
    });
    return response.data;
  },

  /**
   * 로그아웃
   * POST /api/auth/logout
   */
  logout: async (refreshToken: string) => {
    const instance = await createServerClient();
    await instance.post('/auth/logout', { refresh_token: refreshToken });
  },

  /**
   * OAuth 로그인 시작
   * Backend may implement either:
   * - GET  /api/auth/{provider}?redirect_uri=... (302 Location)
   * - POST /api/auth/{provider}?redirect_uri=... ({ redirectUrl })
   * provider: 'kakao' | 'naver' | 'google'
   */
  startOAuth: async (provider: string, redirectUri: string) => {
    const instance = await createServerClient();

    // 1) Try GET first (common OAuth start pattern: 302 redirect)
    try {
      const response = await instance.get(`/auth/${provider}`, {
        params: { redirect_uri: redirectUri },
        maxRedirects: 0,
        // Accept 2xx and 3xx (we want Location)
        validateStatus: (status) => status >= 200 && status < 400,
      });

      const location = (response.headers?.location as string | undefined) ?? "";
      const body = response.data as { redirectUrl?: string; redirect_url?: string } | undefined;
      const redirectUrl = body?.redirectUrl ?? body?.redirect_url ?? location;

      return { redirectUrl: redirectUrl ?? "" };
    } catch {
      // Continue to POST fallback below.
    }

    // 2) Fallback: POST (some backends return JSON)
    const response = await instance.post<{ redirectUrl?: string; redirect_url?: string }>(
      `/auth/${provider}`,
      undefined,
      {
        params: { redirect_uri: redirectUri },
        maxRedirects: 0,
        validateStatus: (status) => status >= 200 && status < 400,
      }
    );

    const location = (response.headers?.location as string | undefined) ?? "";
    const redirectUrl = response.data.redirectUrl ?? response.data.redirect_url ?? location;
    return { redirectUrl: redirectUrl ?? "" };
  },

  /**
   * OAuth 콜백 처리
   * POST /api/auth/{provider}/callback
   * provider: 'kakao' | 'naver' | 'google'
   */
  oauthCallback: async (provider: string, code: string, state?: string) => {
    const instance = await createServerClient();
    const response = await instance.post<AuthResponse>(
      `/auth/${provider}/callback`,
      { code, state }
    );
    return normalizeAuthResponse(response.data);
  },

  /**
   * 현재 사용자 정보 조회
   * GET /api/auth/me
   */
  getCurrentUser: async () => {
    const instance = await createServerClient();
    const response = await instance.get<UserProfile>('/auth/me');
    return response.data;
  },
};
