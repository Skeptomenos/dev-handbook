#!/usr/bin/env node

import { Command } from "commander";
import { initCommand } from "./commands/init.js";
import { injectCommand } from "./commands/inject.js";
import { updateCommand } from "./commands/update.js";

const program = new Command();

program
  .name("dev-rules")
  .description("CLI tool to automate Senior Architect setup for projects")
  .version("1.0.0");

program
  .command("init <name>")
  .description("Scaffold a new project with the latest standards")
  .option("-t, --template <type>", "Project template (ts, python)", "ts")
  .action(initCommand);

program
  .command("inject")
  .description("Add standards to the current directory")
  .option("-f, --force", "Overwrite existing files", false)
  .action(injectCommand);

program
  .command("update")
  .description("Check and update outdated rules from GitHub")
  .action(updateCommand);

program.parse(process.argv);
