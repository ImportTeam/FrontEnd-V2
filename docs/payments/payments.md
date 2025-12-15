

```md
# Payment Methods API

사용자의 결제수단(카드 등)을 등록, 조회, 수정, 삭제하고  
주 결제수단 설정 및 통계를 제공하는 API입니다.

---

## Authentication

- 인증 필요: ✅ (JWT)
- Header:
```

Authorization: Bearer <access_token>

````

---

## Payment Method Types

| Type | Description |
|----|-------------|
| CARD | 신용/체크카드 |
| BANK | 계좌 (확장 예정) |

---

## 1. 새 카드 추가 (연동 시작)

### POST `/api/payment-methods/cards/registration/start`

외부 PG(카드사/결제사)와 카드 연동을 시작합니다.  
일반적으로 **카드 등록을 위한 Redirect / 인증 플로우**에 사용됩니다.

#### Request

- Parameters: 없음
- Request Body: 없음

#### Response `200 OK`

```json
{
"message": "카드 등록을 위한 인증이 시작되었습니다",
"redirectUrl": "https://payment-gateway.example.com/..."
}
````

---

## 2. 결제수단 등록

### POST `/api/payment-methods`

카드 인증 완료 후 결제수단을 시스템에 등록합니다.

#### Request Body (Example)

```json
{
  "type": "CARD",
  "cardCompany": "HYUNDAI",
  "cardName": "현대카드 M",
  "maskedCardNumber": "1234-****-****-5678",
  "isPrimary": false
}
```

#### Response `201 Created`

```json
{
  "id": "pm_1234567890",
  "type": "CARD",
  "cardCompany": "HYUNDAI",
  "cardName": "현대카드 M",
  "isPrimary": false,
  "createdAt": "2025-12-01T10:00:00.000Z"
}
```

---

## 3. 내 결제수단 목록 조회

### GET `/api/payment-methods`

로그인한 사용자의 모든 결제수단을 조회합니다.

#### Response `200 OK`

```json
[
  {
    "id": "pm_123",
    "type": "CARD",
    "cardCompany": "HYUNDAI",
    "cardName": "현대카드 M",
    "isPrimary": true
  },
  {
    "id": "pm_456",
    "type": "CARD",
    "cardCompany": "SAMSUNG",
    "cardName": "삼성카드 taptap",
    "isPrimary": false
  }
]
```

---

## 4. 결제수단 통계 조회

### GET `/api/payment-methods/statistics`

결제수단 사용 통계를 조회합니다.

#### Response `200 OK`

```json
{
  "totalCount": 3,
  "primaryType": "CARD",
  "cardCompanyUsage": {
    "HYUNDAI": 5,
    "SAMSUNG": 2
  }
}
```

---

## 5. 특정 결제수단 조회

### GET `/api/payment-methods/{id}`

결제수단 ID로 특정 결제수단을 조회합니다.

#### Path Parameters

| Name | Type   | Description |
| ---- | ------ | ----------- |
| id   | string | 결제수단 ID     |

#### Response `200 OK`

```json
{
  "id": "pm_123",
  "type": "CARD",
  "cardCompany": "HYUNDAI",
  "cardName": "현대카드 M",
  "isPrimary": true
}
```

---

## 6. 결제수단 수정

### PATCH `/api/payment-methods/{id}`

결제수단 정보를 수정합니다.

#### Request Body (Example)

```json
{
  "cardName": "현대카드 M 리뉴얼"
}
```

#### Response `200 OK`

```json
{
  "id": "pm_123",
  "cardName": "현대카드 M 리뉴얼"
}
```

---

## 7. 결제수단 삭제

### DELETE `/api/payment-methods/{id}`

특정 결제수단을 삭제합니다.

#### Response `200 OK`

```json
{
  "message": "결제수단이 삭제되었습니다"
}
```

---

## 8. 카드 상세 정보 조회

### GET `/api/payment-methods/{id}/details`

카드의 상세 정보를 조회합니다.
(카드번호 전체, CVC 등 **민감 정보는 반환하지 않음**)

#### Response `200 OK`

```json
{
  "cardCompany": "HYUNDAI",
  "cardName": "현대카드 M",
  "cardType": "CREDIT",
  "billingDay": 25
}
```

---

## 9. 주 결제수단 설정

### PATCH `/api/payment-methods/{id}/primary`

해당 결제수단을 **주 결제수단**으로 설정합니다.
기존 주 결제수단은 자동으로 해제됩니다.

#### Response `200 OK`

```json
{
  "message": "주 결제수단으로 설정되었습니다"
}
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

### `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "결제수단을 찾을 수 없습니다",
  "errorType": "NotFoundException"
}
```

---

## Notes

* 카드 등록은 **2단계 플로우**

  1. `/cards/registration/start` → 외부 인증
  2. `/payment-methods` → 내부 등록
* 카드 번호, CVC, 유효기간 등은 **서버/클라이언트 모두 저장 금지**
* 주 결제수단은 **항상 1개만 존재**

---
