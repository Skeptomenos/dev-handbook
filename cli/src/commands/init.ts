import chalk from "chalk";
import prompts from "prompts";
import { existsSync } from "fs";
import { join, resolve } from "path";
import { DetectedStack } from "../utils/stack-detector.js";
import { getRulesSource, getRulesPath } from "../utils/paths.js";
import { ensureDir, writeFile, copyFile, readFile, fetchRemoteFile, listFiles } from "../utils/file-ops.js";
import { generateAgentsMd } from "../utils/agents-generator.js";
import { getRelevantRules } from "../utils/stack-detector.js";

interface InitOptions {
  template: string;
}

export async function initCommand(name: string, options: InitOptions): Promise<void> {
  const targetDir = resolve(process.cwd(), name);
  
  if (existsSync(targetDir)) {
    const response = await prompts({
      type: "confirm",
      name: "proceed",
      message: `Directory "${name}" already exists. Continue anyway?`,
      initial: false,
    });
    
    if (!response.proceed) {
      console.log(chalk.red("Aborted."));
      process.exit(1);
    }
  }
  
  console.log(chalk.blue(`\nInitializing project: ${name}`));
  console.log(chalk.blue(`Template: ${options.template}`));
  
  ensureDir(targetDir);
  
  const stack = buildStackFromTemplate(options.template);
  
  await scaffoldProject(targetDir, name, stack, options.template);
  
  console.log(chalk.green("\nProject initialized successfully!"));
  console.log(chalk.blue("\nNext steps:"));
  console.log(`  cd ${name}`);
  
  if (options.template === "ts") {
    console.log("  npm install");
  } else if (options.template === "python") {
    console.log("  pip install -r requirements.txt");
  }
  
  console.log("  # Start coding with AI assistance!");
}

function buildStackFromTemplate(template: string): DetectedStack {
  switch (template) {
    case "ts":
    case "typescript":
      return { primary: "typescript", hasReact: false, hasDatabase: false };
    case "ts-react":
    case "react":
      return { primary: "typescript", hasReact: true, hasDatabase: false };
    case "python":
    case "py":
      return { primary: "python", hasReact: false, hasDatabase: false };
    case "rust":
    case "rs":
      return { primary: "rust", hasReact: false, hasDatabase: false };
    default:
      return { primary: "typescript", hasReact: false, hasDatabase: false };
  }
}

async function scaffoldProject(
  targetDir: string,
  projectName: string,
  stack: DetectedStack,
  template: string
): Promise<void> {
  const rulesDir = join(targetDir, ".cursor", "rules");
  ensureDir(rulesDir);
  
  const agentsMd = generateAgentsMd(stack, ".cursor/rules");
  writeFile(join(targetDir, "AGENTS.md"), agentsMd);
  console.log(chalk.green("Created AGENTS.md"));
  
  await installRulesForInit(rulesDir, stack);
  
  if (template === "ts" || template === "typescript") {
    await scaffoldTypeScriptProject(targetDir, projectName);
  } else if (template === "python" || template === "py") {
    await scaffoldPythonProject(targetDir, projectName);
  }
  
  const readmeContent = `# ${projectName}

> This project follows the Senior Architect development standards.

## Getting Started

See \`AGENTS.md\` for development guidelines and rules.

## Structure

- \`.cursor/rules/\` - Coding standards and rules for AI assistance
- \`AGENTS.md\` - Main configuration for AI development
`;
  writeFile(join(targetDir, "README.md"), readmeContent);
  console.log(chalk.green("Created README.md"));
  
  const gitignoreContent = `node_modules/
dist/
.env
.env.local
*.log
.DS_Store
__pycache__/
*.pyc
.venv/
`;
  writeFile(join(targetDir, ".gitignore"), gitignoreContent);
  console.log(chalk.green("Created .gitignore"));
}

async function installRulesForInit(rulesDir: string, stack: DetectedStack): Promise<void> {
  const source = getRulesSource();
  const relevantRules = getRelevantRules(stack);
  
  console.log(chalk.blue(`Installing ${relevantRules.length} rule files...`));
  
  for (const rule of relevantRules) {
    const destPath = join(rulesDir, rule);
    
    try {
      if (source.type === "local") {
        const srcPath = join(source.path, "rules", rule);
        if (existsSync(srcPath)) {
          copyFile(srcPath, destPath);
          console.log(chalk.green(`  Installed ${rule}`));
        }
      } else {
        const content = await fetchRemoteFile(`${source.path}/rules/${rule}`);
        writeFile(destPath, content);
        console.log(chalk.green(`  Fetched ${rule}`));
      }
    } catch (error) {
      console.log(chalk.yellow(`  Could not install ${rule}`));
    }
  }
}

async function scaffoldTypeScriptProject(targetDir: string, projectName: string): Promise<void> {
  const packageJson = {
    name: projectName,
    version: "1.0.0",
    description: "",
    main: "dist/index.js",
    scripts: {
      build: "tsc",
      dev: "ts-node src/index.ts",
      start: "node dist/index.js",
      test: "vitest",
      lint: "eslint src/",
      typecheck: "tsc --noEmit",
    },
    devDependencies: {
      "@types/node": "^20.14.0",
      "ts-node": "^10.9.2",
      typescript: "^5.4.5",
      vitest: "^1.6.0",
      eslint: "^9.0.0",
    },
  };
  
  writeFile(join(targetDir, "package.json"), JSON.stringify(packageJson, null, 2));
  console.log(chalk.green("Created package.json"));
  
  const tsconfig = {
    compilerOptions: {
      target: "ES2022",
      module: "NodeNext",
      moduleResolution: "NodeNext",
      lib: ["ES2022"],
      outDir: "./dist",
      rootDir: "./src",
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
    },
    include: ["src/**/*"],
    exclude: ["node_modules", "dist"],
  };
  
  writeFile(join(targetDir, "tsconfig.json"), JSON.stringify(tsconfig, null, 2));
  console.log(chalk.green("Created tsconfig.json"));
  
  ensureDir(join(targetDir, "src"));
  writeFile(join(targetDir, "src", "index.ts"), `console.log("Hello, ${projectName}!");\n`);
  console.log(chalk.green("Created src/index.ts"));
}

async function scaffoldPythonProject(targetDir: string, projectName: string): Promise<void> {
  const pyprojectToml = `[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"

[project]
name = "${projectName}"
version = "1.0.0"
description = ""
readme = "README.md"
requires-python = ">=3.11"
dependencies = []

[project.optional-dependencies]
dev = [
    "pytest>=8.0.0",
    "ruff>=0.4.0",
    "mypy>=1.10.0",
]
`;
  
  writeFile(join(targetDir, "pyproject.toml"), pyprojectToml);
  console.log(chalk.green("Created pyproject.toml"));
  
  const srcDir = join(targetDir, "src", projectName.replace(/-/g, "_"));
  ensureDir(srcDir);
  
  writeFile(join(srcDir, "__init__.py"), "");
  writeFile(join(srcDir, "main.py"), `def main() -> None:\n    print("Hello, ${projectName}!")\n\n\nif __name__ == "__main__":\n    main()\n`);
  console.log(chalk.green("Created src module"));
}
