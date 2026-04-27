# HR & Recruiting Intelligence

**Status:** researching
**Owner:** CPO Agent (HQ)
**Created:** 2026-04-25
**Last Updated:** 2026-04-25

### Problem / Pain Point

Hiring teams conduct hundreds of interviews per quarter but have no structured, scalable way to capture and compare candidate responses. Interview notes are subjective, inconsistent, and often incomplete — leading to biased decisions, compliance risk, and poor candidate experience. Structured interviewing best practices require scorecards and behavioural anchors, but manually transcribing and scoring interviews is too time-consuming for most teams. Existing ATSs (Greenhouse, Lever, Workday) have no native AI interview intelligence. Dedicated tools like Metaview and Screenloop are early-stage, expensive, or limited in scope.

### Target ICP (Ideal Customer Profile)

- **Industry/vertical:** Technology companies, professional services, financial services, healthcare, any organisation conducting high-volume structured interviewing
- **Company size:** 50–2,000 employees; companies doing 20+ interviews per week where interviewer consistency and DEI compliance are board-level concerns
- **Buyer persona:** Head of Talent Acquisition / VP of People at a scale-up or mid-market company trying to standardise hiring quality, reduce time-to-hire, and demonstrate DEI compliance to investors or auditors

### Market Evidence

- **TAM/SAM estimate:** Global HR technology market ~$35B in 2025; talent acquisition software sub-segment ~$3B; AI interview intelligence SAM ~$200–300M and rapidly growing as DEI compliance mandates expand
- **Competitor landscape:**
  - *Metaview* — purpose-built for interview intelligence; early-stage; limited ATS integrations; no real-time coaching
  - *Screenloop* — strong UK presence; limited US market penetration; expensive for SMBs
  - *HireVue* — video interview platform with AI scoring; controversial due to facial recognition concerns; very expensive; enterprise-only
  - *Otter.ai / Fireflies.ai* — generic meeting tools used as workarounds; not purpose-built; no ATS integration; no structured scorecard generation
  - **Gap:** No affordable, compliance-first tool purpose-built for structured interview intelligence with ATS integration and bias-detection flags at an SMB-accessible price point
- **Customer signals:** HR and recruiting teams are among the earliest adopters of general-purpose transcription tools like Otter.ai — a clear signal that manual transcription is a pain point. LinkedIn's 2025 Talent Trends report cites AI in hiring as the #1 topic among HR professionals. Regulatory pressure (EU AI Act, NYC Local Law 144) is creating compliance urgency.

### Technical Leverage

High reuse from existing AudioText infrastructure:
- Transcription and speaker diarization are already production-grade; interview format (2–4 speakers, structured Q&A) is well within existing model capabilities
- GPT-4o integration enables structured scorecard generation from transcripts (map candidate answers to behavioural competencies)
- Sentiment analysis and topic detection are layered on existing ML pipeline
- New engineering required: ATS connectors (Greenhouse, Lever — both have well-documented APIs), structured scorecard template engine, candidate-question alignment model, DEI bias-flag detection module, interview replay UI with timestamped annotations

### Revenue Potential

- **Pricing model:** Per-seat subscription ($29–$49/interviewer seat/mo) or per-interview usage ($3–5/interview); ATS integration add-on ($15/seat/mo for premium connectors); annual plans at 20% discount
- **Path to first paying customer:** Partner with 2–3 HR teams at Series B–D companies → pilot with Greenhouse integration → demonstrate reduction in interviewer time-per-hire and improvement in structured-interview consistency → publish case study → convert to paid with 45-day trial
- **Estimated time to revenue:** 10–12 weeks from pilot to first paid seat (ATS integration adds complexity vs. consumer use cases)

### Risks & Open Questions

- AI scoring of interviews is a regulated activity in some jurisdictions (NYC Local Law 144 requires annual bias audits for AI used in hiring decisions) — legal review required before GA
- ATS integration maintenance is a long-tail burden; start with Greenhouse only (most common in tech sector) and expand
- Candidate consent for recording must be baked into the interview scheduling workflow — adds UX complexity
- Differentiation against HireVue: position as interviewer-assistance tool (not candidate-scoring AI) to avoid regulatory friction and negative press
- Risk of ATS vendors (Greenhouse, Lever, Ashby) building native AI interview intelligence — monitor closely

### Whitespace Scoring

| Dimension | Score (1–5) | Notes |
|-----------|-------------|-------|
| Market size | 3 | SAM ~$200–300M; growing with DEI compliance mandates |
| Technical leverage | 4 | Transcription + diarization + GPT-4o all reusable; ATS connectors are net-new |
| Time to revenue | 3 | 10–12 weeks due to ATS integration and compliance review |
| Competitive intensity | 4 | Metaview/Screenloop are early-stage; HireVue is unpopular; clear SMB gap |
| **Total** | **14** | Meets ≥14 threshold |

### Decision

- [ ] Approved by @fratei
- [ ] Linked to implementation issue: #
