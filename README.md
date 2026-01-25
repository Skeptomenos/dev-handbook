# Dev Handbook

> **The "Senior Architect" in a Box.**

This repository contains the definitive standards, coding principles, and guidelines for AI-assisted software development.

## Structure

- **`guides/`**: The "University Course". Detailed explanations of *Why* we do things.
  - Read this to understand the philosophy (Spec-Driven, Back Pressure, 3-Layer Arch).
- **`rules/`**: The "Runtime Kernel". Strict, token-optimized rules for the LLM.
  - The AI reads these to know *What* to do (No `any`, Use Pydantic, No `console.log`).
- **`templates/`**: Meta-tools for applying these standards to new projects.

## Usage

**For Humans:**
Start with `guides/00_AI_Development_Guide.md`.

**For AI Agents:**
When starting a project, copy `templates/AGENTS_TEMPLATE.md` to your project root as `AGENTS.md` and configure it to point to the `rules/`.
