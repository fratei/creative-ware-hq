---
template: incident-investigation
version: 1.0.0
description: Incident investigation prompt
required_vars: [pattern, repo]
---
Investigate incident pattern `{{pattern}}` in `{{repo}}` and propose fix, rollback, and prevention plan.
