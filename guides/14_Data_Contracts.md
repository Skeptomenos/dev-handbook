# Data Contracts (2026)

> **Mandate:** Trust, Verification, and Schema Synchronization.

## 1. What is a Data Contract?
A formal agreement on the "Shape of Data" moving between systems (e.g., API -> Frontend, or Service -> Service).
- **It is NOT:** Just documentation.
- **It IS:** Enforced code (Runtime Validation).

## 2. The "Dual-Schema" Strategy (Zod + Pydantic)
If you have a Python Backend and TS Frontend, you risk drift.
- **Solution:** Code Generation (or strict manual sync).
  - *Backend (Source of Truth):* Define Pydantic Models.
  - *Frontend:* Generate Zod schemas / TypeScript interfaces from OpenAPI (Swagger).

## 3. Implementation Rules
### A. At the Edge (Input)
- **Never trust input.** Validate EVERYTHING entering your system.
- *Tool:* `Zod` (TS) or `Pydantic` (Python).
- *Action:* Strip unknown fields (`strict` mode).

### B. At the Core (Internal)
- Once data passes the "Edge", trust the Type System. Don't re-validate everywhere.

### C. At the Exit (Output)
- Validate responses *before* sending them to the user.
- *Why?* Prevents accidental leakage of private fields (e.g., `password_hash`).

## 4. Contract Testing
- **Consumer-Driven Contracts:** The Frontend defines what it *needs*. The Backend tests ensure it *provides* that.
- **Breaking Changes:** If you change a Contract (rename a field), the CI MUST fail until all consumers are updated.

---
**Up:** [[00_AI_Development_Guide]]
**Next:** [[00_AI_Development_Guide]]
