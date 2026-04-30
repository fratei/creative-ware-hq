# 📞 Sales Call Intelligence — Product Card

## Overview

| | |
|---|---|
| **Product** | Sales Call Intelligence |
| **Repository** | `fratei/audiotext-app` (extending existing platform) |
| **Status** | 🏗️ Creating |
| **Owner Agent** | 📦 CPO Agent + 🔧 CTO Agent |
| **Opportunity Brief** | [strategy/opportunities/sales-call-intelligence.md](../strategy/opportunities/sales-call-intelligence.md) |
| **Approved** | 2026-04-29 — [audiotext-app#33](https://github.com/fratei/audiotext-app/issues/33) |

## Problem Statement

Sales teams lose revenue because insights from customer calls are buried in recordings that no one reviews. Reps repeat the same mistakes, managers have no scalable way to coach, and CRMs contain incomplete deal data. Sales Call Intelligence automates call scoring, objection detection, and CRM auto-fill — giving sales leaders measurable win-rate lift at a price point accessible to 10–100 seat teams (vs Gong's $100–200/seat/mo enterprise pricing).

## Target ICP

- **Buyer:** VP of Sales / Head of Revenue at a B2B company (10–500 employees; growth-stage inside sales team of 5–50 reps)
- **Verticals:** B2B SaaS, financial services, insurance, real estate, recruiting
- **Signal:** AudioText users in sales verticals have requested CRM integration and call summaries; 60%+ of sales managers want automated call coaching but can't justify enterprise pricing

## Tech Stack

- **Backend:** Extends existing Node.js/Express `server.js` in `audiotext-app`
- **AI:** GPT-4o for call scoring, objection detection, and deal-risk summarisation
- **CRM Integration:** HubSpot API (Phase 1); Salesforce (Phase 2)
- **Infra:** Existing Azure AKS; add sales-specific ML pipeline layer
- **Billing:** Stripe per-seat subscription

## Key Features (Planned)

- Automated call scoring (objection handling, talk-to-listen ratio, sentiment arc)
- Objection detection and categorisation (pricing, competitor mentions, timeline concerns)
- CRM auto-fill — push call summary, key topics, and next steps to HubSpot/Salesforce
- Deal risk alerts (flagged calls surfaced to manager dashboard)
- Rep coaching dashboard — aggregate insights across all reps
- Sales-specific vocabulary tuning (customisable keyword library)
- Call recording consent workflow (jurisdiction-aware)

## Technical Reuse from AudioText

High leverage:

| Component | Status |
|-----------|--------|
| Core transcription engine | ✅ Production-grade |
| Speaker diarization | ✅ Production-grade |
| Sentiment analysis | ✅ Layered on existing ML pipeline |
| Topic detection | ✅ Available in current pipeline |
| GPT-4o summarisation | ✅ Integrated |
| CRM integrations (HubSpot/Salesforce) | 🔧 Net-new |
| Call scoring model | 🔧 Net-new (fine-tune on sales vocabulary) |
| Coaching / manager UI | 🔧 Net-new |
| Deal-risk alert system | 🔧 Net-new |
| Consent workflow | 🔧 Net-new |

## Revenue Potential

- **Pricing:** $49–$99/seat/mo; CRM integration add-ons; 20% annual discount
- **Path to first paying customer:** 2–3 pilot sales teams → HubSpot connector demo → measurable win-rate lift → paid conversion after 30-day trial
- **Estimated time to revenue:** 6–8 weeks from pilot launch

## Competitive Context

| Competitor | Valuation | Gap We Exploit |
|------------|-----------|----------------|
| Gong | $7.25B | $100–200/seat/mo — enterprise only; unaffordable for 10–100 seat teams |
| Chorus (ZoomInfo) | Acquired | Enterprise focus; complex deployment |
| Salesloft CI | — | Bundled add-on; weak standalone value |
| Fireflies.ai | SMB-friendly | No call scoring; no CRM push; generic (not sales-optimised) |

## Current Strategic Direction

- **Q2 2026:** Sales Call Intelligence launch in parallel with Developer API & SDK
- **Implementation tracking:** [audiotext-app#33](https://github.com/fratei/audiotext-app/issues/33)

## Agent Assignments

| Agent | Responsibility |
|-------|---------------|
| CPO | Feature scope, call scoring criteria, CRM integration priority |
| CTO | Architecture: ML pipeline extension, HubSpot connector, consent workflow |
| Engineering | Implementation via @copilot |
| Sales/CRO | Pilot customer sourcing, pricing validation |
| Legal | Call recording consent, GDPR/CCPA compliance, two-party consent states |
| QA | Scoring model accuracy, CRM field-mapping tests |
