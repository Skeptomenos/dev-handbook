import { existsSync } from "fs";
import { join } from "path";

export type StackType = "typescript" | "python" | "rust" | "swift" | "unknown";

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
  const swiftIndicators = ["Package.swift", "*.xcodeproj", "*.xcworkspace", "project.pbxproj"];

  const hasTs = tsIndicators.some((f) => existsSync(join(targetDir, f)));
  const hasPython = pythonIndicators.some((f) => existsSync(join(targetDir, f)));
  const hasRust = rustIndicators.some((f) => existsSync(join(targetDir, f)));
  const hasSwift = swiftIndicators.some((f) => {
    if (f.includes("*")) {
      // Check for glob patterns by looking for directories with extension
      const ext = f.replace("*", "");
      try {
        const files = require("fs").readdirSync(targetDir);
        return files.some((file: string) => file.endsWith(ext));
      } catch {
        return false;
      }
    }
    return existsSync(join(targetDir, f));
  });

  if (hasSwift) {
    result.primary = "swift";
  } else if (hasTs) {
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
  const rules: string[] = ["architecture.md", "workflow.md", "security.md", "devops.md"];

  switch (stack.primary) {
    case "typescript":
      rules.push("rules_ts.md", "logging.md", "testing.md");
      if (stack.hasReact) {
        rules.push("rules_react.md", "ui_ux.md");
      }
      break;
    case "python":
      rules.push("rules_python.md", "logging.md", "testing.md");
      break;
    case "rust":
      rules.push("rules_rust.md", "testing.md");
      break;
    case "swift":
      rules.push("rules_swift.md", "rules_swift_concurrency.md", "rules_ios_agentic.md", "testing.md");
      break;
  }

  if (stack.hasDatabase) {
    rules.push("rules_sql.md");
  }

  rules.push("api_design.md", "documentation.md");

  return rules;
}
