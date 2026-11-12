---
title: Morosidad de las microfinanzas en el Perú
question: ¿La morosidad de las microfinanzas ya volvió a su nivel prepandemia?
summary: Sí, y por debajo. Mibanco está en 3.82%, 1.6 puntos menos que en 2019, y la brecha con la banca se redujo a la mitad. Compartamos es la excepción.
tags: [Microfinanzas, Series de tiempo, Calidad de datos]
date: 2026-11-12
lang: es
slug: morosidad-microfinanzas
image: /img/morosidad-dashboard.png
thumb: /img/morosidad-thumb.webp
repo: https://github.com/rdulanto/morosidad-microfinanzas-peru
---

## Por qué importa

La morosidad decide cuánto provisiona un banco, a qué tasa presta y a quién. Para una microfinanciera, saber si el riesgo ya se normalizó tras la pandemia define si puede volver a crecer.

## Datos

Cartera atrasada sobre colocaciones (%) por banco, mensual, de enero de 2018 a septiembre de 2026, más desempleo en Lima, PBI y tasa de referencia. Fuente: API pública del Banco Central de Reserva del Perú.

## Hallazgos

| Pregunta | Respuesta |
| --- | --- |
| ¿Volvió al nivel prepandemia? | Sí. Mibanco está en 3.82%, frente a 5.40% en 2019, tras un pico de 9.16% en marzo de 2021. |
| ¿Se cerró la brecha con la banca? | Sí. Bajó de 2.3 puntos en 2019 a 1.0 en 2026. |
| ¿Hay señales de alerta? | Compartamos sube de 4.30% a 5.24% entre febrero y septiembre de 2026. |
| ¿El desempleo anticipa la morosidad? | Correlación de 0.76 a 6 meses, pero de solo 0.31 sin la pandemia. |
| ¿Se puede pronosticar a 6 meses? | Apenas mejor que repetir el último dato (error de 0.50 frente a 0.52 puntos). |

## Gobierno y calidad de datos

- Detecté un cambio de metodología: antes de 2018 la serie del BCRP es neta de provisiones, así que el análisis empieza en 2018.
- Un control automático marca saltos de más de 1 punto en un mes. El de BCP en septiembre de 2026 (2.67% a 4.04%) debe validarse antes de usarse.

## Qué haría en una empresa

Convertiría este análisis en un tablero de alerta temprana mensual: morosidad por producto y región, desempleo como indicador adelantado y controles de calidad antes de cada publicación.
