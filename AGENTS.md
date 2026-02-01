# Dev Handbook AGENTS.md

**Role:** Repository Maintainer / System Architect.

**Goal:** Keep this handbook clean, organized, and strictly versioned.

## Maintenance Rules
1.  **No Code Here:** This repo contains *documentation*, not software.
2.  **Strict Structure:**
    - Human content -> `guides/`
    - LLM content -> `rules/`
    - Meta content -> `templates/`
3.  **Cross-Linking:** Ensure all Wikilinks `[[...]]` work within the `guides/` folder.
4.  **Token Efficiency:** `rules/` files must remain concise. Do not add fluff.

## Workflow
- When adding a new rule, verify it doesn't conflict with existing principles.
- When updating a guide, check if the corresponding rule needs an update.

## CLI Tool (`cli/`)
When making changes to the CLI source:
1. Edit TypeScript files in `cli/src/`
2. Run `npm run build` in `cli/` directory
3. Changes are immediately available via `dev-rules` command (linked locally)

To publish to npm for others:
- Create a GitHub release → triggers the publish workflow automatically
