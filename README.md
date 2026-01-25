# Dev Handbook

> **The "Senior Architect" in a Box.**

This repository contains the definitive standards, coding principles, and guidelines for AI-assisted software development.

## Quick Start

```bash
# Create a new project with standards pre-installed
npx dev-rules init my-app

# Or add standards to an existing project
cd my-existing-project
npx dev-rules inject
```

## Structure

- **`cli/`**: The `dev-rules` CLI tool for automating project setup.
- **`guides/`**: The "University Course". Detailed explanations of *Why* we do things.
  - Read this to understand the philosophy (Spec-Driven, Back Pressure, 3-Layer Arch).
- **`rules/`**: The "Runtime Kernel". Strict, token-optimized rules for the LLM.
  - The AI reads these to know *What* to do (No `any`, Use Pydantic, No `console.log`).
- **`templates/`**: Meta-tools for applying these standards to new projects.

## CLI Commands

| Command | Description |
|---------|-------------|
| `dev-rules init <name>` | Scaffold a new project with AGENTS.md and rules |
| `dev-rules inject` | Add standards to current directory |
| `dev-rules update` | Check and update outdated rules |

## Usage

**For Humans:**
Start with `guides/00_AI_Development_Guide.md`.

**For AI Agents:**
When starting a project, copy `templates/AGENTS_TEMPLATE.md` to your project root as `AGENTS.md` and configure it to point to the `rules/`.
