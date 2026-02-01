# Dev Handbook

[![npm version](https://img.shields.io/npm/v/dev-rules.svg)](https://www.npmjs.com/package/dev-rules)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **The "Senior Architect" in a Box.**

Stop fighting with AI assistants that write sloppy code. This repository provides battle-tested standards, coding principles, and automated tooling that transform AI coding assistants into disciplined senior engineers.

## Why This Exists

AI coding assistants are powerful but undisciplined. Without constraints, they:
- Use `any` types and skip error handling
- Write untested, tightly-coupled code
- Ignore architectural boundaries
- Create technical debt faster than you can review it

**Dev Handbook solves this** by providing:
1. **Strict rules** the AI must follow (no `any`, TDD, 3-layer architecture)
2. **A CLI tool** to inject these rules into any project
3. **Human-readable guides** explaining *why* these rules matter

## Quick Start

```bash
# Create a new project with standards pre-installed
npx dev-rules init my-app

# Or add standards to an existing project
cd my-existing-project
npx dev-rules inject

# Update rules to latest version
dev-rules update
```

## What's Included

### `cli/` - The `dev-rules` CLI Tool
Automates the "Senior Architect" setup:

| Command | Description |
|---------|-------------|
| `dev-rules init <name>` | Scaffold a new project with AGENTS.md and rules |
| `dev-rules inject` | Add standards to an existing project |
| `dev-rules update` | Check and update outdated rules |

Features:
- Auto-detects project type (TypeScript, Python, Rust)
- Installs only relevant rules for your stack
- Uses local rules when run from this repo, fetches from GitHub otherwise
- **Dependency Enforcement:**
  - Installs `dependency-cruiser` for TypeScript projects (Architecture enforcement)
  - Installs `tach` for Python projects (Architecture enforcement)

### `rules/` - The Runtime Kernel
Token-optimized rules that AI agents read during development:

| Rule | Purpose |
|------|---------|
| `architecture.md` | 3-layer architecture (Presentation → Service → Data) |
| `workflow.md` | Spec-driven development, TDD loop, multi-agent awareness |
| `tooling.md` | Task runners, package managers, AST tools |
| `rules_ts.md` | TypeScript: no `any`, Zod validation, error handling |
| `rules_python.md` | Python: Pydantic, type hints, structured logging |
| `rules_react.md` | React: functional components, hooks patterns |
| `rules_sql.md` | SQL: parameterized queries, migrations |
| `rules_rust.md` | Rust: safety, clippy, library-first structure |
| `security.md` | Secrets via ENV, input validation, no hardcoded keys |
| `testing.md` | Unit/integration test patterns |
| `logging.md` | Structured logging, no `console.log` |
| `api_design.md` | RESTful conventions, error responses |
| `ui_ux.md` | Accessibility, focus management, Vercel design guidelines |
| `devops.md` | IaC (Terraform), Docker security, CI/CD pinning |

### `guides/` - The University Course
Detailed explanations for humans on *why* we enforce these rules:
- Spec-Driven Development
- Back Pressure Patterns
- The 3-Layer Architecture
- Why TDD Actually Works

### `templates/` - Starter Files
- `AGENTS_TEMPLATE.md` - Base configuration for AI development

## How It Works

When you run `dev-rules inject`, the CLI:

1. **Detects your stack** by looking for `package.json`, `pyproject.toml`, etc.
2. **Generates `AGENTS.md`** - the master config file AI assistants read
3. **Copies relevant rules** to `.cursor/rules/` in your project
4. **Links everything together** so AI tools automatically follow the standards

The `AGENTS.md` file enforces:
- **NO SPEC = NO CODE** - Demand specifications before implementation
- **ZERO TOLERANCE** - No lint errors, no type errors, no failing tests
- **ATOMICITY** - One feature at a time, no scope creep
- **SAFETY** - All I/O wrapped in try/catch, secrets via ENV

## Installation

### Via npx (Recommended)
```bash
npx dev-rules init my-app
```

### Global Install
```bash
npm install -g dev-rules
dev-rules init my-app
```

### From Source
```bash
git clone https://github.com/Skeptomenos/dev-handbook.git
cd dev-handbook/cli
npm install && npm run build
npm link
dev-rules init my-app
```

## For AI Tool Developers

If you're building AI coding tools, you can point your agent to read from:
- `AGENTS.md` in the project root (the master config)
- `.cursor/rules/*.md` for specific language/domain rules

The rules are designed to be:
- **Token-efficient** - Minimal tokens, maximum signal
- **Actionable** - Clear do/don't instructions
- **Composable** - Mix and match based on project needs

## Publishing (Maintainers)

The CLI is published to npm via GitHub Actions:

1. **Automatic**: Create a GitHub Release → triggers publish
2. **Manual**: Run the "Publish to npm" workflow with version bump

```bash
# Create a new release (triggers automatic publish)
gh release create v1.1.0 --title "v1.1.0" --generate-notes
```

Requires `NPM_TOKEN` secret configured in repository settings.

## Contributing

1. Rules go in `rules/` - keep them concise and token-efficient
2. Explanations go in `guides/` - be thorough, these are for humans
3. CLI changes go in `cli/` - run `npm run build` and test locally

---

**Start with:** `npx dev-rules init my-app`

**Learn more:** Read `guides/00_AI_Development_Guide.md`
