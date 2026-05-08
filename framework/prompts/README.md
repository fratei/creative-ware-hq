# Prompt Registry

Templates are versioned markdown files with frontmatter and `{{variable}}` interpolation.

## Policy
- Bump template `version` for meaningful prompt changes.
- Keep `required_vars` current.
- Prefer `render-prompt` composite action over inline workflow strings.

## A/B testing
1. Duplicate template with a new versioned filename branch variant.
2. Route via workflow input/flag.
3. Compare downstream outcomes in `strategy/outcomes/` before promoting.
