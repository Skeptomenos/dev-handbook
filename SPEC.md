# Feature: Opencode Scaffold CLI

## 1. Context
We need a CLI tool (`opencode-scaffold`) to automate the "Senior Architect" setup for new and existing projects.
Instead of manually copying rules from the `dev-handbook`, this tool will fetch them from the source (GitHub) and inject them into the target project.

## 2. Requirements
- [ ] **Init Command:** Scaffolds a new project with the latest standards.
    - [ ] Asks for Project Name & Type (TS/Python).
    - [ ] Creates folder structure.
    - [ ] Injects `AGENTS.md` and `.cursor/rules/`.
- [ ] **Inject Command:** Adds standards to an *existing* project.
    - [ ] Detects project type automatically (if possible).
    - [ ] Copies relevant rules.
- [ ] **Source of Truth:** Fetches raw Markdown files from `github.com/Skeptomenos/dev-handbook`.
- [ ] **Zero Config:** Works without requiring a local clone of `dev-handbook`.

## 3. Constraints (Negative Patterns)
- **NO** local symlinks (must copy files for portability).
- **NO** hardcoded file lists (fetch the file list dynamically if possible, or use a config map).
- **NO** heavy dependencies (use lightweight tools like `prompts`, `degit` or just `fetch`).

## 4. Technical Approach
- **Language:** TypeScript (Node.js).
- **Build:** `tsup` or `ncc` to bundle into a single executable.
- **Distribution:** `npm publish` (scoped `@skeptomenos/scaffold` or similar).
- **Fetching:** Use `fetch` against `raw.githubusercontent.com`.

## 5. Verification Plan
- [ ] **Test Init:** Run `opencode-scaffold init my-app` -> Verify `.cursor/rules/rules_ts.md` exists.
- [ ] **Test Inject:** Run `opencode-scaffold inject` in a Python repo -> Verify `rules_python.md` is added.
- [ ] **Test Updates:** Change a rule in GitHub -> Run tool -> Verify local file updates.

---
**Up:** [[00_AI_Development_Guide]]
