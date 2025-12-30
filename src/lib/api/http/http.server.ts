/**
 * ❌ DEPRECATED: 이 파일은 더 이상 사용되지 않습니다.
 * 
 * 📌 대신 createServerClient() 사용:
 * import { createServerClient } from '@/lib/api/createServerClient'
 * 
 * 이유:
 * - 싱글톤 인스턴스는 Server Action 컨텍스트를 보장할 수 없음
 * - 동시 요청에서 쿠키가 섞일 수 있음
 * - 요청 단위로 클라이언트를 생성해야 함
 */

'use server';
