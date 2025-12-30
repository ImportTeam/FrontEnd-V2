/**
 * Verification API Client (3/9)
 * 본인인증, 휴대폰 인증 등
 * 
 * 특징: Server-only 유틸 객체
 */

import { createServerClient } from '@/lib/api/createServerClient';

export type VerificationStatus = 'SENT' | 'VERIFIED' | 'FAILED' | 'EXPIRED';

export interface IdentityVerification {
  id: string;
  portoneId: string;
  status: VerificationStatus;
  message?: string;
  requestedAt?: string;
}

export const verificationClient = {
  /**
   * 본인인증 요청 전송
   * POST /api/identity/verifications/{portoneId}/requests
   */
  requestIdentityVerification: async (
    portoneId: string,
    data: { name: string; phoneNumber: string; birthday: string }
  ) => {
    const instance = await createServerClient();
    const response = await instance.post<IdentityVerification>(
      `/identity/verifications/${portoneId}/requests`,
      data
    );
    return response.data;
  },

  /**
   * 본인인증 확인 (OTP)
   * POST /api/identity/verifications/{portoneId}/confirmation
   */
  confirmIdentityVerification: async (portoneId: string, otp: string) => {
    const instance = await createServerClient();
    const response = await instance.post<IdentityVerification>(
      `/identity/verifications/${portoneId}/confirmation`,
      { otp }
    );
    return response.data;
  },

  /**
   * OTP 재전송
   * POST /api/identity/verifications/{portoneId}/requests/resend
   */
  resendOtp: async (
    portoneId: string,
    options?: { storeId?: string; method?: 'SMS' }
  ) => {
    const instance = await createServerClient();
    const response = await instance.post<IdentityVerification>(
      `/identity/verifications/${portoneId}/requests/resend`,
      { method: options?.method ?? 'SMS' },
      { params: options?.storeId ? { storeId: options.storeId } : undefined }
    );
    return response.data;
  },

  /**
   * PASS 본인인증 검증
   * POST /api/identity/verifications/pass-verification
   */
  passVerification: async (returnedIdentityId: string) => {
    const instance = await createServerClient();
    const response = await instance.post<IdentityVerification>(
      '/identity/verifications/pass-verification',
      { returnedIdentityId }
    );
    return response.data;
  },

  /**
   * Certified 본인인증 검증
   * POST /api/identity/verifications/certified-verification
   */
  certifiedVerification: async (impUid: string) => {
    const instance = await createServerClient();
    const response = await instance.post<IdentityVerification>(
      '/identity/verifications/certified-verification',
      { impUid }
    );
    return response.data;
  },

  /**
   * 본인인증 상태 조회
   * GET /api/identity/verifications/{portoneId}
   */
  getStatus: async (portoneId: string) => {
    const instance = await createServerClient();
    const response = await instance.get<IdentityVerification>(
      `/identity/verifications/${portoneId}`
    );
    return response.data;
  },
};
