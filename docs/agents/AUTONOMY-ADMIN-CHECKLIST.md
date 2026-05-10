# Autonomy Admin Checklist (Phase 2)

Use this checklist to enable end-to-end autonomous operation across:
- `fratei/creative-ware-hq`
- `fratei/creative-ware-product-template`
- `fratei/audiotext-app`
- `fratei/synthdata-app`

## 1) Agent instructions and setup files
- [ ] `AGENTS.md` and/or `.github/copilot-instructions.md` exists in each repository.
- [ ] `.devcontainer/devcontainer.json` exists in each repository.
- [ ] `.github/workflows/copilot-setup-steps.yml` exists in each repository default branch.

## 2) Branch protections and merge policy
- [ ] Require PR for default branch.
- [ ] Require required status checks before merge.
- [ ] Restrict force pushes/deletions on default branch.
- [ ] Enable auto-merge where applicable.

## 3) Required secrets and environment
- [ ] `AGENT_PAT` configured with cross-repo read/write scope.
- [ ] Product deployment secrets configured per product repo.
- [ ] `copilot` environment created and required vars/secrets added.

## 4) MCP / third-party integration readiness
- [ ] MCP tools enabled in repository/org settings for agents that need them.
- [ ] Third-party API keys stored as secrets (never committed to repo).
- [ ] Least-privilege token scopes verified quarterly.

## 5) Network/firewall allow-list (if applicable)
- [ ] Allow GitHub Actions standard endpoints.
- [ ] Allow Copilot cloud agent endpoints:
  - `uploads.github.com`
  - `user-images.githubusercontent.com`
  - `api.individual.githubcopilot.com` / `api.business.githubcopilot.com` / `api.enterprise.githubcopilot.com` (as applicable)

## 6) Parallel PR stability controls
- [ ] Concurrency groups configured for long-running orchestration workflows.
- [ ] Workflow/job timeouts configured to avoid hangs.
- [ ] Queue semantics (`cancel-in-progress: false`) used where in-flight work should finish.
- [ ] Race-prone workflows include dedup/idempotency checks.
