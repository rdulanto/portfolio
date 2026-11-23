---
title: "Ley peruana de IA: qué debe hacer una empresa con el reglamento de la Ley 31814"
summary: "Si en tu empresa hay un modelo que aprueba o rechaza créditos, esta ley ya te alcanza. Te cuento qué pide el reglamento, qué plazos corren y cómo empezaría yo."
date: 2026-11-23
lang: es
slug: ley-31814-que-debe-hacer-una-empresa
ref: ley-31814
tags: [Regulación, IA responsable, Gobierno de datos]
category: guia
---

Cuando lideraba la ingeniería de datos en un banco de microfinanzas, teníamos diez modelos de machine learning en producción: riesgo, cobranzas, gestión comercial, clientes y tipo de cambio. Si hoy me tocara estar en ese puesto, la primera pregunta que me haría es cuáles de esos modelos caen en la categoría de riesgo alto del nuevo reglamento. Y la respuesta no sería "ninguno".

Por eso escribo esto. El 9 de setiembre de 2025 se publicó el [Decreto Supremo 115-2025-PCM](https://busquedas.elperuano.pe/dispositivo/NL/2436426-1), que reglamenta la Ley 31814 de inteligencia artificial. Entró en vigencia en enero de 2026, y para las empresas de finanzas, salud, educación, justicia y seguridad el plazo de adecuación de un año ya venció en setiembre de 2026.

Una aclaración antes de seguir: no soy abogado y esto no es asesoría legal. Es la lectura de alguien que ha tenido modelos en producción y que tendría que responder por ellos.

## Lo que más importa si estás en banca

El reglamento separa los sistemas de IA en tres grupos. Los de uso indebido están prohibidos (manipulación, vigilancia masiva sin base legal). Los de riesgo aceptable son casi todo lo demás, como un asistente para redactar documentos. Y en el medio están los de riesgo alto, que se pueden usar pero con condiciones.

Para quienes trabajamos en banca y microfinanzas, la línea clave es esta: **la evaluación crediticia de personas es riesgo alto**. La detección de fraude queda expresamente fuera. Es decir, si tienes un scoring que aprueba o rechaza créditos, ese modelo está en la categoría más exigente. También entran la selección de personal y la evaluación de estudiantes, algo que me toca de cerca como docente.

## Qué te piden por cada sistema de riesgo alto

Leí el reglamento junto con los resúmenes de [Quimera](https://groupquimera.com.pe/guias/ley-inteligencia-artificial-peru-empresas) y [AyP Digital](https://aypdigital.com/blog/ley-31814-inteligencia-artificial-peru-implicancias-empresas/). En corto, te piden cinco cosas:

- Avisarle a la persona, antes y en palabras simples, para qué se usa el sistema y qué tipo de decisiones toma (art. 25).
- Poder explicarle la decisión si afecta sus derechos.
- Llevar un registro actualizado de cómo funciona el sistema, con qué datos se alimenta y cuál es su lógica (art. 31).
- Tener personas capacitadas que puedan detenerlo, corregirlo o invalidar lo que decide.
- Cumplir la Ley 29733 de datos personales, que sigue siendo la vía para las sanciones.

La evaluación de impacto, según el artículo 32, es voluntaria para el sector privado. Aun así, yo la haría. Es la forma más simple de demostrar que hiciste la tarea. Si la haces, guarda la documentación por lo menos tres años.

## Los plazos

| Sector privado | Plazo | Vence |
| --- | --- | --- |
| Salud, educación, justicia, seguridad, economía y finanzas | 1 año | Setiembre de 2026 |
| Transporte, comercio y trabajo | 2 años | Setiembre de 2027 |
| Producción, agricultura, energía y minería | 3 años | Setiembre de 2028 |
| Demás usos | 4 años | Setiembre de 2029 |

Las pequeñas empresas tienen 2 años y las microempresas 3, contados desde el 10 de setiembre de 2025.

## Cómo empezaría yo

Primero haría el inventario. Una lista de cada modelo y cada herramienta de IA que se usa en la empresa, incluidos los chats que la gente usa por su cuenta. Casi siempre aparecen más de los que uno cree.

Después marcaría cuáles toman o apoyan decisiones sobre crédito, empleo o educación. Esos son los de riesgo alto.

Para cada uno armaría una ficha sencilla: para qué sirve, qué datos usa, cómo decide, cómo le va en sus métricas y quién lo supervisa. Cuando teníamos un pipeline dedicado por modelo, con validación automática de datos, buena parte de esa información ya existía. Solo había que ordenarla.

Y al final le pondría dueño a cada sistema: una persona que responda por él y que tenga autoridad para apagarlo.

Nada de esto es nuevo para un equipo que ya hace gobierno de datos. La diferencia es que ahora tiene fecha y una ley detrás.

## Lo que todavía no está claro

El reglamento no trae multas propias. La Secretaría de Gobierno y Transformación Digital de la PCM supervisa y deriva los casos a otras autoridades, como la de Protección de Datos Personales o Indecopi. Tampoco dice cómo se va a coordinar con lo que ya exige la SBS para los modelos de riesgo de crédito.

Mientras eso se define, mi consejo es el mismo que daría cualquier auditor: ten claro qué modelos tienes, qué hacen y quién responde por ellos. Si quieres conversar sobre cómo aplicarlo en tu caso, [agenda una llamada](https://calendar.app.google/LpuvurdHaRBMeS2X9).
