# Back Pressure Protocols

"Back Pressure" is the automated resistance your system applies to incorrect code. As an admin/platform engineer, you build the pipeline that the AI must satisfy.

## 1. The Linter (Spelling Checker)
*Never accept code with linter errors.*
- **Action:** Install strict linters.
- **Command:** `npm run lint` or `ruff check .`
- **Rule:** "Fix all lint warnings before showing me the code."

## 2. The Type Checker (Logic Checker)
*Catches bugs before the code even runs.*
- **Action:** Use TypeScript (`tsc`) or Python Type Hints (`mypy`).
- **Command:** `tsc --noEmit`
- **Rule:** "Zero type errors allowed."

## 3. The Build (Compiler)
*The absolute baseline.*
- **Action:** Ensure a build step exists.
- **Rule:** If the build fails, the task progress is 0%.

## 4. The Test Suite (Behavior Checker)
*The Ratchet that prevents regression.*
- **Strategy:** Test-Driven Development (TDD).
- **Instruction:** "Write a failing test for [Feature] first. Show me it failing. Then write the code to pass it."
- **Regression:** "Before asking for approval, run the full test suite."

## Prompting for Back Pressure
> "I want you to implement [Feature].
> 1. Run the linter and type checker on the current state.
> 2. Write the implementation.
> 3. **Verify** by running the linter, type checker, and tests again.
> 4. Do not output the final code until all checks pass."

---
**Up:** [[00_AI_Development_Guide]]
**Next:** [[07_System_Instructions]]
