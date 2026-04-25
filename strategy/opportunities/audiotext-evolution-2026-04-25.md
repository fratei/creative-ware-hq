# AudioText — Product Evolution Roadmap

**Status:** researching
**Owner:** CPO Agent (HQ)
**Created:** 2026-04-25
**Last Updated:** 2026-04-25

---

## Executive Summary

AudioText is executing well: 20 PRs merged in a single week, 0 open bugs, and two approved strategic bets (Developer API & SDK + Sales Call Intelligence) already in flight. This brief maps the next layer of evolution — improving retention via depth features, exploiting an underutilised PLG motion, reinforcing the platform moat through integrations, and opening two high-value adjacent verticals (Meeting Intelligence and Media/Podcast Pipeline) that reuse existing infrastructure with minimal net-new engineering.

---

## 1. Market Fit Assessment

### Problem Statement

AudioText is correctly positioned as an AI-native audio transcription and understanding platform. The core transcription problem is well-solved; the market-fit gap is at the *post-transcription* layer. Buyers increasingly need downstream intelligence (summaries, action items, topic detection, compliance flags) baked in — not as API outputs, but as purpose-built workflows. Competitors like Otter.ai and Fireflies.ai have moved aggressively in this direction for the meeting segment. AudioText must deepen its value layer before competitors commoditise raw transcription further.

### Target ICP (Ideal Customer Profile)

- **Industry/vertical:** B2B SaaS, professional services, media & podcasting, sales, HR/recruiting
- **Company size:** 5–500 employees; SMB and growth-stage
- **Buyer persona:** Operations lead, content manager, sales manager, or CTO/founder who needs audio processed into structured, actionable data

### Market Evidence

- **TAM/SAM estimate:** Global speech-to-text + conversation intelligence market ~$6B in 2026, projected $14B by 2030 (MarketsandMarkets); SMB-addressable SAM ~$1.2B
- **Competitor moves:** Otter.ai added AI meeting summaries and Salesforce/HubSpot push sync (Q1 2026). Fireflies.ai launched "Thread" (contextual AI Q&A on transcripts). AssemblyAI added LeMUR (LLM-over-audio) for developers. Descript launched AI chapter detection and social clip generation. All signal that raw transcription is table-stakes; the value is in *what you do with the transcript*.
- **Buyer signals:** AudioText's own feature set (speaker diarization, custom vocabularies, team workspaces) targets collaboration use cases, yet lacks downstream workflow automation. Enterprise tier users on $59.99/mo are likely underserved on integrations — a major churn risk.
- **NPS/retention inference:** 0 open issues + high PR velocity suggests either strong product stability or an early-stage user base that is not yet large enough to generate organic feedback. Proactive retention investments (integrations, value dashboards) are warranted before scale.

---

## 2. Feature Evolution Opportunities

### 2a. Post-Transcription Intelligence Layer (Retention Priority)

**Problem:** Users transcribe audio but leave to other tools (Notion, Slack, CRMs) to extract meaning. Every tool-switch is a churn risk.

**Opportunity:** Add an AI-powered "Insights" layer on top of every transcript:
- Auto-summary (paragraph + bullet-point formats)
- Action item extraction with assignee detection
- Topic & keyword tagging
- Sentiment arc visualisation
- Shareable "highlight reel" clips from key moments

**Technical leverage:** GPT-4o is already integrated for transcription; inference on the transcript text is a minimal incremental cost. Speaker diarization is already production-grade, enabling per-speaker analytics.

**Revenue impact:** Unlocks upsell from Starter ($9.99) → Pro ($24.99) by making the value gap obvious. Reduces churn by making AudioText a destination, not a pass-through.

---

### 2b. Meeting Intelligence Module (New ICP Segment)

**Problem:** Knowledge workers spend 30%+ of their week in meetings; most meetings have no structured follow-up. Existing tools (Otter.ai, Fireflies.ai) are weak on audio quality and multi-speaker accuracy.

**Opportunity:** Launch a "Meeting Intelligence" mode:
- Calendar integrations (Google Calendar, Outlook/M365)
- Auto-join bot for Zoom, Google Meet, MS Teams
- Meeting recap email (sent 5 min after call ends)
- CRM-push for sales calls (hooks into Sales Call Intelligence)
- Personal meeting analytics dashboard

**Technical leverage:** Real-time WebSocket transcription and speaker diarization are already built. Calendar OAuth and meeting bot are net-new but well-understood engineering work (Recall.ai SDK can accelerate the meeting bot).

**Target ICP:** Knowledge workers, remote-first teams, managers at 10–200 person companies.

**Revenue potential:** Per-seat model ($15–$25/seat/mo); natural team expansion motion; high NPS driver.

---

### 2c. Media & Podcast Pipeline (New ICP Segment)

**Problem:** Podcasters and video creators spend hours manually creating show notes, chapters, social clips, and transcripts. AI tools exist but are fragmented and require multi-tool workflows.

**Opportunity:** Launch a "Media Pipeline" mode:
- Auto-chapter detection with timestamped chapter titles
- Show notes generation (summary + key takeaways)
- Social snippet extraction (pull top 3–5 quotable moments)
- RSS feed integration (auto-publish transcripts alongside episodes)
- YouTube description + timestamps export

**Technical leverage:** Multi-model transcription, custom vocabularies (for show-specific jargon), and GPT-4o are already production-grade. Chapter detection requires a lightweight topic segmentation model on top of existing outputs.

**Target ICP:** Independent podcasters, YouTube creators, media production companies (50K+ active podcasters in English-speaking markets alone).

**Revenue potential:** Creator-tier subscription ($19/mo individual, $49/mo team); high volume, low support burden; strong word-of-mouth distribution via podcaster communities.

---

## 3. Pricing & Packaging Evolution

### Current State

| Tier | Price | Key Limitation |
|------|-------|----------------|
| Trial | Free | Unknown limits — creates friction |
| Starter | $9.99/mo | No API access, no integrations |
| Pro | $24.99/mo | No team features beyond basic sharing |
| Enterprise | $59.99/mo | REST API v1 only |

### Recommendations

1. **Add a "Teams" tier at $39.99/mo (3–10 seats):** Bridges the gap between solo Pro and high-commitment Enterprise. This is the sweet spot for SMBs and unlocks expansion revenue through seat-based growth.

2. **Move API access to Pro tier (from Enterprise-only):** Democratises API access to drive Developer API & SDK adoption. Pro users who use the API become stickier and more likely to upgrade to Enterprise for higher rate limits and SLAs.

3. **Usage-based overages for Enterprise:** Add per-minute overages above a monthly quota (e.g., $0.008/min after 2,000 min). This converts heavy users into higher-ACV accounts without requiring a separate pricing tier.

4. **PLG improvements — Freemium over Trial:** Replace "Trial" with a genuine freemium tier (e.g., 60 min/mo free, forever). This removes time pressure, improves activation rates, and creates a natural upgrade trigger when users hit the monthly cap. Competitors (Otter.ai, AssemblyAI) have demonstrated strong conversion rates with freemium.

5. **Annual plan promotion:** Introduce 20% discount for annual plans across all tiers. This improves cash flow predictability and reduces churn by extending commitment horizon.

---

## 4. Platform / Ecosystem Plays

### 4a. Integration Marketplace (Platform Moat)

Priority integrations to build (ordered by ICP demand):

| Integration | Segment | Effort | Impact |
|------------|---------|--------|--------|
| Slack (post transcript + summary) | All | Low | High |
| Notion (push transcript as page) | Knowledge workers | Low | High |
| HubSpot (CRM push for sales calls) | Sales | Medium | High |
| Google Drive / Dropbox (auto-export) | All | Low | Medium |
| Zoom / Google Meet (meeting bot) | Meeting Intelligence | High | High |
| Zapier / Make connector | All | Medium | High — unlocks 1000s of custom workflows |
| Salesforce (enterprise CRM) | Enterprise sales | High | High |

A Zapier/Make connector in particular delivers outsized reach: it makes AudioText compatible with any tool in a user's stack without AudioText having to build each integration.

### 4b. MCP (Model Context Protocol) Connector

The emerging MCP standard enables AI agents and LLMs to call AudioText's transcription and intelligence APIs as tools in an agentic workflow. Publishing an MCP connector positions AudioText in the agent/AI-native distribution channel — a fast-growing segment as developer teams adopt AI coding assistants and autonomous agents.

**Technical leverage:** AudioText's REST API v1 maps directly to an MCP tool definition. Effort is low; distribution upside is significant.

### 4c. Partner Distribution Opportunities

- **Podcast hosting platforms** (Buzzsprout, Podbean, Anchor/Spotify for Podcasters): Bundle AudioText as a transcription + show notes add-on. Revenue-share model.
- **Video editing tools** (Descript ecosystem, CapCut): Transcription-as-a-service partnership.
- **Recruiting platforms** (Greenhouse, Lever): Auto-transcribe interview recordings for structured note-taking and compliance.
- **Dialer software** (Aircall, Dialpad, RingCentral): Native integration for sales call intelligence; referenced by the existing Sales Call Intelligence opportunity.

---

## 5. Technical Leverage Summary

| Opportunity | Reuse from AudioText | Net-New Engineering |
|------------|---------------------|---------------------|
| Post-Transcription Intelligence | Very high (GPT-4o, speaker diarization) | Low (prompt engineering + UI) |
| Meeting Intelligence | High (real-time WS, diarization) | Medium (calendar OAuth, meeting bot) |
| Media Pipeline | High (multi-model transcription, GPT-4o) | Low (topic segmentation model, export formats) |
| Integration Marketplace | High (REST API v1) | Medium (per-integration connectors) |
| MCP Connector | Very high (REST API maps to MCP tools) | Low |
| Freemium PLG | High (auth/billing system) | Low (usage metering already in place) |
| Teams pricing tier | High (team workspaces already built) | Low (billing config) |

---

## 6. Revenue Potential & Time-to-Value

| Initiative | Pricing Model | Time to Revenue | Annual Revenue Potential |
|-----------|---------------|----------------|--------------------------|
| Post-Transcription Intelligence | Drives Starter → Pro conversion | 4–6 weeks | +20–30% MRR uplift |
| Meeting Intelligence module | $15–25/seat/mo | 8–10 weeks | $50K–$200K ARR at 200–800 seats |
| Media Pipeline mode | $19–49/mo | 6–8 weeks | $30K–$100K ARR at 150–200 creators |
| Teams tier | $39.99/3–10 seats | 2–3 weeks | +15–25% ACV per account |
| Freemium PLG | Conversion uplift | 3–4 weeks | +20–40% trial → paid conversion |
| Integration Marketplace | Retention / upsell driver | 6–12 weeks | Reduces churn 10–20% |
| MCP Connector | Developer acquisition | 2–3 weeks | Long-tail developer ARR |

---

## 7. Risks & Open Questions

- **Meeting Intelligence:** Bot-based meeting recording requires explicit user consent flows and jurisdiction-specific compliance — must be addressed before GA launch.
- **Media Pipeline:** Creator segment has high acquisition cost via paid channels; organic/community-led GTM required.
- **Freemium PLG:** Freemium introduces potential abuse and cost-per-free-user risk — needs hard quota enforcement and GPU cost modelling before launch.
- **Integration maintenance burden:** Each native integration creates ongoing maintenance. Zapier/Make connector should be prioritised to defer direct integration cost.
- **Teams tier cannibalisation:** Risk that current Enterprise users ($59.99) downgrade to Teams ($39.99). Mitigate by ensuring Enterprise-exclusive features (SLA, advanced API, SSO).

---

## 8. Recommended Execution Order

| Priority | Initiative | Rationale |
|----------|-----------|-----------|
| 🥇 1 | Post-Transcription Intelligence layer | Highest retention impact, lowest effort, immediate revenue signal |
| 🥇 1 | Freemium PLG + Teams tier | Pricing changes unlock pipeline; low engineering effort |
| 🥈 2 | Integration Marketplace (Slack, Notion, Zapier) | Retention driver; unblocks Meeting Intelligence |
| 🥈 2 | MCP Connector | Low effort, emerging distribution channel |
| 🥉 3 | Meeting Intelligence module | Larger ICP expansion; depends on meeting bot infrastructure |
| 🥉 3 | Media Pipeline mode | Strong niche; parallelise with Meeting Intelligence |

---

## Decision

- [ ] Approved by @fratei
- [ ] Linked to implementation issues: #
