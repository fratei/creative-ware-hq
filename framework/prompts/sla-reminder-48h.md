---
template: sla-reminder-48h
version: 1.0.0
description: SLA reminder prompt
required_vars: [hours_open, sla_hours, owner]
---
## ⏱️ Decision SLA Reminder

Open for **{{hours_open}}h** (SLA: {{sla_hours}}h).

@{{owner}} please review.
