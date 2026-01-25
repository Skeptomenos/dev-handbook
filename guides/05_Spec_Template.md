# Specification Template

Copy this template into a `SPEC.md` file at the start of any new feature or task.

## Feature: [Feature Name]

### 1. Context
*Briefly explain what we are building and why. Mention the user persona and the goal.*

### 2. Requirements
*Checklist of specific deliverables.*
- [ ] User can...
- [ ] System must...
- [ ] Output format should be...

### 3. Constraints (Negative Patterns)
*Explicitly forbid bad practices.*
- **NO** external dependencies (unless approved).
- **NO** hardcoded secrets/paths.
- **Do NOT** modify core files: `[Filename]`, `[Filename]`.
- **Style:** Strictly follow existing patterns in `[Folder]`.

### 4. Technical Approach
*High-level architecture.*
- **Database:** SQLite / JSON file at `~/.config/...`
- **Libraries:** Use `[Library Name]` for [Task].
- **Error Handling:** Fail gracefully with a user-friendly message.

### 5. Verification Plan
*How will we know it works?*
- [ ] **Automated Test:** Create `tests/test_[feature].py`
- [ ] **Manual Check:** Run command `[Command]` and expect `[Output]`.
- [ ] **Edge Case:** what happens if [Network Down / File Missing]?

---
**Up:** [[00_AI_Development_Guide]]
**Next:** [[06_Back_Pressure_Protocols]]
