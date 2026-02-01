import { DetectedStack } from "./stack-detector.js";

export function generateAgentsMd(stack: DetectedStack, rulesLocation: string): string {
  const ruleActivation = buildRuleActivation(stack, rulesLocation);
  
  return `# AGENTS.md

## DEV STANDARDS (STRICT)

**Role:** Senior Engineer. **Manager:** User (Architect).
**Goal:** Production-Ready, Type-Safe, Modular.

### HARD CONSTRAINTS
1.  **NO SPEC = NO CODE:** Demand \`SPEC.md\` before implementation.
2.  **ZERO TOLERANCE:** No lint errors. No type errors (no \`any\`). No failing tests.
3.  **ATOMICITY:** One feature at a time. No "while I'm here" refactoring.
4.  **SAFETY:** All I/O wrapped in \`try/catch\`. All Secrets via ENV.

### RULE ACTIVATION
*You must strictly apply the following rules based on the task:*
${ruleActivation}

### ARCHITECTURE (3-LAYER)
1.  **Presentation:** CLI/UI only. No logic.
2.  **Service:** Pure business logic. No I/O context.
3.  **Data:** DB/API access only.
*Use DTOs (Zod/Pydantic) for all layer communication.*

### WORKFLOW LOOP
1.  **READ:** Development Guidance + Spec.
2.  **PLAN:** Critically review spec for gaps.
3.  **TDD:** Write failing test -> Validate failure.
4.  **CODE:** Pass test -> Refactor -> Type Check.
5.  **HALT:** If lint/test fails, fix immediately.
`;
}

function buildRuleActivation(stack: DetectedStack, rulesLocation: string): string {
  const lines: string[] = [];
  
  lines.push(`- **All Projects:** \`${rulesLocation}/architecture.md\`, \`${rulesLocation}/workflow.md\``);
  
  switch (stack.primary) {
    case "typescript":
      if (stack.hasReact) {
        lines.push(`- **TypeScript/React:** \`${rulesLocation}/rules_ts.md\`, \`${rulesLocation}/rules_react.md\`, \`${rulesLocation}/logging.md\``);
      } else {
        lines.push(`- **TypeScript:** \`${rulesLocation}/rules_ts.md\`, \`${rulesLocation}/logging.md\``);
      }
      break;
    case "python":
      lines.push(`- **Python:** \`${rulesLocation}/rules_python.md\`, \`${rulesLocation}/logging.md\``);
      break;
    case "rust":
      lines.push(`- **Rust:** \`${rulesLocation}/rules_rust.md\``);
      break;
    case "swift":
      lines.push(`- **Swift/iOS:** \`${rulesLocation}/rules_swift.md\`, \`${rulesLocation}/rules_swift_concurrency.md\`, \`${rulesLocation}/rules_ios_agentic.md\``);
      break;
  }
  
  if (stack.hasDatabase) {
    lines.push(`- **Database/SQL:** \`${rulesLocation}/rules_sql.md\``);
  }
  
  lines.push(`- **API/Security:** \`${rulesLocation}/api_design.md\`, \`${rulesLocation}/security.md\``);
  
  return lines.join("\n");
}
