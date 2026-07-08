#!/usr/bin/env node

import { loadProjectConfig, defaultConfigPath } from "./lib/config.mjs";
import { loadCsvRows, defaultLeadsPath } from "./lib/csv.mjs";
import { scoreLeads, summarizeScores } from "./lib/scoring.mjs";
import { printHeader, printList, printSection } from "./lib/console.mjs";
import { resolveCliPaths } from "./lib/args.mjs";

const paths = resolveCliPaths();
const configPath = paths.configPath ?? defaultConfigPath;
const leadsPath = paths.leadsPath ?? defaultLeadsPath;
const config = await loadProjectConfig(configPath);
const leads = await loadCsvRows(leadsPath);
const scoredLeads = scoreLeads(config, leads);
const summary = summarizeScores(scoredLeads);
const readyLeads = scoredLeads.filter((lead) => lead.review_status === "ready_to_review");
const holdLeads = scoredLeads.filter((lead) => lead.review_status === "hold");

printHeader("Mock Weekly BD Report");
console.log(`Project: ${config.project.name}`);
console.log(`Config: ${configPath}`);
console.log(`Leads: ${leadsPath}`);
console.log("Report type: mock local report; no external APIs; no email sent.");

printSection("Lead Pool");
console.log(`Total sample leads: ${summary.total}`);
console.log(`Ready for human review: ${summary.ready_to_review}`);
console.log(`Hold for research: ${summary.hold}`);
console.log(`Not ready: ${summary.not_ready}`);
console.log(`Excluded: ${summary.excluded}`);
console.log(`Duplicates: ${summary.duplicate}`);

printSection("Review Queue");
if (readyLeads.length === 0) {
  console.log("No leads are ready for review.");
} else {
  printList(readyLeads.map((lead) => `${lead.lead_id}: ${lead.business_name} (${lead.score})`));
}

printSection("Hold Queue");
if (holdLeads.length === 0) {
  console.log("No leads are currently on hold.");
} else {
  printList(holdLeads.map((lead) => `${lead.lead_id}: ${lead.business_name} (${lead.score})`));
}

printSection("Suggested Next Actions");
printList([
  "Review ready_to_review leads manually before any outreach.",
  "Remove excluded and duplicate records from the working queue.",
  "Research hold leads for better contact quality or stronger fit.",
  "Confirm opt-out language and stop-contact handling before adapting this into a private sending system."
]);
