# load-config

Loads central agent config. In non-HQ repos it fetches HQ `config/agents.config.json` and deep-merges local overrides.

## Inputs
- `config_path` (default `config/agents.config.json`)
- `framework_version_file` (default `framework-version`)

## Outputs
- `config_json`
- `owner`
- `tier_low_approval`
- `tier_medium_approval`
- `tier_high_approval`
