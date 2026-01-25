# Feature: Dev Rules CLI

## 1. Context
We need a CLI tool (`dev-rules`) to automate the "Senior Architect" setup for new and existing projects.
This tool lives inside the `dev-handbook` repository to ensure strict alignment with the rules.

## 2. Requirements
- [x] **Init Command:** `dev-rules init <name>`
    - [x] Scaffolds a new project with the latest standards.
    - [x] Injects `AGENTS.md` and `.cursor/rules/`.
    - [ ] **Installs `dependency-cruiser` (TS/JS Only):**
        - [ ] Adds dev dependency (`pnpm add -D dependency-cruiser`).
        - [ ] Copies `templates/dep-cruiser.config.js` to root.
        - [ ] Adds `"audit": "depcruise src --config .dependency-cruiser.js"` to scripts.
    - [ ] **Installs `tach` (Python Only):**
        - [ ] Adds dev dependency (`uv add --dev tach`).
        - [ ] Copies `templates/tach.toml` to root.
        - [ ] Adds `audit` task to `pyproject.toml` (if possible) or instructs user.
- [x] **Inject Command:** `dev-rules inject`
    - [x] Adds standards to the *current* directory.
    - [x] Detects stack (TS/Python) and installs relevant rules.
- [x] **Update Command:** `dev-rules update`
    - [x] Checks `.cursor/rules/` for outdated files.
    - [x] Fetches latest from GitHub.
    - [x] Prompts user to confirm overwrites.
    - [ ] **Check `AGENTS.md`:** Warn if `AGENTS.md` is significantly different from `AGENTS_TEMPLATE.md` (suggest manual diff).
- [x] **Source of Truth:** Uses the LOCAL rules if running from within the repo, or fetches from GitHub if installed globally.

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
- [x] **Test Local:** Build `cli/`, run `dev-rules init test-app`.
- [ ] **Test Remote:** Publish/Mock publish, run `npx dev-rules init`.

---
**Up:** [[00_AI_Development_Guide]]
