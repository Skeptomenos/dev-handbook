# Frontend Architecture (2026)

> **Mandate:** Component Isolation, Feature-Sliced Design, and Server State Separation.

## 1. Folder Structure (Feature-Sliced Lite)
Stop grouping by "file type". Group by **Feature**.

```text
src/
├── features/           # Domain Logic
│   ├── auth/           # "Auth" Feature
│   │   ├── components/ # LoginForm.tsx (Only used here)
│   │   ├── api.ts      # Fetch logic (Zod validation)
│   │   └── types.ts    # Contracts
│   └── dashboard/
├── components/         # Shared "Dumb" UI
│   ├── ui/             # Buttons, Inputs (Shadcn/Tailwind)
│   └── layout/         # Headers, Sidebars
├── lib/                # Utilities (axios, cn, formatters)
└── pages/              # Routing Entry Points
```

## 2. Component Composition
- **Container Components:** Fetch data, handle errors, manage state. Pass data down.
- **Presentational Components:** Receive `props`, render UI. ZERO side effects.
  - *Why?* AI writes Presentational components perfectly. Logic is harder. Separation makes debugging easy.

## 3. State Management Rules
1.  **Server State:** Use **TanStack Query** (React Query) or **SWR**.
    - ❌ NO `useEffect` for data fetching.
2.  **URL State:** Store filters, pagination, and tabs in the URL (`?tab=settings`).
    - *Why?* Users can share links. Browser "Back" button works.
3.  **Client State:** `useState` for local toggles. `Zustand` for global app settings (theme).

## 4. Tailwind CSS Standards
- **Utility-First:** Use classes in HTML.
- **Tokens:** Define colors/spacing in `tailwind.config.js`.
  - ❌ `text-[#123456]`
  - ✅ `text-primary-600`
- **Class Merging:** Use `clsx` or `tailwind-merge` (`cn()` helper) for conditional styles.

---
**Up:** [[00_AI_Development_Guide]]
**Next:** [[11_Testing_Strategy]]
