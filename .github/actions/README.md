# CreativeWare Reusable Composite Actions

Use from any repository:

```yaml
- uses: fratei/creative-ware-hq/.github/actions/<action-name>@v1
```

## Version pinning policy

- Use floating major tag `@v1` for safe minor/patch updates.
- Use immutable tags (for example `@v1.0.0`) for locked reproducibility.
- HQ publishes immutable tags and moves `v1` to the latest compatible `v1.x.y`.

## Migration guide (product repos)

1. Replace inline `actions/github-script` logic with these composites.
2. Use `load-config` first when owner/tier settings are required.
3. Use `classify-risk`, `committee-vote`, `assign-copilot`, `agent-state`, and `record-outcome` instead of duplicated scripts.
4. Use `render-prompt` plus templates in `framework/prompts/` instead of inline long strings.

## Action catalog

- `load-config`
- `classify-risk`
- `record-outcome`
- `assign-copilot`
- `agent-state`
- `committee-vote`
- `render-prompt`
