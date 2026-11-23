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
---

## Why it matters

For a university, every student who leaves is lost revenue and a quality indicator the regulator watches. For an education lender, it is default risk. Knowing who leaves, and why, decides where to put scholarships, financing and tutoring.

## Data

Public microdata from INEI's National Household Survey (ENAHO), 2019 to 2025: about 2,400 university students a year, with enrollment status, the reason they stopped studying and household spending.

## Findings

| Question | Answer |
| --- | --- |
| How many drop out each year? | 4.1% in 2025. It was 16.7% in 2020 and 5.7% in 2019. |
| Why do they leave? | Financial problems (52%) or work (24%). Lack of interest is under 4%. |
| Where is it highest? | Private 4.9% vs. public 2.1%; men 5.0% vs. women 3.1%; poorest households 6.2% vs. richest 2.9%. |
| Is the private-university gap about income? | No. With the same income, sex, region, year of study and age, a private university multiplies the odds of dropping out by 2.5. First year is the most critical. |
| Can it be predicted? | Only partly: with survey data, the riskiest 20% holds 38% of cases (AUC 0.72 on 2025, a year the model never saw). |

## Data governance and quality

- I excluded January-March interviews: in summer, "not enrolled" almost always means vacation (312 of 337 "on vacation" answers in 2024 came from those months).
- INEI's 2025 file changed format (semicolons and decimal commas). The loader detects the format instead of assuming it, and a test checks it.
- Every rate uses the survey's expansion weights and is published with its interval, since there are only 80 to 140 cases a year.

## What I would do at a university

An early-warning system built on the institution's own data (grades, payments, attendance and platform usage), focused on first-year students and those with financial problems, and measured the same way: trained on some years and tested on one it never saw.
