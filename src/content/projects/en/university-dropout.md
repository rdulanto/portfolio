---
title: University dropout in Peru
question: Who drops out of university in Peru, and why?
summary: About 4% of university students drop out each year, three in four over money. Private universities have more than twice the rate of public ones, and household income does not explain the gap.
tags: [Education, Logistic regression, Surveys]
date: 2026-11-16
kpi: "4.1%"
kpiText: "of university students drop out each year; 3 in 4 over money"
lang: en
slug: university-dropout
ref: desercion
image: /img/desercion-dashboard.png
thumb: /img/desercion-thumb.webp
demo: https://desercion-universitaria-peru-production.up.railway.app/
repo: https://github.com/rdulanto/desercion-universitaria-peru
pipeline:
  - { k: Data, t: INEI household survey, d: "ENAHO microdata 2019-2025, about 2,400 students a year" }
  - { k: Quality, t: Universe and formats, d: "Summer excluded, loader detects each year's format" }
  - { k: Model, t: Logistic regression, d: "Survey weights and cluster-robust errors" }
  - { k: Product, t: Bilingual dashboard, d: "Streamlit + Plotly, deployed on Railway" }
stack: [Python, pandas, statsmodels, scikit-learn, Streamlit, Plotly, pytest, Railway]
---

## The business question

For a university, every student who leaves is lost revenue and a quality indicator the regulator watches. For an education lender, it is default risk. Knowing who leaves, and why, decides where to put scholarships, financing and tutoring. **Short answer:** 4.1% drop out each year, three in four over money, and the rate at private universities is more than double.

## Step by step

### 1. Data and source

Public microdata from INEI's National Household Survey (ENAHO), 2019 to 2025: the Education module and the household spending summary. `src/download.py` downloads about 1.6 GB and builds a single table. The survey is already anonymized: there is no identifiable personal data.

### 2. Cleaning and quality

- **Universe:** people aged 17 to 35 who were enrolled at a university the previous year and have not finished their degree.
- **No summer:** I excluded January to March interviews, because "not enrolled" then usually means vacation (312 of 337 "on vacation" answers in 2024 came from those months).
- **Changing formats:** the 2025 file uses semicolons and decimal commas; earlier years use commas and points. The loader detects the format instead of assuming it, and a test checks it.
- **2020 set apart:** it was mostly a phone survey with 963 cases. It is shown but kept out of the model.

### 3. Method

- Rates with ENAHO expansion weights and 90% intervals from a cluster bootstrap, because the survey samples dwellings by cluster.
- Gaps by university type, sex, spending quintile and region, pooling 2022-2025 to have enough cases.
- Logistic regression on quintile, sex, region, area, year of study and age, with cluster-robust errors. Results read as odds ratios.

### 4. Validation

I trained on 2022-2024 and tested on 2025, a year the model never saw: 2,490 students and 81 dropout cases. I report AUC and the share of cases caught by the riskiest 20%, which is what matters when deciding whom to call first.

### 5. Deployment

A bilingual Streamlit and Plotly dashboard, deployed on Railway. It reads precomputed result tables, so it does not download the survey on load.

## Results

| Question | Answer |
| --- | --- |
| How many drop out each year? | 4.1% in 2025 (90% interval: 3.1% to 5.1%). It was 16.7% in 2020 and 5.7% in 2019. |
| Why do they leave? | Financial problems (52%) or work (24%). Lack of interest is under 4%. |
| Where is it highest? | Private 4.9% vs. public 2.1%; men 5.0% vs. women 3.1%; poorest households 6.2% vs. richest 2.9%. |
| Is the private-university gap about income? | No. Holding income, sex, region, year of study and age constant, a private university multiplies the odds of dropping out by 2.5 (95% CI 1.9 to 3.3). First year is the most critical. |
| Can it be predicted? | Only partly: AUC 0.72 in 2025, and the riskiest 20% holds 38% of cases. |

## Limits

- The reason is what the household reports, not an academic record.
- Household spending is measured in the same year the student leaves: these are associations, not causal effects.
- There are 80 to 140 cases a year, so fine-grained comparisons have wide intervals.
- A household survey is not enough for early warning: it lacks what the university sees (grades, payments, attendance).

## How to reproduce it

```bash
pip install -r requirements.txt
streamlit run app/app.py    # uses the tables in data/resultados/
python src/download.py      # optional: downloads ENAHO and rebuilds the table
python src/analysis.py      # recomputes the results
pip install -r requirements-dev.txt && pytest
```

## What I would do at a university

An early-warning system built on the institution's own data (grades, payments, attendance and platform use), focused on first-year students and those with financial problems, and measured the same way: trained on some years and tested on one it never saw.
