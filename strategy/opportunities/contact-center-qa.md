# Contact Center & Support QA

**Status:** researching
**Owner:** CPO Agent (HQ)
**Created:** 2026-04-25
**Last Updated:** 2026-05-04

### Problem / Pain Point

Customer support and contact centre operations generate thousands of call recordings per week, but QA teams can manually review only 1–3% of them. The result: compliance violations go undetected, coaching opportunities are missed, and CSAT issues are identified weeks after the root cause. Real-time agent assist tools (prompting agents with the right response mid-call) exist only in expensive enterprise platforms (NICE, Genesys, Salesforce Service Cloud). SMB and mid-market support operations — running on Intercom, Zendesk, or Freshdesk — have no access to affordable, AI-powered QA and real-time coaching.

### Target ICP (Ideal Customer Profile)

- **Industry/vertical:** Customer support / contact centre operations in e-commerce, fintech, insurance, SaaS, and healthcare (non-clinical)
- **Company size:** 20–500 support agents; companies large enough to have a dedicated QA function but too small to afford enterprise CCaaS platforms (NICE, Genesys)
- **Buyer persona:** Head of Customer Support / VP of CX / Contact Centre Manager seeking to scale QA coverage without hiring more QA analysts, reduce AHT, and improve CSAT scores

### Market Evidence

- **TAM/SAM estimate:** Global contact centre AI market ~$3.8B in 2025, projected ~$9.5B by 2029 (MarketsandMarkets); SMB/mid-market addressable slice ~$500M
- **Competitor landscape:**
  - *NICE CXone* — market leader; full CCaaS suite; priced for enterprise ($150–300/agent/mo); not accessible to SMBs
  - *Genesys Cloud* — similar to NICE; very expensive; complex implementation
  - *Observe.AI* — purpose-built for contact centre intelligence; strong product; Series C-funded; pricing starts at enterprise tier ($80–120/agent/mo); no SMB motion
  - *Gong* — sales-focused; does not cover support/service use cases
  - *Fireflies.ai / Otter.ai* — not designed for contact centre QA; no real-time coaching; no compliance scorecards
  - *Flip* — raised $20M Series A (April 2026, Crunchbase News) for a "verticalized approach to AI-based customer service"; signals growing VC conviction in vertical-specific customer service AI; their verticalization thesis mirrors our ICP strategy but they appear focused on the front-line agent experience rather than QA/compliance scoring
  - *Deepgram* — STT infrastructure leader; **raised $130M Series C at $1.3B valuation (Apr 2026, The SaaS News / Reuters)**. Deepgram powers the transcription layer of several contact centre AI platforms. Fresh capital is accelerating real-time STT accuracy and latency improvements and increases the likelihood they expand up the stack into vertical QA and analytics features — reducing the window where AudioText can establish the intelligence layer above commodity STT.
  - **Gap:** No product offers affordable (<$30/agent/mo) automated QA scoring, compliance monitoring, and agent coaching for SMB contact centres running on Zendesk/Intercom/Freshdesk
- **Customer signals:** AudioText's existing enterprise tier users in e-commerce and fintech verticals have expressed interest in bulk call analysis. Observe.AI's $125M Series C (2021) validates institutional appetite. Zendesk's acquisition of Klaus (QA tooling) for $100M in 2024 validates the willingness of support platforms to pay for QA intelligence. Flip's $20M Series A (April 2026) adds further validation that vertical-focused AI customer service is attracting significant investment — a positive signal for the space overall.

### Technical Leverage

High reuse from existing AudioText infrastructure:
- Bulk transcription and speaker diarization are production-grade — contact centre calls (2 speakers, structured interaction) are a strong fit
- Sentiment analysis and topic detection can be applied to auto-generate QA scorecards
- GPT-4o enables compliance phrase detection, policy adherence scoring, and auto-coaching summaries
- Real-time WebSocket endpoint supports live agent assist (key differentiator vs. post-call-only tools)
- New engineering required: Zendesk/Intercom/Freshdesk connectors for call metadata and ticket linking, QA scorecard template engine, real-time coaching prompt delivery UI, compliance rule builder (custom phrase detection), CSAT prediction model

### Revenue Potential

- **Pricing model:** Per-agent seat subscription ($25–$45/agent/mo) — significantly below Observe.AI; usage-based option for low-volume teams ($0.012/min); annual plans at 20% discount; premium tier with real-time coaching add-on ($15/agent/mo)
- **Path to first paying customer:** Partner with 2–3 e-commerce or SaaS companies using Zendesk → demonstrate 5x increase in QA call coverage vs. manual review → show measurable CSAT improvement → convert pilot to paid with 60-day trial
- **Estimated time to revenue:** 10–12 weeks from pilot to first paid seat (helpdesk integration adds engineering scope)

### Risks & Open Questions

- Call recording consent laws vary widely by jurisdiction (GDPR, CCPA, state two-party consent laws); compliance must be a first-class feature from day one, not an afterthought
- Real-time agent coaching via WebSocket requires low-latency inference (<2s end-to-end) — validate latency budget before committing to real-time as a launch feature
- Helpdesk integrations (Zendesk, Intercom, Freshdesk) each require separate connectors; start with Zendesk only (largest SMB installed base)
- Risk of Zendesk/Intercom building native AI QA features (Zendesk acquired Klaus; Intercom is investing heavily in AI) — must build and validate before these features ship
- Pricing undercuts Observe.AI significantly — validate that SMB willingness-to-pay aligns with $25–$45/agent/mo before engineering investment
- **New risk (Apr 2026):** Deepgram raised $130M Series C at $1.3B valuation (The SaaS News / Reuters). As the STT infrastructure layer used by many contact centre AI tools, fresh capital accelerates real-time transcription improvements and increases the likelihood of upstack expansion into QA scoring and analytics features — potentially commoditising AudioText's transcription layer. Differentiate on post-transcription intelligence (scorecards, compliance rules, coaching prompts) and workflow integrations rather than raw transcription accuracy or speed.

### Whitespace Scoring

| Dimension | Score (1–5) | Notes |
|-----------|-------------|-------|
| Market size | 4 | ~$500M SAM for SMB/mid-market contact centre AI; large agent populations |
| Technical leverage | 4 | Bulk transcription + real-time WS + GPT-4o all reusable; helpdesk connectors are net-new |
| Time to revenue | 3 | 10–12 weeks; helpdesk integration and compliance setup add time |
| Competitive intensity | 3 | Observe.AI is strong but enterprise-only; no SMB-focused player; platform M&A risk |
| **Total** | **14** | Meets ≥14 threshold |

### Decision

- [ ] Approved by @fratei
- [ ] Linked to implementation issue: #
