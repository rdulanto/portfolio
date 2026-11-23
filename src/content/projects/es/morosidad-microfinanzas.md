---
title: Morosidad de las microfinanzas en el Perú
question: ¿La morosidad de las microfinanzas ya volvió a su nivel prepandemia?
summary: Sí, y por debajo. La microfinanciera más grande está en 3.82%, 1.6 puntos menos que en 2019, y la brecha con la banca se redujo a la mitad. Compartamos es la excepción.
tags: [Microfinanzas, Series de tiempo, Calidad de datos]
date: 2026-11-12
kpi: "2.3 → 1.0"
kpiText: "puntos de brecha de morosidad con la banca, de 2019 a 2026"
lang: es
slug: morosidad-microfinanzas
ref: morosidad
image: /img/morosidad-dashboard.png
thumb: /img/morosidad-thumb.webp
demo: https://morosidad-microfinanzas-peru-production.up.railway.app/
repo: https://github.com/rdulanto/morosidad-microfinanzas-peru
pipeline:
  - { k: Datos, t: API del BCRP, d: "Morosidad mensual por banco y macro, 2018-2026" }
  - { k: Calidad, t: Controles automáticos, d: "Corte de metodología y saltos de más de 1 punto" }
  - { k: Modelo, t: Brechas y backtest, d: "Rezagos con desempleo, ARIMA vs. ingenuo" }
  - { k: Producto, t: Dashboard bilingüe, d: "Streamlit + Plotly, desplegado en Railway" }
stack: [Python, pandas, statsmodels, Streamlit, Plotly, pytest, Railway]
---

## La pregunta de negocio

La morosidad decide cuánto provisiona un banco, a qué tasa presta y a quién. Para una microfinanciera, saber si el riesgo ya se normalizó tras la pandemia define si puede volver a crecer. **Respuesta corta:** sí, y por debajo de 2019; la brecha con la banca bajó de 2.3 a 1.0 puntos.

## Paso a paso

### 1. Datos y fuente

Cartera atrasada sobre colocaciones (%) por banco, mensual, de enero de 2018 a septiembre de 2026, más desempleo en Lima, PBI y tasa de referencia. Todo sale de la API pública del Banco Central de Reserva del Perú, sin claves. `src/download.py` descarga y guarda las series con su código de origen.

### 2. Limpieza y calidad

- **Cambio de metodología:** antes de 2018 la serie del BCRP es neta de provisiones, así que no es comparable. El análisis empieza en 2018 y el corte queda documentado.
- **Saltos sospechosos:** `src/quality.py` marca cualquier variación de más de 1 punto en un mes. El de BCP en septiembre de 2026 (2.67% a 4.04%) queda señalado para validarse antes de usarse.
- Un test comprueba que el control detecta esos saltos.

### 3. Método

- Brecha con la banca: diferencia mensual entre la microfinanciera más grande y la banca total.
- Indicador adelantado: correlación de la morosidad con el desempleo desplazado de 0 a 12 meses, con y sin los meses de pandemia.
- Pronóstico a 6 meses: método ingenuo (repetir el último dato), suavizado exponencial amortiguado y ARIMA(1,1,0).

### 4. Validación

Backtest con origen móvil: desde enero de 2023, cada mes se entrena con lo anterior y se pronostican los 6 meses siguientes. Son 39 pronósticos sucesivos, medidos con el error absoluto medio en puntos porcentuales. Ningún modelo se evalúa con datos que ya vio.

### 5. Despliegue

Dashboard bilingüe en Streamlit y Plotly, desplegado en Railway. Lee las series ya procesadas, así que no necesita claves ni base de datos.

## Resultados

| Pregunta | Respuesta |
| --- | --- |
| ¿Volvió al nivel prepandemia? | Sí. La microfinanciera más grande está en 3.82%, frente a 5.40% en 2019, tras un pico de 9.16% en marzo de 2021. |
| ¿Se cerró la brecha con la banca? | Sí. Bajó de 2.3 puntos en 2019 a 1.0 en 2026. |
| ¿Hay señales de alerta? | Compartamos sube de 4.30% a 5.24% entre febrero y septiembre de 2026. |
| ¿El desempleo anticipa la morosidad? | Correlación de 0.76 a 6 meses, pero de solo 0.31 sin la pandemia. |
| ¿Se puede pronosticar a 6 meses? | Apenas mejor que repetir el último dato: error de 0.50 frente a 0.52 puntos. |

## Límites

- Los datos son agregados por banco: no hay detalle por producto, región ni cliente.
- No incluye cajas municipales ni rurales, que reportan por otra vía.
- La correlación con el desempleo no es causalidad, y casi toda viene del choque de la pandemia.
- Fuera de la pandemia hay unos 50 meses: poca historia para modelos más complejos.

## Cómo reproducirlo

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python src/download.py      # descarga las series del BCRP
streamlit run app/app.py    # abre el dashboard
pytest                      # controles de calidad
```

## Qué haría en una empresa

Convertiría este análisis en un tablero de alerta temprana mensual: morosidad por producto y región con datos propios, desempleo como indicador adelantado y los mismos controles de calidad antes de cada publicación.
