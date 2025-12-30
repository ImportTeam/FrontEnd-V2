# 👤 PicSel API – 사용자 관리(User) 명세

**Base URL**

```
https://api.picsel.kr/api
```

**공통 사항**

* 🔐 **모든 API는 Authorization 필요**

```
Authorization: Bearer <ACCESS_TOKEN>
```

* AccessToken 만료 시 → `/auth/refresh` 사용

---

## 1️⃣ GET `/users/current`

### 현재 로그인한 사용자 정보 조회

---

### 📥 Request

* Path / Query / Body: ❌ 없음
* Header:

```
Authorization: Bearer <JWT>
```

---

### 📤 Response 200 (성공)

```json
{
  "seq": "1",
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "name": "홍길동",
  "social_provider": "NONE",
  "social_id": null,
  "preferred_payment_seq": 5,
  "created_at": "2025-01-10T09:30:00.000Z",
  "updated_at": "2025-01-13T14:20:00.000Z"
}
```

---

### ❌ Response 401 (토큰 없음 / 만료)

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "errorType": "UnauthorizedException",
  "error": {
    "code": "UNAUTHORIZED",
    "message": "인증이 필요합니다",
    "details": null
  }
}
```

---

### 🧠 FE 처리 가이드

* 앱 진입 시 **최초 호출 API**
* 실패(401) → 로그인 페이지 이동
* 성공 → 전역 유저 상태 초기화

---

### 📌 axios 예시

```ts
const res = await api.get('/users/current');
return res.data;
```

---

## 2️⃣ PATCH `/users/current`

### 사용자 정보 수정 (이름 / 이메일 / 설정)

---

### 📥 Request Body

```json
{
  "name": "홍길동",
  "email": "newemail@example.com",
  "settings": {
    "notificationEnabled": true,
    "darkMode": false,
    "compareMode": "AUTO",
    "currencyPreference": "KRW"
  }
}
```

| 필드       | 타입     | 필수 | 설명      |
| -------- | ------ | -- | ------- |
| name     | string | ❌  | 변경할 이름  |
| email    | string | ❌  | 변경할 이메일 |
| settings | object | ❌  | 사용자 설정  |

> ❗ 필요한 필드만 보내도 됨 (Partial Update)

---

### 📤 Response 200 (성공)

```json
{
  "message": "사용자 정보가 수정되었습니다.",
  "user": {
    "seq": "1",
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "email": "newemail@example.com",
    "name": "새로운 이름",
    "updated_at": "2025-01-13T14:25:00.000Z"
  }
}
```

---

### ❌ Response 400 (이메일 중복 등)

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

* 성공 → 로컬 user 상태 갱신
* `error.details.field === 'email'` → 이메일 에러 표시

---

### 📌 axios 예시

```ts
await api.patch('/users/current', payload);
```

---

## 3️⃣ PATCH `/users/current/password`

### 비밀번호 변경

---

### 📥 Request Body

```json
{
  "currentPassword": "Password123!",
  "newPassword": "NewPassword123!"
}
```

| 필드              | 필수 | 설명      |
| --------------- | -- | ------- |
| currentPassword | ✅  | 현재 비밀번호 |
| newPassword     | ✅  | 새 비밀번호  |

---

### 📤 Response 200 (성공)

```json
{
  "message": "비밀번호가 변경되었습니다."
}
```

---

### ❌ Response 400 (현재 비밀번호 불일치)

```json
{
  "statusCode": 400,
  "message": "현재 비밀번호가 일치하지 않습니다",
  "errorType": "BadRequestException",
  "error": {
    "code": "INVALID_PASSWORD",
    "message": "현재 비밀번호가 일치하지 않습니다",
    "details": null
  }
}
```

---

### 🧠 FE 처리 가이드

* 성공 → 알림 표시
* 실패 → currentPassword 필드 에러 표시

---

## 4️⃣ DELETE `/users/current`

### 사용자 계정 삭제 (탈퇴)

> ⚠️ **되돌릴 수 없음**

---

### 📥 Request

* Body ❌ 없음

---

### 📤 Response 200

```json
{
  "message": "사용자 계정이 삭제되었습니다."
}
```

---

### 🧠 FE 처리 가이드

* 성공 시:

  * 토큰 전부 삭제
  * 로그인 페이지 이동
* 확인 모달 필수

---

## 5️⃣ GET `/users/sessions`

### 내 세션 목록 조회 (토큰 미노출)

---

### 📤 Response 200

```json
[
  {
    "id": "10",
    "deviceInfo": "Chrome on Windows",
    "createdAt": "2025-12-03T12:34:56.789Z",
    "expiresAt": "2025-12-03T13:34:56.789Z"
  }
]
```

---

### 🧠 FE 처리 가이드

* “로그인된 기기 관리” 화면
* 현재 세션은 별도 표시 추천

---

## 6️⃣ DELETE `/users/sessions/{seq}`

### 특정 세션 강제 로그아웃

---

### 📥 Path Parameter

| 이름  | 타입     | 설명    |
| --- | ------ | ----- |
| seq | string | 세션 ID |

---

### 📤 Response 200

```json
{
  "message": "세션이 종료되었습니다."
}
```

---

### 🧠 FE 처리 가이드

* 성공 → 세션 목록 재조회
* **현재 세션 seq일 경우 → 전체 로그아웃 처리**

---

## 🔚 사용자 관리 파트 요약 (FE 기준)

| 기능       | 핵심 포인트             |
| -------- | ------------------ |
| 현재 유저 조회 | 앱 최초 진입 시 필수       |
| 정보 수정    | Partial Update     |
| 비밀번호 변경  | currentPassword 검증 |
| 회원 탈퇴    | 토큰 전부 삭제           |
| 세션 목록    | 다중 로그인 관리          |
| 세션 강제 종료 | 보안 기능              |

---