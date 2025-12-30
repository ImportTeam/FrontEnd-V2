/**
 * Auth API Client (1/9)
 * 로그인, 회원가입, OAuth, 로그아웃, 토큰 갱신
 * 
 * 특징: Server Actions에서만 호출되는 유틸 객체
 */

import { getServerInstance } from '@/lib/api/http/http.server';

import type { AuthResponse, UserProfile } from '@/lib/api/types';

export const authClient = {
  /**
   * 로그인
   */
  login: async (email: string, password: string) => {
    const instance = await getServerInstance();
    const response = await instance.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  /**
   * 회원가입
   */
  signup: async (name: string, email: string, password: string) => {
    const instance = await getServerInstance();
    const response = await instance.post<AuthResponse>('/auth/signup', {
      name,
      email,
      password,
    });
    return response.data;
  },

  /**
   * OAuth 콜백 처리
   */
  oauthCallback: async (provider: string, code: string) => {
    const instance = await getServerInstance();
    const response = await instance.post<AuthResponse>(
      `/auth/oauth/${provider}/callback`,
      { code }
    );
    return response.data;
  },

  /**
   * 로그아웃
   */
  logout: async () => {
    const instance = await getServerInstance();
    await instance.post('/auth/logout');
  },

  /**
   * 토큰 갱신 (Refresh Interceptor에서 호출됨)
   */
  refreshToken: async (refreshToken: string) => {
    const instance = await getServerInstance();
    const response = await instance.post<{
      accessToken: string;
      refreshToken: string;
    }>('/auth/refresh', { refreshToken });
    return response.data;
  },

  /**
   * 현재 사용자 정보 조회
   */
  getCurrentUser: async () => {
    const instance = await getServerInstance();
    const response = await instance.get<UserProfile>('/auth/me');
    return response.data;
  },
};
