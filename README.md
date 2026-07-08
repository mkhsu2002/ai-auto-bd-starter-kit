# AI Auto BD Starter Kit v0.3

**Languages:** [English](README.md) | [繁體中文](README.zh-TW.md)

A lightweight, config-driven starter framework for building trackable outbound business development workflows.

This project is a public, simplified starter kit. It is designed for research, planning, review, and workflow design. It does not send emails by default.

## What This Is

AI Auto BD Starter Kit helps you model a small outbound business development workflow with:

- a project config;
- sample lead data;
- simple lead scoring;
- basic dedupe signals;
- outreach preview / dry-run output;
- mock weekly reporting;
- responsible-use documentation.

It is meant to be a technical starting point, not a complete sales automation product.

## What This Is Not

This starter kit is not:

- an email sender;
- a Gmail API worker;
- a Google Sheets sync service;
- a scraper or lead collection engine;
- a commercial dashboard;
- a high-conversion copywriting system;
- legal advice for email marketing or privacy compliance.

## Who It Is For

This starter kit is useful for:

- developers prototyping outbound workflow systems;
- consultants explaining a trackable BD operating model;
- founders designing a lightweight review process before outreach;
- teams that want a clean public example before building a private client system.

## Key Concepts

- Config-driven workflow: market, offer, scoring rules, and sequence rules live in YAML.
- Human review first: scoring suggests what to review; it does not approve outreach.
- Dry-run only: previews are printed to the console and no email is sent.
- Responsible use: opt-out language, stop conditions, and excluded categories are part of the workflow.
- Private adaptation: real integrations should live in a separate private repo with proper security controls.

## Folder Structure

```text
.
├── docs/
│   ├── compliance-notes.md
│   ├── google-sheet-schema.md
│   └── outreach-playbook.md
├── examples/
│   ├── sample-leads.csv
│   └── sample-project.config.yaml
├── scripts/
│   ├── lib/
│   ├── lead-score.mjs
│   ├── outreach-dry-run.mjs
│   ├── project-validate.mjs
│   └── report-weekly.mjs
├── .env.example
├── .gitignore
├── LICENSE
├── package.json
└── README.md
```

## Quick Start

```bash
npm install
npm run project:validate
npm run lead:score
npm run outreach:dry-run
npm run report:weekly
```

All scripts use local sample files and do not call external APIs.

## Example Project Config

The starter config lives at `examples/sample-project.config.yaml`.

```yaml
project:
  name: "Sample Local Service Outreach"
  slug: "sample-local-service"
  owner_name: "Example Owner"
  owner_email: "owner@example.com"

brand:
  name: "Example Digital Studio"
  website_url: "https://example.com"
  service_name: "Website Audit"
  cta_url: "https://example.com/audit"
```

The full config also includes market settings, target segments, lead scoring rules, thresholds, sequence steps, and stop conditions.

## Dry-Run Workflow

Run:

```bash
npm run outreach:dry-run
```

The dry-run script:

- reads the sample config;
- reads the sample leads;
- scores and dedupes leads;
- prints message previews for reviewable leads;
- includes an opt-out reminder;
- clearly states that no email was sent.

## Lead Scoring Example

Run:

```bash
npm run lead:score
```

The sample scoring rules add or subtract points for signals such as public contact details, website presence, local-service fit, clear region, chain-store status, and missing public contact.

Example status output:

- `ready_to_review`: the lead appears strong enough for manual review.
- `hold`: the lead may need more research.
- `not_ready`: the lead is below the review threshold.
- `excluded`: the lead is in an excluded industry.
- `duplicate`: the lead appears to duplicate another record.

## Compliance And Responsible Use Notes

Users are responsible for complying with applicable email marketing, privacy, and anti-spam laws.

Always:

- review leads before outreach;
- include opt-out language where outreach is allowed;
- stop contacting anyone who replies, bounces, unsubscribes, or requests no further contact;
- avoid sensitive or regulated segments unless you have qualified legal guidance;
- keep private credentials and personal data out of public repositories.

This starter kit does not send emails by default.

## License

This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for the full license text, including copyright, patent grant, redistribution, warranty disclaimer, and limitation of liability terms.

## How To Adapt This Into A Private Client Project

For a private client implementation, keep this public repo as the conceptual starter and create a separate private repo for:

- real data source integrations;
- secure credential storage;
- client-specific project configs;
- delivery provider integrations;
- Google Sheets or CRM sync;
- audit logs and stop-contact handling;
- testing and approval workflows.

Do not add real tokens, cookies, OAuth refresh tokens, private Sheet IDs, or client lead lists to this public starter kit.

## Commercial Services / Consulting Note

FlyPig AI can help adapt this starter into a private, compliant, review-first BD workflow for a specific market, team, or client operation. Typical consulting work includes workflow design, scoring rules, review dashboards, CRM or spreadsheet integration, reporting, and responsible-use controls.

Contact:

- Website: http://flypigai.icareu.tw/
- Email: flypig@icareu.tw
