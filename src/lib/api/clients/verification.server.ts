/**
 * Verification API Client (3/9)
 * 본인인증, 휴대폰 인증 등
 * 
 * 특징: Server-only 유틸 객체
 */

import { getServerInstance } from '@/lib/api/http/http.server';

export interface VerificationResponse {
  verificationId: string;
  status: 'pending' | 'verified' | 'expired';
  timestamp: string;
}

export const verificationClient = {
  /**
   * 본인인증 시작 (실명인증)
   */
  startIdentityVerification: async (data: {
    name: string;
    phoneNumber: string;
    idType: string;
  }) => {
    const instance = await getServerInstance();
    const response = await instance.post<VerificationResponse>(
      '/verification/identity/start',
      data
    );
    return response.data;
  },

  /**
   * 본인인증 확인
   */
  confirmIdentityVerification: async (
    verificationId: string,
    code: string
  ) => {
    const instance = await getServerInstance();
    const response = await instance.post<VerificationResponse>(
      '/verification/identity/confirm',
      { verificationId, code }
    );
    return response.data;
  },

  /**
   * 휴대폰 인증 시작
   */
  startPhoneVerification: async (phoneNumber: string) => {
    const instance = await getServerInstance();
    const response = await instance.post<VerificationResponse>(
      '/verification/phone/start',
      { phoneNumber }
    );
    return response.data;
  },

  /**
   * 휴대폰 인증 확인
   */
  confirmPhoneVerification: async (verificationId: string, code: string) => {
    const instance = await getServerInstance();
    const response = await instance.post<VerificationResponse>(
      '/verification/phone/confirm',
      { verificationId, code }
    );
    return response.data;
  },
};
