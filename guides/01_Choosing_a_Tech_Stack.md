# Choosing a Tech Stack for AI-Managed Projects

> **Principle:** "Choose the stack the AI knows best, not the 'newest' hype."

As a non-coder architecting for AI, your priority is **AI Compatibility**. You want languages with:
1.  **Huge Training Data:** The AI should have seen billions of examples.
2.  **Strict Compilers:** To provide "Back Pressure" (catch hallucinations automatically).
3.  **Mature Ecosystems:** Libraries for everything, so the AI doesn't have to reinvent wheels.

---

## 1. The "Type Safety" Question
> *"Is type safety important?"* -> **YES. It is non-negotiable.**

When an AI writes code, it often hallucinates methods that don't exist (e.g., `user.get_id()` instead of `user.id`).
*   **Without Types (JavaScript/Python):** The code runs, then crashes at runtime. You spend hours debugging "undefined is not a function."
*   **With Types (TypeScript/Go/Rust):** The *compiler* shouts "Error: method get_id() does not exist" immediately. The AI sees this and fixes it instantly.
*   **Verdict:** Always use Type Safe languages (or Python with Strict Type Checking). It is your strongest form of Back Pressure.

---

## 2. The Rust Question
> *"I hear about Rust a lot. Should I use it?"*

**Verdict:** **Use with Caution.**
Rust is the "Ferrari" of languages: incredibly fast and memory-safe.
*   **Pros:** If it compiles, it usually works. The Back Pressure is extreme (the compiler is very strict).
*   **Cons:** The "Borrow Checker" (Rust's memory rulebook) is hard.
    *   *Risk:* The AI can get stuck in a loop trying to fix compiler errors, changing code back and forth without solving the underlying logic.
*   **When to use Rust:**
    *   You are building a high-performance CLI tool (like `ripgrep`).
    *   You need extreme reliability (a database, a kernel).
    *   You are building a Desktop App using **Tauri** (see below).
*   **When to avoid:** Simple scripts, quick prototypes, or if you want "easy" code to read.

---

## 3. Hybrid Apps (UI + Data Processing)
> *"What if I need a UI **and** heavy data processing?"*

This is where "Purpose" defines the stack. You must match the language to the bottleneck.

### Scenario A: Heavy Math/AI + UI
*   **Bottleneck:** CPU / Data Science Libraries.
*   **Stack:** **Python (Backend) + React (Frontend)**.
    *   *Why:* You need Python for Pandas/PyTorch/Numpy. You need React for a good UI.
    *   *Bridge:* Communicate via API (FastAPI).

### Scenario B: Desktop App + System Access
*   **Bottleneck:** OS Integration / file system / memory.
*   **Stack:** **Tauri** (Rust + Web Frontend) or **Electron** (Node + Web Frontend).
    *   *Tauri:* Uses Rust for the backend. Lightweight, secure. Good if you are brave enough for Rust.
    *   *Electron:* Uses Node.js. Easier, but heavier (uses more RAM).

### Scenario C: General "Business" Logic
*   **Bottleneck:** Developer speed / IO (Network calls).
*   **Stack:** **TypeScript Full Stack** (Next.js).
    *   *Why:* One language for everything. Node.js is fast enough for 99% of tasks (parsing JSON, moving files, API calls).

---

## 4. Why "Purpose" Dictates "Stack"
It is not just preference; it is about **Libraries** and **Concurrency**.

1.  **Library Gravity:**
    *   Need to process 1GB of CSVs? Python (Pandas) does it in 3 lines. TypeScript takes 50 lines.
    *   Need to interact with the Browser? TypeScript (Playwright) is native. Python is a wrapper.
2.  **Concurrency (Threading):**
    *   **Node/Python:** Generally "Single Threaded". If you calculate a massive number, the UI freezes.
    *   **Go/Rust:** "Multi Threaded". Can crunch numbers on one core and serve UI on another.

---

## 5. Package Management (Hygiene)
We mandate strict package managers to prevent "Phantom Dependencies" (code running that isn't in `package.json`).

*   **Node/TS:** **`pnpm`** (Not npm/yarn). It uses a non-flat node_modules structure.
*   **Python:** **`uv`** (Not pip/poetry). It is faster and handles lockfiles deterministically.

## 6. The "Golden Stack" for Admin/Architects
If you are unsure, start here. This stack minimizes "dev ops" pain and maximizes AI success.

*   **Lang:** TypeScript
*   **Framework:** Hono (Backend) or Next.js (Full Stack)
*   **DB:** SQLite (via Drizzle ORM - enforces schema in code)
*   **Style:** Tailwind CSS (AI is great at this)
*   **Lint:** Biome or ESLint (Strict Back Pressure)

---
**Up:** [[00_AI_Development_Guide]]
**Next:** [[02_Clean_Code_and_Modularity]]
