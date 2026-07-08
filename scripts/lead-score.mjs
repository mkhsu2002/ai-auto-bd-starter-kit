#!/usr/bin/env node

import { loadProjectConfig } from "./lib/config.mjs";
import { loadCsvRows, defaultLeadsPath } from "./lib/csv.mjs";
import { scoreLeads, summarizeScores } from "./lib/scoring.mjs";
import { pad, printHeader, printSection } from "./lib/console.mjs";

const config = await loadProjectConfig();
const leads = await loadCsvRows();
const scoredLeads = scoreLeads(config, leads);
const summary = summarizeScores(scoredLeads);

printHeader("Lead Scoring Report");
console.log(`Leads: ${defaultLeadsPath}`);
console.log("Mode: local scoring only; no external APIs; no email sent.");

printSection("Summary");
console.log(`Total leads: ${summary.total}`);
console.log(`Ready to review: ${summary.ready_to_review}`);
console.log(`Hold: ${summary.hold}`);
console.log(`Not ready: ${summary.not_ready}`);
console.log(`Excluded: ${summary.excluded}`);
console.log(`Duplicate: ${summary.duplicate}`);

printSection("Leads");
console.log(`${pad("ID", 7)} ${pad("Score", 7)} ${pad("Status", 16)} ${pad("Business", 32)} Notes`);
for (const lead of scoredLeads) {
  const duplicateNote = lead.duplicate_of ? `Duplicate of ${lead.duplicate_of}` : lead.notes;
  console.log(
    `${pad(lead.lead_id, 7)} ${pad(lead.score, 7)} ${pad(lead.review_status, 16)} ${pad(lead.business_name, 32)} ${duplicateNote}`
  );
}
