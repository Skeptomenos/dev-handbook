import chalk from "chalk";
import prompts from "prompts";
import { existsSync } from "fs";
import { join, resolve } from "path";
import { detectStack, getRelevantRules } from "../utils/stack-detector.js";
import { getRulesSource, getRulesPath } from "../utils/paths.js";
import { ensureDir, readFile, writeFile, copyFile, fetchRemoteFile } from "../utils/file-ops.js";
import { generateAgentsMd } from "../utils/agents-generator.js";

interface InjectOptions {
  force: boolean;
}

export async function injectCommand(options: InjectOptions): Promise<void> {
  const targetDir = process.cwd();
  
  console.log(chalk.blue("Analyzing project..."));
  
  const stack = detectStack(targetDir);
  
  if (stack.primary === "unknown") {
    console.log(chalk.yellow("Could not detect project type. No package.json, pyproject.toml, Cargo.toml, or Package.swift found."));
    
    const response = await prompts({
      type: "select",
      name: "stack",
      message: "What type of project is this?",
      choices: [
        { title: "TypeScript/Node.js", value: "typescript" },
        { title: "Python", value: "python" },
        { title: "Rust", value: "rust" },
        { title: "Swift/iOS", value: "swift" },
      ],
    });
    
    if (!response.stack) {
      console.log(chalk.red("Aborted."));
      process.exit(1);
    }
    
    stack.primary = response.stack;
  }
  
  console.log(chalk.green(`Detected stack: ${stack.primary}${stack.hasReact ? " + React" : ""}${stack.hasDatabase ? " + Database" : ""}`));
  
  const agentsPath = join(targetDir, "AGENTS.md");
  const rulesDir = join(targetDir, "rules");
  
  if (existsSync(agentsPath) && !options.force) {
    const response = await prompts({
      type: "confirm",
      name: "overwrite",
      message: "AGENTS.md already exists. Overwrite?",
      initial: false,
    });
    
    if (!response.overwrite) {
      console.log(chalk.yellow("Skipping AGENTS.md"));
    } else {
      await installAgentsMd(targetDir, stack, rulesDir);
    }
  } else {
    await installAgentsMd(targetDir, stack, rulesDir);
  }
  
  await installRules(targetDir, stack, rulesDir, options.force);
  
  console.log(chalk.green("\nInjection complete!"));
  console.log(chalk.blue("Files created:"));
  console.log(`  - AGENTS.md`);
  console.log(`  - rules/*.md`);
}

async function installAgentsMd(targetDir: string, stack: ReturnType<typeof detectStack>, rulesDir: string): Promise<void> {
  const agentsMd = generateAgentsMd(stack, "rules");
  writeFile(join(targetDir, "AGENTS.md"), agentsMd);
  console.log(chalk.green("Created AGENTS.md"));
}

async function installRules(
  targetDir: string,
  stack: ReturnType<typeof detectStack>,
  rulesDir: string,
  force: boolean
): Promise<void> {
  ensureDir(rulesDir);
  
  const source = getRulesSource();
  const relevantRules = getRelevantRules(stack);
  
  console.log(chalk.blue(`\nInstalling ${relevantRules.length} rule files from ${source.type} source...`));
  
  for (const rule of relevantRules) {
    const destPath = join(rulesDir, rule);
    
    if (existsSync(destPath) && !force) {
      console.log(chalk.yellow(`  Skipping ${rule} (exists)`));
      continue;
    }
    
    try {
      if (source.type === "local") {
        const srcPath = join(source.path, "rules", rule);
        if (existsSync(srcPath)) {
          copyFile(srcPath, destPath);
          console.log(chalk.green(`  Copied ${rule}`));
        } else {
          console.log(chalk.yellow(`  Rule not found: ${rule}`));
        }
      } else {
        const content = await fetchRemoteFile(`${source.path}/rules/${rule}`);
        writeFile(destPath, content);
        console.log(chalk.green(`  Fetched ${rule}`));
      }
    } catch (error) {
      console.log(chalk.red(`  Failed to install ${rule}: ${error}`));
    }
  }
}
