

```md
# Billing Keys API

빌링키(Billing Key)는 카드 정보를 직접 저장하지 않고  
**정기결제 / 자동결제 / 원클릭 결제**를 가능하게 하는 토큰입니다.

이 API는 빌링키 발급, 조회, 삭제 및 기본 빌링키 설정을 제공합니다.

---

## Authentication

- 인증 필요: ✅ (JWT)
- Header:
```

Authorization: Bearer <access_token>

````

---

## Billing Key Lifecycle

1. 결제수단(카드) 등록
2. 빌링키 발급
3. 기본 빌링키 설정 (선택)
4. 결제 요청 시 빌링키 사용
5. 필요 시 삭제

---

## 1. 빌링키 발급

### POST `/api/billing-keys`

등록된 결제수단을 기반으로 빌링키를 발급합니다.  
발급된 빌링키는 **결제에만 사용 가능**하며, 카드 정보는 포함하지 않습니다.

#### Request Body (Example)

```json
{
"paymentMethodId": "pm_1234567890"
}
````

#### Response `201 Created`

```json
{
  "id": "bk_1234567890",
  "paymentMethodId": "pm_1234567890",
  "isDefault": false,
  "createdAt": "2025-12-01T12:00:00.000Z"
}
```

---

## 2. 빌링키 목록 조회

### GET `/api/billing-keys`

로그인한 사용자의 모든 빌링키를 조회합니다.

#### Response `200 OK`

```json
[
  {
    "id": "bk_123",
    "paymentMethodId": "pm_123",
    "isDefault": true,
    "createdAt": "2025-12-01T12:00:00.000Z"
  },
  {
    "id": "bk_456",
    "paymentMethodId": "pm_456",
    "isDefault": false,
    "createdAt": "2025-12-02T09:30:00.000Z"
  }
]
```

---

## 3. 빌링키 상세 조회

### GET `/api/billing-keys/{id}`

특정 빌링키의 상세 정보를 조회합니다.

#### Path Parameters

| Name | Type   | Description    |
| ---- | ------ | -------------- |
| id   | string | Billing Key ID |

#### Response `200 OK`

```json
{
  "id": "bk_123",
  "paymentMethodId": "pm_123",
  "isDefault": true,
  "createdAt": "2025-12-01T12:00:00.000Z"
}
```

---

## 4. 빌링키 삭제

### DELETE `/api/billing-keys/{id}`

빌링키를 삭제합니다.
삭제된 빌링키는 **어떠한 결제에도 재사용 불가**합니다.

#### Response `200 OK`

```json
{
  "message": "빌링키가 삭제되었습니다"
}
```

---

## 5. 기본 빌링키 설정

### POST `/api/billing-keys/{id}/default`

해당 빌링키를 **기본 빌링키**로 설정합니다.
기존 기본 빌링키는 자동으로 해제됩니다.

#### Response `200 OK`

```json
{
  "message": "기본 빌링키로 설정되었습니다"
}
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
  "message": "빌링키를 찾을 수 없습니다",
  "errorType": "NotFoundException"
}
```

---

## Security Notes

* 빌링키는 **결제 전용 토큰**
* 클라이언트:

  * 저장 ❌
  * 노출 ❌
* 서버:

  * 로그 출력 ❌
* 카드 번호 / CVC / 유효기간은 **어떤 API에서도 반환하지 않음**

---

## Notes

* 기본 빌링키는 **항상 1개**
* 정기결제 서비스에서는:

  * 빌링키 존재 여부
  * 기본 빌링키 설정 여부
    를 반드시 사전 검증할 것
* 빌링키 삭제 시 연관된 자동결제는 실패 처리 필요

---