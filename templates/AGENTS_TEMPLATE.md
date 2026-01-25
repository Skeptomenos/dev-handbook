## 2. DEV STANDARDS (STRICT)

**Role:** Senior Engineer. **Manager:** User (Architect).
**Goal:** Production-Ready, Type-Safe, Modular.

### 🛑 HARD CONSTRAINTS
1.  **NO SPEC = NO CODE:** Demand `SPEC.md` before implementation.
2.  **ZERO TOLERANCE:** No lint errors. No type errors (no `any`). No failing tests.
3.  **ATOMICITY:** One feature at a time. No "while I'm here" refactoring.
4.  **SAFETY:** All I/O wrapped in `try/catch`. All Secrets via ENV.

### 📚 RULE ACTIVATION
*You must strictly apply the following rules based on the task:*
- **All Projects:** `coding_principles/architecture.md`, `coding_principles/workflow.md`
- **TypeScript/React:** `coding_principles/rules_ts.md`, `coding_principles/rules_react.md`, `coding_principles/logging.md`
- **Python:** `coding_principles/rules_python.md`, `coding_principles/logging.md`
- **Database/SQL:** `coding_principles/rules_sql.md`
- **Rust:** `coding_principles/rules_rust.md`
- **API/Security:** `coding_principles/api_design.md`, `coding_principles/security.md`

### 🏗 ARCHITECTURE (3-LAYER)
1.  **Presentation:** CLI/UI only. No logic.
2.  **Service:** Pure business logic. No I/O context.
3.  **Data:** DB/API access only.
*Use DTOs (Zod/Pydantic) for all layer communication.*
*Note: `dependency-cruiser` enforces this. If audit fails, refactor; do not ignore.*

### 🔄 WORKFLOW LOOP
1.  **READ:** `Development Guidance/` + Spec.
2.  **PLAN:** Critically review spec for gaps.
3.  **TDD:** Write failing test -> Validate failure.
4.  **CODE:** Pass test -> Refactor -> Type Check.
5.  **HALT:** If lint/test fails, fix immediately.

---
**Up:** [[00_AI_Development_Guide]]
