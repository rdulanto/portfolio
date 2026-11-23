---
title: "AI agents in banking: where they fit and where they don’t"
summary: "An AI agent does not just answer: it acts. After years with models in production in banking, here is where I would use agents today, where not yet and which controls I would set before granting permissions."
date: 2026-11-23
lang: en
slug: ai-agents-in-banking
ref: agentes-banca
tags: [AI agents, Banking, Risk]
category: investigacion
---

An AI assistant answers questions. An agent goes further: it decides which tools to use, queries systems, drafts, records and, if you let it, executes. In banking that difference matters a lot. A mistake is no longer a bad answer on screen; it can be a misrouted payment or a loan rejected without explanation.

I look at this from having had ten models in production at a microfinance bank. None of them acted on its own: each one went through automated validations, and its output was used by a person or by a process with controls. With agents, that safety net has to be designed from day one.

The interest is real. According to [Deloitte](https://www.deloitte.com/us/en/insights/industry/financial-services/agentic-ai-risks-banking.html) (March 2026), one in three financial institutions is already setting aside budget for agentic AI. The same report counts more than 350 risks tied to autonomous behavior in MIT’s AI risk repository.

## Where I would use them today

In tasks that prepare work for a person who reviews and decides. For example:

- Building credit files: gathering documents, checking they are complete and summarizing them for the analyst.
- Preparing anti-money-laundering alerts: pulling transactions, profile and past cases for the compliance officer.
- Handling complaints: classifying them, finding the history and proposing a reply the agent reviews.
- Regulatory reporting: matching the rule against the data and flagging gaps.
- Internal development: generating code, tests and documentation for the IT team.

In every case, a person still makes the call. Even financial supervisors are taking that route: an [S&P Global report](https://www.spglobal.com/en/research-insights/special-reports/closing-the-gap-financial-supervisors-ai-adoption) (May 2026) describes their agents staying mostly in review roles rather than deciding alone.

## Where not yet

**Approving or rejecting loans.** In Peru, the [Law 31814 regulation](/en/blog/peru-ai-law-31814-what-companies-must-do/) classifies credit assessment of individuals as high risk, with mandatory transparency, explanation and human oversight. An agent deciding on its own does not fit. Deloitte mentions exactly that case: an agent rejecting applications without a clear reason.

**Moving money without limits.** A payments agent could skip caps and misallocate funds, according to the same report.

**Talking to customers with broad data access.** If permissions are misconfigured, it can show one customer another customer’s data. When I ran CRM and customer service across 7 channels, controlling what each person could see was already a serious matter with people. With an agent it matters even more.

**Chains of unsupervised agents.** When one agent’s error is the next one’s input, the error multiplies. Deloitte describes reconciliation and settlement agents that keep triggering each other endlessly.

## The controls I would set before granting permissions

Every agent registered, with its purpose, risk level and a responsible person. Minimum permissions with an expiry date: only the tools and data it needs. A log of every action, with which tool and why, because without it there is no audit. Clear thresholds (amounts, customer types, confidence levels) at which the agent stops and hands the case to a person. And tests before every change, plus monitoring in production, just as we did with risk models.

## My recommendation

Start with an agent that prepares work for a team that already exists. Measure how much time it saves and how often the person has to correct it. Expand permissions only with that evidence in hand. In banking, an agent that saves real hours without incidents is worth far more than one that promises full autonomy and nobody dares to switch on.
