# Writing Good Specs

> **Principle:** "Ambiguity is the enemy. If you leave a gap, the AI will fill it with hallucination."

A good spec isn't just a list of features; it's a **contract** between you (the Architect) and the AI (the Implementer). It must answer specific questions to prevent "vibe coding" and regression.

---

## 1. The Core Questions
Every section of your spec should answer a specific question for the AI.

| Section | The Question it Answers | Why it matters |
| :--- | :--- | :--- |
| **Context** | *"Why are we building this?"* | Prevents over-engineering. Helps the AI make micro-decisions aligned with the goal. |
| **User Story** | *"Who is this for and what do they do?"* | Focuses on the *interface* and *experience* rather than just internal logic. |
| **Data Structure** | *"What does the data look like?"* | **Critical.** AI struggles to infer schema. define your JSON/Database schema explicitly. |
| **Edge Cases** | *"What happens when things break?"* | Prevents the "Happy Path" bias. Forces error handling logic. |
| **Verification** | *"How do we prove it works?"* | Defines "Done". If the AI can't pass the test, the task isn't finished. |

---

## 2. Essential Ingredients

### A. The "No" List (Constraints)
AI models are eager to please and will grab any tool available. You must strictly define what is **forbidden**.
*   *Example:* "Do **NOT** use `fs.readFileSync`. Use asynchronous streams only."
*   *Example:* "Do **NOT** add a new CSS framework. Use existing Tailwind classes."
*   *Why:* This acts as the primary guardrail against "bloat" and architectural drift.

### B. Concrete Examples (One Example > 1000 Words)
Never describe data textually if you can show it.
*   **Bad:** "The user object has a name and some preferences."
*   **Good:**
    ```json
    {
      "id": "usr_123",
      "name": "Alice",
      "prefs": { "theme": "dark", "notifs": false }
    }
    ```

### C. The "Happy Path" vs. The "Sad Path"
Most specs only define the Happy Path (everything works). A *Good* spec devotes 50% of its content to the Sad Path.
*   *Network Timeout:* Retry or Fail?
*   *Invalid Input:* Crash or User Message?
*   *Missing Config:* Default value or Exit?

---

## 3. The "Spec-Check" Loop
Before you let the AI write code, ask it to "compile" the spec in its head.

**Prompt to the AI:**
> "Read this spec. Before writing code, tell me:
> 1. What is the most complex part of this task?
> 2. What edge cases are missing from my `Verification Plan`?
> 3. Are there any ambiguities in the data structure?"

If the AI asks a clarifying question, **update the spec** with the answer. Do not just answer in chat. The Spec is the Source of Truth.

---

## 4. Visualizing Logic (ASCII Art)
For CLI tools or flows, use simple diagrams.

```text
[Start] -> (Check Config) --No--> [Error: Create Config]
               |
             Yes
               v
         (Check Database) --Locked--> [Wait / Retry]
               |
             Open
               v
          [Run Migration]
```

---
**Up:** [[00_AI_Development_Guide]]
**Next:** [[05_Spec_Template]]
