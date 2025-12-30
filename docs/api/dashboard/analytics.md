# 📈 소비분석 API (Analytics)

카테고리·월간·상세 거래 내역 기반으로
**사용자의 소비 패턴을 분석하기 위한 리포트 API**입니다.

> 🔐 **인증 필요**
> 모든 엔드포인트는 `Authorization: Bearer <JWT>` 필요

---

## 1️⃣ 카테고리별 지출 분석 (최근 6개월)

### GET `/api/analytics/charts/category`

최근 6개월간의 지출을 **카테고리별로 합산**하여
파이차트/도넛차트에 바로 사용할 수 있는 형태로 반환합니다.

---

### 📥 Parameters

* 없음

---

### ✅ 200 OK – 조회 성공

```json
{
  "rangeLabel": "최근 6개월",
  "totalValue": 2940000,
  "data": [
    {
      "label": "쇼핑",
      "name": "쇼핑",
      "value": 1250000,
      "ratioPercent": 42.5
    },
    {
      "label": "식비",
      "name": "식비",
      "value": 980000,
      "ratioPercent": 33.3
    }
  ]
}
```

📌 **FE 사용 팁**

* `label / name` → 차트 라벨
* `value` → 금액
* `ratioPercent` → 퍼센트 표시용
* `totalValue` → 중앙 요약 텍스트용

---

### ❌ 401 Unauthorized – 인증 실패

```json
{
  "statusCode": 401,
  "message": "인증이 필요합니다",
  "errorType": "UnauthorizedException",
  "error": {
    "code": "UNAUTHORIZED",
    "message": "유효하지 않은 토큰입니다",
    "details": null
  }
}
```

---

## 2️⃣ 월간 지출 추이 (최근 6개월)

### GET `/api/analytics/charts/monthly`

최근 6개월의 **월별 총 지출 합계**를 반환합니다.
(대시보드 월간 추이와 동일 성격, 분석 화면용)

---

### 📥 Parameters

* 없음

---

### ✅ 200 OK – 조회 성공

```json
{
  "data": [
    {
      "month": "2025-07",
      "name": "2025-07",
      "totalSpent": 1200000,
      "spent": 1200000,
      "value": 1200000
    },
    {
      "month": "2025-08",
      "name": "2025-08",
      "totalSpent": 980000,
      "spent": 980000,
      "value": 980000
    }
  ]
}
```

📌 **FE 사용 팁**

* `month / name` → X축
* `value` → Y축
* `totalSpent`, `spent` → 의미 중복 (호환성 유지용)

---

### ❌ 401 Unauthorized – 인증 실패

*(공통 포맷 동일)*

---

## 3️⃣ 상세 지출 내역 (거래 단위)

### GET `/api/analytics/transactions`

거래 단위의 **상세 소비 내역**을 반환합니다.
기간·카테고리·쇼핑몰·결제수단·금액 필터 + 페이징 지원.

---

### 📥 Query Parameters

| Name             | Type     | Description                |
| ---------------- | -------- | -------------------------- |
| from             | string   | 조회 시작일 (ISO). 미지정 시 최근 6개월 |
| to               | string   | 조회 종료일 (ISO). 미지정 시 현재     |
| categories       | string[] | 카테고리 필터 (복수 가능)            |
| merchants        | string[] | 쇼핑몰/거래처 필터                 |
| paymentMethodIds | string[] | 결제수단 ID 필터                 |
| minAmount        | number   | 최소 금액 (원)                  |
| maxAmount        | number   | 최대 금액 (원)                  |
| page             | number   | 페이지 번호 (1부터 시작)            |
| size             | number   | 페이지 크기 (최대 50)             |

---

### ✅ 200 OK – 조회 성공

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "merchantName": "쿠팡",
      "category": "쇼핑",
      "transactionAt": "2025-12-10T11:22:33.000Z",
      "spendAmount": 32000,
      "paidAmount": 30500,
      "discountOrRewardAmount": 1500,
      "paymentMethodId": 1,
      "paymentMethodName": "내 신용카드(1111)"
    }
  ],
  "pagination": {
    "page": 1,
    "size": 20,
    "totalCount": 123,
    "hasNext": true
  }
}
```

📌 **FE 사용 팁**

* `spendAmount` → 원래 소비 금액
* `paidAmount` → 실제 결제 금액
* `discountOrRewardAmount` → 혜택 체감 포인트
* 테이블 + 필터 UI에 바로 사용 가능

---

### ❌ 400 Bad Request – 유효하지 않은 요청

```json
{
  "statusCode": 400,
  "message": "유효하지 않은 요청입니다",
  "errorType": "BadRequestException",
  "error": {
    "code": "BAD_REQUEST",
    "message": "잘못된 필터 값이 포함되어 있습니다",
    "details": {
      "field": "categories"
    }
  }
}
```

---

### ❌ 401 Unauthorized – 인증 실패

```json
{
  "statusCode": 401,
  "message": "인증이 필요합니다",
  "errorType": "UnauthorizedException",
  "error": {
    "code": "UNAUTHORIZED",
    "message": "유효하지 않은 토큰입니다",
    "details": null
  }
}
```
