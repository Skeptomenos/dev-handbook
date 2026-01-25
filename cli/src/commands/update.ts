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

  const localRules = listFiles(rulesDir).filter((f) => f.endsWith(".md"));

  if (localRules.length === 0) {
    console.log(chalk.yellow("No rule files found in .cursor/rules/"));
    process.exit(0);
  }

  const source = getRulesSource();
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
