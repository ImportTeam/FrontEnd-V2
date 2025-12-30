/**
 * Array Normalizer
 * 배열 데이터 일관성 처리
 * - API 응답이 { data: [...] } 형태일 때
 * - { data: [] } 구조를 자동으로 풀어냄
 * - 배열이 아닌 경우 안전하게 빈 배열 반환
 */

/**
 * API 응답 배열 정규화
 * @example
 * // input: { data: [1, 2, 3] }
 * // output: [1, 2, 3]
 *
 * // input: [1, 2, 3]
 * // output: [1, 2, 3]
 *
 * // input: null
 * // output: []
 */
export function normalizeArray<T>(input: unknown): T[] {
  if (Array.isArray(input)) {
    return input as T[];
  }

  if (input && typeof input === 'object' && 'data' in input) {
    const data = (input as Record<string, unknown>).data;
    if (Array.isArray(data)) {
      return data as T[];
    }
  }

  return [];
}

/**
 * 반복 가능한 아이템들을 정규화 (여러 필드에 걸쳐)
 * @example
 * const data = {
 *   transactions: { data: [...] },
 *   cards: { data: [...] }
 * };
 * normalizeMultipleArrays(data, ['transactions', 'cards']);
 */
export function normalizeMultipleArrays<T extends Record<string, unknown>>(
  obj: T,
  fields: (keyof T)[]
): T {
  const result = { ...obj };

  for (const field of fields) {
    if (field in result) {
      result[field] = normalizeArray(result[field]) as T[keyof T];
    }
  }

  return result;
}
