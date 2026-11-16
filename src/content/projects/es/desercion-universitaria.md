---
title: Deserción universitaria en el Perú
question: ¿Quién deja la universidad en el Perú y por qué?
summary: Cada año interrumpe el 4% de los universitarios, tres de cada cuatro por dinero. En las privadas la tasa es más del doble que en las públicas, y la diferencia no se explica por el ingreso del hogar.
tags: [Educación, Regresión logística, Encuestas]
date: 2026-11-16
lang: es
slug: desercion-universitaria
ref: desercion
image: /img/desercion-dashboard.png
thumb: /img/desercion-thumb.webp
repo: https://github.com/rdulanto/desercion-universitaria-peru
---

## Por qué importa

Para una universidad, cada estudiante que se va es ingreso perdido y un indicador de calidad que mira el regulador. Para quien financia crédito educativo, es riesgo de impago. Saber quién se va, y por qué, define dónde poner becas, financiamiento y tutoría.

## Datos

Microdatos públicos de la Encuesta Nacional de Hogares (ENAHO) del INEI, 2019 a 2025: cerca de 2 400 universitarios por año, con su situación de matrícula, la razón por la que dejaron de estudiar y el gasto de su hogar.

## Hallazgos

| Pregunta | Respuesta |
| --- | --- |
| ¿Cuántos interrumpen cada año? | 4.1% en 2025. Fue 16.7% en 2020 y 5.7% en 2019. |
| ¿Por qué lo dejan? | Problemas económicos (52%) o porque trabajan (24%). La falta de interés es menos de 4%. |
| ¿Dónde es más alta? | Privadas 4.9% vs. públicas 2.1%; hombres 5.0% vs. mujeres 3.1%; hogares más pobres 6.2% vs. más ricos 2.9%. |
| ¿La brecha de las privadas es por ingreso? | No. Con el mismo ingreso, sexo, región, año de estudios y edad, una privada multiplica por 2.5 las probabilidades de interrumpir. El primer año es el más crítico. |
| ¿Se puede anticipar? | Solo en parte: con datos de encuesta, el 20% de mayor riesgo concentra el 38% de los casos (AUC 0.72 en 2025, un año que el modelo no vio). |

## Gobierno y calidad de datos

- Excluí las entrevistas de enero a marzo: en verano, "no estoy matriculado" casi siempre significa vacaciones (312 de 337 respuestas "de vacaciones" en 2024 fueron de esos meses).
- El archivo 2025 del INEI cambió de formato (punto y coma y coma decimal). La carga detecta el formato en lugar de suponerlo, y un test lo comprueba.
- Cada tasa usa los factores de expansión de la encuesta y se publica con su intervalo, porque hay entre 80 y 140 casos por año.

## Qué haría en una universidad

Un sistema de alerta temprana con los datos propios de la institución (notas, pagos, asistencia y uso de plataformas), enfocado en primer año y en estudiantes con problemas económicos, y medido igual que aquí: entrenado con unos años y probado en uno que no vio.
