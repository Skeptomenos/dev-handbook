# Clean Code & Modularity: The Architect's Handbook

> **Goal:** Build software like LEGO blocks, not like a clay sculpture. If you change one block, the others shouldn't crumble.

## 1. The Core Philosophy: "Separation of Concerns"
This is the #1 rule. Different parts of your app should handle different jobs.

### The 3-Layer Architecture (Standard Pattern)
Structure your folders like this. It forces the AI to be modular.

1.  **Presentation Layer (UI/CLI):**
    *   *Job:* Show data to the user. Take input.
    *   *Rule:* NEVER put business logic here. No math, no database calls. Just display.
2.  **Service/Logic Layer (The Brain):**
    *   *Job:* Make decisions. Calculate things. Process data.
    *   *Rule:* Independent of the UI. It shouldn't know if it's running in a CLI or a Web App.
3.  **Data Layer (Repository):**
    *   *Job:* Save/Load data (DB, File, API).
    *   *Rule:* The only place that touches the disk or network.

> **Instruction to AI:** "Create a Service for `UserLogic` that is separate from the `CLI` code. The Logic should not print to console, only return data."

---

## 2. SOLID Principles (Simplified for Architects)

### **S** - Single Responsibility Principle (The Golden Rule)
*   **Concept:** A file/function should do **one thing**.
*   **Smell Test:** If a function is named `fetchAndProcessAndSaveUser()`, it's bad. It should be three functions.
*   **Why:** AI context is limited. Small files = Better AI performance.

### **O** - Open/Closed Principle
*   **Concept:** Open for extension, closed for modification.
*   **Metaphor:** You can put a new case on your phone (extension) without soldering the circuit board (modification).
*   **Code:** Use "Plugins" or "Adapters" instead of changing the core code every time you add a feature.

### **D** - Dependency Inversion (Plug-and-Play)
*   **Concept:** Don't hardcode connections. Pass them in.
*   **Example:**
    *   *Bad:* Inside `AuthService`, you write `const db = new SQLiteDB('users.db')`. Now you can't test it without the real DB.
    *   *Good:* `AuthService` asks for `anyDatabase`. You pass the SQLite DB when running, and a "Fake DB" when testing.

---

## 3. Data Contracts (The "Handshake")
A **Contract** is a strict agreement on what data looks like. If Component A talks to Component B, they must agree on the language.

### Best Practice: Data Transfer Objects (DTOs)
*   **Concept:** Define standard "shapes" for your data.
*   **Tool:** Use **Zod** (TypeScript) or **Pydantic** (Python).
*   **Why:** If the API changes, you only update the Contract, not the 50 places that use it.

```ts
// The Contract (Zod)
const UserContract = z.object({
  id: z.string(),
  email: z.string().email(),
});

// If the database returns "user_email", we convert it here ONE time.
// The rest of the app only knows "email".
```

---

## 4. Immutability (Don't Change History)
*   **Concept:** Do not modify variables. Create new ones.
*   **Why:** It prevents "Spooky Action at a Distance" where changing a variable in one function accidentally breaks another function.
*   **Instruction:** "Prefer `const` over `let`. Return new objects instead of modifying inputs."

---

## 5. The "Replaceability" Test
Ask yourself (or the AI):
> *"If I wanted to swap SQLite for PostgreSQL tomorrow, how many files would I have to change?"*

*   **Bad Answer:** "Every file that queries data."
*   **Good Answer:** "Just the `Repository` file. The rest of the app doesn't know which DB we use."

---
**Up:** [[00_AI_Development_Guide]]
**Next:** [[03_Principle_Files_Strategy]]
