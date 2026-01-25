import chalk from "chalk";
import prompts from "prompts";
import { existsSync, statSync } from "fs";
import { join } from "path";
import { listFiles, readFile, writeFile, fetchRemoteFile } from "../utils/file-ops.js";
import { getRulesSource } from "../utils/paths.js";
import crypto from "crypto";

const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/your-org/dev-handbook/main";

interface RuleStatus {
  name: string;
  localHash: string;
  remoteHash: string | null;
  isOutdated: boolean;
  error?: string;
}

export async function updateCommand(): Promise<void> {
  const targetDir = process.cwd();
  const rulesDir = join(targetDir, ".cursor", "rules");

  if (!existsSync(rulesDir)) {
    console.log(chalk.red("No .cursor/rules/ directory found."));
    console.log(chalk.yellow("Run 'dev-rules inject' first to install rules."));
    process.exit(1);
  }

  console.log(chalk.blue("Checking for updates...\n"));

  const source = getRulesSource();

  await checkAgentsMd(targetDir, source);

  const localRules = listFiles(rulesDir).filter((f) => f.endsWith(".md"));

  if (localRules.length === 0) {
    console.log(chalk.yellow("No rule files found in .cursor/rules/"));
    process.exit(0);
  }
  const statuses: RuleStatus[] = [];

  for (const rule of localRules) {
    const localPath = join(rulesDir, rule);
    const localContent = readFile(localPath);
    const localHash = hashContent(localContent);

    let remoteHash: string | null = null;
    let error: string | undefined;

    try {
      let remoteContent: string;
      if (source.type === "local") {
        const remotePath = join(source.path, "rules", rule);
        if (existsSync(remotePath)) {
          remoteContent = readFile(remotePath);
          remoteHash = hashContent(remoteContent);
        }
      } else {
        remoteContent = await fetchRemoteFile(`${GITHUB_RAW_BASE}/rules/${rule}`);
        remoteHash = hashContent(remoteContent);
      }
    } catch (e) {
      error = e instanceof Error ? e.message : "Unknown error";
    }

    statuses.push({
      name: rule,
      localHash,
      remoteHash,
      isOutdated: remoteHash !== null && localHash !== remoteHash,
      error,
    });
  }

  const outdated = statuses.filter((s) => s.isOutdated);
  const upToDate = statuses.filter((s) => !s.isOutdated && !s.error);
  const errors = statuses.filter((s) => s.error);

  console.log(chalk.blue("Status:"));
  for (const status of upToDate) {
    console.log(chalk.green(`  ✓ ${status.name} (up to date)`));
  }
  for (const status of outdated) {
    console.log(chalk.yellow(`  ↻ ${status.name} (outdated)`));
  }
  for (const status of errors) {
    console.log(chalk.red(`  ✗ ${status.name} (${status.error})`));
  }

  if (outdated.length === 0) {
    console.log(chalk.green("\nAll rules are up to date!"));
    return;
  }

  console.log(chalk.yellow(`\n${outdated.length} rule(s) have updates available.`));

  const response = await prompts({
    type: "multiselect",
    name: "toUpdate",
    message: "Select rules to update:",
    choices: outdated.map((s) => ({
      title: s.name,
      value: s.name,
      selected: true,
    })),
  });

  if (!response.toUpdate || response.toUpdate.length === 0) {
    console.log(chalk.yellow("No rules selected for update."));
    return;
  }

  console.log(chalk.blue("\nUpdating selected rules..."));

  for (const ruleName of response.toUpdate) {
    const destPath = join(rulesDir, ruleName);

    try {
      let content: string;
      if (source.type === "local") {
        content = readFile(join(source.path, "rules", ruleName));
      } else {
        content = await fetchRemoteFile(`${GITHUB_RAW_BASE}/rules/${ruleName}`);
      }

      writeFile(destPath, content);
      console.log(chalk.green(`  Updated ${ruleName}`));
    } catch (e) {
      console.log(chalk.red(`  Failed to update ${ruleName}: ${e}`));
    }
  }

  console.log(chalk.green("\nUpdate complete!"));
}

function hashContent(content: string): string {
  return crypto.createHash("md5").update(content).digest("hex");
}

async function checkAgentsMd(targetDir: string, source: { type: "local" | "remote"; path: string }): Promise<void> {
  const agentsPath = join(targetDir, "AGENTS.md");
  
  if (!existsSync(agentsPath)) {
    console.log(chalk.yellow("No AGENTS.md found in project root.\n"));
    return;
  }

  try {
    const localContent = readFile(agentsPath);
    const localHash = hashContent(localContent);

    let templateContent: string;
    if (source.type === "local") {
      const templatePath = join(source.path, "templates", "AGENTS_TEMPLATE.md");
      if (!existsSync(templatePath)) {
        return;
      }
      templateContent = readFile(templatePath);
    } else {
      templateContent = await fetchRemoteFile(`${GITHUB_RAW_BASE}/templates/AGENTS_TEMPLATE.md`);
    }

    const templateHash = hashContent(templateContent);
    const similarityScore = calculateSimilarity(localContent, templateContent);

    if (similarityScore < 0.5) {
      console.log(chalk.yellow("⚠ AGENTS.md differs significantly from template."));
      console.log(chalk.yellow("  Consider reviewing: diff AGENTS.md against AGENTS_TEMPLATE.md"));
      console.log(chalk.gray(`  Similarity: ${Math.round(similarityScore * 100)}%\n`));
    } else if (localHash !== templateHash) {
      console.log(chalk.blue(`ℹ AGENTS.md has local customizations (${Math.round(similarityScore * 100)}% similar to template)\n`));
    } else {
      console.log(chalk.green("✓ AGENTS.md matches template\n"));
    }
  } catch (error) {
    console.log(chalk.gray("Could not check AGENTS.md against template\n"));
  }
}

function calculateSimilarity(a: string, b: string): number {
  const aLines = new Set(a.split("\n").map(l => l.trim()).filter(l => l.length > 0));
  const bLines = new Set(b.split("\n").map(l => l.trim()).filter(l => l.length > 0));
  
  let matches = 0;
  for (const line of aLines) {
    if (bLines.has(line)) {
      matches++;
    }
  }
  
  const total = Math.max(aLines.size, bLines.size);
  return total > 0 ? matches / total : 1;
}
