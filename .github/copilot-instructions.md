# Copilot Coding Agent — CreativeWare HQ

## Repository overview
CreativeWare HQ is the central command repository for CreativeWare, an autonomous AI company. It contains company-wide strategy, product registry, agent operating standards, and cross-product orchestration workflows.

## Architecture
- **Products** (`products/`) — Registry and product cards for all CreativeWare products
- **Strategy** (`strategy/`) — Company vision, opportunities, agent state, outcomes
- **Agent Docs** (`docs/agents/`) — Handbook, dashboard, operating standards
- **Workflows** (`.github/workflows/`) — HQ orchestrator, product creation pipeline

## Key patterns
- This is a **management repo**, not a product repo. No application code lives here.
- Changes to this repo affect company-wide operations.
- Product-specific changes should go to the respective product repo.
- The product registry (`products/REGISTRY.md`) is the source of truth for active products.
- Agent state files in `strategy/agent-state/` are auto-maintained by workflows — don't edit manually.

## Coding conventions
- Workflows use `actions/github-script@v7` for GitHub API operations
- All workflows use `${{ secrets.AGENT_PAT || secrets.GITHUB_TOKEN }}` for auth
- Cross-repo operations require AGENT_PAT with access to all CreativeWare repos
- Commit bot changes with `[skip ci]` to avoid unnecessary workflow triggers

## Important files
- `products/REGISTRY.md` — master product list
- `strategy/README.md` — company strategy
- `docs/agents/HANDBOOK.md` — agent operating standards

## Autonomous PR pipeline

This repo is configured for **fully autonomous PR merging**. Human approval is intentionally not required.

- Every PR is auto-classified into `risk/low`, `risk/medium`, or `risk/high`.
- Soak window before merge: low = 2 min, medium = 10 min, high = 60 min.
- Merge requires: all required status checks green, no merge conflicts, branch not blocked by protection rules.
- Merge method is **squash** with co-author attribution to Copilot.
- Circuit breaker: max 25 auto-merges per day (see `config/agents.config.json`).
- To temporarily disable auto-merge on a single PR, add the label `do-not-merge`.

Copilot-authored PRs: after opening a PR, do nothing extra — the autonomous pipeline will pick it up, classify it, wait out the soak window, and merge once CI is green.

## Recovery: re-trigger stuck CI

- Run via **Actions → 🔁 Re-run stuck PR checks (one-shot) → Run workflow**.
- Useful after enabling/disabling the "Allow Actions on Copilot PRs" setting, after a credentials rotation, or when many PRs have `action_required` checks.
- Safe to run multiple times.
