# Framework Release

Current framework version: v1.0.0

## Tag policy

- Publish immutable release tags (`v1.0.0`, `v1.0.1`, ...).
- Maintain floating major tag `v1` pointing at latest compatible `v1.x.y`.
- At merge time for this PR: create/update tags `v1.0.0` and `v1`.

## Release notes (v1.0.0)

### Composite actions
- load-config
- classify-risk
- record-outcome
- assign-copilot
- agent-state
- committee-vote
- render-prompt

### Reusable workflows
- reusable-pr-pipeline.yml
- reusable-product-fleet.yml
- reusable-decision-sla.yml
- reusable-observability.yml
- reusable-coverage.yml
- reusable-deps.yml
- reusable-docs.yml
- reusable-release.yml

### Schemas
- dispatch-events.json
- labels.json
- handoff-format.json
- autonomy-tiers.json
- agent-state.json
- outcomes.json
