---
title: "AI agents in banking: where they fit and where they don’t"
summary: "An agent does not just answer: it acts. In banking that changes the risk math. Where they make sense today, where not yet, and which controls to set before granting permissions."
date: 2026-11-23
lang: en
slug: ai-agents-in-banking
ref: agentes-banca
tags: [AI agents, Banking, Risk]
category: investigacion
---

An AI assistant answers questions. An AI agent goes one step further: it chooses which tools to use, queries systems, drafts, records and, if allowed, executes. In banking that difference changes everything, because a mistake is no longer a bad answer on screen: it can be a misrouted payment or a loan declined with no explanation.

The interest is real. According to [Deloitte](https://www.deloitte.com/us/en/insights/industry/financial-services/agentic-ai-risks-banking.html) (March 2026), one in three financial institutions is carving out budget for agentic AI. The same report identifies more than 350 risks tied to autonomous behavior in MIT’s AI risk database.

## Where they fit: tasks that prepare, not decide

Agents work best when their work ends with a person who reviews it:

| Use case | What the agent does | Who decides |
| --- | --- | --- |
| Loan file preparation | Gathers documents, checks completeness and summarizes | The analyst |
| Anti-money-laundering alerts | Pulls transactions, profile and past cases for each alert | The compliance officer |
| Complaint handling | Classifies, retrieves history and drafts a proposed reply | The service agent |
| Regulatory reporting | Cross-checks rules against data and flags gaps | The reporting team |
| Internal development | Generates code, tests and documentation | The IT team |

Even financial supervisors are taking this route. An [S&P Global report](https://www.spglobal.com/en/research-insights/special-reports/closing-the-gap-financial-supervisors-ai-adoption) (May 2026) describes supervisors’ agents as staying mostly in reviewer roles rather than autonomous decision-making.

## Where not yet: decisions that affect customers or move money

- **Approving or declining loans.** In Peru, the [Law 31814 regulation](/en/blog/peru-ai-law-31814-what-companies-must-do/) classifies credit scoring of individuals as high risk, with mandatory transparency, explanation and human oversight. An agent deciding alone does not fit. Deloitte gives the example of an agent declining applicants without a clear rationale, which may breach fair-lending rules.
- **Moving money without limits.** A payment-routing agent could get around limits and misallocate funds, the same report warns.
- **Talking to customers with broad data access.** A service agent with misconfigured permissions can expose personal data from another case.
- **Unsupervised chains of agents.** When one agent’s error becomes another’s input, the error compounds. Deloitte describes reconciliation and settlement agents re-triggering each other endlessly.

## Five controls before granting permissions

1. **Inventory and owner.** Every agent registered, with its purpose, risk level and an accountable person.
2. **Least, expiring permissions.** Only the tools and data it needs, for a limited time.
3. **Log every action.** Which agent did what, with which tool and why. Without it, no audit is possible.
4. **Escalation thresholds.** Amounts, customer types or confidence levels at which the agent stops and hands over to a person.
5. **Continuous evaluation.** Test cases before every change and monitoring in production, just as with a risk model.

## My recommendation

Start with an agent that prepares work for a team that already exists, measure how much time it saves and how often the person corrects its output, and widen permissions only on that evidence. In banking, an agent that saves a team real hours with zero incidents is worth more than one that promises full autonomy and that nobody dares switch on.
