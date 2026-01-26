# dev-rules CLI

CLI tool to automate "Senior Architect" setup for new and existing projects.

## Installation

```bash
# Use directly with npx (no installation required)
npx dev-rules init my-app

# Or install globally
npm install -g dev-rules
```

## Commands

### `dev-rules init <name>`

Scaffold a new project with the latest standards.

```bash
dev-rules init my-app
dev-rules init my-app --template ts      # TypeScript (default)
dev-rules init my-app --template python  # Python
```

**What it does:**
- Creates project directory with standard structure
- Generates `AGENTS.md` with strict development rules
- Installs relevant rule files to `rules/`
- Sets up basic project files (package.json/pyproject.toml, tsconfig, etc.)

### `dev-rules inject`

Add standards to an existing project (current directory).

```bash
cd my-existing-project
dev-rules inject
dev-rules inject --force  # Overwrite existing files
```

**What it does:**
- Detects project type (TypeScript, Python, Rust)
- Generates customized `AGENTS.md`
- Installs relevant rule files to `rules/`

### `dev-rules update`

Check and update outdated rules from the source.

```bash
dev-rules update
```

**What it does:**
- Compares local `rules/` files with source
- Shows which files are outdated
- Prompts user to select files to update
- Fetches and overwrites selected files

## Source of Truth

The CLI automatically determines where to get rules from:

1. **Local**: If running from within the `dev-handbook` repo, uses local files
2. **Remote**: Otherwise, fetches from GitHub

## Development

```bash
cd cli
npm install
npm run build
npm run dev -- init test-app
```
