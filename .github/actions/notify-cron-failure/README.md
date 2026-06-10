# notify-cron-failure

Composite action that makes silent scheduled-workflow failures **loud**. When a
`schedule`-triggered run fails, it opens a `[CRON FAILURE] …` tracking issue (or
comments on the existing open one) so a broken cron can't rot unnoticed.

## Why

Inline `actions/github-script` typos and other runtime errors only surface when a
workflow actually runs. For `schedule` triggers there is no PR or human watching,
so a cron can stay broken for weeks. This action turns that silent failure into a
visible, deduplicated issue.

## Usage

Add a final step to any scheduled workflow, gated on failure + the schedule event:

```yaml
      - name: Notify on scheduled-run failure
        if: ${{ failure() && github.event_name == 'schedule' }}
        uses: ./.github/actions/notify-cron-failure
        with:
          github-token: ${{ secrets.AGENT_PAT || secrets.GITHUB_TOKEN }}
```

The calling job needs `issues: write` permission.

## Inputs

| Input          | Required | Default                                              | Description                                  |
| -------------- | -------- | ---------------------------------------------------- | -------------------------------------------- |
| `github-token` | no       | `${{ github.token }}`                                 | Token used to create/comment the issue.      |
| `labels`       | no       | `agent/orchestrator,needs-owner-approval,cron-failure` | Labels applied; the last is the dedupe key. |

Deduplication uses the last label (default `cron-failure`) plus the issue title,
so repeated failures append a comment instead of opening duplicate issues.
