/**
 * ❌ DEPRECATED: Server 환경에서의 Auth Interceptor 패턴은 작동하지 않습니다.
 * 
 * 📌 문제점:
 * - Interceptor는 "프로세스 전역"에서 실행됨
 * - cookies()는 "요청 컨텍스트"가 필요함
 * - Server Action의 요청 컨텍스트를 보장할 수 없음
 * - 동시 요청에서 쿠키 섞임
 * 
 * ✅ 해결책:
 * - createServerClient()에서 요청 생성 시점에 토큰을 직접 주입
 * - 각 요청마다 신선한 쿠키 읽기
 * 
 * @see src/lib/api/createServerClient.ts
 */

'use server';
