

```md
# User Management API

사용자 계정의 라이프사이클(탈퇴 등)을 관리하는 API입니다.  
모든 API는 **로그인된 사용자 기준**으로 동작합니다.

---

## Authentication

- 인증 필요: ✅
- Header:
```

Authorization: Bearer <access_token>

````

---

## 1. 사용자 탈퇴

### DELETE `/api/users/current`

현재 로그인한 사용자의 계정을 **영구 삭제**합니다.  
삭제 후 해당 사용자의 모든 세션 및 토큰은 무효화됩니다.

- 인증 필요: ✅

#### Request

- Parameters: 없음
- Request Body: 없음

#### Response `200 OK`

```json
{
"message": "사용자 탈퇴가 완료되었습니다"
}
````

---

## Error Responses

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
  "message": "사용자를 찾을 수 없습니다",
  "errorType": "NotFoundException"
}
```

---

## Notes

* 탈퇴된 계정은 **복구 불가**
* 탈퇴 즉시:

  * Access Token / Refresh Token 전부 무효화
  * 관련 세션 및 사용자 데이터 삭제
* 클라이언트에서는 **재확인 UX (Modal / Confirm)** 필수 권장

---
