```md
# Dashboard API

대시보드는 사용자의 결제 데이터를 기반으로  
**절약 성과, 사용 패턴, 추천 결과**를 요약하여 제공합니다.

모든 API는 **로그인한 사용자 기준**으로 계산됩니다.

---

## Authentication

- 인증 필요: ✅ (JWT)
- Header:
```

Authorization: Bearer <access_token>

````

---

## Dashboard Overview

대시보드는 다음 영역으로 구성됩니다:

1. 핵심 지표 (Metrics)
2. 차트 데이터 (Charts)
3. 최근 결제 내역 요약

---

## 1. 핵심 지표 (Metrics)

### 1-1. 이번 달 절약 금액

#### GET `/api/dashboard/metrics/savings`

이번 달 기준 사용자가 **혜택을 통해 절약한 총 금액**을 반환합니다.

##### Response `200 OK`

```json
{
"month": "2025-12",
"totalSavings": 18350,
"currency": "KRW"
}
````

---

### 1-2. 가장 많이 사용한 쇼핑몰 (Top 1)

#### GET `/api/dashboard/metrics/topmerchant`

결제 횟수 또는 금액 기준
가장 많이 사용한 가맹점(쇼핑몰)을 반환합니다.

##### Response `200 OK`

```json
{
  "merchant": "쿠팡",
  "transactionCount": 12,
  "totalAmount": 245000
}
```

---

### 1-3. 최다 사용 결제수단 (Top 1)

#### GET `/api/dashboard/metrics/toppaymentmethod`

가장 많이 사용한 결제수단을 반환합니다.

##### Response `200 OK`

```json
{
  "paymentMethodId": "pm_123",
  "cardName": "현대카드 M",
  "usageCount": 15,
  "totalAmount": 310000
}
```

---

### 1-4. AI 추천 혜택 요약

#### GET `/api/dashboard/metrics/aibenefitsummary`

AI 추천 엔진이 분석한
**현재 사용자에게 가장 유효한 혜택 요약 정보**를 제공합니다.

##### Response `200 OK`

```json
{
  "summary": "최근 온라인 쇼핑에서는 현대카드 M 사용 시 평균 9% 절약이 가능합니다.",
  "recommendedCard": "현대카드 M",
  "expectedMonthlySavings": 12000
}
```

---

## 2. 차트 데이터 (Charts)

### 2-1. 월간 절약 금액 변화 (최근 6개월)

#### GET `/api/dashboard/charts/monthlysavings`

최근 6개월간의 절약 금액 추이를 반환합니다.

##### Response `200 OK`

```json
[
  { "month": "2025-07", "savings": 8200 },
  { "month": "2025-08", "savings": 10400 },
  { "month": "2025-09", "savings": 9600 },
  { "month": "2025-10", "savings": 12100 },
  { "month": "2025-11", "savings": 15000 },
  { "month": "2025-12", "savings": 18350 }
]
```

---

### 2-2. 추천 결제수단 Top 3 (차트용)

#### GET `/api/dashboard/charts/recommendedpaymentmethods`

대시보드 차트 표시용
추천 결제수단 TOP3 데이터를 반환합니다.

##### Response `200 OK`

```json
[
  { "rank": 1, "cardName": "현대카드 M", "expectedSavings": 12900 },
  { "rank": 2, "cardName": "삼성카드 taptap", "expectedSavings": 8200 },
  { "rank": 3, "cardName": "국민카드 굿데이", "expectedSavings": 6100 }
]
```

---

## 3. 최근 결제 내역 요약

### GET `/api/dashboard/transactions/recentbysite`

최근 결제 내역을 **사이트(가맹점)별로 그룹화**하여 반환합니다.

##### Response `200 OK`

```json
[
  {
    "merchant": "쿠팡",
    "recentTransactions": [
      {
        "amount": 12900,
        "paymentMethod": "현대카드 M",
        "paidAt": "2025-12-08T14:22:00.000Z"
      },
      {
        "amount": 54000,
        "paymentMethod": "현대카드 M",
        "paidAt": "2025-12-06T11:10:00.000Z"
      }
    ]
  },
  {
    "merchant": "네이버쇼핑",
    "recentTransactions": [
      {
        "amount": 23800,
        "paymentMethod": "삼성카드 taptap",
        "paidAt": "2025-12-05T09:30:00.000Z"
      }
    ]
  }
]
```

---

## Error Responses (Common)

### `401 Unauthorized`

```json
{
  "statusCode": 401,
  "message": "인증이 필요합니다",
  "errorType": "UnauthorizedException"
}
```

---

## Notes

* 모든 통계는 **결제 내역 + 혜택 계산 결과** 기반
* 금액 단위는 기본 `KRW`
* 대시보드 API는:

  * 캐싱 적극 권장
  * 실시간성보다 **안정성/일관성** 우선

---

## Dashboard Data Flow

```
Payments → Benefits Engine → Aggregation → Dashboard APIs
```

대시보드는 서비스의 **성과를 보여주는 최종 출력 레이어**입니다.

---
