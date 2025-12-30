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

import { getServerInstance } from '@/lib/api/http/http.server';

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
    const instance = await getServerInstance();
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
    const instance = await getServerInstance();
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
    const instance = await getServerInstance();
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
    const instance = await getServerInstance();
    await instance.post('/auth/logout', { refresh_token: refreshToken });
  },

  /**
   * OAuth 로그인 시작
   * POST /api/auth/{provider}
   * provider: 'kakao' | 'naver' | 'google'
   */
  startOAuth: async (provider: string) => {
    const instance = await getServerInstance();
    const response = await instance.post<{ redirectUrl: string }>(
      `/auth/${provider}`
    );
    return response.data;
  },

  /**
   * OAuth 콜백 처리
   * POST /api/auth/{provider}/callback
   * provider: 'kakao' | 'naver' | 'google'
   */
  oauthCallback: async (provider: string, code: string, state?: string) => {
    const instance = await getServerInstance();
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
    const instance = await getServerInstance();
    const response = await instance.get<UserProfile>('/auth/me');
    return response.data;
  },
};
