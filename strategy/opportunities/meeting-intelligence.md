# Meeting Intelligence

**Status:** researching
**Owner:** CPO Agent (HQ)
**Created:** 2026-04-25
**Last Updated:** 2026-05-04

### Problem / Pain Point

Knowledge workers spend 30–40% of their working week in meetings (Microsoft WorkLab / Atlassian State of Teams 2024 research), yet most meetings produce no structured follow-up. Notes are either absent or inconsistent, action items are forgotten, and decisions are undocumented. Existing tools (Otter.ai, Fireflies.ai) are widely reported in user reviews and community forums to suffer from degraded accuracy on technical or domain-specific vocabulary, and they provide limited integration with broader workflow stacks (Slack, Notion, CRMs). Teams that do adopt meeting tools end up with archives of text that no one searches and no automation on top of the transcript.

### Target ICP (Ideal Customer Profile)

- **Industry/vertical:** B2B SaaS, professional services, consulting, remote-first companies, HR & recruiting
- **Company size:** 10–500 employees; remote or hybrid-first teams that run high meeting volume
- **Buyer persona:** Head of Operations, Chief of Staff, Engineering Manager, or HR Director who needs structured meeting output without adding manual overhead

### Market Evidence

- **TAM/SAM estimate:** Global meeting productivity & collaboration software market ~$4.5B in 2025, projected ~$9B by 2029 (Allied Market Research); AI-powered meeting intelligence sub-segment SAM ~$600M and growing rapidly
- **Competitor landscape:**
  - *Otter.ai* — strong brand in consumer/SMB; poor accuracy for technical/domain-specific vocabulary; limited post-transcription intelligence; no sales workflow integration
  - *Fireflies.ai* — affordable; weak on multi-speaker accuracy; limited CRM push; no real-time coaching
  - *Notta* — AI-powered meeting notes and async transcription; **raised ¥2.3 Billion Series B (Apr 2026, The SaaS News)**, signalling accelerated investment; strong in mobile/async workflows but limited real-time intelligence and CRM/ATS integrations; new funding increases their product velocity
  - *Deepgram* — STT infrastructure leader; **raised $130M Series C at $1.3B valuation (Reuters, May 2026)**. While Deepgram does not currently offer a meeting intelligence product, their fresh capital increases the risk of upstack expansion into the meeting notes / transcription UI layer. Monitor product announcements closely.
  - *Gong / Chorus* — excellent sales call intelligence but priced for enterprise ($100–200/seat/mo); not designed for general knowledge-worker meetings
  - **Gap:** No affordable (<$25/seat) solution combines accurate multi-speaker transcription, real-time action item extraction, and deep integrations (Slack, Notion, CRM) in a single workflow
- **Customer signals:** AudioText users in consulting and SaaS verticals have requested calendar integration and auto-generated meeting recaps. Fireflies.ai has 60K+ active teams on its free tier — a clear signal of unmet demand that has not been monetised at a fair price point.

### Technical Leverage

High reuse from existing AudioText infrastructure:
- Real-time WebSocket transcription is already production-grade
- Speaker diarization supports multi-participant identification
- GPT-4o is integrated for AI summarisation and insight extraction
- New engineering required: calendar OAuth (Google Calendar + Outlook/M365), meeting bot for Zoom/Google Meet/MS Teams, recap email delivery, Slack/Notion push integrations, personal meeting analytics dashboard. A third-party meeting bot SDK (e.g. Recall.ai — a managed API that handles bot joins, audio extraction, and compliance across conferencing platforms) can significantly reduce time-to-launch; see Risks section for trade-offs.

### Revenue Potential

- **Pricing model:** Per-seat subscription at $19–$25/seat/mo; team plan ($39/mo, up to 5 seats); annual discount 20%; optional CRM-push add-on ($10/seat/mo)
- **Path to first paying customer:** Beta with 3–5 remote-first SMB teams via direct outreach → validate recap email + Slack integration → Show HN post → convert beta to paid after 30-day trial
- **Estimated time to revenue:** 8–10 weeks from beta launch to first paid seat

### Risks & Open Questions

- Meeting bot recording requires explicit consent workflows and jurisdiction-specific compliance (GDPR, CCPA, two-party consent states in the US) — must be handled before GA
- Calendar OAuth complexity varies across Google and Microsoft ecosystems; plan for at least 2 weeks of integration work per calendar provider
- Recall.ai SDK dependency introduces a third-party risk; evaluate build-vs-buy for meeting bot carefully
- Differentiation against Fireflies.ai will hinge on accuracy and integration depth — must demonstrate measurably better speaker diarization in head-to-head tests
- Risk of feature cannibalisation with Sales Call Intelligence; position clearly: Meeting Intelligence = all-hands/general meetings; Sales Call Intelligence = revenue-generating calls with CRM automation
- **New risk (Apr 2026):** Notta raised ¥2.3B Series B; their increased funding accelerates product development in the same meeting notes / async transcription space. Move quickly to establish product differentiation on real-time intelligence and integrations before Notta's roadmap closes the whitespace.
- **New risk (May 2026):** Deepgram raised $130M Series C at $1.3B valuation (Reuters). With substantial new capital, Deepgram may expand from pure STT infrastructure into meeting intelligence UI products — a direct competitive threat to this opportunity. The moat must be built on integrations (Slack, Notion, CRM, ATS) and post-transcription intelligence depth, not transcription accuracy alone.

### Whitespace Scoring

| Dimension | Score (1–5) | Notes |
|-----------|-------------|-------|
| Market size | 5 | Large, fast-growing segment; TAM ~$4.5B |
| Technical leverage | 4 | Real-time WS + diarization already built; meeting bot is net-new |
| Time to revenue | 3 | 8–10 weeks; calendar OAuth adds complexity |
| Competitive intensity | 2 | Fireflies/Otter well-established in SMB; Notta ¥2.3B Series B (Apr 2026) increases funding-backed competition; differentiation must be sharp |
| **Total** | **14** | Meets ≥14 threshold |

### Decision

- [ ] Approved by @fratei
- [ ] Linked to implementation issue: #
