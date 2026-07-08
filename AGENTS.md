# AI Agent Onboarding

This repository is a public, dry-run starter kit for designing review-first outbound business development workflows.

## Mission

Help a developer or AI agent understand and adapt a lightweight BD workflow with:

- project configuration in YAML;
- sample lead data in CSV;
- local lead scoring and duplicate detection;
- outreach preview output;
- mock weekly reporting;
- responsible-use documentation.

## Safety Boundaries

Do not add any of the following to this public repository:

- real API keys, OAuth tokens, cookies, refresh tokens, passwords, or private credentials;
- real customer, prospect, or client lead lists;
- private Google Sheet IDs, CRM IDs, mailbox IDs, or production account identifiers;
- internal project names, private campaign names, or confidential customer names;
- working email sending, scraping, or bulk messaging automation.

This starter kit is intentionally dry-run only. Real integrations belong in a separate private repository with proper access controls, audit logs, and compliance review.

## Fast Start

```bash
npm install
npm test
npm run project:validate
npm run lead:score
npm run outreach:dry-run
npm run report:weekly
```

All default commands use local sample files only. They do not send email, call external APIs, or update spreadsheets.

## Important Files

- `README.md` / `README.zh-TW.md` — human-facing overview.
- `examples/sample-project.config.yaml` — default project config.
- `examples/sample-leads.csv` — default sample lead pool.
- `scripts/lib/scoring.mjs` — scoring, dedupe, and review-status logic.
- `scripts/lib/args.mjs` — CLI and environment-variable path overrides.
- `docs/compliance-notes.md` — responsible-use notes.
- `docs/google-sheet-schema.md` — planning schema for later private implementations.
- `docs/private-adaptation-checklist.md` — checklist before building real integrations.
- `schemas/` — machine-readable schema references for configs and lead rows.
- `tests/` — automated behavior tests.

## Path Overrides

Use these when adapting the sample workflow locally:

```bash
npm run project:validate -- --config examples/sample-project.config.yaml
npm run lead:score -- --config examples/sample-project.config.yaml --leads examples/sample-leads.csv
npm run outreach:dry-run -- --config examples/sample-project.config.yaml --leads examples/sample-leads.csv
npm run report:weekly -- --config examples/sample-project.config.yaml --leads examples/sample-leads.csv
```

Environment variables are also supported:

```bash
PROJECT_CONFIG=examples/sample-project.config.yaml LEADS_CSV=examples/sample-leads.csv npm run lead:score
```

## Change Discipline

Before completing any change:

1. Run `npm test`.
2. Run all four demo commands.
3. Check `git diff` for accidental secrets, private names, or real data.
4. Keep this public repo generic. Put production integrations in a private repo.

## Typical Agent Tasks

- Adjust scoring weights in `examples/sample-project.config.yaml`.
- Add tests before changing scoring behavior.
- Improve dry-run preview wording without adding sending capability.
- Extend docs and schemas with generic fields only.
- Create private adaptation guidance without exposing real customer details.
