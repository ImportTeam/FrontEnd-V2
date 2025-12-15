
```md
# Analytics API (소비 분석)

소비 분석 API는 사용자의 결제 데이터를 기반으로  
**카테고리 / 월간 추이 / 거래 상세** 수준의 소비 리포트를 제공합니다.

대시보드 및 리포트 화면의 **원천 데이터 API**입니다.

---

## Authentication

- 인증 필요: ✅ (JWT)
- Header:
```

Authorization: Bearer <access_token>

````

---

## Analytics Overview

소비 분석 API는 다음 3단계 구조를 가집니다:

1. 카테고리별 소비 분석
2. 월간 소비 추이 분석
3. 거래 단위 상세 분석 (Drill-down)

---

## 1. 카테고리별 소비 분석

### 1-1. 카테고리별 지출 (최근 6개월)

#### GET `/api/analytics/categories`

최근 6개월 동안의 **카테고리별 총 지출 금액**을 반환합니다.

- 식비 / 쇼핑 / 구독 / 교통 등
- 차트(도넛, 바 차트) 용도로 사용

##### Response `200 OK`

```json
[
{
  "category": "쇼핑",
  "totalAmount": 520000,
  "ratio": 0.38
},
{
  "category": "식비",
  "totalAmount": 310000,
  "ratio": 0.23
},
{
  "category": "구독",
  "totalAmount": 180000,
  "ratio": 0.13
}
]
````

##### Notes

* `ratio`는 전체 소비 대비 비율
* 기간: 최근 6개월 (고정)

---

## 2. 월간 소비 추이 분석

### 2-1. 월간 지출 추이 (최근 6개월)

#### GET `/api/analytics/months`

최근 6개월간의 **월별 총 소비 금액 변화**를 반환합니다.

##### Response `200 OK`

```json
[
  { "month": "2025-07", "totalAmount": 420000 },
  { "month": "2025-08", "totalAmount": 390000 },
  { "month": "2025-09", "totalAmount": 460000 },
  { "month": "2025-10", "totalAmount": 510000 },
  { "month": "2025-11", "totalAmount": 480000 },
  { "month": "2025-12", "totalAmount": 530000 }
]
```

##### Use Case

* 월별 소비 증가/감소 트렌드 시각화
* 절약 효과 비교 (Dashboard savings와 조합)

---

## 3. 상세 소비 내역 (거래 단위)

### 3-1. 상세 지출 내역 조회

#### GET `/api/analytics/transactions`

결제 단위의 **상세 거래 내역 리스트**를 반환합니다.

> 리포트 페이지 / 거래 내역 페이지 / CSV Export 용도

##### Response `200 OK`

```json
[
  {
    "transactionId": "tx_001",
    "merchant": "쿠팡",
    "category": "쇼핑",
    "amount": 12900,
    "paymentMethod": "현대카드 M",
    "paidAt": "2025-12-08T14:22:00.000Z"
  },
  {
    "transactionId": "tx_002",
    "merchant": "넷플릭스",
    "category": "구독",
    "amount": 17000,
    "paymentMethod": "삼성카드 taptap",
    "paidAt": "2025-12-05T02:10:00.000Z"
  }
]
```

##### Notes

* 기본 정렬: `paidAt DESC`
* Pagination / Filter 확장에 적합한 엔드포인트

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

## Analytics Data Flow

```
Payments → Category Mapping → Aggregation → Analytics APIs
```

---

## Relation to Other APIs

| API       | 역할          |
| --------- | ----------- |
| Payments  | 원천 결제 데이터   |
| Benefits  | 절약 금액 계산    |
| Analytics | 소비 구조 분석    |
| Dashboard | 결과 요약 / 시각화 |

---

## Notes

* Analytics API는 **정확성 우선**
* 실시간성보다 **집계 안정성**을 중시
* Dashboard API의 **백엔드 근간 데이터**

---