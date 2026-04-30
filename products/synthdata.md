# 🧬 SynthData — Product Card

## Overview

| | |
|---|---|
| **Product** | SynthData — AI-Powered Synthetic Data Generator |
| **Repository** | [`fratei/synthdata-app`](https://github.com/fratei/synthdata-app) |
| **Status** | 🏗️ Creating |
| **Owner Agent** | 📦 CPO Agent + 🔧 CTO Agent |
| **Opportunity Brief** | [strategy/opportunities/synthetic-data-generator.md](../strategy/opportunities/synthetic-data-generator.md) |
| **Approved** | 2026-04-30 — [creative-ware-hq#54](https://github.com/fratei/creative-ware-hq/issues/54) |

## Problem Statement

AI teams, QA engineers, and compliance officers face a growing crisis: real production data is increasingly off-limits for model training, testing, and analytics due to GDPR, CCPA, HIPAA, and emerging AI-specific data-licensing regulations. SynthData provides a developer-first, API-native synthetic data platform covering tabular, text, and audio/speech modalities — a niche unaddressed by tabular-focused incumbents (Tonic.ai, SDV).

## Target ICP

- **Buyer:** ML Engineer / Head of Data Science at a Seed–Series C AI-native startup; Software Engineering Manager needing realistic but PII-safe QA data; Chief Privacy Officer at a regulated enterprise
- **Verticals:** SaaS, fintech, healthcare tech, insurtech, legal tech — any organisation subject to GDPR/CCPA/HIPAA that trains models or runs AI testing workflows
- **Unique angle:** Audio/speech synthetic data leveraging AudioText's production-grade audio intelligence stack — a gap Tonic.ai and SDV do not address

## Tech Stack

- **Backend:** Python/FastAPI
- **Generators:** Tabular (GAN/VAE), Text (Azure OpenAI), Audio/Speech (Azure Speech + TTS + prosody variation)
- **Privacy layer:** Differential privacy metrics, PII-leak detection, re-identification risk scoring
- **Infra:** Azure Blob Storage, Azure AKS, Azure OpenAI, Azure Speech
- **Billing:** Usage-based SaaS (Free → Developer $49/mo → Team $199/mo → Enterprise custom)

## Key Features (Planned)

- REST API + Python/JS SDK for programmatic dataset generation
- Tabular data generation (GAN/VAE models)
- Text data generation (LLM-based fine-tuning pipeline)
- Audio/speech synthetic data generation (TTS + prosody + noise injection)
- Privacy validation layer (differential privacy, PII detection, re-identification scoring)
- GDPR Article 89 / CCPA compliance documentation out-of-the-box
- Developer portal with dataset schemas, generation templates, and usage metering
- Compliance reporting module

## Technical Reuse from AudioText / CreativeWare

| Component | Status |
|-----------|--------|
| Azure OpenAI (text synthesis) | ✅ Existing contract |
| Azure Speech (TTS for audio generation) | ✅ Existing contract |
| AudioText transcription/diarization pipelines | ✅ Production-grade audio intelligence |
| Enterprise customer base overlap | ✅ Cross-sell ready |
| Generation model fine-tuning | 🔧 Net-new |
| Privacy validation layer | 🔧 Net-new |
| REST API + SDK surface | 🔧 Net-new |
| Developer portal | 🔧 Net-new |

## Revenue Potential

- **Pricing:** Free (10K rows/month, tabular only) → Developer $49/mo → Team $199/mo → Enterprise custom
- **Path to first paying customer:** Cross-sell to AudioText Pro/Enterprise customers as a synthetic audio data add-on
- **Estimated time to revenue:** 8–12 weeks (audio MVP) → 16–20 weeks (multi-modal GA)
- **Break-even:** ~50 Developer-tier subscriptions ($2,450 MRR); scalable to $50K+ MRR within 12 months

## Competitive Context

| Company | Focus | Our Advantage |
|---------|-------|---------------|
| Tonic.ai | Enterprise tabular synthetic data | Audio/speech niche + developer-first pricing |
| SDV (MIT) | Open-source tabular | Managed SLA, compliance layer, multi-modal |
| Greenmask | DB anonymisation | Audio modality, multi-cloud, API-native |
| Kiln-AI | AI systems / training pipelines | Deeper AudioText audio intelligence integration |

**Whitespace score:** 15/20 — exceeds ≥14 threshold (audio/speech niche unaddressed by incumbents).

## Current Strategic Direction

- **Q2–Q3 2026:** Audio/speech synthetic data MVP (Phase 1) leveraging AudioText stack → multi-modal platform (Phase 2)
- **Implementation repo:** [`fratei/synthdata-app`](https://github.com/fratei/synthdata-app)

## Agent Assignments

| Agent | Responsibility |
|-------|---------------|
| CPO | Feature scope, pricing tiers, ICP validation |
| CTO | Architecture: generation engine, privacy layer, SDK |
| Engineering | Implementation via @copilot |
| DevOps | Azure infra, CI/CD, usage metering pipeline |
| Marketing | ProductHunt launch, Hugging Face partnership, developer blog |
| Sales / CS | AudioText customer cross-sell pilot programme |
| CISO / Legal | Differential privacy guarantees, GDPR Article 89 / CCPA docs, compliance audit |
