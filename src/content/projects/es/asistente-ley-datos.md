---
title: Asistente sobre la ley peruana de datos personales
question: ¿Puede un buscador con IA responder preguntas de cumplimiento citando el artículo exacto de la ley?
summary: Sí, en la mayoría de casos. Con preguntas que no vio, el sistema híbrido pone el artículo correcto en primer lugar el 60% de las veces, frente a 27% de una búsqueda por palabras.
tags: [IA generativa, Búsqueda semántica, Gobierno de datos]
date: 2026-11-16
kpi: "60% vs 27%"
kpiText: "artículo correcto en primer lugar, frente a búsqueda por palabras"
lang: es
slug: asistente-ley-datos-personales
ref: rag-ley-datos
image: /img/rag-ley-datos-dashboard.png
thumb: /img/rag-ley-datos-thumb.webp
repo: https://github.com/rdulanto/asistente-ley-datos-personales
pipeline:
  - { k: Datos, t: PDF oficiales de gob.pe, d: "Ley 29733 y su Reglamento: 174 artículos" }
  - { k: Calidad, t: Extracción y glosario, d: "Párrafos reasignados, glosario de negocio a términos legales" }
  - { k: Modelo, t: Búsqueda híbrida, d: "BM25 con raíces + embeddings e5-large, fusión RRF" }
  - { k: Producto, t: Asistente con citas, d: "Streamlit; respuesta con Claude solo sobre los artículos" }
stack: [Python, rank-bm25, multilingual-e5-large, fastembed, Claude API, Streamlit, pytest]
---

## La pregunta de negocio

Las áreas comerciales, de riesgos y de datos preguntan sobre cumplimiento con sus propias palabras ("nos hackearon", "quiero borrar mis datos"), y la norma usa otras ("incidente de seguridad", "supresión"). Un asistente que no encuentra el artículo correcto da respuestas que suenan bien pero no se pueden verificar. **Respuesta corta:** con preguntas nuevas, el sistema híbrido pone el artículo correcto en primer lugar el 60% de las veces, frente a 27% de una búsqueda por palabras.

## Paso a paso

### 1. Datos y fuente

Los 174 artículos de la Ley N.º 29733 de Protección de Datos Personales y de su Reglamento (DS 016-2024-JUS), extraídos de los PDF oficiales publicados en gob.pe con `src/ingest.py`.

### 2. Limpieza y calidad

- El Diario Oficial publica a dos columnas y la extracción desordena párrafos. Cada párrafo numerado ("18.1 …") se asigna al artículo de su número, se quitan cabeceras y pies de página y se corrigen ligaduras.
- Lo que no se pudo recuperar se reporta en lugar de ocultarse: el artículo 33 del Reglamento no tiene texto recuperable en el PDF oficial.
- Un glosario de negocio enlaza términos cotidianos con términos de la norma, igual que el glosario de un programa de gobierno de datos.

### 3. Método

Comparé cinco sistemas de búsqueda, de menos a más complejo: palabras exactas (BM25), BM25 con raíces en español, BM25 con raíces y glosario, embeddings multilingües (`multilingual-e5-large`) y un híbrido que combina el tercero y el cuarto con Reciprocal Rank Fusion. La respuesta redactada con IA es opcional: Claude solo puede usar los artículos recuperados y debe citarlos.

### 4. Validación

Escribí 45 preguntas en lenguaje de negocio y marqué a mano el artículo correcto. 30 sirvieron para ajustar el sistema y 15 se guardaron solo para la prueba final. Mido acierto en primer lugar, entre los 5 primeros y MRR. Un primer glosario que incluía términos de las preguntas de prueba se descartó para no inflar el resultado.

### 5. Despliegue

App en Streamlit con dos pestañas: preguntar y cómo se evaluó. Cada respuesta muestra el artículo completo con su fuente oficial. La clave de la API va en una variable de entorno y nunca en el repositorio; sin ella, la app muestra solo los artículos.

## Resultados

| Sistema | Artículo correcto en 1.er lugar (prueba) | Entre los 5 primeros (prueba) |
| --- | --- | --- |
| Búsqueda por palabras exactas | 27% | 47% |
| + raíces en español + glosario de negocio | 47% | 73% |
| Embeddings multilingües (e5-large) | 40% | 87% |
| **Híbrido (glosario + embeddings)** | **60%** | **80%** |

- El glosario ayuda mucho con las preguntas con las que se construyó (MRR 0.53 a 0.75), pero menos con preguntas nuevas (0.46 a 0.56): esa brecha es la señal de sobreajuste que el conjunto de prueba existe para detectar.
- Los embeddings generalizan mejor; combinar ambos rankings da lo mejor de los dos (MRR de prueba 0.67 frente a 0.34).

## Límites

- Con 15 preguntas de prueba, cada una vale unos 7 puntos. Las diferencias pequeñas no son concluyentes.
- Las preguntas las escribí yo; un área de cumplimiento real escribiría otras.
- El modelo de embeddings pesa unos 2.2 GB, así que el servidor necesita al menos 3 GB de RAM.
- Herramienta educativa: no es asesoría legal.

## Cómo reproducirlo

```bash
pip install -r requirements.txt
streamlit run app/app.py    # los 174 artículos y sus embeddings ya vienen en data/
python src/ingest.py        # opcional: regenera los artículos desde los PDF
python src/evaluate.py      # mide los cinco sistemas
pip install -r requirements-dev.txt && pytest
```

## Qué haría en una empresa

Aplicaría el mismo método a las políticas internas: glosario de negocio, conjunto de preguntas etiquetadas por el área de cumplimiento y una medición antes de cada cambio, para saber si el asistente mejora o solo cambia.
