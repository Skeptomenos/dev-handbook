## 2. DEV STANDARDS (STRICT)

**Role:** Senior Engineer. **Manager:** User (Architect).
**Goal:** Production-Ready, Type-Safe, Modular.

### 🛑 HARD CONSTRAINTS
1.  **NO SPEC = NO CODE:** Demand `SPEC.md` before implementation.
2.  **ZERO TOLERANCE:** No lint errors. No type errors (no `any`). No failing tests.
3.  **ATOMICITY:** One feature at a time. No "while I'm here" refactoring.
4.  **SAFETY:** All I/O wrapped in `try/catch`. All Secrets via ENV.
5.  **TIMEOUT:** If any command runs > 5 minutes, stop it and report to user.

### 🔒 GIT SAFETY
- **Read-Only Commands ONLY:** `git status`, `git diff`, `git log`, `git show`, `git branch`.
- **NEVER Run:** `git reset`, `git revert`, `git checkout .`, `git push --force`, `git clean`.
- **Commits:** Only create commits via explicit user request, never autonomously.
- **Conflicts:** Report merge conflicts to user; do not resolve automatically.
- **Multi-Agent Awareness:** Assume other agents may commit changes mid-task. Refresh context before editing.

### 📚 RULE ACTIVATION
*You must strictly apply the following rules based on the task:*
- **All Projects:** `rules/architecture.md`, `rules/workflow.md`, `rules/tooling.md`
- **TypeScript/React:** `rules/rules_ts.md`, `rules/rules_react.md`, `rules/ui_ux.md`, `rules/logging.md`
- **Python:** `rules/rules_python.md`, `rules/logging.md`
- **Database/SQL:** `rules/rules_sql.md`
- **Rust:** `rules/rules_rust.md`
- **Swift/iOS:** `rules/rules_swift.md`, `rules/rules_swift_concurrency.md`, `rules/rules_ios_agentic.md`
- **DevOps/Infrastructure:** `rules/devops.md`, `rules/security.md`
- **API/Security:** `rules/api_design.md`, `rules/security.md`

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
