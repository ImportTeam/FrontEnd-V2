---

# 🔐 PicSel API – 인증(Auth) 명세

**Base URL**

```
https://api.picsel.kr/api
```

**공통 헤더**

```
Content-Type: application/json
```

> ❗ Auth API 중 `/register`, `/login`, `/refresh`, 소셜 로그인 시작은
> **Authorization 헤더 필요 없음**

---

## 1️⃣ POST `/auth/register`

### 일반 회원가입 (인증 ❌)

이메일 / 비밀번호 / 이름으로 회원가입
👉 **즉시 AccessToken + RefreshToken 발급**

---

### 📥 Request Body

```json
{
  "email": "user@example.com",
  "password": "Password123!",
  "name": "홍길동"
}
```

| 필드       | 타입     | 필수 | 설명              |
| -------- | ------ | -- | --------------- |
| email    | string | ✅  | 사용자 이메일 (중복 불가) |
| password | string | ✅  | 비밀번호            |
| name     | string | ✅  | 사용자 이름          |

---

### 📤 Response 201 (성공)

```json
{
  "message": "로그인 성공",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "issuedAt": "2025-12-08T11:00:00.000Z",
    "user": {
      "uuid": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "name": "홍길동",
      "profileImage": null
    }
  }
}
```

---

### ❌ Response 400 (실패 – 이메일 중복)

```json
{
  "statusCode": 400,
  "message": "이메일이 이미 존재합니다",
  "errorType": "ConflictException",
  "error": {
    "code": "CONFLICT",
    "message": "이메일이 이미 존재합니다",
    "details": {
      "field": "email"
    }
  }
}
```

---

### 🧠 FE 처리 가이드

* 성공 → 토큰 저장 후 로그인 상태 전환
* 실패 → `error.error.details.field === 'email'` 기준 에러 메시지 표시

---

## 2️⃣ POST `/auth/login`

### 일반 로그인 (인증 ❌)

---

### 📥 Request Body

```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

---

### 📤 Response 200 (성공)

```json
{
  "message": "로그인 성공",
  "data": {
    "accessToken": "JWT_ACCESS",
    "refreshToken": "JWT_REFRESH",
    "issuedAt": "2025-12-08T11:00:00.000Z",
    "user": {
      "uuid": "uuid",
      "email": "user@example.com",
      "name": "홍길동",
      "profileImage": null
    }
  }
}
```

---

### ❌ Response 401 (실패 – 이메일/비밀번호 불일치)

```json
{
  "statusCode": 401,
  "message": "인증 실패",
  "errorType": "UnauthorizedException",
  "error": {
    "code": "UNAUTHORIZED",
    "message": "이메일 또는 비밀번호가 올바르지 않습니다",
    "details": null
  }
}
```

---

### 🧠 FE 처리 가이드

* **401 → 로그인 실패 메시지**
* 다른 에러 코드 없음 (명확)

---

## 3️⃣ POST `/auth/refresh`

### Refresh Token으로 Access Token 재발급

> 📌 AccessToken 만료 시 사용
> 📌 RefreshToken은 **보통 HttpOnly Cookie or Secure Storage**

---

### 📥 Request Body

```json
{
  "refresh_token": "JWT_REFRESH"
}
```

---

### 📤 Response 200 (성공)

```json
{
  "data": {
    "accessToken": "NEW_JWT_ACCESS",
    "issuedAt": "2025-12-09T10:00:00.000Z"
  }
}
```

---

### ❌ Response 401 (RefreshToken 만료/무효)

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "errorType": "UnauthorizedException",
  "error": {
    "code": "UNAUTHORIZED",
    "message": "리프레시 토큰이 유효하지 않습니다",
    "details": null
  }
}
```

---

### 🧠 FE 처리 가이드

* refresh 실패 시:

  * 모든 토큰 삭제
  * 로그인 페이지로 리다이렉트

---

## 4️⃣ POST `/auth/logout`

### 로그아웃 (세션 무효화)

---

### 📥 Request Body

```json
{
  "refresh_token": "JWT_REFRESH"
}
```

---

### 📤 Response 200

```json
{
  "message": "로그아웃 성공"
}
```

---

### 🧠 FE 처리 가이드

* 성공 여부 상관없이:

  * 토큰 삭제
  * 로그인 화면 이동

---

## 5️⃣ GET `/auth/google`

### 소셜 로그인 시작 – Google

---

### 📥 Request

```http
GET /api/auth/google
```

---

### 📤 Response 302

* Google 로그인 페이지로 리다이렉트

---

### 🧠 FE 처리 가이드

```ts
window.location.href = 'https://api.picsel.kr/api/auth/google';
```

---

## 6️⃣ GET `/auth/google/callback`

### Google 소셜 로그인 콜백

---

### 📤 Response 200 (성공)

```json
{
  "message": "로그인 성공",
  "data": {
    "accessToken": "JWT_ACCESS",
    "refreshToken": "JWT_REFRESH",
    "issuedAt": "2025-12-08T11:00:00.000Z",
    "user": {
      "uuid": "uuid",
      "email": "user@example.com",
      "name": "홍길동",
      "profileImage": null
    }
  }
}
```

---

### ❌ Response 400 (실패 – 이메일 정보 없음)

```json
{
  "statusCode": 400,
  "message": "이메일 정보가 제공되지 않았습니다",
  "errorType": "BadRequestException",
  "error": {
    "code": "EMAIL_REQUIRED",
    "message": "소셜 로그인에 이메일 정보가 필요합니다",
    "details": null
  }
}
```

---

## 7️⃣ Kakao / Naver 인증

> **Google과 구조 완전히 동일**

| Provider | 시작            | 콜백                     |
| -------- | ------------- | ---------------------- |
| Kakao    | `/auth/kakao` | `/auth/kakao/callback` |
| Naver    | `/auth/naver` | `/auth/naver/callback` |

**Response / Error / 처리 방식 동일**

---

## 🔚 인증 파트 요약 (FE 기준)

* `/register`, `/login` → **토큰 즉시 발급**
* `/refresh` → AccessToken만 재발급
* `/logout` → RefreshToken 무효화
* 소셜 로그인 → **callback에서 토큰 받음**
* 모든 실패 케이스 → `error.code` 기준 처리

---
