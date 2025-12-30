# 📘 혜택 API (Benefits)

혜택 비교·추출·추천 관련 API
사용자의 결제수단, 가맹점, 결제 금액을 기준으로
**할인/적립 혜택 비교 및 추천 결과를 제공**합니다.

---

## 1️⃣ 국내 결제 혜택 비교

### GET `/api/benefits/comparisons`

사용자의 **보유 결제수단 전체**를 기준으로
특정 가맹점·금액에서 **예상 절약 금액을 비교**합니다.

---

### 🔐 인증

* 필요 없음 (현재 기준)

---

### 📥 Query Parameters

| Name     | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| userUuid | string | ✅        | 사용자 UUID    |
| merchant | string | ✅        | 가맹점명        |
| amount   | number | ✅        | 결제 금액 (원)   |

---

### ✅ 200 OK – 혜택 비교 성공

```json
{
  "data": [
    {
      "cardUuid": "550e8400-e29b-41d4-a716-446655440001",
      "cardName": "BC 신용카드",
      "last4": "1111",
      "benefits": [
        {
          "type": "PERCENT",
          "value": 2,
          "description": "편의점 2% 할인"
        }
      ],
      "totalBenefit": 1000
    },
    {
      "cardUuid": "550e8400-e29b-41d4-a716-446655440002",
      "cardName": "신한 카드",
      "last4": "2222",
      "benefits": [
        {
          "type": "PERCENT",
          "value": 1.5,
          "description": "편의점 1.5% 할인"
        }
      ],
      "totalBenefit": 750
    }
  ]
}
```

---

### ❌ 400 Bad Request – 유효하지 않은 쿼리

```json
{
  "statusCode": 400,
  "message": "유효하지 않은 요청입니다",
  "errorType": "BadRequestException",
  "error": {
    "code": "INVALID_QUERY",
    "message": "필수 쿼리 값이 누락되었습니다",
    "details": {
      "field": "merchant"
    }
  }
}
```

---

## 2️⃣ TOP3 결제수단 추천

### GET `/api/benefits/recommendations/top-three`

특정 결제 상황에서 **가장 유리한 결제수단 3가지**를 추천합니다.

---

### 📥 Query Parameters

| Name     | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| userUuid | string | ✅        | 사용자 UUID    |
| merchant | string | ✅        | 가맹점명        |
| amount   | number | ✅        | 결제 금액 (원)   |

---

### ✅ 200 OK – TOP3 추천 성공

```json
{
  "data": [
    {
      "cardUuid": "550e8400-e29b-41d4-a716-446655440001",
      "cardName": "BC 신용카드",
      "last4": "1111",
      "benefits": [
        {
          "type": "PERCENT",
          "value": 2,
          "description": "편의점 2% 할인"
        }
      ],
      "totalBenefit": 1000
    },
    {
      "cardUuid": "550e8400-e29b-41d4-a716-446655440002",
      "cardName": "신한 카드",
      "last4": "2222",
      "benefits": [
        {
          "type": "PERCENT",
          "value": 1.5,
          "description": "편의점 1.5% 할인"
        }
      ],
      "totalBenefit": 750
    }
  ]
}
```

---

### ❌ 400 Bad Request – 유효하지 않은 쿼리

```json
{
  "statusCode": 400,
  "message": "유효하지 않은 요청입니다",
  "errorType": "BadRequestException",
  "error": {
    "code": "INVALID_QUERY",
    "message": "amount 값이 올바르지 않습니다",
    "details": {
      "field": "amount"
    }
  }
}
```

---

## 3️⃣ HTML 기반 혜택 추출 (간단)

### GET `/api/benefits/extractions`

HTML 또는 텍스트에서 **혜택 정보를 단순 추출**합니다.

---

### 📥 Query Parameters

| Name   | Type   | Required | Description    |
| ------ | ------ | -------- | -------------- |
| sample | string | ✅        | HTML 또는 텍스트 샘플 |

---

### ✅ 200 OK – 혜택 추출 성공

```json
{
  "benefits": [
    {
      "type": "PERCENT",
      "value": 5,
      "description": "신한카드 할인"
    }
  ]
}
```

---

### ❌ 400 Bad Request – 유효하지 않은 쿼리

```json
{
  "statusCode": 400,
  "message": "유효하지 않은 요청입니다",
  "errorType": "BadRequestException",
  "error": {
    "code": "INVALID_QUERY",
    "message": "sample 값이 비어있습니다",
    "details": {
      "field": "sample"
    }
  }
}
```

---

## 4️⃣ HTML 반영 TOP3 추천

### POST `/api/benefits/recommendations/from-html`

페이지 HTML을 분석하여 **혜택을 반영한 TOP3 결제수단**을 추천합니다.

---

### 📥 Request Body

```json
{
  "userUuid": "550e8400-e29b-41d4-a716-446655440000",
  "merchant": "GS편의점",
  "amount": 50000,
  "html": "<html>신한카드 5% 할인</html>"
}
```

---

### ✅ 200 OK – HTML 반영 TOP3 추천 성공

```json
{
  "data": [
    {
      "cardUuid": "550e8400-e29b-41d4-a716-446655440001",
      "cardName": "BC 신용카드",
      "last4": "1111",
      "benefits": [
        {
          "type": "PERCENT",
          "value": 2,
          "description": "편의점 2% 할인"
        }
      ],
      "totalBenefit": 1000
    },
    {
      "cardUuid": "550e8400-e29b-41d4-a716-446655440002",
      "cardName": "신한 카드",
      "last4": "2222",
      "benefits": [
        {
          "type": "PERCENT",
          "value": 1.5,
          "description": "편의점 1.5% 할인"
        }
      ],
      "totalBenefit": 750
    }
  ]
}
```

---

### ❌ 400 Bad Request – 유효하지 않은 요청

```json
{
  "statusCode": 400,
  "message": "유효하지 않은 요청입니다",
  "errorType": "BadRequestException",
  "error": {
    "code": "INVALID_BODY",
    "message": "html 필드가 누락되었습니다",
    "details": {
      "field": "html"
    }
  }
}
```





