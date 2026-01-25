import { existsSync } from "fs";
import { join } from "path";

export type StackType = "typescript" | "python" | "rust" | "unknown";

export interface DetectedStack {
  primary: StackType;
  hasReact: boolean;
  hasDatabase: boolean;
}

export function detectStack(targetDir: string): DetectedStack {
  const result: DetectedStack = {
    primary: "unknown",
    hasReact: false,
    hasDatabase: false,
  };

  const tsIndicators = ["package.json", "tsconfig.json", "package-lock.json", "yarn.lock", "pnpm-lock.yaml"];
  const pythonIndicators = ["pyproject.toml", "requirements.txt", "setup.py", "Pipfile"];
  const rustIndicators = ["Cargo.toml", "Cargo.lock"];

  const hasTs = tsIndicators.some((f) => existsSync(join(targetDir, f)));
  const hasPython = pythonIndicators.some((f) => existsSync(join(targetDir, f)));
  const hasRust = rustIndicators.some((f) => existsSync(join(targetDir, f)));

  if (hasTs) {
    result.primary = "typescript";

    const packageJsonPath = join(targetDir, "package.json");
    if (existsSync(packageJsonPath)) {
      try {
        const pkg = require(packageJsonPath);
        const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
        result.hasReact = "react" in allDeps;
      } catch {
      }
    }
  } else if (hasPython) {
    result.primary = "python";
  } else if (hasRust) {
    result.primary = "rust";
  }

  const sqlIndicators = [".sql", "migrations", "prisma", "drizzle.config.ts", "knexfile.js"];
  result.hasDatabase = sqlIndicators.some((f) => existsSync(join(targetDir, f)));

  return result;
}

export function getRelevantRules(stack: DetectedStack): string[] {
  const rules: string[] = ["architecture.md", "workflow.md", "security.md"];

  switch (stack.primary) {
    case "typescript":
      rules.push("rules_ts.md", "logging.md", "testing.md");
      if (stack.hasReact) {
        rules.push("rules_react.md");
      }
      break;
    case "python":
      rules.push("rules_python.md", "logging.md", "testing.md");
      break;
    case "rust":
      rules.push("rules_rust.md", "testing.md");
      break;
  }

  if (stack.hasDatabase) {
    rules.push("rules_sql.md");
  }

  rules.push("api_design.md", "documentation.md");

  return rules;
}
