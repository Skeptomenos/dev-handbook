# Feature: Dev Rules CLI

## 1. Context
We need a CLI tool (`dev-rules`) to automate the "Senior Architect" setup for new and existing projects.
This tool lives inside the `dev-handbook` repository to ensure strict alignment with the rules.

## 2. Requirements
- [ ] **Init Command:** `dev-rules init <name>`
    - [ ] Scaffolds a new project with the latest standards.
    - [ ] Injects `AGENTS.md` and `.cursor/rules/`.
- [ ] **Inject Command:** `dev-rules inject`
    - [ ] Adds standards to the *current* directory.
    - [ ] Detects stack (TS/Python) and installs relevant rules.
- [ ] **Update Command:** `dev-rules update`
    - [ ] Checks `.cursor/rules/` for outdated files.
    - [ ] Fetches latest from GitHub.
    - [ ] Prompts user to confirm overwrites.
- [ ] **Source of Truth:** Uses the LOCAL rules if running from within the repo, or fetches from GitHub if installed globally.

## 3. Constraints
- **Name:** The binary must be `dev-rules`.
- **Location:** Source code must reside in `cli/` folder of this repo.
- **Distribution:** Must support `npx dev-rules` usage.

## 4. Technical Approach
- **Language:** TypeScript (Node.js).
- **Structure:** Mono-repo.
  - `guides/` & `rules/`: The Content.
  - `cli/`: The Tool.
- **Dependencies:** `commander` (CLI), `prompts` (UI), `degit`/`fetch`.

## 5. Verification Plan
- [ ] **Test Local:** Build `cli/`, run `dev-rules init test-app`.
- [ ] **Test Remote:** Publish/Mock publish, run `npx dev-rules init`.

---
**Up:** [[00_AI_Development_Guide]]
