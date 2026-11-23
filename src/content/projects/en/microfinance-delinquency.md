---
title: Microfinance delinquency in Peru
question: Has microfinance delinquency returned to pre-pandemic levels?
summary: Yes, and lower. Mibanco is at 3.82%, 1.6 points below 2019, and its gap with the banking system has halved. Compartamos is the exception.
tags: [Microfinance, Time series, Data quality]
date: 2026-11-12
kpi: "2.3 → 1.0"
kpiText: "points of delinquency gap with banks, 2019 to 2026"
lang: en
slug: microfinance-delinquency
ref: morosidad
image: /img/morosidad-dashboard.png
thumb: /img/morosidad-thumb.webp
demo: https://morosidad-microfinanzas-peru-production.up.railway.app/
repo: https://github.com/rdulanto/morosidad-microfinanzas-peru
---

## Why it matters

Delinquency drives how much a bank provisions, what rate it lends at and to whom. For a microfinance lender, knowing whether risk has normalized after the pandemic decides whether it can grow again.

## Data

Past-due loans over total loans (%) by bank, monthly, January 2018 to September 2026, plus Lima unemployment, GDP and the policy rate. Source: Central Reserve Bank of Peru public API.

## Findings

| Question | Answer |
| --- | --- |
| Back to pre-pandemic levels? | Yes. Mibanco is at 3.82%, vs. 5.40% in 2019, after a 9.16% peak in March 2021. |
| Has the gap with banks closed? | Yes. It fell from 2.3 points in 2019 to 1.0 in 2026. |
| Any warning signs? | Compartamos rose from 4.30% to 5.24% between February and September 2026. |
| Does unemployment lead delinquency? | 0.76 correlation at a 6-month lead, but only 0.31 excluding the pandemic. |
| Can we forecast 6 months ahead? | Barely better than repeating the last value (0.50 vs. 0.52 points error). |

## Data governance and quality

- I detected a methodology break: before 2018 the BCRP series is net of provisions, so the analysis starts in 2018.
- An automated check flags single-month jumps above 1 point. BCP's September 2026 jump (2.67% to 4.04%) should be validated before use.

## What I would do in a company

Turn this into a monthly early-warning dashboard: delinquency by product and region, unemployment as a leading indicator, and quality checks before every release.
