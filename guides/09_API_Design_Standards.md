# API Design Standards (2026)

> **Mandate:** Predictability, Safety, and "AI-Readability".

## 1. RESTful Core Principles
- **Resources (Nouns):**
  - ✅ `GET /users`, `POST /users`, `GET /users/:id`
  - ❌ `GET /getUsers`, `POST /createUser` (RPC style - avoid unless necessary)
- **Methods (Verbs):**
  - `GET`: Read (Idempotent).
  - `POST`: Create (Non-idempotent).
  - `PUT`: Replace (Idempotent).
  - `PATCH`: Update (Idempotent).
  - `DELETE`: Remove (Idempotent).
- **Status Codes:**
  - `200`: OK.
  - `201`: Created (Return the resource).
  - `204`: No Content (Delete success).
  - `400`: Bad Request (Validation failure).
  - `401`: Unauthorized (Not logged in).
  - `403`: Forbidden (Logged in, no permission).
  - `404`: Not Found.
  - `500`: Internal Error (Bug).

## 2. The JSON Envelope (Contract)
All APIs must return a consistent envelope to simplify client error handling.

```ts
// Success
{
  "success": true,
  "data": { ... }, // The resource or list
  "meta": {        // Optional metadata
    "page": 1,
    "limit": 20,
    "total": 100
  }
}

// Error
{
  "success": false,
  "error": {
    "code": "INVALID_EMAIL",
    "message": "The email format is incorrect.",
    "details": { "field": "email", "value": "foo@" }
  }
}
```

## 3. Pagination (Mandatory)
Any endpoint returning a list must support pagination.
- **Cursor-based** (Preferred for feeds/real-time): `?cursor=xyz&limit=20`
- **Offset-based** (Okay for admin tables): `?page=1&limit=20`
- **Hard Limit:** Always enforce `limit <= 100` to prevent DB DOS attacks.

## 4. Versioning
- **URI Versioning:** `/api/v1/resource`
- **Breaking Changes:** NEVER change a v1 response shape. Add a new field or create `/api/v2`.

## 5. Security Headers
- `Content-Type: application/json`
- `Strict-Transport-Security` (HSTS)
- `Cache-Control: no-store` (for dynamic data)

---
**Up:** [[00_AI_Development_Guide]]
**Next:** [[10_Frontend_Architecture]]
