# CreativeWare Agent Handbook — Company-Wide Standards

## Overview

CreativeWare operates through a fleet of 14 autonomous AI agents. This handbook defines company-wide operating standards. Each product repo may have additional product-specific guidelines.

## Agent Communication Protocol

### Structured Handoff Format
All inter-agent communications use this format:

```markdown
## Agent Handoff: [FROM_AGENT] → [TO_AGENT]
**Action Required:** review | implement | approve | investigate
**Priority:** critical | high | normal | low
**Context:** Brief summary of the task
**Deadline:** next cycle | 24h | 48h | none
```

### Issue Labels
Standard labels across all repos:
- `opportunity` — New product/feature opportunity
- `needs-owner-approval` — Requires @fratei decision
- `committee-vote` — Awaiting agent committee vote (CPO/CTO/CFO)
- `do-not-auto-approve` — Prevents SLA-fallback auto-approval
- `assignment-failed` — Copilot assignment failed; reconciler will retry
- `risk/low` / `risk/medium` / `risk/high` — Risk tier from classifier
- `engineering` — Implementation task
- `bug` — Defect
- `incident` — Production issue
- `security` — Security concern
- `agent/[name]` — Created/owned by specific agent
- `auto-detected` — Created by automated monitoring

## Agent Operating Rules

### 1. Autonomy Boundaries
- ✅ **Auto-approve:** Bug fixes, test improvements, docs, refactoring
- ✅ **Auto-approve:** Feature implementation when CPO + CTO agree (via committee)
- ⚠️ **Escalate:** Pricing, security posture, infra/vendor changes, new products
- 🛑 **Never auto-approve:** Changes to agent workflows, billing code, auth middleware

### 2. Autonomy Tiers

All decisions are classified into one of three tiers (see `config/agents.config.json`):

| Tier | Description | Approval Path |
|------|-------------|---------------|
| `low` | Reversible, single-product, no spend, no security/auth/billing | Agent committee (2/3 votes, 6h silent consensus) |
| `medium` | Cross-product, first-time vendor <$100/mo, schema change | Agent committee (3/3 votes, 24h silent consensus) |
| `high` | Pricing, security, new product, vendor >$100/mo, billing/auth | Owner approval required |

Risk classification is performed by `.github/scripts/classify-risk.js` using path patterns and keywords from the config. High-risk SLA fallback is not available — only re-pinging.

### 3. Committee Voting

For `low` and `medium` tier decisions, the agent committee (CPO / CTO / CFO) votes autonomously:

1. Issue is labeled `committee-vote`
2. `agent-committee.yml` posts one structured comment per voter with a ✅ / ❌ / ⏸️ checkbox
3. Each voter applies deterministic heuristics based on their [charter](charters/) and available signals
4. After `silent_consensus_hours`, if `required_votes` approvals and no objections → issue is closed + `implementation-approved` dispatched
5. Any ❌ or ⏸️ → issue labeled `needs-owner-approval` + assigned to owner

Voter charters are linked in every committee comment for auditability: see [`docs/agents/charters/`](charters/).

### 4. Circuit Breakers
Every automated action has limits (configurable in `config/agents.config.json`):
- Max 10 auto-merges per day per product
- Max 3 incident responses per hour per product
- Max 20 dispatcher issues per day per product
- Max 5-hop event chains (prevents infinite loops)
- Max 15 committee decisions per day

### 5. State Management
Agents persist state in `strategy/agent-state/`:
- Read state at the start of each cycle
- Write observations at the end
- Commit with `[skip ci]` to avoid triggering deploys
- Schema documented in `strategy/agent-state/README.md`

### 6. Outcome Tracking
All decisions are tracked in `strategy/outcomes/YYYY-MM.md`:
- Decision → PR → Merge → Deploy → Result
- CPO reads outcomes before proposing new work
- Written by `record-outcome.js` helper; committed with `[skip ci]`

### 7. Cross-Product Communication
- HQ orchestrator scans all product repos every 8 hours
- Products dispatch to HQ via `repository_dispatch` for cross-product concerns
- AGENT_PAT must have access to all CreativeWare repos

### 8. Environment & Guardrail Automation
- `autonomy-guardrails.yml` runs every 6 hours and auto-tracks autonomy blockers:
  - PR-event workflows stuck as `action_required` with zero jobs
  - live product repos that are not reachable by `${{ secrets.AGENT_PAT || secrets.GITHUB_TOKEN }}`
- The guardrail issue (`[AUTONOMY][PHASE-3] Guardrail blockers`) is auto-opened/updated/closed.
- `pr-area-labels.yml` applies path-based `area/*` labels to PRs for faster triage.
- Secret hygiene policy: rotate `AGENT_PAT` on a regular cadence and reverify cross-repo coverage immediately after rotation.

## Agent Roles

### HQ-Level Agents
- **Orchestrator** — Cross-product coordination, resource allocation
- **CEO** — Company strategy, vision (subordinate to @fratei)
- **CFO** — Financial modeling across all products
- **CMO** — Marketing strategy, brand consistency
- **CRO** — Sales pipeline, pricing strategy
- **Legal** — Compliance, ToS, privacy across products
- **HR** — Agent performance evaluation

### Product-Level Agents
- **CPO** — Product roadmap, feature prioritization
- **CTO** — Technical architecture, tech debt
- **CISO** — Security audits, vulnerability management
- **Engineering** — Implementation via @copilot
- **QA** — Test coverage, quality gates
- **DevOps** — CI/CD, monitoring, incident response
- **CS** — Customer feedback, support escalation

Full per-agent decision criteria, inputs, outputs, and escalation triggers are in [`docs/agents/charters/`](charters/).

## Escalation Path

```
Product Agent → Product Dispatcher → HQ Orchestrator → Agent Committee → @fratei
```

Escalation criteria:
1. Unresolved for >48 hours (SLA reminder triggered by `decision-sla.yml`)
2. Unresolved for >72 hours AND tier is low/medium → committee fallback triggered automatically
3. Requires cross-product decision
4. Involves cost/pricing/security (high tier)
5. Circuit breaker triggered

High-tier issues are never auto-approved; only re-pinging occurs.
