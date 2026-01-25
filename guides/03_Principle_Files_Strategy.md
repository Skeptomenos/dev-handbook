# Principle Files: The "Standard Operating Procedures"

> **Concept:** Create a library of generic "Best Practice" files (e.g., `rules_typescript.md`, `rules_python.md`) that you inject into every project.

## 1. Universal vs. Project-Specific
Can you reuse them? **Yes.**
*   **80% Universal:** Language syntax, error handling patterns, security rules, and performance tips are the same across projects.
*   **20% Project-Specific:** Folder structure, specific libraries used, and naming conventions might vary.

## 2. The Strategy: "Mixins"
Create a central folder (e.g., `~/repos/ai-tooling/standards/`) containing your master rules. When starting a project, copy the relevant ones into your `instructions.md` or `.cursorrules`.

---

## 3. Example Principles

### A. TypeScript / Node.js (`rules_ts.md`)
*   **Type Safety:** "No `any`. Define interfaces for all API responses."
*   **Async:** "Use `async/await`, never `then/catch` chains."
*   **Imports:** "Use named exports (`export const foo`) not default exports."
*   **Ecosystem:** "Use `zod` for runtime validation of JSON."

### B. Python (`rules_python.md`)
*   **Typing:** "All functions must have Type Hints (`def foo(x: int) -> str:`)."
*   **Style:** "Follow PEP8. Use `ruff` for linting."
*   **Safety:** "Use `pydantic` for data validation. Never use raw dictionaries for structured data."
*   **Venv:** "Always verify the virtual environment is active."

### C. SQL / Database (`rules_sql.md`)
*   **Keys:** "Every table must have a primary key `id`."
*   **Indexing:** "Index any column used in a `WHERE` or `JOIN` clause."
*   **Queries:** "NO `SELECT *`. Explicitly list columns."
*   **Safety:** "Never interpolate strings into queries. Use parameterized queries."

### D. Rust (`rules_rust.md`)
*   **Error Handling:** "No `.unwrap()`. Handle every `Result` with `match` or `?`."
*   **Clippy:** "Code must pass `cargo clippy -- -D warnings`."
*   **Modules:** "Keep `main.rs` small. Move logic to `lib.rs`."

---

## 4. How to Use Them
In your **Spec**, simply reference the standard:

> "This project uses the **TypeScript Standard**.
> Please adhere to the rules in `standards/rules_ts.md`."

This is highly feasible and recommended. It scales your "Senior Architect" role across many projects without rewriting the same rules every time.

---
**Up:** [[00_AI_Development_Guide]]
**Next:** [[04_Writing_Good_Specs]]
**Principles:** [[coding_principles/rules_ts.md|TypeScript]] | [[coding_principles/rules_python.md|Python]] | [[coding_principles/rules_sql.md|SQL]] | [[coding_principles/rules_rust.md|Rust]]
