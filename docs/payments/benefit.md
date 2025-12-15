````md
# Benefits API

결제 혜택을 **비교·추출·분석·추천**하기 위한 API입니다.  
국내 결제 기준으로 카드/결제수단별 혜택을 계산하고,
HTML 페이지 기반 혜택 추출 및 맞춤 추천을 제공합니다.

---

## Authentication

- 인증 필요: ❌ (공개 API 성격)
- 일부 추천 로직은 사용자 결제수단 정보를 활용할 수 있음

---

## Use Cases Overview

1. 상품 가격 기준 결제 혜택 비교
2. 사용자 보유 결제수단 기반 TOP3 추천
3. 쇼핑몰 HTML에서 혜택 정보 추출
4. 실제 페이지 컨텍스트를 반영한 맞춤 추천

---

## 1. 국내 결제 혜택 비교

### GET `/api/benefits/comparisons`

결제 금액 기준으로 카드/결제수단별 **혜택을 비교**합니다.

#### Query Parameters (Example)

| Name | Type | Description |
|----|----|-------------|
| amount | number | 결제 금액 |
| category | string | 결제 카테고리 (선택) |
| merchant | string | 가맹점명 (선택) |

#### Response `200 OK`

```json
[
  {
    "paymentMethodId": "pm_123",
    "cardName": "현대카드 M",
    "discountAmount": 1200,
    "discountRate": 0.093,
    "finalPrice": 11700
  },
  {
    "paymentMethodId": "pm_456",
    "cardName": "삼성카드 taptap",
    "discountAmount": 800,
    "discountRate": 0.062,
    "finalPrice": 12100
  }
]
````

---

## 2. TOP3 결제수단 추천

### GET `/api/benefits/recommendations/top-three`

사용자 보유 결제수단 기준으로
**가장 혜택이 큰 TOP3 결제수단**을 추천합니다.

#### Query Parameters (Example)

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| amount   | number | 결제 금액       |
| merchant | string | 가맹점명 (선택)   |

#### Response `200 OK`

```json
[
  {
    "rank": 1,
    "paymentMethodId": "pm_123",
    "cardName": "현대카드 M",
    "expectedDiscount": 1200
  },
  {
    "rank": 2,
    "paymentMethodId": "pm_456",
    "cardName": "삼성카드 taptap",
    "expectedDiscount": 800
  },
  {
    "rank": 3,
    "paymentMethodId": "pm_789",
    "cardName": "국민카드 굿데이",
    "expectedDiscount": 600
  }
]
```

---

## 3. HTML에서 혜택 추출 (간단)

### GET `/api/benefits/extractions`

HTML 페이지에서 **결제 혜택 관련 텍스트를 단순 추출**합니다.
(정규식 / Rule 기반)

#### Query Parameters

| Name | Type   | Description |
| ---- | ------ | ----------- |
| html | string | 대상 페이지 HTML |

#### Response `200 OK`

```json
{
  "extractedBenefits": [
    "현대카드 10% 할인",
    "삼성카드 최대 5천원 캐시백"
  ]
}
```

---

## 4. 페이지 HTML 반영 TOP3 추천

### POST `/api/benefits/recommendations/from-html`

실제 쇼핑몰 페이지 HTML을 분석하여
**페이지 컨텍스트(가격·혜택 문구)** 를 반영한 TOP3 결제수단을 추천합니다.

> 🔥 이 API는 서비스의 **핵심 추천 엔진 엔드포인트**

#### Request Body

```json
{
  "html": "<html>...</html>",
  "amount": 12900,
  "merchant": "쿠팡"
}
```

#### Response `200 OK`

```json
[
  {
    "rank": 1,
    "paymentMethodId": "pm_123",
    "cardName": "현대카드 M",
    "reason": "페이지 내 10% 할인 문구 + 카테고리 혜택 적용",
    "expectedDiscount": 1290
  },
  {
    "rank": 2,
    "paymentMethodId": "pm_456",
    "cardName": "삼성카드 taptap",
    "reason": "온라인 쇼핑 캐시백",
    "expectedDiscount": 800
  },
  {
    "rank": 3,
    "paymentMethodId": "pm_789",
    "cardName": "국민카드 굿데이",
    "reason": "기본 할인율 우수",
    "expectedDiscount": 600
  }
]
```

---

## Error Responses (Common)

### `400 Bad Request`

```json
{
  "statusCode": 400,
  "message": "유효하지 않은 요청입니다",
  "errorType": "BadRequestException"
}
```

---

## Notes

* HTML 기반 추천은:

  * 정적 Rule
  * 파싱 로직
  * (확장 시) AI/NLP
    조합으로 동작 가능
* 추출 정확도는 페이지 구조에 따라 달라질 수 있음
* 추천 결과는 **참고용**이며 실제 결제 혜택과 다를 수 있음

---

## Architecture Insight

```
HTML → 혜택 추출 → 조건 매칭 → 할인 계산 → TOP N 정렬
```

이 API는 **확장 가능한 추천 엔진 구조**를 전제로 설계되었습니다.

---
