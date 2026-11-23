---
title: Assistant for Peru's personal data protection law
question: Can an AI search tool answer compliance questions while citing the exact article of the law?
summary: Yes, in most cases. On unseen questions, the hybrid system ranks the correct article first 60% of the time, vs. 27% for keyword search.
tags: [Generative AI, Semantic search, Data governance]
date: 2026-11-16
kpi: "60% vs 27%"
kpiText: "correct article ranked first, vs. keyword search"
lang: en
slug: data-protection-assistant
ref: rag-ley-datos
image: /img/rag-ley-datos-dashboard.png
thumb: /img/rag-ley-datos-thumb.webp
repo: https://github.com/rdulanto/asistente-ley-datos-personales
pipeline:
  - { k: Data, t: Official gob.pe PDFs, d: "Law 29733 and its Regulation: 174 articles" }
  - { k: Quality, t: Extraction and glossary, d: "Paragraphs reassigned, business terms mapped to legal ones" }
  - { k: Model, t: Hybrid retrieval, d: "Stemmed BM25 + e5-large embeddings, RRF fusion" }
  - { k: Product, t: Assistant with citations, d: "Streamlit; Claude answers only from retrieved articles" }
stack: [Python, rank-bm25, multilingual-e5-large, fastembed, Claude API, Streamlit, pytest]
---

## The business question

Business, risk and data teams ask about compliance in their own words ("we got hacked", "I want my data deleted"), and the law uses others ("security incident", "erasure"). An assistant that cannot find the right article gives answers that sound right but cannot be checked. **Short answer:** on unseen questions, the hybrid system ranks the correct article first 60% of the time, vs. 27% for keyword search.

## Step by step

### 1. Data and source

The 174 articles of Peru's Personal Data Protection Law 29733 and its Regulation (Supreme Decree 016-2024-JUS), extracted from the official PDFs on gob.pe with `src/ingest.py`.

### 2. Cleaning and quality

- The official gazette prints in two columns and extraction scrambles paragraphs. Each numbered paragraph ("18.1 …") is assigned to the article of its number, page headers and footers are removed and ligatures are fixed.
- What could not be recovered is reported instead of hidden: Article 33 of the Regulation has no recoverable text in the official PDF.
- A business glossary maps everyday terms to legal ones, just like the glossary of a data governance program.

### 3. Method

I compared five retrieval systems, from simplest to most complex: exact words (BM25), BM25 with Spanish stemming, BM25 with stemming and glossary, multilingual embeddings (`multilingual-e5-large`), and a hybrid that fuses the third and fourth with Reciprocal Rank Fusion. The AI-drafted answer is optional: Claude may only use the retrieved articles and must cite them.

### 4. Validation

I wrote 45 questions in business language and hand-labeled the correct article. 30 were used to tune the system and 15 were held out for the final test. I measure hit at first place, hit in the top 5, and MRR. An early glossary that included words from the test questions was discarded so it would not inflate the result.

### 5. Deployment

A Streamlit app with two tabs: ask, and how it was evaluated. Every answer shows the full article with its official source. The API key lives in an environment variable and never in the repository; without it, the app shows the articles only.

## Results

| System | Correct article first (test) | In top 5 (test) |
| --- | --- | --- |
| Exact keyword search | 27% | 47% |
| + Spanish stemming + business glossary | 47% | 73% |
| Multilingual embeddings (e5-large) | 40% | 87% |
| **Hybrid (glossary + embeddings)** | **60%** | **80%** |

- The glossary helps a lot on the questions it was built from (MRR 0.53 to 0.75) but less on new ones (0.46 to 0.56): that gap is the overfitting signal the held-out set exists to catch.
- Embeddings generalize better; fusing both rankings gets the best of each (test MRR 0.67 vs. 0.34).

## Limits

- With 15 test questions, each one is worth about 7 points. Small differences are not conclusive.
- I wrote the questions; a real compliance team would write different ones.
- The embedding model is about 2.2 GB, so the server needs at least 3 GB of RAM.
- Educational tool: not legal advice.

## How to reproduce it

```bash
pip install -r requirements.txt
streamlit run app/app.py    # the 174 articles and their embeddings ship in data/
python src/ingest.py        # optional: rebuilds the articles from the PDFs
python src/evaluate.py      # scores the five systems
pip install -r requirements-dev.txt && pytest
```

## What I would do in a company

Apply the same method to internal policies: a business glossary, a question set labeled by the compliance team, and a measurement before every change, to know whether the assistant improves or merely changes.
