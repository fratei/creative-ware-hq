# Reusable Workflows

All reusable workflows are callable via:

```yaml
uses: fratei/creative-ware-hq/.github/workflows/<file>.yml@v1
secrets: inherit
```

## reusable-pr-pipeline.yml

```yaml
jobs:
  pr:
    uses: fratei/creative-ware-hq/.github/workflows/reusable-pr-pipeline.yml@v1
    with:
      owner: fratei
      repo: my-product
    secrets: inherit
```

## reusable-product-fleet.yml

```yaml
jobs:
  fleet:
    uses: fratei/creative-ware-hq/.github/workflows/reusable-product-fleet.yml@v1
    with:
      registry_path: products/registry.json
    secrets: inherit
```

## reusable-decision-sla.yml

```yaml
jobs:
  sla:
    uses: fratei/creative-ware-hq/.github/workflows/reusable-decision-sla.yml@v1
    with:
      repo: my-product
    secrets: inherit
```

## reusable-observability.yml

```yaml
jobs:
  obs:
    uses: fratei/creative-ware-hq/.github/workflows/reusable-observability.yml@v1
    with:
      product_name: My Product
      dashboard_path: docs/agents/DASHBOARD.md
    secrets: inherit
```

## reusable-coverage.yml, reusable-deps.yml, reusable-docs.yml, reusable-release.yml

Each is product-agnostic and input-driven. Use `secrets: inherit` in consumer repos.
