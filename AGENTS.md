# CreativeWare HQ — Agent Operating Entry Point

This repository supports autonomous execution by Copilot and GitHub Actions agents.

## Scope
- HQ-only decisions, strategy, registry, and orchestration workflows live here.
- Product feature/code implementation belongs in product repositories.

## Required agent behavior
1. Read `.github/copilot-instructions.md` first.
2. Prefer minimal, reversible changes.
3. Never manually edit `strategy/agent-state/*.json` (workflow-managed).
4. Use `node framework/scripts/validate-schemas.js` before proposing workflow/config changes.

## Cross-repo autonomy dependencies
- `AGENT_PAT` (repo/org secret) for cross-repository automation.
- Optional MCP and third-party integrations must be configured via repository/org secrets and allow-lists (see `docs/agents/AUTONOMY-ADMIN-CHECKLIST.md`).

## Fast start
- Dev container: `.devcontainer/devcontainer.json`
- Copilot cloud setup: `.github/workflows/copilot-setup-steps.yml`
