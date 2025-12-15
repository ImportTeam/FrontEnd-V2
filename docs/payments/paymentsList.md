```md
# Payments API (결제 내역)

결제 완료 후 발생한 결제 정보를 시스템에 기록하고 관리하기 위한 API입니다.  
실제 결제 승인(PG 호출)은 외부에서 수행되며,  
본 API는 **결제 결과의 영속화 및 조회를 위한 기록용 API**입니다.

---

## Authentication

- 인증 필요: ✅ (JWT)
- Header:
```

Authorization: Bearer <access_token>

````

---

## Payment Status Enum

| Status | Description |
|------|-------------|
| PENDING | 결제 처리 중 |
| PAID | 결제 완료 |
| FAILED | 결제 실패 |
| CANCELED | 결제 취소 |
| REFUNDED | 환불 완료 |

---

## 1. 결제 내역 기록

### POST `/api/payments`

결제 승인 완료 후, 결제 정보를 서버에 기록합니다.  
빌링키 기반 결제, 단건 결제, 자동결제 결과 모두 이 API를 통해 저장됩니다.

> ⚠️ **주의**  
> 이 API는 “결제 요청”이 아니라 **결제 결과 기록용**입니다.

---

### Request Body (Example)

```json
{
"billingKeyId": "bk_1234567890",
"paymentMethodId": "pm_1234567890",
"amount": 12900,
"currency": "KRW",
"status": "PAID",
"pgProvider": "PORTONE",
"pgTransactionId": "tx_9876543210",
"paidAt": "2025-12-05T14:32:10.000Z"
}
````

#### Field Description

| Field           | Type         | Description      |
| --------------- | ------------ | ---------------- |
| billingKeyId    | string       | 사용된 빌링키 ID (선택)  |
| paymentMethodId | string       | 결제수단 ID          |
| amount          | number       | 결제 금액            |
| currency        | string       | 통화 코드 (KRW)      |
| status          | string       | 결제 상태            |
| pgProvider      | string       | PG사 (예: PORTONE) |
| pgTransactionId | string       | PG 트랜잭션 ID       |
| paidAt          | string (ISO) | 결제 완료 시각         |

---

### Response `201 Created`

```json
{
  "id": "pay_1234567890",
  "amount": 12900,
  "currency": "KRW",
  "status": "PAID",
  "paidAt": "2025-12-05T14:32:10.000Z",
  "createdAt": "2025-12-05T14:32:11.000Z"
}
```

---

## Error Responses

### `400 Bad Request`

```json
{
  "statusCode": 400,
  "message": "유효하지 않은 결제 정보입니다",
  "errorType": "BadRequestException"
}
```

### `401 Unauthorized`

```json
{
  "statusCode": 401,
  "message": "인증이 필요합니다",
  "errorType": "UnauthorizedException"
}
```

---

## Security Notes

* PG 트랜잭션 ID(`pgTransactionId`)는 **중복 저장 방지** 필수
* 금액(`amount`)은 **PG 승인 금액과 반드시 일치해야 함**
* 클라이언트에서 임의 결제 기록 생성 ❌

  * 반드시 **서버에서 검증 후 기록**

---

## Notes

* 이 API는:

  * 정기결제
  * 원클릭 결제
  * 수동 결제
    전부 공통으로 사용 가능
* 환불/취소 처리 시:

  * 기존 결제 내역의 `status` 변경
  * 또는 별도 Refund 엔티티 사용 (설계 선택)

---

```

