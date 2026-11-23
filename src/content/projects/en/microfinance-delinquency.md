---
title: Microfinance delinquency in Peru
question: Has microfinance delinquency returned to pre-pandemic levels?
summary: Yes, and lower. The largest microfinance lender is at 3.82%, 1.6 points below 2019, and its gap with the banking system has halved. Compartamos is the exception.
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
pipeline:
  - { k: Data, t: Central bank API, d: "Monthly delinquency by bank plus macro, 2018-2026" }
  - { k: Quality, t: Automated checks, d: "Methodology break and jumps above 1 point" }
  - { k: Model, t: Gaps and backtest, d: "Unemployment lags, ARIMA vs. naive" }
  - { k: Product, t: Bilingual dashboard, d: "Streamlit + Plotly, deployed on Railway" }
stack: [Python, pandas, statsmodels, Streamlit, Plotly, pytest, Railway]
---

## The business question

Delinquency drives how much a bank provisions, what rate it lends at and to whom. For a microfinance lender, knowing whether risk has normalized after the pandemic decides whether it can grow again. **Short answer:** yes, and below 2019; the gap with banks fell from 2.3 to 1.0 points.

## Step by step

### 1. Data and source

Past-due loans over total loans (%) by bank, monthly, January 2018 to September 2026, plus Lima unemployment, GDP and the policy rate. Everything comes from the Central Reserve Bank of Peru's public API, with no keys. `src/download.py` downloads and stores each series with its source code.

### 2. Cleaning and quality

- **Methodology break:** before 2018 the central bank series is net of provisions, so it is not comparable. The analysis starts in 2018 and the cut is documented.
- **Suspicious jumps:** `src/quality.py` flags any change above 1 point in a month. BCP in September 2026 (2.67% to 4.04%) is flagged for validation before use.
- A test checks that the control catches those jumps.

### 3. Method

- Gap with banks: the monthly difference between the largest microfinance lender and the banking system.
- Leading indicator: correlation of delinquency with unemployment shifted 0 to 12 months, with and without the pandemic months.
- 6-month forecast: naive (repeat the last value), damped exponential smoothing and ARIMA(1,1,0).

### 4. Validation

Rolling-origin backtest: from January 2023, each month the models train on the past and forecast the next 6 months. That gives 39 successive forecasts, scored by mean absolute error in percentage points. No model is scored on data it has seen.

### 5. Deployment

A bilingual Streamlit and Plotly dashboard, deployed on Railway. It reads the processed series, so it needs no keys or database.

## Results

| Question | Answer |
| --- | --- |
| Back to pre-pandemic levels? | Yes. The largest microfinance lender is at 3.82%, vs. 5.40% in 2019, after a 9.16% peak in March 2021. |
| Has the gap with banks closed? | Yes. It fell from 2.3 points in 2019 to 1.0 in 2026. |
| Any warning signs? | Compartamos rose from 4.30% to 5.24% between February and September 2026. |
| Does unemployment lead delinquency? | 0.76 correlation at 6 months, but only 0.31 excluding the pandemic. |
| Can we forecast 6 months ahead? | Barely better than repeating the last value: 0.50 vs. 0.52 points of error. |

## Limits

- Data is aggregated by bank: no detail by product, region or customer.
- Municipal and rural savings banks are not included; they report through another channel.
- The unemployment correlation is not causation, and most of it comes from the pandemic shock.
- Outside the pandemic there are about 50 months: little history for more complex models.

## How to reproduce it

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python src/download.py      # downloads the central bank series
streamlit run app/app.py    # opens the dashboard
pytest                      # quality checks
```

## What I would do in a company

Turn this analysis into a monthly early-warning dashboard: delinquency by product and region from internal data, unemployment as a leading indicator, and the same quality checks before every release.
