# AI Development Guide for Architects

> **Role:** System Architect / Platform Engineer
> **Goal:** High-quality, stable software without being a syntax expert.
> **Philosophy:** [[Spec-Driven Development]] + [[06_Back_Pressure_Protocols]]

---

## 1. The Core Concept
**You are the Architect, AI is the Junior Developer.**
Stop "vibe coding" (chatting for features one-by-one). Start **managing**.

- **Your Job:** Define the *What* ([[05_Spec_Template]]), the *Constraints*, and the *Gates* ([[06_Back_Pressure_Protocols]]).
- **AI's Job:** Implementation, Syntax, and passing the gates.

---

## 2. Spec-Driven Development (SDD)
To prevent spaghetti code, never start coding without a specification.

**The Workflow:**
1.  **Draft:** Create a `SPEC.md` using the [[05_Spec_Template]].
2.  **Refine:** Ask AI to critique the spec (Edge cases? Security?).
3.  **Execute:** AI implements based *strictly* on the spec.
4.  **Verify:** Check against the Verification Plan in the spec.

---

## 3. High "Back Pressure"
**Back Pressure** is the resistance the system applies to bad code. High pressure = High Quality.

*   **Low Pressure:** You manually check -> It breaks -> You complain.
*   **High Pressure:** The *System* rejects the code immediately.

**Implementation:**
- **Linters & Type Checkers:** The "Spelling & Grammar" police.
- **The Build:** If it doesn't build, it doesn't exist.
- **Tests:** The "Behavior" police.

See [[06_Back_Pressure_Protocols]] for the setup guide.

---

## 4. Stability: The "Ratchet" Principle
Move forward, never slide back.

1.  **TDD (Test-Driven Development):**
    *   Command the AI: *"Write the failing test first."*
    *   This proves the AI understands the requirement before coding.
2.  **Regression Suite:**
    *   Every bug fix gets a new test case.
    *   Run ALL tests before starting new features.

---

## 5. Clean Code "Sniff Test"
You don't need to read every line, but use your admin tools (`ls`, `grep`) to spot smells.

*   **Single Responsibility:** If `ls -lh` shows a 5MB file, refactor it.
*   **DRY (Don't Repeat Yourself):** If `grep` shows the same logic 3 times, refactor.
*   **Dependency Injection:** Don't hardcode paths/IPs. Configuration should be injected.

---

## 6. Managing the AI
Configure your AI agent effectively.

- Use the [[07_System_Instructions]] to set the ground rules (No TODOs, strict error handling).
- Use **Atomic Steps**: Plan -> Test -> Code -> Verify.

---

## Quick Links
- [[05_Spec_Template]] - Copy this for every new feature.
- [[06_Back_Pressure_Protocols]] - How to set up your quality gates.
- [[07_System_Instructions]] - The "Prompt" to govern your AI.

---
**Next:** [[01_Choosing_a_Tech_Stack]]
