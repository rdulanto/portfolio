---
title: "Gobierno de datos para IA generativa: qué cambia respecto al gobierno clásico"
summary: "Durante años cuidé tablas, pipelines y reportes. Cuando armé mi primer asistente sobre documentos, me di cuenta de que el gobierno de datos tenía que estirarse. Estos son los cinco cambios que veo."
date: 2026-11-23
lang: es
slug: gobierno-de-datos-para-ia-generativa
ref: gobierno-ia-generativa
tags: [Gobierno de datos, IA generativa, LLM]
category: investigacion
---

Durante años mi trabajo fue que los datos llegaran a tiempo y cuadraran. En el banco de microfinanzas movíamos más de 30 GB y más de 100 tablas cada día, y el gobierno de datos giraba alrededor de eso: un dueño por dato, reglas de calidad sobre columnas, un glosario y permisos por tabla.

Todo eso sigue sirviendo. Pero cuando armé mi [asistente sobre la Ley 29733](/proyectos/asistente-ley-datos-personales/), me di cuenta de que un asistente con IA generativa no consulta tablas. Lee documentos, contratos y manuales, y responde con frases que suenan bien aunque estén mal. Eso obliga a estirar el gobierno de datos en varios frentes. Te cuento los cinco que veo más claros.

## El activo ahora es el documento

En un asistente que busca en documentos (lo que se conoce como RAG), la calidad depende de que esté cargada la versión vigente del manual, no de que una columna esté limpia. Las preguntas cambian: ¿cuál es la versión oficial y quién la aprueba?, ¿cuándo vence y quién la saca del índice?, ¿qué documentos nunca deberían entrar?

En mi asistente, la mayor mejora no vino del modelo. Vino de partir bien los artículos de la ley, quitar las cabeceras que se colaban del PDF y reportar lo que no se podía recuperar en lugar de esconderlo. Trabajo de calidad de datos de toda la vida, aplicado a texto.

## La calidad se mide en respuestas

Una regla clásica dice "la fecha no puede estar vacía". Aquí la pregunta es otra: ¿la respuesta es correcta, se apoya en una fuente y no inventa nada?

La única forma que encontré de saberlo es tener un conjunto de preguntas de prueba con su respuesta esperada y correrlo antes de cada cambio. Yo escribí 45 preguntas y guardé 15 que nunca usé para ajustar el sistema. Ese conjunto es un activo de datos más: necesita dueño, versión y revisión.

## El acceso se controla al responder

Si el asistente indexa documentos de Recursos Humanos y de Riesgos, alguien podría recibir en la respuesta un párrafo de un documento que nunca podría abrir. El permiso tiene que aplicarse en la búsqueda, según quién pregunta, y no solo en la carpeta de origen.

## Lo que escribe el usuario también es un dato

En un chat la gente escribe nombres, DNI o datos de clientes sin pensarlo, y eso puede terminar en un proveedor externo. Hay que definir qué se puede escribir, qué se enmascara antes de enviarlo al modelo y cuánto tiempo se guardan las conversaciones. La Ley 29733 aplica igual que en cualquier otro tratamiento de datos personales.

## El linaje incluye al modelo

En analítica el linaje va de la fuente al reporte. Con IA generativa también hay que guardar qué modelo, qué instrucciones y qué documentos produjeron cada respuesta. Sin eso no hay forma de explicar un error. Y es justo lo que pide el [reglamento de la Ley 31814](/blog/ley-31814-que-debe-hacer-una-empresa/) para los sistemas de riesgo alto: un registro actualizado de cómo funciona el sistema y de qué datos se alimenta.

## Lo que no cambia

Los roles son los mismos: dueños, custodios y usuarios. Lo que crece es el inventario, que ahora incluye documentos, índices, preguntas de prueba e instrucciones. Una empresa que ya tiene gobierno de datos no parte de cero. Una que no lo tiene lo va a descubrir en su primer piloto.

Mi consejo, antes de elegir el modelo: define qué documentos entran y quién los aprueba, con qué preguntas vas a medir la calidad y quién puede ver qué. Con eso resuelto, el piloto tiene en qué apoyarse.
