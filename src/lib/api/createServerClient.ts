'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

import { setupErrorInterceptor } from '@/lib/api/interceptors/error';

import type { AxiosInstance } from 'axios';

const DEFAULT_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.picsel.kr/api';

/**
 * Server-only: 요청 단위로 Axios 클라이언트 생성 (async)
 * 
 * ✅ 특징:
 * - 각 요청이 정확한 쿠키 컨텍스트 사용 (Server Action 보장)
 * - 동시 요청 간 쿠키 섞임 없음 (isolation)
 * - 요청 시점에 fresh token 주입
 * 
 * ❌ 하지 말 것:
 * - 싱글톤 인스턴스 (컨텍스트 유실)
 * - Interceptor에서 cookies() 호출 (async 문제)
 */
export async function createServerClient(): Promise<AxiosInstance> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  const instance = axios.create({
    baseURL: DEFAULT_API_BASE_URL,
    headers: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {},
  });

  // 공통 에러 처리 (401, 500 등)
  setupErrorInterceptor(instance);

  return instance;
}
