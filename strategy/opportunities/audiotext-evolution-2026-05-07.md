# AudioText — Product Evolution Roadmap (2026-05-07)

**Status:** researching
**Owner:** Market Analysis Agent (HQ) / CPO Agent (HQ)
**Created:** 2026-05-07
**Last Updated:** 2026-05-07

### Problem / Pain Point
AudioText is well-positioned for teams that need accurate transcription, speaker diarization, and multi-model flexibility, but the market is moving past raw transcripts toward workflow-ready outputs, deeper integrations, and enterprise-safe controls. The main risk is not core transcription quality; it is that users can get the transcript and then leave AudioText to summarise, distribute, analyse, or operationalise it elsewhere.

### Target ICP (Ideal Customer Profile)
- **Industry/vertical:** B2B SaaS, agencies, media/podcasting, recruiting, customer-facing teams
- **Company size:** 5-250 employees
- **Buyer persona:** Founder, ops lead, revenue leader, or technical product owner who wants audio turned into structured work output without assembling a multi-tool stack

### Market Evidence
- **Current product signals:** AudioText is live, has 0 open issues, 0 open feature requests, and 2 PRs merged this week per the issue brief. That suggests product stability, but the lack of visible inbound feedback also implies a weak external signal loop; NPS/retention should be treated as neutral-to-unclear rather than proven strong.
- **Competitor landscape:** Deepgram raised a $130M Series C and expanded multilingual conversational speech recognition; AssemblyAI is pushing further into voice infrastructure and real-time developer workflows; Otter.ai is reinforcing meeting-system-of-record positioning; Fireflies.ai continues to compete on meeting automation; Descript is packaging transcript-adjacent creator workflows. These moves confirm that the market is rewarding vendors that layer workflow automation and distribution on top of speech-to-text, not vendors that stop at transcription.
- **Buyer signals:** The 2026-05-07 research brief surfaces demand for multilingual accuracy, real-time voice workflows, downstream AI extraction, and easier developer onboarding. Hacker News and OSS trends also show persistent interest in local/offline speech tooling, which increases pressure on hosted products to win on convenience, integrations, collaboration, and compliance rather than on transcript generation alone.

### Technical Leverage
AudioText already has unusually strong reuse for this next phase:
- multi-model transcription and quality/cost trade-offs
- speaker diarization and real-time WebSocket transcription
- GPT-4o-based extraction/summarisation primitives
- team workspaces and sharing
- REST API v1 for enterprise customers

That means the highest-value roadmap moves mostly require packaging, workflow orchestration, UI, usage controls, and integrations rather than a foundational platform rebuild.

### Revenue Potential
- **Pricing model:** Keep core transcription plans, but add packaging that monetises workflow depth: a Teams tier, workflow/integration add-ons, and API usage-based expansion above subscription quotas.
- **Path to first paying customer:** Ship retention-oriented transcript intelligence and self-serve integrations to existing users first, then expand into developer/API and sales-call workflows already approved in adjacent briefs.
- **Estimated time to revenue:** 2-6 weeks for pricing/packaging changes and transcript-intelligence upsells; 4-8 weeks for integration-led expansion revenue.

### Risks & Open Questions
- Zero visible feature requests may mean weak feedback collection instead of perfect fit.
- Freemium or broader API access can create abuse and margin risk without hard metering.
- Meeting/sales/compliance use cases require stronger consent, retention, and deletion controls.
- The competitive pace is rising quickly enough that roadmap sprawl is a bigger risk than under-investment.

### Recommended Evolution Priorities

#### 1. Market Fit Assessment
AudioText is solving a real problem for SMB and growth-stage teams that need affordable transcription plus understanding, but the strongest fit is with customers who need an output workflow, not just an audio-to-text conversion. The product is therefore directionally correct for its ICP, yet slightly under-positioned versus where the market is headed. The biggest fit gap is not “wrong customer”; it is “incomplete job-to-be-done.”

Retention/NPS inference should remain cautious. With 0 visible issues and 0 open feature requests, there is no strong evidence of active dissatisfaction, but there is also limited proof of enthusiastic pull. The safest assumption is that AudioText has baseline product fit on transcription and an unproven moat on downstream value.

#### 2. Feature Evolution Opportunities
1. **Post-transcription workflow automation (highest priority):** ship default summaries, action items, topic tags, highlights, and export-ready templates for common workflows. This most directly reduces churn because it keeps users inside AudioText after the transcript lands.
2. **Integration-led retention:** prioritise Slack, Notion, Zapier/Make, and HubSpot so transcripts and insights flow into the tools customers already use. Competitors are increasingly winning by becoming part of the system of record.
3. **Multilingual and quality-packaging improvements:** surface language-specific quality modes, domain vocab packs, and optional human-review/compliance workflows for higher-stakes accounts. This strengthens fit without requiring a full vertical product launch.
4. **Self-serve developer motion:** expand from enterprise-only API access toward clearer self-serve API packaging, webhooks, and SDK-led onboarding. This is already partially captured by the approved `developer-api-sdk.md` opportunity and should now be treated as a go-to-market accelerant, not just a technical extension.

#### 3. Pricing & Packaging Evolution
1. **Replace “trial-only” positioning with a true freemium or usage-capped starter motion** so users can embed AudioText into a real workflow before paying.
2. **Add a Teams plan** between Pro and Enterprise to capture growing SMB accounts that need collaboration and integrations but are not ready for enterprise procurement.
3. **Move selected API and automation capabilities downmarket** via credits, add-ons, or capped quotas instead of forcing all automation demand into Enterprise. This improves PLG conversion and expansion revenue.
4. **Use overages and annual pricing** to increase ACV while keeping entry-level adoption friction low.

#### 4. Platform / Ecosystem Plays
- **Near-term moat:** integrations plus webhooks, especially Slack, Notion, HubSpot, Zapier/Make, and storage/export flows.
- **Medium-term moat:** MCP- and SDK-friendly API packaging so AudioText can be embedded in AI-agent and product workflows.
- **Distribution opportunities:** podcast/media workflows, recruiting/interview workflows, and sales-call workflows remain the cleanest adjacent channels because they reuse the current stack and can piggyback on existing output formats.

### Recommended Execution Order
1. Ship post-transcription workflow automation
2. Add Teams + freemium/API packaging changes
3. Launch Slack/Notion/Zapier or Make integrations
4. Deepen multilingual/compliance-ready packaging
5. Continue execution on the already-approved adjacent bets:
   - [`strategy/opportunities/developer-api-sdk.md`](./developer-api-sdk.md)
   - [`strategy/opportunities/sales-call-intelligence.md`](./sales-call-intelligence.md)

### Decision
- [ ] Approved by @fratei
- [ ] Linked to implementation issue: #
