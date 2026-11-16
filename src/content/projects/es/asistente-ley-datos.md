---
title: Asistente sobre la ley peruana de datos personales
question: ¿Puede un buscador con IA responder preguntas de cumplimiento citando el artículo exacto de la ley?
summary: Sí, en la mayoría de casos. Con preguntas que no vio, el sistema híbrido pone el artículo correcto en primer lugar el 60% de las veces, frente a 27% de una búsqueda por palabras.
tags: [IA generativa, Búsqueda semántica, Gobierno de datos]
date: 2026-11-16
lang: es
slug: asistente-ley-datos-personales
ref: rag-ley-datos
image: /img/rag-ley-datos-dashboard.png
thumb: /img/rag-ley-datos-thumb.webp
repo: https://github.com/rdulanto/asistente-ley-datos-personales
---

## Por qué importa

Las áreas comerciales, de riesgos y de datos preguntan sobre cumplimiento con sus propias palabras ("nos hackearon", "quiero borrar mis datos"), y la norma usa otras ("incidente de seguridad", "supresión"). Un asistente que no encuentra el artículo correcto da respuestas que suenan bien pero no se pueden verificar.

## Datos

Los 174 artículos de la Ley N.º 29733 de Protección de Datos Personales y de su Reglamento (DS 016-2024-JUS), extraídos de los PDF oficiales publicados en gob.pe. Para medir, escribí 45 preguntas en lenguaje de negocio y marqué a mano el artículo correcto: 30 para ajustar el sistema y 15 guardadas solo para la prueba final.

## Hallazgos

| Sistema | Artículo correcto en 1.er lugar (prueba) | Entre los 5 primeros (prueba) |
| --- | --- | --- |
| Búsqueda por palabras exactas | 27% | 47% |
| + raíces en español + glosario de negocio | 47% | 73% |
| Embeddings multilingües (e5-large) | 40% | 87% |
| **Híbrido (glosario + embeddings)** | **60%** | **80%** |

- El glosario de negocio ayuda mucho con las preguntas con las que se construyó, pero menos con preguntas nuevas: esa brecha es la señal de sobreajuste que el conjunto de prueba existe para detectar.
- Los embeddings generalizan mejor; combinar ambos rankings da lo mejor de los dos.
- Con 15 preguntas de prueba, cada una vale unos 7 puntos. Las diferencias pequeñas no son concluyentes.

## Gobierno y calidad de datos

- El Diario Oficial publica a dos columnas y la extracción desordena párrafos. Cada párrafo numerado ("18.1 …") se asigna al artículo de su número, se quitan cabeceras de página, y lo que no se pudo recuperar se reporta en lugar de ocultarse.
- Cada respuesta muestra el artículo completo con su fuente oficial. La respuesta redactada con IA solo puede usar esos artículos y debe citarlos.
- Herramienta educativa: no es asesoría legal.

## Qué haría en una empresa

Aplicaría el mismo método a las políticas internas: glosario de negocio, conjunto de preguntas etiquetadas por el área de cumplimiento y una medición antes de cada cambio, para saber si el asistente mejora o solo cambia.
