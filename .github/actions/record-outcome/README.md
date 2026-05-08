# record-outcome

Appends a row to `strategy/outcomes/YYYY-MM.md`, idempotent on `(kind, decision_ref, pr_ref)`, and commits with `[skip ci]` when changes exist.
