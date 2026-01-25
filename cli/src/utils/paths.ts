import { existsSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Determines the source of truth for rules:
 * - If running from within the dev-handbook repo, uses local files
 * - Otherwise, indicates rules should be fetched from GitHub
 */
export function getRulesSource(): { type: "local" | "remote"; path: string } {
  // Navigate from cli/dist/utils to repo root
  const repoRoot = resolve(__dirname, "..", "..", "..");
  const localRulesPath = join(repoRoot, "rules");
  const localTemplatesPath = join(repoRoot, "templates");

  // Check if we're running from within the dev-handbook repo
  if (existsSync(localRulesPath) && existsSync(localTemplatesPath)) {
    return { type: "local", path: repoRoot };
  }

  // Fall back to remote GitHub
  return {
    type: "remote",
    path: "https://raw.githubusercontent.com/your-org/dev-handbook/main",
  };
}

/**
 * Get the path to rules directory
 */
export function getRulesPath(): string {
  const source = getRulesSource();
  return source.type === "local"
    ? join(source.path, "rules")
    : `${source.path}/rules`;
}

/**
 * Get the path to templates directory
 */
export function getTemplatesPath(): string {
  const source = getRulesSource();
  return source.type === "local"
    ? join(source.path, "templates")
    : `${source.path}/templates`;
}
