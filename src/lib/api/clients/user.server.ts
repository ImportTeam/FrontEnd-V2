/**
 * User Management API Client (2/9)
 * 사용자 프로필, 설정 등
 * 
 * 특징: Server-only 유틸 객체
 */

import { getServerInstance } from '@/lib/api/http/http.server';

import type { UserProfile } from '@/lib/api/types';

export const userClient = {
  /**
   * 사용자 프로필 조회
   */
  getProfile: async () => {
    const instance = await getServerInstance();
    const response = await instance.get<UserProfile>('/user/profile');
    return response.data;
  },

  /**
   * 사용자 프로필 업데이트
   */
  updateProfile: async (data: Partial<UserProfile>) => {
    const instance = await getServerInstance();
    const response = await instance.patch<UserProfile>('/user/profile', data);
    return response.data;
  },

  /**
   * 비밀번호 변경
   */
  changePassword: async (oldPassword: string, newPassword: string) => {
    const instance = await getServerInstance();
    const response = await instance.post<{ message: string }>(
      '/user/password',
      { oldPassword, newPassword }
    );
    return response.data;
  },

  /**
   * 사용자 설정 조회
   */
  getSettings: async () => {
    const instance = await getServerInstance();
    const response = await instance.get<Record<string, unknown>>(
      '/user/settings'
    );
    return response.data;
  },

  /**
   * 사용자 설정 업데이트
   */
  updateSettings: async (settings: Record<string, unknown>) => {
    const instance = await getServerInstance();
    const response = await instance.patch<Record<string, unknown>>(
      '/user/settings',
      settings
    );
    return response.data;
  },
};
