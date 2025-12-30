
  PicSel Frontend - 새로운 API 클라이언트 아키텍처
  
  ✅ 구현 완료 (최종형)
  
  핵심 특징:
  1. Server-only 인증/토큰 관리 (HttpOnly Cookies)
  2. 카테고리별 API 클라이언트 분리 (9가지 도메인)
  3. 자동 401 갱신 및 재시도 (인터셉터)
  4. 배열 데이터 정규화 (`.length` 에러 방지)
  5. 타입 안전성 (제네릭 기반)
  

  파일 구조

  
  src/lib/api/
  ├── http/
  │   ├── http.base.ts           # 기본 Axios 설정
  │   ├── http.server.ts         # Server-only (auth + refresh)
  │   └── http.client.ts         # Client-only (error 로깅)
  │
  ├── interceptors/
  │   ├── auth.server.ts         # HttpOnly Cookie → Authorization 헤더
  │   ├── refresh.server.ts      # 401 자동 갱신 & 재시도
  │   └── error.ts               # 공용 에러 로깅
  │
  ├── clients/
  │   ├── auth.server.ts         # ✅ 로그인, 회원가입, OAuth, 로그아웃
  │   ├── system.server.ts       # ✅ 헬스체크, 버전
  │   ├── user.server.ts         # ✅ 프로필, 설정
  │   ├── verification.server.ts # ✅ 본인인증, 휴대폰 인증
  │   ├── payment-method.server.ts # ✅ 결제수단 관리
  │   ├── transactions.server.ts # ✅ 결제 내역
  │   ├── benefits.server.ts     # ✅ 혜택 (캐시백, 포인트)
  │   ├── dashboard.server.ts    # ✅ 대시보드
  │   ├── analytics.server.ts    # ✅ 소비분석
  │   └── reports.server.ts      # ✅ 리포트
  │
  ├── normalizers/
  │   └── array.ts               # 배열 정규화 유틸
  │
  ├── types.ts                   # 기존 타입 (유지)
  ├── error-handler.ts           # 기존 에러 핸들링 (유지)
  └── index.ts                   # 공개 API 진입점
  
  사용 예시
  [Before] - 기존 방식 (문제 있음)
  ────────────────────────────────────
  const response = await api.auth.signup(...);  // 비대하고 혼란스러움
  
  [After] - 새로운 방식 (깔끔함)
  ────────────────────────────────────
  
  // 1. Server Actions에서 API 호출
  'use server';
  import { authClient } from '@/lib/api/clients/auth.server';
  
  export async function signupAction(prevState, formData) {
    const response = await authClient.signup(name, email, password);
    // 토큰은 자동으로 HttpOnly Cookies에 저장됨 ✅
  }
  
  // 2. 대시보드 데이터 조회
  import { dashboardClient } from '@/lib/api/clients/dashboard.server';
  
  export async function getDashboardData() {
    const summary = await dashboardClient.getSummary();
    // 자동 인증 + 에러 처리 ✅
  }
  
  // 3. 배열 정규화 (안전함)
  import { normalizeArray } from '@/lib/api';
  
  const transactions = normalizeArray(response.data);
  console.log(transactions.length); // 항상 배열 ✅
  

  보안 특징
  
  ✅ HttpOnly Cookies
     - JavaScript에서 접근 불가 (XSS 방어)
     - Secure 플래그 (HTTPS만)
     - SameSite=Lax (CSRF 방어)
  
  ✅ Server-only Auth
     - 토큰 갱신은 Server Action 내에서만
     - Client에서는 절대 노출 안 됨
  
  ✅ 자동 401 갱신
     - Refresh token으로 자동 갱신
     - 원래 요청 자동 재시도
     - race condition 방지
  

  마이그레이션 (기존 client.ts → 새 구조)

  
  기존 코드:
  ─────────
  const api = {
    auth: {
      signup: async (name, email, password) => { ... },
      login: async (email, password) => { ... },
    },
    dashboard: { ... },
    transactions: { ... },
  }
  
  새로운 코드:
  ──────────
  // clients/auth.server.ts
  export const authClient = {
    signup: async (name, email, password) => { ... },
    login: async (email, password) => { ... },
  }
  
  // lib/api/index.ts에서 export
  export { authClient, dashboardClient, transactionsClient, ... }
  
  // 사용처
  import { authClient } from '@/lib/api';
  await authClient.signup(...)
  

  성능 최적화

  
  ✅ 싱글톤 인스턴스
     - 매 요청마다 새로 생성하지 않음
     - 인터셉터는 한 번만 등록
  
  ✅ 배열 정규화
     - 런타임 에러 방지 (`.length undefined`)
     - API 응답 포맷 변경에도 안전
  
  ✅ 에러 분류
     - 401: 토큰 갱신 자동 처리
     - 422: 검증 에러 (재시도 안 함)
     - 5xx: 재시도 가능
  

  다음 단계 (옵션)

  
  1. dashboard/header.tsx 등에서 logout 호출
     - authClient.logout() 사용하도록 변경
  
  2. OAuth callback 처리
     - authClient.oauthCallback() 추가 구현
  
  3. 토큰 갱신 실패 시 리다이렉트
     - redirect('/login') 추가
  
  4. 모니터링 & 로깅
     - 에러 인터셉터에 Sentry 연동
