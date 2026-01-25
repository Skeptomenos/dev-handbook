# Deployment & DevOps (2026)

> **Mandate:** "It works on my machine" is not an excuse.

## 1. Containerization (Docker)
- **Multi-Stage Builds:**
  - *Stage 1 (Builder):* Install deps, build TS/Go/Rust.
  - *Stage 2 (Runner):* Copy *only* the binary/dist. Small image (Alpine/Distroless).
- **Determinism:** Use `package-lock.json` or `uv.lock`. Never `npm install` without a lockfile.

## 2. CI/CD (GitHub Actions)
Automate the "Back Pressure".
- **Trigger:** On `push` to `main` or `PR`.
- **Steps:**
  1.  Lint (Biome/Ruff).
  2.  Type Check (TSC/Mypy).
  3.  Test (Vitest/Pytest).
  4.  Build (Docker).
- **Rule:** If CI fails, the PR is blocked.

## 3. Environment Variables
- **Secrets:** Never commit `.env`.
- **Validation:** Use `zod`/`pydantic` to validate ENV vars at startup. Crash immediately if a key is missing.
  ```ts
  // startup.ts
  const env = EnvSchema.parse(process.env); // Crashes with clear error if DB_URL missing
  ```

## 4. Observability & Logging
- **The Rule:** No `console.log`.
- **The Solution:** Use **Structured Logging** (JSON).
  - *Why?* Tools like Datadog/CloudWatch cannot parse text like "User logged in". They CAN parse `{"event": "login", "user_id": 123}`.
  - *Tools:* Use `pino` (Node) or `structlog` (Python).
- **Health Checks:** `/health` endpoint returning `200 OK`.

---
**Up:** [[00_AI_Development_Guide]]
**Next:** [[14_Data_Contracts]]
