---
title: "Peru’s AI law: what companies must do under the Law 31814 regulation"
summary: "If your company has a model that approves or rejects loans, this law already applies to you. Here is what the regulation asks for, the deadlines and how I would start."
date: 2026-11-23
lang: en
slug: peru-ai-law-31814-what-companies-must-do
ref: ley-31814
tags: [Regulation, Responsible AI, Data governance]
category: guia
---

When I led data engineering at a microfinance bank, we had ten machine learning models in production: risk, collections, sales, customers and FX. If I were in that seat today, the first thing I would ask is which of those models fall into the new regulation’s high-risk category. And the answer would not be "none".

That is why I am writing this. On 9 September 2025 Peru published [Supreme Decree 115-2025-PCM](https://busquedas.elperuano.pe/dispositivo/NL/2436426-1), the regulation of Law 31814 on artificial intelligence. It took effect in January 2026, and for companies in finance, health, education, justice and security the one-year compliance window already closed in September 2026.

One caveat first: I am not a lawyer and this is not legal advice. It is the reading of someone who has had models in production and would have to answer for them.

## What matters most if you work in banking

The regulation sorts AI systems into three groups. Improper uses are banned (manipulation, mass surveillance without legal basis). Acceptable-risk systems are almost everything else, like an assistant that drafts documents. In between sit high-risk systems, which are allowed with conditions.

For those of us in banking and microfinance, the key line is this: **credit assessment of individuals is high risk**. Fraud detection is expressly excluded. So if you have a score that approves or rejects loans, that model is in the most demanding category. Hiring and student assessment are in there too, which hits close to home for me as a lecturer.

## What each high-risk system needs

I read the regulation alongside the summaries by [Quimera](https://groupquimera.com.pe/guias/ley-inteligencia-artificial-peru-empresas) and [AyP Digital](https://aypdigital.com/blog/ley-31814-inteligencia-artificial-peru-implicancias-empresas/). In short, it asks for five things:

- Tell people, beforehand and in plain words, what the system is for and what kind of decisions it makes (art. 25).
- Be able to explain a decision when it affects their rights.
- Keep an up-to-date record of how the system works, what data it uses and its logic (art. 31).
- Have trained people who can stop it, correct it or override its decisions.
- Comply with Law 29733 on personal data, which remains the route for sanctions.

Under article 32, an impact assessment is voluntary for the private sector. I would still do it. It is the simplest way to show you did the work. If you do, keep the documentation for at least three years.

## Deadlines

| Private sector | Window | Ends |
| --- | --- | --- |
| Health, education, justice, security, economy and finance | 1 year | September 2026 |
| Transport, trade and labor | 2 years | September 2027 |
| Production, agriculture, energy and mining | 3 years | September 2028 |
| Other uses | 4 years | September 2029 |

Small businesses get 2 years and micro businesses 3, counted from 10 September 2025.

## How I would start

First, the inventory. A list of every model and every AI tool in use across the company, including the chat tools people use on their own. There are almost always more than you think.

Then I would flag which ones make or support decisions about credit, employment or education. Those are your high-risk systems.

For each one I would write a simple record: what it is for, what data it uses, how it decides, how it performs and who oversees it. When we had a dedicated pipeline per model, with automated data validation, much of that information already existed. It just needed to be put in order.

Finally, I would give every system an owner: one person who answers for it and has the authority to switch it off.

None of this is new for a team that already does data governance. The difference is that it now has a deadline and a law behind it.

## What is still unclear

The regulation has no fines of its own. The Digital Government Secretariat at the PCM supervises and refers cases to other authorities, such as the Personal Data Protection Authority or Indecopi. It also does not say how it will fit with what the banking regulator (SBS) already requires for credit risk models.

Until that is settled, my advice is the same any auditor would give: know which models you have, what they do and who answers for them. If you want to talk about how this applies to your case, [book a call](https://calendar.app.google/LpuvurdHaRBMeS2X9).
