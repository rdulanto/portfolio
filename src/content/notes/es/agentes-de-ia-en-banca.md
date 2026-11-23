---
title: "Agentes de IA en banca: dónde sí y dónde no"
summary: "Un agente no solo responde: actúa. En banca eso cambia el cálculo de riesgo. Dónde tienen sentido hoy, dónde todavía no y qué controles poner antes de darle permisos."
date: 2026-11-23
lang: es
slug: agentes-de-ia-en-banca
ref: agentes-banca
tags: [Agentes de IA, Banca, Riesgo]
category: investigacion
---

Un asistente con IA responde preguntas. Un agente de IA va un paso más allá: decide qué herramientas usar, consulta sistemas, redacta, registra y, si se lo permiten, ejecuta. En banca esa diferencia lo cambia todo, porque el error ya no es una mala respuesta en pantalla: puede ser un pago mal enrutado o un crédito rechazado sin explicación.

El interés es real. Según [Deloitte](https://www.deloitte.com/us/en/insights/industry/financial-services/agentic-ai-risks-banking.html) (marzo de 2026), una de cada tres instituciones financieras está separando presupuesto para IA agéntica. Al mismo tiempo, el mismo informe identifica más de 350 riesgos asociados a comportamiento autónomo en la base de riesgos de IA del MIT.

## Dónde sí: tareas que preparan, no que deciden

Los agentes funcionan mejor cuando su trabajo termina en una persona que revisa:

| Caso | Qué hace el agente | Quién decide |
| --- | --- | --- |
| Preparación de expedientes de crédito | Junta documentos, verifica que estén completos y resume la información | El analista |
| Alertas de lavado de activos | Reúne movimientos, perfil y casos previos para cada alerta | El oficial de cumplimiento |
| Atención de reclamos | Clasifica, busca el historial y redacta una respuesta propuesta | El ejecutivo de atención |
| Reportes regulatorios | Cruza la norma con los datos y señala diferencias | El equipo de reportes |
| Desarrollo interno | Genera código, pruebas y documentación | El equipo de TI |

Incluso los supervisores financieros van por este camino. Un [informe de S&P Global](https://www.spglobal.com/en/research-insights/special-reports/closing-the-gap-financial-supervisors-ai-adoption) (mayo de 2026) describe que los agentes que usan los supervisores se mantienen mayormente en roles de revisión y no de decisión autónoma.

## Dónde no, todavía: decisiones que afectan a clientes o mueven dinero

- **Aprobar o rechazar créditos.** En el Perú, el [reglamento de la Ley 31814](/blog/ley-31814-que-debe-hacer-una-empresa/) clasifica la evaluación crediticia de personas como riesgo alto, con transparencia, explicación y supervisión humana obligatorias. Un agente que decide solo no encaja ahí. Deloitte da el ejemplo de un agente que rechaza solicitudes sin una razón clara, lo que puede violar normas de crédito justo.
- **Mover dinero sin límite.** Un agente de enrutamiento de pagos podría saltarse límites y asignar mal fondos, según el mismo informe.
- **Hablar con clientes con acceso amplio a datos.** Un agente de atención con permisos mal configurados puede mostrar datos personales de otro caso.
- **Cadenas de agentes sin supervisión.** Cuando el error de un agente es la entrada de otro, el error se multiplica. Deloitte describe agentes de conciliación y liquidación que se reactivan mutuamente sin fin.

## Cinco controles antes de dar permisos

1. **Inventario y dueño.** Cada agente registrado, con su propósito, nivel de riesgo y una persona responsable.
2. **Permisos mínimos y que vencen.** Solo las herramientas y datos que necesita, por tiempo limitado.
3. **Registro de cada acción.** Qué agente hizo qué, con qué herramienta y por qué. Sin eso no hay auditoría posible.
4. **Umbrales de escalamiento.** Montos, tipos de cliente o niveles de confianza a partir de los cuales el agente se detiene y pasa a una persona.
5. **Evaluación continua.** Casos de prueba antes de cada cambio y monitoreo en producción, igual que con un modelo de riesgo.

## Mi recomendación

Empieza por un agente que prepare trabajo para un equipo que ya existe, mide cuánto tiempo ahorra y cuántas veces la persona corrige su resultado, y amplía permisos solo con esa evidencia. En banca, un agente que ahorra horas reales a un equipo sin incidentes vale más que uno que promete autonomía total y nadie se atreve a encender.
