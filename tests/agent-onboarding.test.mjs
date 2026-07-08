import test from "node:test";
import assert from "node:assert/strict";

import { resolveCliPaths } from "../scripts/lib/args.mjs";
import { parseCsv } from "../scripts/lib/csv.mjs";
import { scoreLeads, summarizeScores } from "../scripts/lib/scoring.mjs";

test("resolveCliPaths accepts --config and --leads file overrides", () => {
  const paths = resolveCliPaths([
    "--config",
    "examples/custom-project.config.yaml",
    "--leads",
    "examples/custom-leads.csv"
  ], "/repo");

  assert.equal(paths.configPath, "/repo/examples/custom-project.config.yaml");
  assert.equal(paths.leadsPath, "/repo/examples/custom-leads.csv");
});

test("resolveCliPaths also supports environment variable overrides", () => {
  const paths = resolveCliPaths([], "/repo", {
    PROJECT_CONFIG: "configs/project.yaml",
    LEADS_CSV: "data/leads.csv"
  });

  assert.equal(paths.configPath, "/repo/configs/project.yaml");
  assert.equal(paths.leadsPath, "/repo/data/leads.csv");
});

test("parseCsv handles quoted commas and escaped quotes", () => {
  const rows = parseCsv('lead_id,business_name,notes\nL-001,"Sample, Inc.","Said ""hello"" today"');

  assert.deepEqual(rows, [
    {
      lead_id: "L-001",
      business_name: "Sample, Inc.",
      notes: 'Said "hello" today'
    }
  ]);
});

test("scoreLeads marks duplicates, excluded industries, and ready leads", () => {
  const config = {
    target_segments: {
      excluded_industries: ["medical"]
    },
    lead_scoring: {
      rules: {
        has_public_email: 20,
        has_website: 10,
        weak_website: 20,
        local_service_business: 15,
        has_clear_region: 10,
        chain_store: -20,
        no_public_contact: -20
      },
      thresholds: {
        ready_to_review: 60,
        hold: 40
      }
    }
  };

  const leads = [
    {
      lead_id: "L-001",
      business_name: "Strong Local Co",
      industry: "local contractors",
      region: "Sample City",
      website_url: "https://strong.example",
      public_email: "hello@strong.example",
      weak_website: "yes",
      local_service_business: "yes",
      chain_store: "no",
      excluded_industry: "no",
      no_public_contact: "no"
    },
    {
      lead_id: "L-002",
      business_name: "Strong Local Duplicate",
      industry: "local contractors",
      region: "Sample City",
      website_url: "https://strong.example/",
      public_email: "hello@strong.example",
      weak_website: "yes",
      local_service_business: "yes",
      chain_store: "no",
      excluded_industry: "no",
      no_public_contact: "no"
    },
    {
      lead_id: "L-003",
      business_name: "Clinic Example",
      industry: "medical",
      region: "Sample City",
      website_url: "https://clinic.example",
      public_email: "info@clinic.example",
      weak_website: "no",
      local_service_business: "yes",
      chain_store: "no",
      excluded_industry: "no",
      no_public_contact: "no"
    }
  ];

  const scored = scoreLeads(config, leads);
  assert.equal(scored[0].review_status, "ready_to_review");
  assert.equal(scored[1].review_status, "duplicate");
  assert.equal(scored[1].duplicate_of, "L-001");
  assert.equal(scored[2].review_status, "excluded");

  assert.deepEqual(summarizeScores(scored), {
    total: 3,
    ready_to_review: 1,
    hold: 0,
    not_ready: 0,
    excluded: 1,
    duplicate: 1
  });
});
