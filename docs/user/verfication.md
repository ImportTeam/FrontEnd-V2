```md
# Identity Verification API

PASS / Certified 기반의 본인인증 요청, 검증, 상태 조회 및 이력 관리를 위한 API입니다.  
모든 API는 **로그인된 사용자 기준**으로 동작하며, PortOne Identity 서비스를 사용합니다.

---

## Authentication

- 인증 필요: ✅ (JWT)
- Header:
```

Authorization: Bearer <access_token>

````

---

## Verification Status Enum

| Status | Description |
|------|-------------|
| SENT | 본인인증 요청 전송됨 |
| VERIFIED | 본인인증 완료 |
| FAILED | 인증 실패 |
| EXPIRED | 인증 만료 |

---

## 1. 본인인증 요청 전송

### POST `/api/identity/verifications/{portoneId}/requests`

PortOne API를 통해 본인인증 요청(SMS / PASS 등)을 전송합니다.

#### Path Parameters

| Name | Type | Description |
|----|----|-------------|
| portoneId | string | PortOne Identity ID |

#### Request Body

```json
{
"name": "홍길동",
"phoneNumber": "01012345678",
"birthday": "1990-01-01"
}
````

#### Response `200 OK`

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "portoneId": "p_test",
  "status": "SENT",
  "message": "본인인증 요청이 전송되었습니다",
  "requestedAt": "2025-11-12T13:59:44.000Z"
}
```

#### Error Responses

* `400 Bad Request` – 유효하지 않은 요청
* `401 Unauthorized` – 인증 실패 (JWT 필요)

---

## 2. 본인인증 확인 (OTP 검증)

### POST `/api/identity/verifications/{portoneId}/confirmation`

사용자가 입력한 OTP를 검증하여 본인인증을 완료합니다.

#### Path Parameters

| Name      | Type   | Description         |
| --------- | ------ | ------------------- |
| portoneId | string | PortOne Identity ID |

#### Request Body

```json
{
  "otp": "123456"
}
```

#### Response `200 OK`

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "portoneId": "p_test",
  "status": "VERIFIED",
  "message": "본인인증이 완료되었습니다",
  "requestedAt": "2025-11-12T13:59:44.000Z"
}
```

#### Error Responses

* `400 Bad Request` – 유효하지 않은 OTP
* `401 Unauthorized` – 인증 실패

---

## 3. 본인인증 OTP 재전송

### POST `/api/identity/verifications/{portoneId}/requests/resend`

본인인증 OTP를 다시 전송합니다.

#### Path Parameters

| Name      | Type   | Description         |
| --------- | ------ | ------------------- |
| portoneId | string | PortOne Identity ID |

#### Query Parameters (Optional)

| Name    | Type   | Description |
| ------- | ------ | ----------- |
| storeId | string | 가맹점 스토어 ID  |

#### Request Body

```json
{
  "method": "SMS"
}
```

#### Response `200 OK`

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "portoneId": "p_test",
  "status": "SENT",
  "message": "본인인증 요청이 전송되었습니다",
  "requestedAt": "2025-11-12T13:59:44.000Z"
}
```

---

## 4. PASS 본인인증 검증

### POST `/api/identity/verifications/pass-verification`

PASS 인증 완료 후 반환된 `identityId`를 검증하여
사용자의 본인인증 상태를 확정합니다.

#### Request Body

```json
{
  "returnedIdentityId": "iv_1234567890"
}
```

#### Response `200 OK`

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "portoneId": "p_test",
  "status": "VERIFIED",
  "message": "본인인증 완료",
  "requestedAt": "2025-11-12T13:59:44.000Z"
}
```

---

## 5. Certified 본인인증 검증

### POST `/api/identity/verifications/certified-verification`

PortOne `imp_uid`를 사용해 인증 결과를 조회 및 검증합니다.

#### Request Body

```json
{
  "impUid": "imp_1234567890"
}
```

#### Response `200 OK`

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "portoneId": "p_test",
  "status": "VERIFIED",
  "message": "본인인증 완료",
  "requestedAt": "2025-11-12T13:59:44.000Z"
}
```

---

## 6. 본인인증 상태 조회 (단건)

### GET `/api/identity/verifications/{portoneId}`

PortOne Identity ID 기준으로 본인인증 상태를 조회합니다.

#### Path Parameters

| Name      | Type   | Description         |
| --------- | ------ | ------------------- |
| portoneId | string | PortOne Identity ID |

#### Query Parameters (Optional)

| Name    | Type   | Description |
| ------- | ------ | ----------- |
| storeId | string | 가맹점 스토어 ID  |

#### Response `200 OK`

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "portoneId": "p_test",
  "status": "SENT",
  "message": "본인인증 요청이 전송되었습니다",
  "requestedAt": "2025-11-12T13:59:44.000Z"
}
```

#### Error Responses

* `401 Unauthorized`
* `404 Not Found` – 본인인증 기록 없음

---

## 7. 본인인증 목록 조회 (사용자별)

### GET `/api/identity/verifications`

로그인한 사용자의 모든 본인인증 기록을 조회합니다.

#### Query Parameters

* `page`

```json
{
  "size": 20,
  "offset": 0
}
```

* `sort`

```json
{
  "field": "requestedAt",
  "order": "DESC"
}
```

* `filter`

```json
{}
```

#### Response `200 OK`

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440003",
    "portoneId": "p_test_1234567890",
    "status": "VERIFIED",
    "message": "본인인증 완료",
    "requestedAt": "2025-11-12T13:59:44.000Z"
  }
]
```

---

## 8. 현재 사용자 최신 PASS 인증 정보 조회

### GET `/api/identity/verifications/me/latest`

로그인한 사용자의 **최신 PASS 본인인증 정보**를 조회합니다.

#### Response `200 OK`

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "name": "홍길동",
  "phone": "010-1234-5678",
  "ci": "encoded_ci_value",
  "di": "encoded_di_value",
  "verifiedAt": "2025-11-12T16:00:00.000Z"
}
```

#### Error Responses

* `401 Unauthorized`
* `404 Not Found` – 인증된 정보 없음

---

## Notes

* 본인인증 정보(CI/DI)는 **민감정보**이므로 클라이언트 저장 금지
* 재인증 필요 조건:

  * 탈퇴 후 재가입
  * 인증 만료
* 실서비스에서는 **재시도 제한 / Rate Limit** 적용 권장

---
