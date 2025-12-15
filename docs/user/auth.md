# Authentication API

PicSel 인증(Auth) 관련 API 명세서입니다.  
이메일/비밀번호 로그인, 소셜 로그인, 토큰 재발급 및 로그아웃 기능을 제공합니다.

---

## Base URL

```

[https://api.picsel.kr](https://api.picsel.kr)

````

---

## Authentication Overview

- **Access Token**: JWT (Authorization: Bearer \<token\>)
- **Refresh Token**: 토큰 재발급 및 로그아웃 시 사용
- 로그인 / 토큰 재발급 API는 **인증 불필요**
- 보호된 API는 `Authorization` 헤더 필요

---

## 공통 Error Response

```json
{
  "statusCode": 400,
  "message": "에러 메시지",
  "errorType": "ExceptionName",
  "error": {
    "code": "ERROR_CODE",
    "message": "상세 에러 메시지",
    "details": {
      "field": "email"
    }
  }
}
````

---

## 1. 일반 로그인

### POST `/api/auth/login`

이메일과 비밀번호로 로그인합니다.
성공 시 Access Token, Refresh Token, 발급 시각과 사용자 정보를 반환합니다.

* 인증 필요: ❌

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

#### Response `200 OK`

```json
{
  "message": "로그인 성공",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "issuedAt": "2025-12-08T11:00:00.000Z",
    "user": {
      "uuid": "550e8400-e29b-41d4-a716-446655440000",
      "email": "test@example.com",
      "name": "홍길동",
      "profileImage": null
    }
  }
}
```

#### Response `401 Unauthorized`

```json
{
  "statusCode": 400,
  "message": "이메일 또는 비밀번호가 올바르지 않습니다",
  "errorType": "UnauthorizedException"
}
```

---

## 2. 토큰 재발급

### POST `/api/auth/refresh`

Refresh Token을 사용해 Access Token을 재발급합니다.

* 인증 필요: ❌

#### Request Body

```json
{
  "refresh_token": "string"
}
```

#### Response `200 OK`

```json
{
  "message": "토큰 재발급 성공",
  "data": {
    "accessToken": "new-access-token",
    "issuedAt": "2025-12-08T12:00:00.000Z"
  }
}
```

---

## 3. 로그아웃

### POST `/api/auth/logout`

Refresh Token을 무효화하여 로그아웃 처리합니다.

* 인증 필요: ❌

#### Request Body

```json
{
  "refresh_token": "string"
}
```

#### Response `200 OK`

```json
{
  "message": "로그아웃 성공"
}
```

---

## 4. 소셜 로그인 (GET)

### GET `/api/auth/{provider}`

소셜 로그인 플로우를 시작합니다.
해당 provider 인증 페이지로 **Redirect** 됩니다.

* 인증 필요: ❌

#### Path Parameters

| Name     | Type   | Description                  |
| -------- | ------ | ---------------------------- |
| provider | string | `google` | `kakao` | `naver` |

#### Response

* `200 OK`
* Provider 로그인 페이지로 리다이렉트

---

## 5. 소셜 로그인 (POST Alias)

### POST `/api/auth/{provider}/login`

POST 요청만 허용되는 클라이언트를 위한 소셜 로그인 별칭 API입니다.
GET `/api/auth/{provider}` 와 동일하게 동작합니다.

* 인증 필요: ❌

#### Path Parameters

| Name     | Type   | Description                  |
| -------- | ------ | ---------------------------- |
| provider | string | `google` | `kakao` | `naver` |

#### Response

* `201 Created`
* Provider 로그인 페이지로 리다이렉트

---

## 6. 소셜 로그인 콜백

### GET `/api/auth/{provider}/callback`

소셜 로그인 인증 완료 후 호출되는 콜백 엔드포인트입니다.
Provider별 내부 콜백 로직으로 리다이렉트됩니다.

* 인증 필요: ❌

#### Path Parameters

| Name     | Type   | Description                  |
| -------- | ------ | ---------------------------- |
| provider | string | `google` | `kakao` | `naver` |

#### Response

* `200 OK`
* 내부 콜백 처리 후 토큰 발급

---

## Notes

* Refresh Token은 **보안 저장소(HttpOnly Cookie 또는 Secure Storage)** 사용 권장
* Access Token 만료 시 `/api/auth/refresh` 호출
* 로그아웃 시 반드시 Refresh Token을 서버에 전달해야 세션이 완전히 무효화됨

---


