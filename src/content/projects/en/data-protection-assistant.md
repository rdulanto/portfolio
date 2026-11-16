---
title: Assistant for Peru's personal data protection law
question: Can an AI search tool answer compliance questions while citing the exact article of the law?
summary: Yes, in most cases. On unseen questions, the hybrid system ranks the correct article first 60% of the time, vs. 27% for keyword search.
tags: [Generative AI, Semantic search, Data governance]
date: 2026-11-16
lang: en
slug: data-protection-assistant
ref: rag-ley-datos
image: /img/rag-ley-datos-dashboard.png
thumb: /img/rag-ley-datos-thumb.webp
repo: https://github.com/rdulanto/asistente-ley-datos-personales
---

## Why it matters

Business, risk and data teams ask compliance questions in their own words ("we got hacked", "delete my data"), while the law uses others ("security incident", "suppression"). An assistant that cannot find the right article gives answers that sound right but cannot be verified.

## Data

All 174 articles of Peru's Personal Data Protection Law (Law 29733) and its 2024 Regulation, extracted from the official PDFs on gob.pe. To measure it, I wrote 45 questions in business language and labeled the correct article by hand: 30 to tune the system and 15 held out for the final test.

## Findings

| System | Correct article ranked first (test) | In the top 5 (test) |
| --- | --- | --- |
| Exact keyword search | 27% | 47% |
| + Spanish stemming + business glossary | 47% | 73% |
| Multilingual embeddings (e5-large) | 40% | 87% |
| **Hybrid (glossary + embeddings)** | **60%** | **80%** |

- The business glossary helps a lot on the questions it was built from, but less on new ones: that gap is the overfitting signal the held-out set exists to catch.
- Embeddings generalize better; fusing both rankings gets the best of each.
- With 15 test questions, each is worth about 7 points. Small differences are not conclusive.

## Data governance and quality

- The official gazette is printed in two columns and extraction scrambles paragraphs. Each numbered paragraph ("18.1 …") is assigned to its article by number, page headers are removed, and anything unrecoverable is reported rather than hidden.
- Every answer shows the full article with its official source. The AI-written answer may only use those articles and must cite them.
- Educational tool: not legal advice.

## What I would do in a company

Apply the same method to internal policies: a business glossary, a set of questions labeled by the compliance team, and a measurement before every change, to know whether the assistant improves or just changes.
