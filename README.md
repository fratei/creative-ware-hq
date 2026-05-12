# 🏢 CreativeWare HQ

> AI-native company command center — managing products, strategy, and autonomous agent operations.

## Company Overview

| | |
|---|---|
| **Company** | CreativeWare |
| **Owner** | [@fratei](https://github.com/fratei) |
| **Mission** | Build AI-native SaaS products that deliver workflow automation, insights, and domain-specific solutions |
| **HQ Repo** | [`fratei/creative-ware-hq`](https://github.com/fratei/creative-ware-hq) |

## Products

| Product | Repo | Status | Description |
|---------|------|--------|-------------|
| 🎙️ AudioText | [`fratei/audiotext-app`](https://github.com/fratei/audiotext-app) | 🟢 Live | AI audio/video transcription & understanding platform |

> New products are created automatically via the [Product Creation Pipeline](.github/workflows/product-creation.yml).
> See [Product Registry](products/REGISTRY.md) for details.

## Agent System

CreativeWare runs on a fleet of 14 autonomous AI agents operating 24/7 through GitHub Issues, PRs, and Actions.

| Agent | Role | Scope |
|-------|------|-------|
| 🎯 Orchestrator | Chief of Staff — cross-product coordination | HQ |
| 👔 CEO Agent | Strategy & vision (subordinate to human owner) | HQ |
| 💰 CFO Agent | Financial modeling, pricing, margins | HQ + Products |
| 🔧 CTO Agent | Technical architecture, infrastructure | HQ + Products |
| 🔒 CISO Agent | Security, compliance, risk management | HQ + Products |
| 📦 CPO Agent | Product strategy, roadmap, PRDs | HQ + Products |
| 💻 Engineering Agent | Development, code, PRs | Products |
| 🧪 QA Agent | Testing, quality gates | Products |
| ⚙️ DevOps Agent | CI/CD, infrastructure, observability | Products |
| 📣 CMO Agent | Marketing, positioning, growth | HQ |
| 💼 CRO Agent | Sales, ICP, pipeline, pricing | HQ |
| 🤝 CS Agent | Customer success, onboarding, support | Products |
| ⚖️ Legal Agent | ToS, privacy, DPA, compliance | HQ |
| 👥 HR Agent | Agent performance, evaluation | HQ |

## Decision Authority

| Decision Type | Required Approval |
|---------------|-------------------|
| New products, strategic direction | @fratei |
| Pricing changes | @fratei |
| Security posture changes | @fratei |
| Major infrastructure/vendor commits | @fratei |
| Marketing spend > $100 | @fratei |
| Feature implementation | CPO + CTO (auto-approve) |
| Bug fixes, improvements | Engineering (self-approve) |

## How It Works

```
┌─────────────────────────────────────────────────────┐
│                  CreativeWare HQ                     │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │ Orchestrator │  │   Product    │  │  Strategy   │ │
│  │  (every 4h)  │  │  Creation    │  │  & Agents   │ │
│  └──────┬───────┘  └──────┬───────┘  └────────────┘ │
│         │                 │                          │
└─────────┼─────────────────┼──────────────────────────┘
          │                 │
    ┌─────▼─────┐     ┌────▼─────┐     ┌──────────┐
    │ audiotext │     │ new-prod │     │ new-prod │
    │   -app    │     │   repo   │     │   repo   │
    │ (agents)  │     │ (agents) │     │ (agents) │
    └───────────┘     └──────────┘     └──────────┘
```

## Key Links

- [Product Registry](products/REGISTRY.md)
- [Company Strategy](strategy/README.md)
- [Agent Handbook](docs/agents/HANDBOOK.md)
- [Agent Dashboard](docs/agents/DASHBOARD.md)
- [Agent Entry Point](AGENTS.md)
- [Autonomy Admin Checklist](docs/agents/AUTONOMY-ADMIN-CHECKLIST.md)
- [Phase 2 Autonomy Audit (2026-05-10)](docs/agents/PHASE-2-AUTONOMY-AUDIT-2026-05-10.md)
- [Phase 3 Autonomy Progress (2026-05-10)](docs/agents/PHASE-3-AUTONOMY-PROGRESS-2026-05-10.md)
- [Owner Decisions Inbox](OWNER-INBOX.md)

---
*CreativeWare — Autonomous AI Company*
