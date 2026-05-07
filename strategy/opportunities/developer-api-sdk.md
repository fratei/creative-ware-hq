# Developer API & SDK

**Status:** validated
**Owner:** CPO + CTO
**Created:** 2026-04-24
**Last Updated:** 2026-05-07

### Problem / Pain Point

Developers building applications that need audio transcription, speaker diarization, or language understanding must either build these capabilities from scratch or integrate with expensive, poorly-documented enterprise APIs. Existing solutions (AssemblyAI, Deepgram, Rev AI) require significant engineering effort to integrate and offer limited customization. Developers want a clean, well-documented REST + SDK experience with transparent pricing and high reliability.

### Target ICP (Ideal Customer Profile)

- **Industry/vertical:** SaaS, developer tools, productivity apps, education tech, media & podcasting
- **Company size:** Indie hackers to Series B startups (1–200 employees); engineering-led teams
- **Buyer persona:** Backend/full-stack developer or CTO at a startup building a product that needs speech-to-text or audio analytics

### Market Evidence

- **TAM/SAM estimate:** Global speech recognition API market ~$2.5B in 2025, growing ~20% YoY; developer tier SAM ~$300M
- **Competitor landscape:**
  - *Gladia* — **French AI startup raised $16M Series A (May 2026, SiliconANGLE / Slator)** and launched a multilingual real-time transcription engine. Reached $5.6M revenue with a 51-person team in 2025 (GetLatka). Directly targets the developer/API STT market with multilingual and real-time capabilities — a credible new entrant to monitor. Validates VC appetite for developer-facing STT APIs and confirms the market is not yet winner-takes-all.
  - *AssemblyAI* — developer-focused, strong docs; Voice Agent API now GA. **NEW (May 2026):** expanded LLM Gateway to deepen role in AI infrastructure (TipRanks), positioning as a full AI stack for voice — adds competitive urgency for AudioText to ship SDK and post-transcription intelligence features.
  - *Deepgram* — low-latency, real-time; **raised $130M Series C at $1.3B valuation (Apr 2026); expanded Flux model to 10 languages with mid-call switching for voice agents (May 2026); announced enterprise voice AI partnership with IBM (May 2026)** — accelerating DX improvements, multilingual capabilities, and enterprise distribution
  - *Rev AI* — accuracy-focused; no pay-as-you-go
  - *OpenAI Whisper* — free OSS but no managed API SLAs or support
  - *xAI/Grok* — launched standalone STT + TTS APIs targeting enterprise voice developers (May 2026)
  - **Gap:** No dominant player offers both high accuracy + affordable pay-as-you-go + deep SDK coverage for the SMB/startup segment. Deepgram's raise and Flux multilingual expansion signals this gap is closing rapidly — **speed of execution on SDK quality, developer experience, and multilingual support is now critical**.
- **Customer signals:** AudioText already has a REST API v1 for enterprise users — early adopters have requested SDKs (Python, JS/TS) and webhook support. Developer communities (Hacker News, Reddit r/MachineLearning) regularly surface requests for affordable, accurate transcription APIs.

### Technical Leverage

Very high reuse from existing AudioText infrastructure:
- Core transcription engine, multi-model AI, and speaker diarization are already production-grade
- REST API v1 exists — developer tier is an extension (rate limiting, API keys, usage metering)
- WebSocket real-time endpoint already implemented
- Only additions needed: SDK packages (Python + JS/TS), API key management UI, developer docs portal, usage dashboard

### Revenue Potential

- **Pricing model:** Pay-as-you-go ($0.005–$0.01/min) + subscription tiers (Starter $29/mo, Growth $99/mo, Scale $299/mo)
- **Path to first paying customer:** Publish SDK on PyPI / npm → post on Hacker News "Show HN" → freemium onboarding with 60 free minutes → convert to paid on first project
- **Estimated time to revenue:** 4–6 weeks from SDK launch to first paid customer

### Risks & Open Questions

- Rate limiting and abuse prevention must be production-hardened before public launch
- Need to decide on metering granularity (per-second vs per-minute)
- Documentation quality is a key differentiator — requires dedicated effort
- Competition from OpenAI / Google at the commodity end of the market
- **Deepgram $130M Series C (Apr 2026) — accelerated competitive threat:** Deepgram's raise (~$1.3B valuation, The SaaS News) sharpens the urgency on three fronts:
  - *DX timeline:* Fresh capital funds faster SDK quality improvements and developer onboarding enhancements — the exact dimensions AudioText must win on. SDK v1 and developer docs portal should ship before Deepgram's DX roadmap closes the gap.
  - *Feature expansion risk:* Deepgram may use new capital to build post-transcription intelligence (summarisation, action items, topic detection) — features currently absent from their product and AudioText's primary differentiation.
  - *Counter-strategy:* Compete on intelligence depth and developer experience, not on raw transcription price or latency where Deepgram already leads.

### Decision

- [x] Approved by @fratei — owner-approved priority (see [audiotext-app#33](https://github.com/fratei/audiotext-app/issues/33))
- [ ] Linked to implementation issue: # (decision pending: [audiotext-app#91](https://github.com/fratei/audiotext-app/issues/91) — awaiting @fratei approval to trigger dispatch)
