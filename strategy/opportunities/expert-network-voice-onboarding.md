# Expert Network & Voice-First Professional Onboarding

**Status:** researching
**Owner:** CPO Agent (HQ)
**Created:** 2026-05-07
**Last Updated:** 2026-05-07

### Problem / Pain Point

Expert networks (GLG, Tegus, Dialectica, AlphaSights, Guidepoint) and professional talent marketplaces (Toptal, Expert360, Catalant) rely on lengthy, form-based onboarding to capture expert credentials, industry experience, areas of expertise, and availability. This friction creates two acute problems: (1) high expert drop-off during onboarding — the most valuable experts are the busiest, and few will complete a 40-field profile form; (2) shallow, keyword-stuffed profiles that fail to capture the nuanced, contextual expertise that client buyers actually need. Ethos's $22.75M raise from a16z (TechCrunch, May 2026) to build an expert network *specifically differentiated by voice onboarding* is institutional validation that this is a live, funded pain point — and that voice AI is the preferred solution. A parallel data point: JobsUPI raised a $250K pre-seed specifically for a "Voice AI hiring platform" (People Matters, May 2026), further confirming voice as the emerging UX paradigm for professional network intake.

### Target ICP (Ideal Customer Profile)

- **Industry/vertical:** Expert network platforms, professional talent marketplaces, knowledge-on-demand services, executive search firms, consulting network operators
- **Company size:** Platform operators ranging from early-stage startups (Ethos-stage) to established mid-market networks (50–500 employees managing 10K–500K expert profiles)
- **Buyer persona:** VP of Product or CTO at an expert network or talent marketplace who needs to increase expert supply-side throughput, reduce onboarding drop-off, and improve profile quality — without scaling a manual intake team

### Market Evidence

- **TAM/SAM estimate:** Global expert network market ~$1.5–2B in 2026, growing at ~15% CAGR; broader professional talent marketplace segment ~$6–8B; AudioText-addressable B2B API SAM for voice-driven onboarding infrastructure ~$150–300M as the category scales
- **Competitor landscape:**
  - *Ethos* — raised $22.75M Series A from a16z (TechCrunch, May 2026) specifically for expert network with voice onboarding; validates the thesis but Ethos builds for its own platform, not as infrastructure/API; **not a direct competitor — a demand signal**
  - *GLG / Gerson Lehrman Group* — dominant expert network (~$500M revenue, 2023); entirely form/email-based onboarding; no AI voice intake; market leader with a strong incentive to modernise
  - *Tegus / Dialectica / AlphaSights / Guidepoint* — mid-market expert networks competing on expert quality and speed-to-match; all use manual or form-based onboarding; none offer voice-first profile creation
  - *Toptal / Expert360* — talent marketplaces with intensive human vetting; voice-first screening could dramatically accelerate the supply-side funnel without sacrificing quality
  - *HireVue* — video interview platform for enterprise; structured for candidate screening, not expert profile creation; does not serve expert networks; controversial AI scoring methodology
  - *JobsUPI* — pre-seed voice AI hiring platform ($250K raise, May 2026); early-stage; focused on job applications rather than expert profiling; validates voice intake trend in adjacent segment
  - **Gap:** No platform offers a turnkey voice-onboarding API that expert network operators can embed — allowing experts to speak their profile rather than type it, with AI extracting structured data (expertise taxonomy, tenure, credentials, rates, availability) in real time
- **Customer signals:** Ethos's a16z raise is the clearest single market signal — a Tier-1 investor wrote a $22.75M cheque specifically for voice-based expert onboarding. The investment thesis implicitly validates that: (a) expert network UX is broken, (b) voice is the superior modality for capturing nuanced professional expertise, and (c) the TAM is large enough to justify institutional backing. Parallel signal from JobsUPI pre-seed ($250K) confirms voice intake is being built across the professional networking/hiring spectrum. AudioText's existing media and enterprise customers regularly request automated intake and profile-generation workflows — a natural extension.

### Technical Leverage

Very high reuse from existing AudioText infrastructure:

- **Core STT:** Production-grade transcription engine handles expert intake conversations (2-speaker structured dialogue) with no new ML development required
- **Speaker diarization:** Existing diarization separates interviewer prompts from expert answers, enabling per-question structured extraction
- **GPT-4o extraction pipeline:** Existing LLM integration enables named-entity extraction, expertise taxonomy classification, and structured JSON output from voice transcripts — maps directly to expert profile fields (industries, functions, geographies, tenure, company names, role levels)
- **REST API v1:** Already documented; adding a `/voice-onboard` endpoint that returns structured profile JSON from an audio file is minimal new surface area
- **New engineering required:**
  - Expert profile schema and taxonomy API (expertise categories, seniority levels, industry codes — can be adapted from existing structured output work)
  - Real-time streaming mode for live interview capture (WebSocket endpoint already exists; needs profile-extraction prompt chain)
  - Webhook/callback to notify platform on completed profile extraction
  - Optional: confidence scoring on extracted fields (to flag low-confidence segments for human review)

### Revenue Potential

- **Pricing model:** B2B API usage — per onboarding session ($0.50–$1.50/expert onboarded, depending on duration and extraction depth); volume tiers for platform operators (e.g., Starter: 500 sessions/mo at $0.80/session; Growth: 2,500 sessions/mo at $0.60/session; Enterprise: custom); annual contracts with committed volume; white-label SDK add-on at 30% premium
- **Path to first paying customer:** Reach out to 3–5 early-stage expert networks or talent marketplaces actively building supply-side acquisition; offer a 30-day pilot (up to 500 voice onboarding sessions) and demonstrate measurable improvement in onboarding completion rate and profile completeness score; convert to paid annual API contract
- **Estimated time to revenue:** 8–10 weeks from project start to first paying B2B API customer (extraction schema + REST endpoint + pilot outreach — no new infrastructure required)

### Risks & Open Questions

- **Data privacy and consent:** Voice recordings of professional credentials and work history contain PII; GDPR, CCPA, and EU AI Act obligations apply; consent capture and data-minimisation design must be first-class. Define a clear retention and deletion policy for audio input — experts must be able to request deletion of source audio
- **Expertise taxonomy accuracy:** GPT-4o extraction will occasionally misclassify or under-specify expertise areas; a confidence-scoring and human-review fallback is required for high-stakes expert networks (financial research, medical consulting) where profile accuracy is contractually significant
- **Network effects barrier:** Dominant expert networks (GLG) have deep supply-side moats; winning with incumbents requires a compelling ROI story (onboarding completion rate, time-to-live per expert) rather than feature novelty alone
- **Ethos as future competitor:** Ethos may eventually productise its voice onboarding stack as an API/SaaS offering for other networks if they pivot to platform strategy (common post-Series A). Monitor their hiring and product announcements; establish AudioText brand presence in the expert-network operator community before Ethos has the resources to expand
- **Dependency on partner networks:** B2B API motion requires sales-led outreach; no PLG (product-led growth) flywheel without a self-serve developer portal and sandbox environment; plan to publish public docs and sandbox on launch
- **Open questions:**
  - Which expert network operators (beyond GLG/Tegus) are actively recruiting AI product vendors?
  - Is there a standard expert profile schema (e.g., from an industry body) that AudioText should align to, or does each operator define their own taxonomy?
  - What is the expected session length for a voice onboarding interview — 5 minutes vs. 20 minutes has significant cost implications

### Whitespace Scoring

| Dimension | Score (1–5) | Notes |
|-----------|-------------|-------|
| Market size | 3 | Expert network market ~$1.5–2B; growing but relatively niche vs. general STT/voice AI TAM |
| Technical leverage | 5 | Core STT + diarization + GPT-4o extraction pipeline are all production-ready; new work is schema + endpoint, not ML |
| Time to revenue | 4 | 8–10 weeks; B2B API contract with a single expert network pilot is achievable quickly |
| Competitive intensity | 4 | No existing "voice onboarding as API" product; Ethos validates demand without serving the infrastructure layer |
| **Total** | **16** | Exceeds ≥14 threshold — **recommend advancing to validated** pending @fratei review |

### Signal History

| Date | Research Brief | Signal |
|------|---------------|--------|
| 2026-05-07 | `strategy/research/2026-05-07.md` | Ethos raises $22.75M from a16z for expert network with voice onboarding (TechCrunch); JobsUPI raises $250K pre-seed for voice AI hiring platform (People Matters) — opportunity brief created |

### Decision

- [ ] Approved by @fratei
- [ ] Linked to implementation issue: #

---

*Signal source: [Ethos raises $22.75M from a16z for its expert network with voice onboarding — TechCrunch (2026-05-07)](https://news.google.com/rss/articles/CBMirgFBVV95cUxOMGFVRjh3VElrTndoNTdBTnZRRVhJR1lfZ0ZacVNGVl94VUlENkxEVEhCdkRlX3Q4UGdPT0pTWHdXTVp3NkF4NHpLQzhLdTBvbUZiX3lsVnpxMGlId3Y1dkg5VC1yamFmUnRzT1pDNVNEQjVNNk5ZNTFoR2tQbzNMaXpMMDE0ei1kbURKSXNPVGRWb1ZjcXhuOGpUZERsMnVpcVRlUWkwdmhTVmRlbHc?oc=5)*

*Corroborating signal: [Voice AI hiring platform JobsUPI secures $250K pre-seed round — People Matters (2026-05-07)](https://news.google.com/rss/articles/CBMiwwFBVV95cUxNd05Uc3hUNFdTcmFSVDBLa1ZJM1VRTkZVdm1DLWJFZkJoSGlocWpCQmNMeGZUUTBkdERKMzBRcjNBVHcyMGFpY2VyS2F4VW8taFU5cDZYdUloTmxVTlkwam94SG1GbUtFOXNqV3ljWm5BeXNobVByN1p2MEdOVFM3VXZGWk9oZjc1WC1NVjRXaFhlRGRjcUVDWEI3S0pqLU12M2UxWExpUkt5cEgyTGFFcmR3cU5WTHFBb05uYnc4X0trbGc?oc=5)*

*Generated by @copilot — CreativeWare HQ*
