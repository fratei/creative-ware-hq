# Agent State

> Auto-maintained by the agent fleet. Do not edit manually.
> Each agent writes its observations here at the end of each cycle.
> Read at the start of each cycle to resume context.

## Schema

Each agent has a dedicated JSON file (`<agent>.json`) with the following schema:

```json
{
  "agent": "cpo",
  "last_run_utc": "2026-05-08T12:00:00Z",
  "last_processed": {
    "opportunity_briefs": { "path": "filename.md", "sha": "abc1234" },
    "outcomes_through": "2026-05-07"
  },
  "pending_handoffs": [],
  "metrics_30d": {
    "decisions_proposed": 0,
    "decisions_approved": 0,
    "decisions_rejected": 0,
    "autonomy_pct": 0
  }
}
```

## Fields

| Field | Description |
|-------|-------------|
| `agent` | Agent identifier (e.g. `cpo`, `cto`) |
| `last_run_utc` | ISO timestamp of the last completed cycle |
| `last_processed.opportunity_briefs` | Last brief file path + SHA processed by CPO; used to skip already-proposed items |
| `last_processed.outcomes_through` | Date through which outcomes have been read; prevents re-reading old outcomes |
| `pending_handoffs` | Queue of handoffs this agent still needs to action |
| `metrics_30d` | Rolling 30-day decision metrics for autonomy tracking |

## Agent Files

| File | Agent |
|------|-------|
| `cpo.json` | CPO — Product strategy |
| `cto.json` | CTO — Technical architecture |
| `cfo.json` | CFO — Financial review |
| `ciso.json` | CISO — Security audit |
| `reconciler.json` | Reconciler — Cross-product reconciliation |
| `orchestrator.json` | Orchestrator — Cross-product coordination |

## Usage

```js
const { loadState, saveState } = require('.github/scripts/agent-state.js');
const state = loadState('cpo');
// ... update state ...
saveState('cpo', state);
```

State files are committed with `[skip ci]` to avoid triggering unnecessary workflow runs.

