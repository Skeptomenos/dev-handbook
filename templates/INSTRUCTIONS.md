# Implementation Guide for AI Agents

> **Objective:** Onboard a new project to the "Senior Architect" standards by installing the `AGENTS.md` file.

## The Protocol

When you (the AI) are asked to "Initialize this project" or "Add the standards":

1.  **Analyze the Tech Stack:**
    *   Is it TypeScript/Node? (Look for `package.json`, `tsconfig.json`)
    *   Is it Python? (Look for `pyproject.toml`, `requirements.txt`)
    *   Is it a Database project? (Look for SQL files)

2.  **Generate `AGENTS.md`:**
    *   Read `templates/AGENTS_TEMPLATE.md`.
    *   **Customize** the `📚 RULE ACTIVATION` section.
        *   *If TS:* Keep `rules_ts.md` and `logging.md`. Remove Python rules.
        *   *If Python:* Keep `rules_python.md` and `logging.md`. Remove TS rules.
    *   **Verify Paths:** Ensure the links point to the correct location (either a local copy in `.cursor/rules` or the absolute path to `~/repos/dev-handbook/rules/`).

3.  **Install the Rules (Optional but Recommended):**
    *   Create a hidden folder: `.cursor/rules/`.
    *   Copy the relevant rule files from `dev-handbook/rules/` into this folder.
    *   Update `AGENTS.md` to point to these local files (e.g., `.cursor/rules/rules_ts.md`).

4.  **Confirm Compliance:**
    *   Report to the user: "I have installed the AGENTS.md file and configured strict [Language] rules."
