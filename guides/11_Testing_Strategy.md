# Testing Strategy (2026)

> **Mandate:** Confidence through Layered Verification. The "Ratchet" that prevents regression.

## 1. The Testing Pyramid
Since AI generates code fast, we can afford better coverage.

### Level 1: Unit Tests (60%)
- **Scope:** Individual functions, Zod validators, Parsers.
- **Tool:** **Vitest** (Fast, TS-native).
- **Mocking:** None (Pure logic).
- **AI Instruction:** "Write a unit test for `calculateTax` covering 0 and negative inputs."

### Level 2: Integration Tests (30%)
- **Scope:** API Endpoints + Database.
- **Tool:** **Vitest** + **Testcontainers** (or in-memory SQLite).
- **Mocking:** Mock *External* APIs (Stripe, OpenAI) but use the *REAL* DB (SQLite).
- **Goal:** Verify SQL queries and API contracts.

### Level 3: E2E Tests (10%)
- **Scope:** Critical User Flows (Login -> Checkout).
- **Tool:** **Playwright**.
- **Mocking:** Minimal. Test the full stack.
- **Goal:** "Does it work for the user?"

## 2. Test-Driven Development (TDD)
This is the best way to control AI.
1.  **Instruction:** "Write a failing test for [Feature] first."
2.  **Verify:** Run it. See it fail. (Validates the test logic).
3.  **Implement:** "Now write code to pass the test."

## 3. Mocking Rules
- **Internal Code:** Do NOT mock your own services. Test the real interaction.
- **Third Party:** ALWAYS mock paid/slow APIs (OpenAI, Twilio). Use **MSW (Mock Service Worker)**.

---
**Up:** [[00_AI_Development_Guide]]
**Next:** [[12_Git_and_Workflow]]
