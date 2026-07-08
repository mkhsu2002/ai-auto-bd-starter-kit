# AI Auto BD Starter Kit v0.3

**語言版本:** [English](README.md) | [繁體中文](README.zh-TW.md)

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

## 資料夾結構

```text
.
├── docs/
│   ├── compliance-notes.md
│   ├── google-sheet-schema.md
│   ├── outreach-playbook.md
│   └── private-adaptation-checklist.md
├── examples/
│   ├── sample-leads.csv
│   └── sample-project.config.yaml
├── schemas/
│   ├── leads.schema.json
│   └── project-config.schema.json
├── scripts/
│   ├── lib/
│   ├── lead-score.mjs
│   ├── outreach-dry-run.mjs
│   ├── project-validate.mjs
│   └── report-weekly.mjs
├── tests/
├── AGENTS.md
├── .env.example
├── .gitignore
├── LICENSE
├── package.json
└── README.md
```

## 快速開始

```bash
npm install
npm test
npm run project:validate
npm run lead:score
npm run outreach:dry-run
npm run report:weekly
```

所有 scripts 都只使用本地 sample files，不呼叫外部 API。

## CLI 路徑覆寫

預設命令會使用 `examples/sample-project.config.yaml` 與 `examples/sample-leads.csv`。本地改造時，可以不改 source code，直接指定其他檔案：

```bash
npm run project:validate -- --config path/to/project.config.yaml
npm run lead:score -- --config path/to/project.config.yaml --leads path/to/leads.csv
npm run outreach:dry-run -- --config path/to/project.config.yaml --leads path/to/leads.csv
npm run report:weekly -- --config path/to/project.config.yaml --leads path/to/leads.csv
```

也支援環境變數：

```bash
PROJECT_CONFIG=path/to/project.config.yaml LEADS_CSV=path/to/leads.csv npm run lead:score
```

## AI Agent Onboarding

AI agent 應先閱讀 [`AGENTS.md`](AGENTS.md)。該文件列出 repo 目的、安全邊界、重要檔案、驗證命令，以及避免把 secrets 或私有專案識別資訊加入公開 starter kit 的規則。

Machine-readable planning references 位於 `schemas/`。改造成私有 implementation 前，請先檢查 `docs/private-adaptation-checklist.md`。

## 範例 Project Config

starter config 位於 `examples/sample-project.config.yaml`。

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

完整 config 也包含 market settings、target segments、lead scoring rules、thresholds、sequence steps 與 stop conditions。

## Dry-run 工作流

```bash
npm run outreach:dry-run
```

此命令會：

- 讀取範例 config；
- 讀取範例名單；
- 進行 scoring 與 dedupe；
- 輸出可人工審核的訊息 preview；
- 提醒加入 opt-out language；
- 明確標示沒有寄出任何 email。

## Lead Scoring 範例

```bash
npm run lead:score
```

範例規則會根據公開 email、網站、弱網站、在地服務屬性、明確地區、連鎖店、缺乏公開聯絡方式等訊號加減分。

狀態說明：

- `ready_to_review`：看起來值得進入人工審核。
- `hold`：需要更多研究。
- `not_ready`：低於審核門檻。
- `excluded`：屬於排除產業。
- `duplicate`：看起來與其他紀錄重複。

## 合規與負責任使用

使用者必須自行遵守適用的 email marketing、隱私與反垃圾郵件法規。

請務必：

- outreach 前人工審核名單；
- 在允許 outreach 的情境下加入退訂或停止聯絡文字；
- 對回覆、退信、unsubscribe、manual stop 立即停止追蹤；
- 避免敏感或受監管產業，除非已有合格法律建議；
- 不要把 credentials 或個資放進公開 repo。

此 starter kit 預設不會寄送 email。

## 授權條款

本專案採用 Apache License 2.0 授權。完整條文請見 [LICENSE](LICENSE)，其中包含著作權、專利授權、再散布條件、免責聲明與責任限制等條款。

## 如何改造成私有客戶專案

請把此 repo 保持為公開概念範例，另建私有 repo 放置：

- 真實 data source integrations；
- 安全的 credential storage；
- 客戶專屬 project configs；
- delivery provider integrations；
- Google Sheets 或 CRM sync；
- audit logs 與 stop-contact handling；
- testing 與 approval workflows。

不要把真實 token、cookie、OAuth refresh token、私有 Sheet ID 或客戶名單加入這個公開 starter kit。

## 商業服務 / 顧問說明

FlyPig AI 可協助將此 starter kit 改造成私有、合規、review-first 的 BD workflow，包含流程設計、scoring rules、review dashboard、CRM 或 spreadsheet integration、reporting 與 responsible-use controls。

聯繫方式：

- Website: http://flypigai.icareu.tw/
- Email: flypig@icareu.tw
