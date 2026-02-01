---
created: 2026-02-01
updated: 2026-02-01
---

# iOS Agentic Development Guide

> How to set up your iOS projects and workflow for effective AI-assisted development.

This guide explains the *why* behind the rules in `rules/rules_swift.md`, `rules/rules_swift_concurrency.md`, and `rules/rules_ios_agentic.md`.

---

## The State of iOS + AI in 2026

AI coding assistants struggle with Swift/SwiftUI more than other platforms for three reasons:

1. **Rapid evolution**: Swift and SwiftUI change significantly each year. Training data becomes outdated quickly.
2. **Smaller corpus**: Python and JavaScript have vastly more open-source code to learn from.
3. **Concurrency complexity**: Swift's actor model and Sendable requirements confuse AI as much as humans.

Despite these challenges, experienced iOS developers report dramatic productivity gains when they adapt their workflow. The key insight: **you stop writing code and start reviewing code**.

---

## The New Developer Role

In an agentic workflow, your responsibilities shift:

| Before | After |
|--------|-------|
| Write code | Review generated code |
| Debug manually | Describe expected behavior |
| Navigate Xcode | Provide architectural context |
| Run simulators | Verify agent-provided screenshots |
| Write tests | Review agent-written tests |

The human becomes the **architect, reviewer, and quality gate**. The agent becomes the **implementer**.

---

## Why Xcode Usage Drops to 2%

Traditional iOS development is Xcode-centric. Agentic development is not.

**What you still need Xcode for:**
- Interface Builder (if using storyboards)
- Instruments profiling
- Complex debugging sessions
- Signing and provisioning (occasionally)

**What moves outside Xcode:**
- Code editing → Cursor/VS Code with AI completion
- Building → XcodeBuildMCP (agent-driven)
- Running tests → XcodeBuildMCP
- Simulator interaction → XcodeBuildMCP
- Code navigation → Swift LSP in external editors

The Xcode text editor becomes optional. Its build system remains essential but accessed programmatically.

---

## XcodeBuildMCP: The Critical Bridge

Raw `xcodebuild` commands fail constantly in complex projects. Agents guess wrong scheme names, miss build settings, and produce cryptic errors.

**XcodeBuildMCP** wraps xcodebuild with an agent-friendly interface:

```
Agent capabilities:
├── Discovery
│   ├── List all schemes
│   ├── List available simulators  
│   └── Read project configuration
├── Build
│   ├── Build specific scheme
│   ├── Build for specific simulator
│   └── Report errors in structured format
├── Test
│   ├── Run unit tests
│   ├── Run UI tests
│   └── Parse test results
└── Simulate
    ├── Launch app
    ├── Take screenshots
    ├── Tap on elements
    └── Read console output
```

This enables **unsupervised 30+ minute sessions** where the agent can:
1. Implement a feature
2. Build it
3. Run tests until they pass
4. Launch in simulator
5. Screenshot the result
6. Interact with UI to verify behavior

You review the output, not the process.

---

## Project Setup for Agent Success

### Document Everything Immediately

When starting a new project, create `AGENTS.md` with:

```markdown
# Project Architecture

## Patterns
- Navigation: Coordinator pattern using AppRouter
- State: @Observable models in Environment
- Networking: Async/await with typed API clients
- Testing: Unit tests co-located, UI tests in separate target

## Naming Conventions
- Views: *View.swift (e.g., UserListView.swift)
- Models: *Model.swift or just noun (e.g., User.swift)
- Services: *Service.swift (e.g., AuthService.swift)

## Schemes
- MyApp: Main app scheme
- MyAppTests: Unit tests
- MyAppUITests: UI tests
```

Agents that understand patterns duplicate them well. Agents without context invent inconsistent code.

### Create Reference Features First

Before asking agents to implement features, build one complete example yourself:
- Full navigation flow
- Network call with error handling
- Tests (unit and/or UI)
- Accessibility labels

The agent will use this as a template. Quality begets quality.

---

## The Test-First Trust Model

Traditional testing: Write code, then write tests to verify it.

Agentic testing: **Agent writes both, you verify the tests**.

### Why This Works

1. Agent generates feature code
2. Agent generates tests for that code
3. You review the tests carefully
4. If tests correctly describe expected behavior, the code is likely correct
5. Run tests to confirm

Your review effort shifts from "is this code correct?" to "do these tests check what matters?"

### The Review Loop

```
Agent implements → /review → Fix → /review → Fix → /review → Done
```

Run `/review` multiple times. Each pass catches different issues. The first review finds obvious problems. The third review finds subtle ones.

---

## Multi-Repository Development

Modern apps span multiple codebases:
- iOS app
- Android app (or shared Kotlin Multiplatform)
- Backend API
- Web frontend

Agents can work across all of them simultaneously.

### Cross-Reference Pattern

```
"Look at the API endpoint in ../backend/src/routes/users.go
Implement the corresponding Swift model and API client 
following the pattern in Sources/API/PostsClient.swift"
```

The agent reads Go, understands the API contract, and generates Swift.

### Overnight Sync Pattern

```
"Review changes in ../web-app since commit abc123.
Identify new features or UI changes.
Implement equivalent changes in our iOS app."
```

Your web team ships features while you sleep. Morning: ask the agent to catch up.

---

## Swift Concurrency: The Hard Part

AI struggles with Swift concurrency because:
1. The rules are complex and evolving
2. Error messages are cryptic
3. "Correct" code depends heavily on context

### Key Concepts for Agents

**Main Actor Isolation (Swift 6+)**
New projects have main actor isolation by default. Agents often add redundant `@MainActor` annotations. Remove them in new projects.

**Sendable**
Types crossing actor boundaries must be Sendable. Agents sometimes use `@unchecked Sendable` too liberally. Review these carefully.

**Legacy Dispatch**
Agents trained on older code use `DispatchQueue.main.async`. Replace with proper async/await patterns.

### When to Use the Concurrency Skill

Complex concurrency errors often require specialized context. Rather than explaining actor isolation rules in each prompt, create or use a dedicated skill that includes:
- Swift 6.x concurrency rules
- Common error patterns and fixes
- Actor isolation decision trees

Load this skill when you hit concurrency walls.

---

## Cloud Development Workflow

You can fix bugs without access to your development machine.

### The Flow

```
1. Notice bug in TestFlight build (on your phone)
2. Open Codex app or web interface
3. Describe the bug or @Codex in GitHub issue
4. Agent analyzes, fixes, creates PR
5. Xcode Cloud triggers on PR
6. New TestFlight build arrives
7. Test the fix on your phone
```

Total computer involvement: zero.

### Setting Up Xcode Cloud

1. Connect repository to Xcode Cloud
2. Create workflow: Build on PR to main
3. Configure TestFlight distribution
4. Enable Codex on your repository

Now every agent-created PR automatically builds and deploys for testing.

---

## Editor Setup

### Recommended: Cursor

```
Layout:
├── Left: File explorer + Git changes
├── Center: Code editor with AI completion
├── Right: Cursor Composer (AI chat)
└── Bottom: Terminal with Codex CLI
```

**Extensions:**
- Sweetpad or Flowdeck for build/run shortcuts
- Swift LSP for navigation and highlighting

**Workflow:**
1. Describe feature to Codex (terminal)
2. Watch it implement
3. Use Cursor Composer for quick edits
4. Tab-complete your own additions
5. Build/run via keyboard shortcut (Sweetpad)

### Alternative: Stay in Xcode

If you prefer Xcode:
1. Enable GitHub Copilot extension
2. Disable most "intelligent" features (they conflict)
3. Use Xcode Intelligence for quick queries
4. Keep terminal open for Codex

Copilot provides fast tab-completion. Codex handles larger tasks.

---

## Common Anti-Patterns

### "I'll fix the tests later"
Tests are your quality gate. If agent-generated tests are wrong, the code is probably wrong too. Fix tests immediately.

### "One big prompt will be faster"
Large prompts confuse agents. Break into steps:
1. "Create the model for User"
2. "Add UserService with fetch method"
3. "Create UserListView using the pattern in PostListView"
4. "Add tests for UserService"

### "I know what this code does"
You don't. The agent wrote it. Review it properly or you'll debug blindly later.

### "XcodeBuildMCP is overkill"
Raw xcodebuild works until it doesn't. Usually at the worst time. Use the MCP consistently.

### "I'll document the patterns later"
Document now. Patterns you don't document become inconsistencies the agent invents around.

---

## Getting Started Checklist

- [ ] Install XcodeBuildMCP
- [ ] Set up Cursor with Sweetpad/Flowdeck
- [ ] Configure Codex CLI access
- [ ] Create AGENTS.md in your project
- [ ] Build one reference feature manually
- [ ] Document your patterns
- [ ] Connect Xcode Cloud for PR builds
- [ ] Try your first 30-minute unsupervised session

---

## Further Reading

- [[rules_swift]] - Swift language rules for AI-generated code
- [[rules_swift_concurrency]] - Swift 6.x concurrency patterns
- [[rules_ios_agentic]] - Token-optimized rules for agents
- [[11_Testing_Strategy]] - General testing principles
- [[12_Git_and_Workflow]] - Git practices for multi-agent work
