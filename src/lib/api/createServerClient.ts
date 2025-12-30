'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

import { setupErrorInterceptor } from '@/lib/api/interceptors/error';
import { setupRefreshInterceptor } from '@/lib/api/interceptors/refresh.server';

import type { AxiosInstance } from 'axios';

const DEFAULT_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.picsel.kr/api';

type KeepAliveAgents = {
  httpAgent: unknown;
  httpsAgent: unknown;
};

let keepAliveAgents: KeepAliveAgents | null = null;

async function getKeepAliveAgents(): Promise<KeepAliveAgents | null> {
  // Edge runtime doesn't support Node http/https agents.
  if (process.env.NEXT_RUNTIME === 'edge') return null;
  if (keepAliveAgents) return keepAliveAgents;

  // Lazy import to avoid bundling Node builtins in non-Node runtimes.
  const http = await import('node:http');
  const https = await import('node:https');

  keepAliveAgents = {
     
    httpAgent: new http.Agent({ keepAlive: true }),
     
    httpsAgent: new https.Agent({ keepAlive: true }),
  };

  return keepAliveAgents;
}

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

  const agents = await getKeepAliveAgents();
  const timeoutMs = Number(process.env.API_TIMEOUT_MS ?? 15000);

  const instance = axios.create({
    baseURL: DEFAULT_API_BASE_URL,
    timeout: Number.isFinite(timeoutMs) ? timeoutMs : 15000,
    headers: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {},
    ...(agents
      ? {
          // Node.js only
          httpAgent: agents.httpAgent,
          httpsAgent: agents.httpsAgent,
        }
      : {}),
  });

  // 401 자동 갱신 + 재시도 (server-only)
  await setupRefreshInterceptor(instance);

  // 공통 에러 처리 (401, 500 등)
  setupErrorInterceptor(instance);

  return instance;
}
