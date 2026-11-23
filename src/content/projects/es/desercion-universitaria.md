---
title: Deserción universitaria en el Perú
question: ¿Quién deja la universidad en el Perú y por qué?
summary: Cada año interrumpe el 4% de los universitarios, tres de cada cuatro por dinero. En las privadas la tasa es más del doble que en las públicas, y la diferencia no se explica por el ingreso del hogar.
tags: [Educación, Regresión logística, Encuestas]
date: 2026-11-16
kpi: "4.1%"
kpiText: "de universitarios abandona cada año; 3 de cada 4 por dinero"
lang: es
slug: desercion-universitaria
ref: desercion
image: /img/desercion-dashboard.png
thumb: /img/desercion-thumb.webp
demo: https://desercion-universitaria-peru-production.up.railway.app/
repo: https://github.com/rdulanto/desercion-universitaria-peru
pipeline:
  - { k: Datos, t: ENAHO del INEI, d: "Microdatos 2019-2025, unos 2 400 universitarios por año" }
  - { k: Calidad, t: Universo y formatos, d: "Sin verano, lectura que detecta el formato de cada año" }
  - { k: Modelo, t: Regresión logística, d: "Pesos de encuesta y errores por conglomerado" }
  - { k: Producto, t: Dashboard bilingüe, d: "Streamlit + Plotly, desplegado en Railway" }
stack: [Python, pandas, statsmodels, scikit-learn, Streamlit, Plotly, pytest, Railway]
---

## La pregunta de negocio

Para una universidad, cada estudiante que se va es ingreso perdido y un indicador de calidad que mira el regulador. Para quien financia crédito educativo, es riesgo de impago. Saber quién se va, y por qué, define dónde poner becas, financiamiento y tutoría. **Respuesta corta:** el 4.1% interrumpe cada año, tres de cada cuatro por dinero, y en las privadas la tasa es más del doble.

## Paso a paso

### 1. Datos y fuente

Microdatos públicos de la Encuesta Nacional de Hogares (ENAHO) del INEI, 2019 a 2025: el módulo de Educación y la Sumaria con el gasto del hogar. `src/download.py` descarga unos 1.6 GB y arma una base única. La encuesta ya viene anonimizada: no hay datos personales identificables.

### 2. Limpieza y calidad

- **Universo:** personas de 17 a 35 años que el año anterior estuvieron matriculadas en una universidad y aún no terminan la carrera.
- **Sin verano:** excluí las entrevistas de enero a marzo, porque "no estoy matriculado" casi siempre significa vacaciones (312 de 337 respuestas "de vacaciones" en 2024 fueron de esos meses).
- **Formatos que cambian:** el archivo 2025 usa punto y coma y coma decimal; los anteriores, coma y punto. La carga detecta el formato en lugar de suponerlo, y un test lo comprueba.
- **2020 aparte:** fue una encuesta mayormente telefónica con 963 casos. Se muestra, pero no entra al modelo.

### 3. Método

- Tasas con el factor de expansión de la ENAHO e intervalos de 90% por bootstrap de conglomerados, porque la encuesta muestrea viviendas por conglomerado.
- Brechas por tipo de universidad, sexo, quintil de gasto y región, agrupando 2022-2025 para tener casos suficientes.
- Regresión logística con quintil, sexo, región, área, año de estudios y edad, con errores agrupados por conglomerado. El resultado se lee como razones de probabilidad (odds ratios).

### 4. Validación

Entrené con 2022-2024 y medí en 2025, un año que el modelo no vio: 2 490 universitarios y 81 casos de interrupción. Reporto el AUC y cuánto de los casos concentra el 20% de mayor riesgo, que es lo que importa para decidir a quién llamar primero.

### 5. Despliegue

Dashboard bilingüe en Streamlit y Plotly, desplegado en Railway. Lee las tablas de resultados ya calculadas, así que no descarga la encuesta al abrirse.

## Resultados

| Pregunta | Respuesta |
| --- | --- |
| ¿Cuántos interrumpen cada año? | 4.1% en 2025 (intervalo de 90%: 3.1% a 5.1%). Fue 16.7% en 2020 y 5.7% en 2019. |
| ¿Por qué lo dejan? | Problemas económicos (52%) o porque trabajan (24%). La falta de interés es menos de 4%. |
| ¿Dónde es más alta? | Privadas 4.9% vs. públicas 2.1%; hombres 5.0% vs. mujeres 3.1%; hogares más pobres 6.2% vs. más ricos 2.9%. |
| ¿La brecha de las privadas es por ingreso? | No. Con el mismo ingreso, sexo, región, año de estudios y edad, una privada multiplica por 2.5 las probabilidades de interrumpir (IC 95%: 1.9 a 3.3). El primer año es el más crítico. |
| ¿Se puede anticipar? | Solo en parte: AUC de 0.72 en 2025, y el 20% de mayor riesgo concentra el 38% de los casos. |

## Límites

- La razón es la que declara el hogar, no un registro académico.
- El gasto del hogar se mide el mismo año en que el estudiante deja la universidad: son asociaciones, no efectos causales.
- Hay entre 80 y 140 casos por año, así que las comparaciones finas tienen intervalos amplios.
- Una encuesta de hogares no basta para una alerta temprana: falta lo que ve la universidad (notas, pagos, asistencia).

## Cómo reproducirlo

```bash
pip install -r requirements.txt
streamlit run app/app.py    # usa las tablas de data/resultados/
python src/download.py      # opcional: descarga la ENAHO y rearma la base
python src/analysis.py      # recalcula los resultados
pip install -r requirements-dev.txt && pytest
```

## Qué haría en una universidad

Un sistema de alerta temprana con los datos propios de la institución (notas, pagos, asistencia y uso de plataformas), enfocado en primer año y en estudiantes con problemas económicos, y medido igual que aquí: entrenado con unos años y probado en uno que no vio.
