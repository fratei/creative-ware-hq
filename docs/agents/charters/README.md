# Agent Charters

This directory contains the official charter for each agent in the CreativeWare fleet. Charters define each agent's mission, decision criteria, inputs/outputs, escalation triggers, and autonomy tier defaults.

## Format

Each charter follows this template:

```markdown
# <Role> Agent Charter
## Mission
## Decision Criteria (when this agent says ✅ vs ❌ vs ⏸️)
## Inputs (which files / labels / signals to read)
## Outputs (which files / issues / dispatch events to produce)
## Escalation Triggers
## Autonomy Tier Defaults
```

## Charter Index

| Charter | Agent Role | Scope |
|---------|-----------|-------|
| [cpo.md](cpo.md) | 📦 Chief Product Officer | Product strategy, roadmap, features |
| [cto.md](cto.md) | 🔧 Chief Technology Officer | Architecture, tech debt, CI health |
| [cfo.md](cfo.md) | 💰 Chief Financial Officer | Financial modeling, pricing |
| [ciso.md](ciso.md) | 🔒 Chief Information Security Officer | Security, compliance, risk |
| [cmo.md](cmo.md) | 📣 Chief Marketing Officer | Marketing, positioning, growth |
| [cro.md](cro.md) | 💼 Chief Revenue Officer | Sales, pipeline, pricing strategy |
| [engineering.md](engineering.md) | 💻 Engineering Agent | Implementation via @copilot |
| [qa.md](qa.md) | 🧪 QA Agent | Testing, quality gates |
| [devops.md](devops.md) | ⚙️ DevOps Agent | CI/CD, monitoring, incidents |
| [cs.md](cs.md) | 🤝 Customer Success Agent | Support, feedback, onboarding |
| [legal.md](legal.md) | ⚖️ Legal Agent | ToS, privacy, compliance |
| [hr.md](hr.md) | 👥 HR Agent | Agent performance, evaluation |
| [ceo.md](ceo.md) | 👔 CEO Agent | Strategy, vision |
| [orchestrator.md](orchestrator.md) | 🎯 Orchestrator | Cross-product coordination |

## Updating Charters

Charters are the source of truth for agent decision behavior. To change how an agent votes in committee or escalates decisions, update the relevant charter. The `agent-committee.yml` workflow links to these charters in every voter comment, making behavior fully auditable.

> ⚠️ Changes to charters may affect committee vote outcomes. Submit changes as a PR for review.
