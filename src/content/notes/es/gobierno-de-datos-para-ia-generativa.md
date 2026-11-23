---
title: "Gobierno de datos para IA generativa: qué cambia respecto al gobierno clásico"
summary: "El gobierno de datos clásico cuida tablas y reportes. La IA generativa lee documentos, responde en lenguaje natural y se equivoca con seguridad. Cinco cambios concretos."
date: 2026-11-23
lang: es
slug: gobierno-de-datos-para-ia-generativa
ref: gobierno-ia-generativa
tags: [Gobierno de datos, IA generativa, LLM]
category: investigacion
---

El gobierno de datos que conocemos nació para que los reportes cuadren: un dueño por cada dato, reglas de calidad sobre columnas, un glosario y controles de acceso por tabla. Todo eso sigue siendo necesario. Pero un asistente con IA generativa no consulta una tabla: lee contratos, manuales y correos, y responde con frases que suenan correctas aunque no lo sean.

Ese cambio de material y de salida obliga a extender el gobierno en cinco frentes.

## 1. El activo ya no es la tabla, es el documento

En un proyecto de RAG (búsqueda sobre documentos más un modelo de lenguaje), la calidad depende de la versión vigente del manual, no de una columna. Las preguntas de gobierno pasan a ser otras:

- ¿Cuál es la versión oficial de este documento y quién la aprueba?
- ¿Cuándo vence y quién lo retira del índice?
- ¿Qué documentos nunca deben entrar al índice?

En mi [asistente sobre la Ley 29733](/proyectos/asistente-ley-datos-personales/) el mayor salto de calidad no vino del modelo, sino de partir bien los artículos y mantener el texto oficial al día.

## 2. La calidad se mide en respuestas, no en filas

Una regla clásica dice "el campo fecha no puede estar vacío". En IA generativa la pregunta es si la respuesta es correcta, está respaldada por una fuente y no inventa. Eso se mide con un conjunto de preguntas de prueba con su respuesta esperada, que se corre antes de cada cambio de modelo, de índice o de instrucciones.

Ese conjunto de evaluación es un activo de datos más: necesita dueño, versión y revisión periódica.

## 3. El acceso se controla al momento de responder

Si el asistente indexa documentos de Recursos Humanos y de Riesgos, un usuario podría recibir en la respuesta un fragmento que nunca podría abrir directamente. El control de acceso tiene que aplicarse en la búsqueda, filtrando por los permisos de quien pregunta, no solo en el repositorio de origen.

## 4. Los datos personales viajan en las instrucciones

Lo que el usuario escribe en el chat también es un dato. Puede incluir nombres, DNI o información de clientes que termina en un proveedor externo. El gobierno debe definir qué se puede escribir, qué se enmascara antes de enviar al modelo y cuánto tiempo se guardan las conversaciones. En el Perú, la Ley 29733 de datos personales aplica igual que a cualquier otro tratamiento.

## 5. El linaje incluye al modelo

En analítica clásica el linaje va de la fuente al reporte. Con IA generativa hay que registrar además qué modelo, qué versión de instrucciones y qué documentos produjeron cada respuesta. Sin ese registro no se puede explicar una respuesta equivocada, que es justamente lo que pide el [reglamento de la Ley 31814](/blog/ley-31814-que-debe-hacer-una-empresa/) para los sistemas de riesgo alto: un registro actualizado de cómo funciona el sistema y de qué datos se alimenta.

## Lo que no cambia

Los roles siguen siendo los mismos: dueños de datos, custodios y usuarios. Lo que cambia es el inventario de activos (ahora con documentos, índices, conjuntos de evaluación e instrucciones) y la forma de medir la calidad. Una empresa que ya tiene gobierno de datos no empieza de cero. Una que no lo tiene descubrirá, en su primer piloto con IA generativa, que necesitaba empezar por ahí.

## Para empezar

Si vas a lanzar un asistente sobre documentos internos, antes de elegir el modelo define tres cosas: qué documentos entran y quién los aprueba, con qué preguntas de prueba vas a medir la calidad, y quién puede ver qué. Con eso resuelto, el piloto tiene base para crecer.
