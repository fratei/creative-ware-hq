# 💻 Developer API & SDK — Product Card

## Overview

| | |
|---|---|
| **Product** | Developer API & SDK |
| **Repository** | `fratei/audiotext-app` (extending existing API) |
| **Status** | 🏗️ Creating |
| **Owner Agent** | 📦 CPO Agent + 🔧 CTO Agent |
| **Opportunity Brief** | [strategy/opportunities/developer-api-sdk.md](../strategy/opportunities/developer-api-sdk.md) |
| **Approved** | 2026-04-29 — [audiotext-app#33](https://github.com/fratei/audiotext-app/issues/33) |

## Problem Statement

Developers building applications that need audio transcription, speaker diarization, or language understanding must either build these capabilities from scratch or integrate with expensive, poorly-documented enterprise APIs. AudioText already has a production-grade REST API v1 for enterprise users — the Developer API & SDK tier extends this with pay-as-you-go pricing, self-serve API key management, and first-class SDK packages for Python and JavaScript/TypeScript.

## Target ICP

- **Buyer:** Backend/full-stack developer or CTO at a startup (indie hacker to Series B, 1–200 employees)
- **Verticals:** SaaS, developer tools, productivity apps, education tech, media & podcasting
- **Signal:** AudioText API v1 early adopters have requested SDKs and webhook support

## Tech Stack

- **Backend:** Extends existing Node.js/Express `server.js` in `audiotext-app`
- **SDKs:** Python (`audiotext-python` on PyPI), JavaScript/TypeScript (`audiotext-js` on npm)
- **Infra:** Existing Azure AKS — add rate-limiting middleware + API key management layer
- **Billing:** Stripe usage-based metering (pay-as-you-go) + subscription tiers

## Key Features (Planned)

- Self-serve API key management (create, rotate, revoke)
- Pay-as-you-go metering ($0.005–$0.01/min)
- Subscription tiers: Starter $29/mo · Growth $99/mo · Scale $299/mo
- Python SDK (`pip install audiotext`) and JS/TS SDK (`npm install @audiotext/sdk`)
- Webhook support (on-complete, on-error)
- Developer documentation portal
- Usage dashboard (API calls, minutes consumed, cost)
- Rate limiting and abuse prevention

## Technical Reuse from AudioText

Very high leverage — minimal net-new infrastructure:

| Component | Status |
|-----------|--------|
| Core transcription engine | ✅ Production-grade |
| Speaker diarization | ✅ Production-grade |
| Multi-model AI (8 models) | ✅ Production-grade |
| REST API v1 | ✅ Live (Enterprise tier) |
| Real-time WebSocket | ✅ Live |
| Rate limiting middleware | 🔧 Needs hardening for public launch |
| API key management | 🔧 Net-new |
| SDK packages (Python + JS) | 🔧 Net-new |
| Developer docs portal | 🔧 Net-new |
| Usage dashboard | 🔧 Net-new |

## Revenue Potential

- **Pricing:** Pay-as-you-go ($0.005–$0.01/min) + Starter $29/mo · Growth $99/mo · Scale $299/mo
- **Path to first paying customer:** PyPI + npm publish → "Show HN" post → 60 free minutes freemium → convert on first project
- **Estimated time to revenue:** 4–6 weeks from SDK launch

## Competitive Context

| Competitor | Position | Moat Gap |
|------------|----------|----------|
| Deepgram | $1.3B — raised $130M Series C (Apr 2026); accelerating DX | Speed on SDK quality is critical |
| AssemblyAI | Developer-focused, strong docs | Price + accuracy gap |
| Rev AI | Accuracy-focused | No pay-as-you-go |
| OpenAI Whisper | Free OSS, no managed SLA | SLA + support gap |

## Current Strategic Direction

- **Q2 2026:** Developer API & SDK launch in parallel with Sales Call Intelligence
- **Implementation tracking:** [audiotext-app#91](https://github.com/fratei/audiotext-app/issues/91)

## Agent Assignments

| Agent | Responsibility |
|-------|---------------|
| CPO | Feature scope, pricing tiers, SDK API design |
| CTO | Architecture: rate limiting, key management, SDK structure |
| Engineering | Implementation via @copilot |
| DevOps | Metering pipeline, usage dashboard infra |
| Marketing | "Show HN" launch, PyPI/npm publish strategy |
| Legal | ToS, API abuse policy, data processing addendum |
