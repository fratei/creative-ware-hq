# Product Registry

> Master list of all CreativeWare products. Auto-updated by the product creation pipeline.

## Active Products

| Product | Repo | Status | Created | Stack |
|---------|------|--------|---------|-------|
| 🎙️ AudioText | [`fratei/audiotext-app`](https://github.com/fratei/audiotext-app) | 🟢 Live | 2025 | Node.js/Express, Azure AKS, GPT-4o |

## Product Lifecycle

```
💡 Opportunity → 📋 Decision → ✅ Approved → 🏗️ Creating → 🟢 Live → 🔴 Sunset
```

- **💡 Opportunity**: Idea in `strategy/opportunities/` — needs analysis
- **📋 Decision**: Issue created with `needs-owner-approval` label
- **✅ Approved**: @fratei closes the decision issue → triggers product creation
- **🏗️ Creating**: Product creation pipeline running
- **🟢 Live**: Product deployed and operational
- **🔴 Sunset**: Product deprecated (kept for reference)

## Adding a Product

Products are created automatically by the [Product Creation Pipeline](../.github/workflows/product-creation.yml).

To create a new product:
1. An opportunity in `strategy/opportunities/` gets approved by @fratei
2. The pipeline creates a repo from the [product template](https://github.com/fratei/creative-ware-product-template)
3. The product is registered here automatically
4. Agents begin working on the new product

## Product Cards

See individual product cards in this directory:
- [audiotext.md](audiotext.md)
