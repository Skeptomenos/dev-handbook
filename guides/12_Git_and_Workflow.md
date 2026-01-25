# Git & Workflow (2026)

> **Mandate:** A clean history is a debuggable history.

## 1. Branching Strategy: Trunk-Based Development
- **Main Branch:** `main` (Production-ready).
- **Feature Branches:** `feat/user-login`, `fix/nav-bug`.
- **Lifespan:** Branches must be short-lived (< 24 hours). Merge often.
- **Workflow:**
  1.  Checkout `feat/new-thing`.
  2.  AI Implements -> Tests Pass.
  3.  Squash & Merge to `main`.

## 2. Conventional Commits
Standardize messages for auto-generated changelogs.
- `feat:` New feature.
- `fix:` Bug fix.
- `docs:` Documentation only.
- `refactor:` Code change, no behavior change.
- `test:` Adding missing tests.
- `chore:` Deps, build, config.

*Example:* `feat(auth): add google oauth provider`

## 3. Pull Request (PR) Etiquette
Even for solo devs, PRs act as a final "Quality Gate".
- **Visuals:** UI changes MUST include screenshots.
- **Checklist:**
  - [ ] Tests passed locally?
  - [ ] Linting clean?
  - [ ] No `console.log` left behind?

---
**Up:** [[00_AI_Development_Guide]]
**Next:** [[13_Deployment_and_DevOps]]
