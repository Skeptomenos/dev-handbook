# Tooling Standards (2026)

> **Mandate:** Use the right tool for the job. Prefer modern, maintained options.

## 1. Task Runners
Preference order:
1. **`just`** - If `justfile` exists, use it for build/test/lint.
2. **`make`** - If `Makefile` exists and no `justfile`.
3. **Ask user** - If neither exists, confirm before adding one.

## 2. Code Transformation
- **AST-first:** Prefer `ast-grep` for structural code edits over regex.
- **Regex:** Only for simple text replacements (comments, strings, config values).
- **Manual:** For complex refactors requiring semantic context.

## 3. Package Managers (by ecosystem)

| Ecosystem | Required Tool | Forbidden        |
| --------- | ------------- | ---------------- |
| Node.js   | `pnpm`        | `npm`, `yarn`    |
| Python    | `uv`          | `pip`, `poetry`  |
| Rust      | `cargo`       | -                |

## 4. Environment Management
- **Nix:** If `flake.nix` exists, respect it. Do not run `nix` commands that modify the environment without user approval.
- **Docker:** Preferred for CI reproducibility.
- **Local Setup:** Document in `README.md` or `CONTRIBUTING.md`.

## 5. Linting & Formatting
Run before every commit:

| Language   | Formatter       | Linter                          |
| ---------- | --------------- | ------------------------------- |
| TypeScript | `prettier`      | `eslint` or `biome`             |
| Python     | `ruff format`   | `ruff check`                    |
| Rust       | `cargo fmt`     | `cargo clippy --all-features`   |
| SQL        | `sqlfluff`      | `sqlfluff`                      |

---
**Up:** [[../03_Principle_Files_Strategy]]
