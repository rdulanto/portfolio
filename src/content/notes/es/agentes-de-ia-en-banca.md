---
title: "Agentes de IA en banca: dónde sí y dónde no"
summary: "Un agente de IA no solo responde: actúa. Después de años con modelos en producción en banca, te cuento dónde los usaría hoy, dónde todavía no y qué controles pondría antes de darles permisos."
date: 2026-11-23
lang: es
slug: agentes-de-ia-en-banca
ref: agentes-banca
tags: [Agentes de IA, Banca, Riesgo]
category: investigacion
---

Un asistente con IA responde preguntas. Un agente va más allá: decide qué herramientas usar, consulta sistemas, redacta, registra y, si lo dejas, ejecuta. En banca esa diferencia pesa mucho. El error ya no es una mala respuesta en pantalla, puede ser un pago mal enrutado o un crédito rechazado sin explicación.

Lo veo desde la experiencia de haber tenido diez modelos en producción en un banco de microfinanzas. Ninguno actuaba solo: cada uno pasaba por validaciones automáticas y su resultado lo usaba una persona o un proceso con controles. Con los agentes, esa red de seguridad hay que diseñarla desde el inicio.

El interés es real. Según [Deloitte](https://www.deloitte.com/us/en/insights/industry/financial-services/agentic-ai-risks-banking.html) (marzo de 2026), una de cada tres instituciones financieras ya está separando presupuesto para IA agéntica. El mismo informe cuenta más de 350 riesgos asociados a comportamiento autónomo en la base de riesgos de IA del MIT.

## Dónde sí los usaría hoy

En tareas que preparan trabajo para una persona que revisa y decide. Por ejemplo:

- Armar expedientes de crédito: juntar documentos, ver que estén completos y resumirlos para el analista.
- Preparar alertas de lavado de activos: reunir movimientos, perfil y casos previos para el oficial de cumplimiento.
- Atender reclamos: clasificarlos, buscar el historial y proponer una respuesta que el ejecutivo revisa.
- Reportes regulatorios: cruzar la norma con los datos y señalar diferencias.
- Desarrollo interno: generar código, pruebas y documentación para el equipo de TI.

En todos, quien decide sigue siendo una persona. Incluso los supervisores financieros van por ese camino: un [informe de S&P Global](https://www.spglobal.com/en/research-insights/special-reports/closing-the-gap-financial-supervisors-ai-adoption) (mayo de 2026) describe que sus agentes se quedan mayormente en tareas de revisión y no deciden solos.

## Dónde todavía no

**Aprobar o rechazar créditos.** En el Perú, el [reglamento de la Ley 31814](/blog/ley-31814-que-debe-hacer-una-empresa/) pone la evaluación crediticia de personas como riesgo alto, con transparencia, explicación y supervisión humana obligatorias. Un agente que decide solo no encaja ahí. Deloitte menciona justamente el caso de un agente que rechaza solicitudes sin una razón clara.

**Mover dinero sin límites.** Un agente de pagos podría saltarse topes y asignar mal fondos, según el mismo informe.

**Hablar con clientes teniendo acceso amplio a datos.** Si los permisos están mal configurados, puede mostrarle a un cliente datos de otro. Cuando gestioné CRM y atención en 7 canales, el cuidado de qué ve cada persona ya era un tema serio con personas. Con un agente lo es más.

**Cadenas de agentes sin supervisión.** Cuando el error de uno es la entrada del siguiente, el error se multiplica. Deloitte describe agentes de conciliación y liquidación que se reactivan entre sí sin fin.

## Los controles que pondría antes de darles permisos

Cada agente registrado, con su propósito, su nivel de riesgo y una persona responsable. Permisos mínimos y con fecha de vencimiento: solo las herramientas y los datos que necesita. Un registro de cada acción, con qué herramienta y por qué, porque sin eso no hay auditoría. Umbrales claros (montos, tipos de cliente, nivel de confianza) a partir de los cuales el agente se detiene y le pasa el caso a una persona. Y pruebas antes de cada cambio, más monitoreo en producción, igual que hacíamos con los modelos de riesgo.

## Mi recomendación

Empieza con un agente que le prepare trabajo a un equipo que ya existe. Mide cuánto tiempo ahorra y cuántas veces la persona tiene que corregirlo. Y amplía permisos solo con esa evidencia en la mano. En banca, un agente que ahorra horas reales sin incidentes vale mucho más que uno que promete autonomía total y que nadie se atreve a encender.
