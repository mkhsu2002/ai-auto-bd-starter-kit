#!/usr/bin/env node

import { loadProjectConfig, defaultConfigPath } from "./lib/config.mjs";
import { loadCsvRows, defaultLeadsPath } from "./lib/csv.mjs";
import { scoreLeads } from "./lib/scoring.mjs";
import { printHeader, printSection } from "./lib/console.mjs";
import { resolveCliPaths } from "./lib/args.mjs";

const paths = resolveCliPaths();
const configPath = paths.configPath ?? defaultConfigPath;
const leadsPath = paths.leadsPath ?? defaultLeadsPath;
const config = await loadProjectConfig(configPath);
const leads = await loadCsvRows(leadsPath);
const scoredLeads = scoreLeads(config, leads);
const reviewableLeads = scoredLeads.filter((lead) => lead.review_status === "ready_to_review");

printHeader("Outreach Dry Run");
console.log("DRY RUN ONLY: no email was sent, no API was called, and no Google Sheet was updated.");
console.log(`Project: ${config.project.name}`);
console.log(`Config: ${configPath}`);
console.log(`Leads: ${leadsPath}`);
console.log(`Offer: ${config.offer.primary_offer}`);

for (const step of config.outreach_sequence.steps) {
  printSection(`Preview Step: ${step.step}`);
  console.log(`Delay: ${step.delay_days} day(s)`);
  console.log(`Template key: ${step.template}`);

  for (const lead of reviewableLeads) {
    console.log("");
    console.log(`To: ${lead.business_name} (${lead.public_email || "manual review required"})`);
    console.log(`Subject: Quick ${config.brand.service_name} idea for ${lead.business_name}`);
    console.log("Body preview:");
    console.log(`Hello ${lead.business_name},`);
    console.log(
      `I am reviewing ${lead.industry} in ${lead.region} and noticed a few website/search visibility items that may be worth checking.`
    );
    console.log(`${config.brand.name} offers a ${config.offer.primary_offer.toLowerCase()}: ${config.offer.value_proposition}`);
    console.log(`${config.offer.call_to_action}: ${config.brand.cta_url}`);
    console.log("Opt-out reminder: Include a clear line such as, \"Reply stop and I will not contact you again.\"");
  }
}

printSection("Stop Conditions");
console.log(config.outreach_sequence.stop_on.join(", "));
console.log("\nNo email sent.");
