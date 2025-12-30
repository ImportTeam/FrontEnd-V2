/**
 * User Management API Client (2/9)
 * 사용자 프로필, 설정 등
 * 
 * 특징: Server-only 유틸 객체
 */

import { createServerClient } from '@/lib/api/createServerClient';

import type { SessionData, UserCurrentResponse } from '@/lib/api/types';

type UpdateCurrentUserInput = Partial<Omit<UserCurrentResponse, 'settings'>> & {
  settings?: Partial<UserCurrentResponse['settings']>;
};

type UserCurrentResponsePRD = {
  seq?: string | number;
  uuid: string;
  email: string;
  name: string;
  social_provider?: string;
  social_id?: string | null;
  preferred_payment_seq?: number | null;
  created_at?: string;
  updated_at?: string;
  settings?: {
    notificationEnabled?: boolean;
    darkMode?: boolean;
    compareMode?: string;
    currencyPreference?: string;
    updated_at?: string;
    updatedAt?: string;
  };
};

function mapUserCurrentResponse(raw: UserCurrentResponsePRD): UserCurrentResponse {
  const settings = raw.settings ?? {};

  return {
    // Keep legacy fields used by UI
    id: String(raw.seq ?? raw.uuid),
    uuid: raw.uuid,
    email: raw.email,
    name: raw.name,
    socialProvider: raw.social_provider ?? 'NONE',
    isVerified: false,
    verifiedAt: undefined,
    createdAt: raw.created_at ?? new Date().toISOString(),
    settings: {
      darkMode: settings.darkMode ?? false,
      notificationEnabled: settings.notificationEnabled ?? true,
      compareMode: settings.compareMode ?? 'AUTO',
      currencyPreference: settings.currencyPreference ?? 'KRW',
      updatedAt: settings.updatedAt ?? settings.updated_at ?? raw.updated_at ?? raw.created_at ?? new Date().toISOString(),
    },
  };
}

export const userClient = {
  /**
   * 현재 사용자 상세 조회
   * GET /api/users/current
   */
  getCurrent: async () => {
    const instance = await createServerClient();
    const response = await instance.get<UserCurrentResponsePRD>('/users/current');
    return mapUserCurrentResponse(response.data);
  },

  /**
   * 현재 사용자 정보 업데이트
   * PATCH /api/users/current
   */
  updateCurrent: async (data: UpdateCurrentUserInput) => {
    const instance = await createServerClient();
    const response = await instance.patch<UserCurrentResponsePRD>('/users/current', data);
    return mapUserCurrentResponse(response.data);
  },

  /**
   * 사용자 탈퇴
   * DELETE /api/users/current
   */
  deleteCurrent: async () => {
    const instance = await createServerClient();
    await instance.delete('/users/current');
  },

  /**
   * 로그인된 기기(세션) 목록
   * GET /api/users/sessions
   */
  listSessions: async () => {
    const instance = await createServerClient();
    const response = await instance.get<SessionData[]>('/users/sessions');
    return response.data;
  },

  /**
   * 특정 세션 로그아웃
   * DELETE /api/users/sessions/{id}
   */
  deleteSession: async (id: string | number) => {
    const instance = await createServerClient();
    await instance.delete(`/users/sessions/${id}`);
  },

  /**
   * 비밀번호 변경
   */
  changePassword: async (currentPassword: string, newPassword: string) => {
    const instance = await createServerClient();
    const response = await instance.post<{ message?: string }>(
      '/users/current/password',
      { currentPassword, newPassword }
    );
    return response.data;
  },

  /**
   * 사용자 설정 조회
   */
  getSettings: async () => {
    const current = await userClient.getCurrent();
    return (current.settings ?? {}) as unknown as Record<string, unknown>;
  },

  /**
   * 사용자 설정 업데이트
   */
  updateSettings: async (settings: Record<string, unknown>) => {
    const instance = await createServerClient();
    const response = await instance.patch<UserCurrentResponsePRD>('/users/current', {
      settings,
    });
    return mapUserCurrentResponse(response.data).settings as unknown as Record<string, unknown>;
  },
};
