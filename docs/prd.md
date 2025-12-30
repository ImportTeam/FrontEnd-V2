# PRD

## about - API

1 - 9까지

### 인증 - 1

- /api/auth/register - 회원가입

```json
{
"email":"user@example.com",
"password":"Password123!",
"name":"홍길동"
}
```

- /api/auth/refresh

```json
{
"refresh_token":"string"
}
```

- /api/auth/logout

```json
{
"refresh_token":"string"
}
```

- /api/auth/{} : google / kakao / naver
- /api/auth/{}/callback
- /api/auth/login

```json
{
"email":"user@example.com",
"password":"Password123!"
}
```

### 사용자 관리 - 2

- /api/users/current

```json
{
"seq":"1",
"uuid":"550e8400-e29b-41d4-a716-446655440000",
"email":"user@example.com",
"name":"홍길동",
"social_provider":"NONE",
"social_id":null,
"preferred_payment_seq":5,
"created_at":"2025-01-10T09:30:00.000Z",
"updated_at":"2025-01-13T14:20:00.000Z"
}
```

- /api/users/current

```json
{
"name":"홍길동",
"email":"newemail@example.com",
"settings": {
"notificationEnabled":true,
"darkMode":false,
"compareMode":"AUTO",
"currencyPreference":"KRW"
  }
}
```

- /api/users/current
- /api/users/current/password

```json
{
"currentPassword":"Password123!",
"newPassword":"NewPassword123!"
}
```

- /api/users/sessions
- /api/users/sessions/{seq}

### 본인인증 - 3

→ 이 client는 필요없음

### 결제수단 - 4

- /api/payment-methods/cards/registration/start

```json
{
"returnUrl":"https://picsel.example.com/payment-methods/add/result"
}
```

- /api/payment-methods

```json
{
"alias":"내 신용카드",
"cardToken":"card_token_from_provider",
"isPrimary":true
}
```

- /api/payment-methods - POST / GET

```json
{
"message":"결제 수단 목록 조회 성공",
"data": [
    {
"seq":1,
"uuid":"550e8400-e29b-41d4-a716-446655440001",
"last4":"1111",
"cardType":"VISA",
"alias":"내 신용카드",
"isPrimary":true,
"createdAt":"2025-11-12T13:59:44.000Z"
    },
    {
"seq":2,
"uuid":"550e8400-e29b-41d4-a716-446655440002",
"last4":"2222",
"cardType":"MASTERCARD",
"alias":"회사 카드",
"isPrimary":false,
"createdAt":"2025-11-11T10:30:00.000Z"
    }
  ]
}
```

- /api/payment-methods/statistics

```json
{
"totalCount":3,
"byCardType": {
"VISA":2,
"MASTERCARD":1
  },
"primary": {
"seq":1,
"uuid":"550e8400-e29b-41d4-a716-446655440001",
"last4":"1111",
"cardType":"VISA",
"alias":"내 신용카드",
"isPrimary":true,
"createdAt":"2025-11-12T13:59:44.000Z"
  }
}
```

- /api/payment-methods/{id} - GET / PATCH / DELETE

```json
{
"seq":1,
"uuid":"550e8400-e29b-41d4-a716-446655440001",
"last4":"1111",
"cardType":"VISA",
"alias":"내 신용카드",
"isPrimary":true,
"createdAt":"2025-11-12T13:59:44.000Z"
}
```

- /api/payment-methods/{id}/details
- /api/payment-methods/{id}/details

### 결제내역 - 5

- /api/payments

```json
{
"userUuid":"550e8400-e29b-41d4-a716-446655440000",
"merchant":"GS편의점",
"amount":"50000",
"paymentMethodSeq":1
}
```

### 헤택 정보 - 6

- /api/benefits/comparisons

```json
{
"data": [
    {
"cardUuid":"550e8400-e29b-41d4-a716-446655440001",
"cardName":"BC 신용카드",
"last4":"1111",
"benefits": [
        {
"type":"PERCENT",
"value":2,
"description":"편의점 2% 할인"
        }
      ],
"totalBenefit":1000
    },
    {
"cardUuid":"550e8400-e29b-41d4-a716-446655440002",
"cardName":"신한 카드",
"last4":"2222",
"benefits": [
        {
"type":"PERCENT",
"value":1.5,
"description":"편의점 1.5% 할인"
        }
      ],
"totalBenefit":750
    }
  ]
}
```

- /api/benefits/recommendations/top-three

```json
{
"data": [
    {
"cardUuid":"550e8400-e29b-41d4-a716-446655440001",
"cardName":"BC 신용카드",
"last4":"1111",
"benefits": [
        {
"type":"PERCENT",
"value":2,
"description":"편의점 2% 할인"
        }
      ],
"totalBenefit":1000
    },
    {
"cardUuid":"550e8400-e29b-41d4-a716-446655440002",
"cardName":"신한 카드",
"last4":"2222",
"benefits": [
        {
"type":"PERCENT",
"value":1.5,
"description":"편의점 1.5% 할인"
        }
      ],
"totalBenefit":750
    }
  ]
}
```

- /api/benefits/extractions

```json
{
"benefits": [
    {
"type":"PERCENT",
"value":5,
"description":"신한카드 할인"
    }
  ]
}
```

- /api/benefits/recommendations/from-html

```json
{
"userUuid":"550e8400-e29b-41d4-a716-446655440000",
"merchant":"GS편의점",
"amount":50000,
"html":"<html>신한카드 5% 할인</html>"
}
```

### 대시보드 - 7

- /api/dashboard/metrics/savings

```json
{
"data": {
"savingsAmount":12345,
"savingsAmountKrw":"12,345원",
"lastYearSameMonthSavingsAmount":9000,
"savingsDeltaAmount":3345,
"savingsDeltaDirection":"증가",
"compareMessage":"작년 같은 달보다 3,345원 더 절약했어요.",
"savingsRatePercent":12.34
  }
}
```

- /api/dashboard/metrics/top-merchant

```json
{
"data": {
"range":"THIS_MONTH",
"merchantName":"GS편의점",
"totalSpent":500000,
"totalSpentKrw":"500,000원"
  }
}
```

- /api/dashboard/metrics/topmerchant

```json
{
"data": {
"range":"THIS_MONTH",
"merchantName":"GS편의점",
"totalSpent":500000,
"totalSpentKrw":"500,000원"
  }
}
```

- /api/dashboard/metrics/top-paymethod

```json
{
"data": {
"paymentMethodId":1,
"paymentMethodName":"내 신용카드(1111)",
"thisMonthTotalAmount":250000,
"thisMonthTotalAmountKrw":"250,000원",
"basis":"AMOUNT"
  }
}
```

- /api/dashboard/metrics/ai-benefits

```json
{
"data": {
"recommendation":"이번 달에는 생활/쇼핑 영역의 혜택이 큰 카드/페이를 우선 사용해보세요.",
"reasonSummary":"최근 6개월 기준 '쇼핑' 지출 비중이 높아 해당 영역 혜택 중심으로 추천합니다."
  }
}
```

- /api/dashboard/charts/monthly-savings

```json
{
"data": [
    {
"month":"2025-07",
"name":"2025-07",
"totalSpent":1200000,
"spent":1200000,
"totalBenefit":45000,
"benefit":45000,
"savingsAmount":45000,
"saved":45000,
"value":45000
    }
  ],
"ai": {
"summary":"최근 6개월 동안 절약액은 전반적으로 완만한 상승세이며, 11월에 가장 크게 증가했습니다.",
"highlights": [
"10월 대비 11월 절약액이 크게 증가",
"9월 지출 급증 이후 절약액이 회복"
    ]
  }
}
```

- /api/dashboard/metrics/ai-top3

```json
{
"data": [
    {
"paymentMethodId":1,
"paymentMethodName":"내 신용카드(1111)",
"name":"내 신용카드(1111)",
"score":92,
"value":92,
"reasonSummary":"최근 6개월 쇼핑 지출이 높고, 해당 카드사의 활성 혜택이 많아 우선 추천합니다."
    }
  ]
}
```

- /api/dashboard/transactions/recent-site

```json
{
"data": [
    {
"merchantName":"쿠팡",
"paidAt":"2025-12-10T11:22:33.000Z",
"paymentMethodName":"내 신용카드(1111)",
"paidAmount":32000,
"discountOrRewardAmount":1500
    }
  ],
"pagination": {
"page":1,
"size":10,
"totalCount":57,
"hasNext":true
  }
}
```

### 소비분석 - 8

- /api/analytics/charts/category

```json
{
"rangeLabel":"최근 6개월",
"totalValue":2940000,
"data": [
    {
"label":"쇼핑",
"name":"쇼핑",
"value":1250000,
"ratioPercent":42.5
    }
  ]
}
```

- /api/analytics/charts/monthly

```json
{
"data": [
    {
"month":"2025-07",
"name":"2025-07",
"totalSpent":1200000,
"spent":1200000,
"value":1200000
    }
  ]
}
```

- /api/analytics/transactions

```json
{
"data": [
    {
"id":"550e8400-e29b-41d4-a716-446655440000",
"merchantName":"쿠팡",
"category":"쇼핑",
"transactionAt":"2025-12-10T11:22:33.000Z",
"spendAmount":32000,
"paidAmount":30500,
"discountOrRewardAmount":1500,
"paymentMethodId":1,
"paymentMethodName":"내 신용카드(1111)"
    }
  ],
"pagination": {
"page":1,
"size":20,
"totalCount":123,
"hasNext":true
  }
}
```

### 리포트 - 9

- 이것은 대시보드와 소비분석으로 합쳤기때문에 없어도 됨