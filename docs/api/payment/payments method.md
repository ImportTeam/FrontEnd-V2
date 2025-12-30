# 💳 PicSel API – 결제수단(Payment Methods) 명세

**Base URL**

```
https://api.picsel.kr/api
```

**공통 헤더 (필수)**

```
Authorization: Bearer <ACCESS_TOKEN>
Content-Type: application/json
```

> ❗ 모든 결제수단 API는 **인증 필수**

---

## 1️⃣ POST `/payment-methods/cards/registration/start`

### 새 카드 추가 – 연동 시작 (Popbill Stub)

사용자가 **“카드 추가” 버튼 클릭 시** 호출
현재는 Popbill 실제 연동 ❌ → **FE 연동용 더미 응답**

---

### 📥 Request Body

```json
{
  "returnUrl": "https://picsel.example.com/payment-methods/add/result"
}
```

| 필드        | 타입     | 필수 | 설명                 |
| --------- | ------ | -- | ------------------ |
| returnUrl | string | ✅  | 연동 완료 후 돌아올 FE URL |

---

### 📤 Response 201 (성공)

```json
{
  "requestId": "popbill_stub_useruuid_1734259200000",
  "nextActionUrl": "https://example.com/popbill/card-registration (stub)",
  "expiresAt": "2025-12-15T10:10:10.000Z"
}
```

| 필드            | 설명                  |
| ------------- | ------------------- |
| requestId     | 연동 요청 ID            |
| nextActionUrl | 다음 단계 이동 URL (stub) |
| expiresAt     | 요청 만료 시각            |

---

### ❌ Response 401 (인증 실패)

```json
{
  "statusCode": 401,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "인증이 필요합니다"
  }
}
```

---

### 🧠 FE 처리 가이드

* 성공 → `nextActionUrl`로 이동
* 실제 서비스에서는 **외부 결제사 페이지 이동용**
* 현재는 stub이므로 **UX 흐름만 구현**

---

## 2️⃣ POST `/payment-methods`

### 결제수단 등록

> isPrimary = true → **기존 주 결제수단 자동 해제**

---

### 📥 Request Body

```json
{
  "alias": "내 신용카드",
  "cardToken": "card_token_from_provider",
  "isPrimary": true
}
```

| 필드        | 타입      | 필수 | 설명        |
| --------- | ------- | -- | --------- |
| alias     | string  | ✅  | 카드 별칭     |
| cardToken | string  | ✅  | 카드사 토큰    |
| isPrimary | boolean | ❌  | 주 결제수단 여부 |

---

### 📤 Response 201 (성공)

```json
{
  "seq": 1,
  "uuid": "550e8400-e29b-41d4-a716-446655440001",
  "last4": "1111",
  "cardType": "VISA",
  "alias": "내 신용카드",
  "isPrimary": true,
  "createdAt": "2025-11-12T13:59:44.000Z"
}
```

---

### ❌ Response 400 (유효하지 않은 요청)

```json
{
  "statusCode": 400,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "요청 값이 올바르지 않습니다"
  }
}
```

---

### 🧠 FE 처리 가이드

* 성공 → 결제수단 목록 재조회
* `isPrimary: true` 설정 시 **별도 API 호출 필요 없음**

---

## 3️⃣ GET `/payment-methods`

### 내 결제수단 목록 조회

> 주 결제수단이 **항상 배열 첫 번째**

---

### 📤 Response 200

```json
{
  "message": "결제 수단 목록 조회 성공",
  "data": [
    {
      "seq": 1,
      "uuid": "uuid1",
      "last4": "1111",
      "cardType": "VISA",
      "alias": "내 신용카드",
      "isPrimary": true,
      "createdAt": "2025-11-12T13:59:44.000Z"
    },
    {
      "seq": 2,
      "uuid": "uuid2",
      "last4": "2222",
      "cardType": "MASTERCARD",
      "alias": "회사 카드",
      "isPrimary": false,
      "createdAt": "2025-11-11T10:30:00.000Z"
    }
  ]
}
```

---

### 🧠 FE 처리 가이드

* 배열 순서 그대로 UI 렌더링
* `isPrimary` 기준 배지 표시

---

## 4️⃣ GET `/payment-methods/statistics`

### 결제수단 통계

---

### 📤 Response 200

```json
{
  "totalCount": 3,
  "byCardType": {
    "VISA": 2,
    "MASTERCARD": 1
  },
  "primary": {
    "seq": 1,
    "uuid": "uuid",
    "last4": "1111",
    "cardType": "VISA",
    "alias": "내 신용카드",
    "isPrimary": true,
    "createdAt": "2025-11-12T13:59:44.000Z"
  }
}
```

---

### 🧠 FE 처리 가이드

* 대시보드 요약 카드용
* `primary` → 바로 사용 가능

---

## 5️⃣ GET `/payment-methods/{id}`

### 특정 결제수단 조회

---

### 📥 Path Parameter

| 이름 | 타입     | 설명       |
| -- | ------ | -------- |
| id | number | 결제수단 seq |

---

### 📤 Response 200

```json
{
  "seq": 1,
  "uuid": "uuid",
  "last4": "1111",
  "cardType": "VISA",
  "alias": "내 신용카드",
  "isPrimary": true,
  "createdAt": "2025-11-12T13:59:44.000Z"
}
```

---

### ❌ Response 403 / 404

* 403: 다른 사용자 카드 접근
* 404: 존재하지 않음

---

## 6️⃣ PATCH `/payment-methods/{id}`

### 결제수단 수정 (별칭)

---

### 📥 Request Body

```json
{
  "alias": "업데이트된 카드명"
}
```

---

### 📤 Response 200

```json
{
  "seq": 1,
  "uuid": "uuid",
  "last4": "1111",
  "cardType": "VISA",
  "alias": "업데이트된 카드명",
  "isPrimary": true,
  "createdAt": "2025-11-12T13:59:44.000Z"
}
```

---

### 🧠 FE 처리 가이드

* 성공 → 카드 상세/목록 UI 즉시 반영

---

## 7️⃣ DELETE `/payment-methods/{id}`

### 결제수단 삭제

> ❗ **주 결제수단은 삭제 불가**

---

### 📤 Response 200

```json
{
  "message": "결제수단이 삭제되었습니다."
}
```

---

### ❌ Response 400 (주 결제수단)

```json
{
  "statusCode": 400,
  "error": {
    "code": "PRIMARY_PAYMENT_METHOD",
    "message": "주 결제수단은 삭제할 수 없습니다"
  }
}
```

---

### 🧠 FE 처리 가이드

* 주 결제수단 삭제 시:

  * 먼저 다른 카드로 primary 변경 유도

---

## 8️⃣ GET `/payment-methods/{id}/details`

### 카드 상세 정보 + 이번 달 사용량 + 한도

---

### 📤 Response 200

```json
{
  "paymentMethodId": 1,
  "paymentMethodName": "내 신용카드",
  "type": "CARD",
  "providerName": "신한카드",
  "last4": "1234",
  "thisMonthUsage": {
    "totalAmount": 250000,
    "totalAmountKrw": "250,000원",
    "count": 12
  },
  "limit": {
    "limitAmount": 5000000,
    "estimatedRemainingAmount": 3500000,
    "basisMessage": "Popbill 한도 조회 더미 응답입니다. (paymentMethodSeq=1)"
  }
}
```

---

### 🧠 FE 처리 가이드

* 상세 화면 전용 API
* limit 정보는 **참고용 UI**

---

## 9️⃣ PATCH `/payment-methods/{id}/primary`

### 주 결제수단 설정

---

### 📤 Response 200

```json
{
  "seq": 1,
  "uuid": "uuid",
  "last4": "1111",
  "cardType": "VISA",
  "alias": "내 신용카드",
  "isPrimary": true,
  "createdAt": "2025-11-12T13:59:44.000Z"
}
```

---

### 🧠 FE 처리 가이드

* 성공 → 목록 재조회
* 기존 primary 자동 해제됨

---

## 🔚 결제수단 파트 요약 (FE 기준)

| 기능       | API                                   |
| -------- | ------------------------------------- |
| 카드 연동 시작 | POST `/cards/registration/start`      |
| 카드 등록    | POST `/payment-methods`               |
| 목록 조회    | GET `/payment-methods`                |
| 통계       | GET `/payment-methods/statistics`     |
| 상세       | GET `/payment-methods/{id}`           |
| 별칭 수정    | PATCH `/payment-methods/{id}`         |
| 삭제       | DELETE `/payment-methods/{id}`        |
| 주 카드 설정  | PATCH `/payment-methods/{id}/primary` |

---
