#!/usr/bin/env node

import { loadProjectConfig, validateProjectConfig, defaultConfigPath } from "./lib/config.mjs";
import { printHeader, printList, printSection } from "./lib/console.mjs";
import { resolveCliPaths } from "./lib/args.mjs";

const paths = resolveCliPaths();
const configPath = paths.configPath ?? defaultConfigPath;
const config = await loadProjectConfig(configPath);
const result = validateProjectConfig(config);

printHeader("Project Config Validation");
console.log(`Config: ${configPath}`);

if (result.ok) {
  console.log("\nPASS: config validation passed.");
} else {
  console.log("\nFAIL: config validation failed.");
  printSection("Errors");
  printList(result.errors);
}

if (result.warnings.length > 0) {
  printSection("Warnings");
  printList(result.warnings);
}

printSection("Project");
console.log(`Name: ${config.project.name}`);
console.log(`Slug: ${config.project.slug}`);
console.log(`Owner: ${config.project.owner_name} <${config.project.owner_email}>`);

printSection("Safety");
console.log("This script does not call external APIs, send email, or write to Google Sheets.");

process.exit(result.ok ? 0 : 1);
