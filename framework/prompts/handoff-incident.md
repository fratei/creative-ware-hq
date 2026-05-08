---
template: handoff-incident
version: 1.0.0
description: Handoff prompt for incident investigations
required_vars: [incident_summary, severity]
---
## 🚨 Incident Handoff

**Severity:** {{severity}}

{{incident_summary}}
