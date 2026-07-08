import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import YAML from "yaml";

const thisDir = dirname(fileURLToPath(import.meta.url));
export const repoRoot = resolve(thisDir, "../..");
export const defaultConfigPath = resolve(repoRoot, "examples/sample-project.config.yaml");

export async function loadProjectConfig(configPath = defaultConfigPath) {
  const raw = await readFile(configPath, "utf8");
  return YAML.parse(raw);
}

export function validateProjectConfig(config) {
  const errors = [];
  const warnings = [];

  const requiredPaths = [
    "project.name",
    "project.slug",
    "project.owner_name",
    "project.owner_email",
    "brand.name",
    "brand.website_url",
    "brand.service_name",
    "brand.cta_url",
    "market.country",
    "market.timezone",
    "market.language",
    "market.currency",
    "offer.primary_offer",
    "offer.value_proposition",
    "offer.call_to_action",
    "target_segments.priority_industries",
    "target_segments.excluded_industries",
    "lead_scoring.rules",
    "lead_scoring.thresholds.ready_to_review",
    "lead_scoring.thresholds.hold",
    "outreach_sequence.steps",
    "outreach_sequence.stop_on"
  ];

  for (const path of requiredPaths) {
    const value = getPath(config, path);
    if (value === undefined || value === null || value === "") {
      errors.push(`Missing required config value: ${path}`);
    }
  }

  if (!Array.isArray(config?.market?.regions) || config.market.regions.length === 0) {
    errors.push("market.regions must contain at least one region.");
  }

  if (!Array.isArray(config?.outreach_sequence?.steps) || config.outreach_sequence.steps.length === 0) {
    errors.push("outreach_sequence.steps must contain at least one step.");
  } else {
    for (const [index, step] of config.outreach_sequence.steps.entries()) {
      if (!step.step || typeof step.delay_days !== "number" || !step.template) {
        errors.push(`outreach_sequence.steps[${index}] must include step, delay_days, and template.`);
      }
    }
  }

  const rules = config?.lead_scoring?.rules ?? {};
  for (const [ruleName, value] of Object.entries(rules)) {
    if (typeof value !== "number") {
      errors.push(`lead_scoring.rules.${ruleName} must be a number.`);
    }
  }

  const ready = config?.lead_scoring?.thresholds?.ready_to_review;
  const hold = config?.lead_scoring?.thresholds?.hold;
  if (typeof ready !== "number" || typeof hold !== "number") {
    errors.push("lead_scoring.thresholds.ready_to_review and hold must be numbers.");
  } else if (ready <= hold) {
    errors.push("ready_to_review threshold must be greater than hold threshold.");
  }

  const requiredStopConditions = ["reply", "bounce", "unsubscribe", "manual_stop"];
  const stopOn = config?.outreach_sequence?.stop_on ?? [];
  for (const condition of requiredStopConditions) {
    if (!stopOn.includes(condition)) {
      errors.push(`outreach_sequence.stop_on must include "${condition}".`);
    }
  }

  if (config?.project?.owner_email && !config.project.owner_email.endsWith("@example.com")) {
    warnings.push("owner_email is not an example.com address. Confirm it is safe before publishing.");
  }

  return {
    ok: errors.length === 0,
    errors,
    warnings
  };
}

function getPath(value, path) {
  return path.split(".").reduce((current, key) => current?.[key], value);
}
