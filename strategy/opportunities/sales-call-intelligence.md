# Sales Call Intelligence

**Status:** validated
**Owner:** CPO + CTO
**Created:** 2026-04-24
**Last Updated:** 2026-05-04

### Problem / Pain Point

Sales teams lose revenue because insights from customer calls are buried in recordings that no one reviews. Reps repeat the same mistakes, managers have no scalable way to coach, and CRMs contain incomplete deal data because notes are never filled in. Sales leaders need automated call scoring, objection detection, and CRM auto-fill to increase win rates and reduce ramp time for new reps.

### Target ICP (Ideal Customer Profile)

- **Industry/vertical:** B2B SaaS, financial services, insurance, real estate, recruiting
- **Company size:** 10–500 employees; growth-stage companies with inside sales teams (5–50 reps)
- **Buyer persona:** VP of Sales / Head of Revenue at a B2B company struggling with rep ramp time, deal visibility, or CRM hygiene

### Market Evidence

- **TAM/SAM estimate:** Sales enablement & conversation intelligence market ~$2B in 2025, expected ~$5B by 2028 (Gartner); direct SAM for SMB/mid-market ~$400M
- **Competitor landscape:**
  - *Gong* — $7.25B valuation; enterprise sales intelligence leader ($100–$200/seat/mo); out of reach for SMBs
  - *Chorus* — acquired by ZoomInfo; enterprise-tier pricing
  - *Salesloft* — enterprise conversation intelligence; not SMB-friendly
  - *Fireflies.ai* — SMB-friendly meeting transcription; lacks deep call scoring and CRM auto-fill
  - *Natter* — **raised $23M to scale enterprise AI conversation intelligence (May 2026)**; direct competitor in conversation scoring and deal intelligence; targets enterprise, not SMB
  - *Giga* — **raised $61M to expand enterprise voice AI, starting with DoorDash (May 2026)**; targets very large enterprises with voice AI workflows; validates enterprise appetite but confirms SMB/mid-market gap remains
  - *Deepgram* — STT infrastructure layer underpinning many voice-AI apps; **raised $130M Series C at $1.3B valuation (Apr 2026)**; accelerating STT accuracy and real-time API capabilities that power competitors at the infrastructure layer, while raising the risk of upstack expansion into conversation intelligence
  - **Gap:** All major application-layer players are expensive (Gong $100–$200/seat/mo) and target enterprise. No strong affordable alternative for 10–100 seat teams.
- **Customer signals:** AudioText users in sales verticals have requested CRM integration and call summaries. Market surveys show 60%+ of sales managers want automated call coaching but can't justify enterprise pricing.

### Technical Leverage

High reuse from existing AudioText infrastructure:
- Transcription, speaker diarization, and language understanding are already built
- Sentiment analysis and topic detection can be layered on top of existing ML pipeline
- New work required: CRM integrations (Salesforce, HubSpot), call scoring models, sales-specific vocabulary tuning, coaching UI, and deal-risk alerts

### Revenue Potential

- **Pricing model:** Per-seat subscription ($49–$99/seat/mo) with CRM integration add-ons; annual plans at 20% discount
- **Path to first paying customer:** Partner with 2–3 pilot sales teams → build CRM connector for HubSpot (most common in target ICP) → demonstrate measurable win-rate lift → convert to paid
- **Estimated time to revenue:** 6–8 weeks from pilot launch to first paid seat

### Risks & Open Questions

- CRM integrations have long tail of maintenance burden; start with HubSpot only
- Call recording consent and compliance requirements vary by jurisdiction (must address before GA)
- Model accuracy for sales-specific jargon and objection patterns needs fine-tuning
- Distribution: need partnerships or integrations with dialer software (Aircall, Dialpad, etc.)
- **New risk (May 2026):** Deepgram raised $130M Series C at $1.3B valuation (Apr 2026). As the key STT infrastructure layer for many voice-AI platforms, their increased capitalisation will accelerate STT accuracy and real-time API improvements — raising the baseline transcription quality available to all application-layer competitors (Gong, Fireflies.ai, Salesloft) — while also creating the risk of upstack expansion into conversation intelligence and sales call analytics. AudioText must differentiate on application-layer intelligence (CRM automation, call coaching, objection detection) and affordable pricing rather than raw transcription.

### Decision

- [x] Approved by @fratei — owner-approved priority (see [audiotext-app#33](https://github.com/fratei/audiotext-app/issues/33))
- [ ] Linked to implementation issue: # (CPO agent to create opportunity issue in audiotext-app; once @fratei approves, dispatcher will create [IMPLEMENT] issue)
