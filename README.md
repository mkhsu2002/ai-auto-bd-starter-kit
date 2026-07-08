# AI Auto BD Starter Kit

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

---

## Traditional Chinese

# AI Auto BD Starter Kit

一個輕量、以設定檔驅動的入門框架，用來設計可追蹤的 outbound business development 工作流。

這是一個公開、簡化、安全的 starter kit。它適合用於研究、規劃、審核與流程設計，預設不會寄送 email。

## 這是什麼

AI Auto BD Starter Kit 提供：

- 專案設定檔；
- 範例名單資料；
- 簡化版 lead scoring；
- 基礎 dedupe 訊號；
- outreach preview / dry-run；
- mock weekly report；
- 合規與負責任使用文件。

它是技術起點，不是完整商用銷售自動化系統。

## 這不是什麼

這不是：

- email 寄送器；
- Gmail API worker；
- Google Sheets 同步服務；
- 名單爬蟲或收集器；
- 商用 dashboard；
- 高轉換文案系統；
- email marketing 或隱私法規的法律建議。

## 適合誰

適合：

- 想 prototype outbound workflow 的工程師；
- 想展示可追蹤 BD 模型的顧問；
- 想先建立人工審核流程的創業者；
- 想把公開範例改造成私有客戶專案的團隊。

## 核心概念

- 設定檔驅動：市場、offer、scoring rules、sequence rules 都在 YAML。
- 先人工審核：分數只協助排序，不代表核准 outreach。
- 只做 dry-run：只輸出 console preview，不寄信。
- 負責任使用：退訂文字、停止聯絡條件、排除產業都應被納入流程。
- 私有化改造：真實整合應放在私有 repo，並搭配安全控管。

## 快速開始

```bash
npm install
npm run project:validate
npm run lead:score
npm run outreach:dry-run
npm run report:weekly
```

所有 scripts 都只使用本地 sample files，不呼叫外部 API。

## Dry-run 工作流

```bash
npm run outreach:dry-run
```

此命令會讀取範例 config 與名單、計分、去重，並輸出可人工審核的訊息 preview。它會明確標示沒有寄出任何 email，並提醒加入 opt-out language。

## Lead Scoring 範例

```bash
npm run lead:score
```

範例規則會根據公開 email、網站、弱網站、在地服務屬性、明確地區、連鎖店、缺乏公開聯絡方式等訊號加減分。

## 合規與負責任使用

使用者必須自行遵守適用的 email marketing、隱私與反垃圾郵件法規。

請務必：

- outreach 前人工審核名單；
- 在允許 outreach 的情境下加入退訂或停止聯絡文字；
- 對回覆、退信、unsubscribe、manual stop 立即停止追蹤；
- 避免敏感或受監管產業，除非已有合格法律建議；
- 不要把 credentials 或個資放進公開 repo。

## 如何改造成私有客戶專案

請把此 repo 保持為公開概念範例，另建私有 repo 放置真實 integrations、credentials、client configs、Google Sheets 或 CRM sync、audit logs、停止聯絡流程與核准流程。

## 商業服務 / 顧問說明

FlyPig AI 可協助將此 starter kit 改造成私有、合規、review-first 的 BD workflow，包含流程設計、scoring rules、review dashboard、CRM 或 spreadsheet integration、reporting 與 responsible-use controls。
