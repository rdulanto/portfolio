// Oferta del sitio: consultorías, cursos y roles, en español e inglés.
// Mismo orden y mismo `id` en ambos idiomas: así se enlazan las versiones ES y EN.
import type { Lang } from '../i18n';

export interface Service {
  id: string; slug: string; n: string; cat: string; title: string; purpose: string;
  forWhom: string[]; deliverables: { t: string; d: string }[]; steps: { t: string; d: string }[];
  duration: string; format: string; related?: string; faq: { q: string; a: string }[];
}
export interface Course {
  id: string; title: string; who: string; outcome: string; modules: string[];
  hours: string; format: string; sample?: string;
}
export interface Role { id: string; title: string; what: string; proof: string[] }

const NB = 'https://github.com/rdulanto/material-docente-ia/blob/main/notebooks/';

export const services: Record<Lang, Service[]> = {
  es: [
    {
      id: 'gov', slug: 'diagnostico-datos-gobierno', n: '01', cat: 'Diagnóstico',
      title: 'Diagnóstico de datos y gobierno',
      purpose: 'Saber qué datos tienes, quién responde por ellos y qué arreglar primero, antes de invertir en IA.',
      forWhom: [
        'Tienes varias ideas de IA o analítica y no sabes si tus datos las soportan.',
        'Los reportes no cuadran entre áreas y nadie es dueño del dato.',
        'Un regulador, auditor o directorio te pide orden en datos personales o calidad.',
      ],
      deliverables: [
        { t: 'Mapa de madurez', d: 'Dónde estás en gobierno, calidad, arquitectura y seguridad de datos, con evidencia por dimensión.' },
        { t: 'Registro de riesgos y calidad', d: 'Los problemas de datos que más cuestan, con su impacto, dueño propuesto y esfuerzo para resolverlos.' },
        { t: 'Hoja de ruta de 90 días', d: 'Qué hacer primero, quién lo hace y cómo medir el avance. La implementación se acuerda aparte.' },
      ],
      steps: [
        { t: 'Entender', d: 'Entrevistas con negocio y TI, revisión de fuentes, reportes y políticas existentes.' },
        { t: 'Medir', d: 'Pruebas de calidad sobre datos reales y evaluación de madurez por dimensión.' },
        { t: 'Priorizar', d: 'Taller con los responsables para acordar el orden y los dueños de cada acción.' },
      ],
      duration: '2 a 3 semanas', format: 'Remoto o en Lima', related: 'morosidad',
      faq: [
        { q: '¿Necesito tener una estrategia de datos escrita?', a: 'No. El diagnóstico sirve justamente para construir la base de esa estrategia.' },
        { q: '¿Incluye implementar las mejoras?', a: 'No. Entrega el plan; la implementación se propone por separado si la necesitas.' },
        { q: '¿Cubre la Ley de Protección de Datos Personales?', a: 'Sí, revisa el tratamiento de datos personales como una de las dimensiones de riesgo.' },
      ],
    },
    {
      id: 'ml', slug: 'machine-learning-mlops-azure', n: '02', cat: 'Construir',
      title: 'Machine Learning y MLOps en Azure',
      purpose: 'Llevar un modelo de la idea a producción, y que siga funcionando cuando cambian los datos.',
      forWhom: [
        'Tienes un caso claro (riesgo, cobranza, abandono, demanda) y datos históricos.',
        'Hay modelos en notebooks que nunca llegaron a producción.',
        'Los modelos en producción fallan sin aviso cuando cambian los datos.',
      ],
      deliverables: [
        { t: 'Arquitectura y modelo', d: 'Diseño en Azure (Data Factory, Databricks o Azure ML) y un modelo validado con métricas de negocio.' },
        { t: 'Pipeline con validación de datos', d: 'Entrenamiento y scoring automatizados, con pruebas de calidad antes de cada ejecución.' },
        { t: 'Monitoreo y traspaso', d: 'Alertas de deriva y desempeño, documentación y capacitación del equipo que lo operará.' },
      ],
      steps: [
        { t: 'Acotar', d: 'Definir la decisión que el modelo mejora, la métrica de éxito y los datos disponibles.' },
        { t: 'Construir', d: 'Preparación de datos, modelado, validación fuera de muestra y revisión de sesgos.' },
        { t: 'Operar', d: 'Despliegue, monitoreo y entrega al equipo con un periodo de acompañamiento.' },
      ],
      duration: '6 a 10 semanas por caso', format: 'Remoto con sesiones en Lima', related: 'desercion',
      faq: [
        { q: '¿Trabajas solo con Azure?', a: 'Es donde tengo más experiencia en producción, pero el enfoque aplica a otras nubes.' },
        { q: '¿Quién mantiene el modelo después?', a: 'Tu equipo. Por eso el traspaso y la documentación son parte del servicio.' },
        { q: '¿Qué pasa si los datos no alcanzan?', a: 'Lo sabrás en las dos primeras semanas, con una recomendación de qué datos conseguir.' },
      ],
    },
    {
      id: 'genai', slug: 'adopcion-ia-generativa', n: '03', cat: 'Adopción',
      title: 'Adopción de IA generativa',
      purpose: 'Elegir uno o dos casos de uso con retorno, construir el piloto y fijar reglas de uso responsable.',
      forWhom: [
        'El equipo ya usa ChatGPT o Copilot por su cuenta, sin reglas ni medición.',
        'Quieres un asistente sobre tus documentos, normas o procesos internos.',
        'Necesitas demostrar valor antes de comprar licencias o plataformas.',
      ],
      deliverables: [
        { t: 'Matriz de casos de uso', d: 'Casos priorizados por valor, riesgo y datos disponibles, con el costo estimado de cada uno.' },
        { t: 'Piloto evaluado', d: 'Un asistente o flujo con LLM probado contra un conjunto de preguntas reales y métricas de acierto.' },
        { t: 'Política de uso responsable', d: 'Qué datos pueden usarse, qué revisa una persona y cómo cumplir la Ley 31814 y su reglamento.' },
      ],
      steps: [
        { t: 'Descubrir', d: 'Talleres con las áreas para levantar tareas repetitivas y documentos clave.' },
        { t: 'Pilotear', d: 'Construcción del piloto (RAG, agentes o automatización) con evaluación desde el día uno.' },
        { t: 'Escalar', d: 'Resultados, costos reales y plan para llevarlo a más áreas con control.' },
      ],
      duration: '4 a 6 semanas', format: 'Remoto o en Lima', related: 'ley-datos',
      faq: [
        { q: '¿Mis datos salen de la empresa?', a: 'Se define al inicio. Hay opciones con modelos en tu propia nube o con datos anonimizados.' },
        { q: '¿Qué modelo de IA usan?', a: 'El que mejor resuelva el caso a un costo razonable; se compara más de uno en el piloto.' },
        { q: '¿Cómo se mide el resultado?', a: 'Con un conjunto de preguntas o tareas reales y su tasa de acierto, antes y después.' },
      ],
    },
    {
      id: 'lead', slug: 'liderazgo-datos-ia', n: '04', cat: 'Liderazgo',
      title: 'Liderazgo de datos e IA por horas',
      purpose: 'Dirección senior de datos e IA de uno a tres días por semana, sin contratar a tiempo completo.',
      forWhom: [
        'Tu equipo de datos crece y no tiene un líder con experiencia en producción.',
        'Necesitas ordenar un portafolio de proyectos de IA y decidir cuáles seguir.',
        'Buscas cubrir una posición de liderazgo mientras contratas.',
      ],
      deliverables: [
        { t: 'Plan trimestral', d: 'Objetivos, proyectos priorizados y métricas de avance acordadas con la gerencia.' },
        { t: 'Gobierno del portafolio de IA', d: 'Criterios para aprobar, medir y cerrar iniciativas, con revisión mensual.' },
        { t: 'Desarrollo del equipo', d: 'Acompañamiento técnico, revisiones de diseño y plan de capacitación.' },
      ],
      steps: [
        { t: 'Diagnóstico corto', d: 'Dos semanas para entender equipo, proyectos y expectativas.' },
        { t: 'Plan', d: 'Plan trimestral aprobado con la gerencia.' },
        { t: 'Ejecución', d: 'Dedicación fija semanal con reporte mensual de resultados.' },
      ],
      duration: 'De 1 a 3 días por semana, desde 3 meses', format: 'Híbrido en Lima o remoto',
      faq: [
        { q: '¿Es lo mismo que un consultor?', a: 'No. Asumo responsabilidad sobre resultados y equipo, como un líder interno con dedicación parcial.' },
        { q: '¿Puede convertirse en un puesto a tiempo completo?', a: 'Sí, se puede conversar si ambas partes lo ven conveniente.' },
        { q: '¿Qué pasa al terminar?', a: 'Se deja un plan y, si lo necesitas, apoyo para seleccionar a quien asuma el rol.' },
      ],
    },
  ],
  en: [
    {
      id: 'gov', slug: 'data-governance-assessment', n: '01', cat: 'Assess',
      title: 'Data & governance assessment',
      purpose: 'Know what data you have, who owns it and what to fix first, before investing in AI.',
      forWhom: [
        'You have several AI or analytics ideas and don’t know whether your data can support them.',
        'Reports don’t match across teams and nobody owns the data.',
        'A regulator, auditor or board is asking for order in personal data or data quality.',
      ],
      deliverables: [
        { t: 'Maturity map', d: 'Where you stand on data governance, quality, architecture and security, with evidence per dimension.' },
        { t: 'Risk and quality register', d: 'The costliest data problems, with impact, proposed owner and effort to fix.' },
        { t: '90-day roadmap', d: 'What to do first, who does it and how to measure progress. Implementation is scoped separately.' },
      ],
      steps: [
        { t: 'Understand', d: 'Interviews with business and IT, review of sources, reports and existing policies.' },
        { t: 'Measure', d: 'Quality tests on real data and a maturity assessment per dimension.' },
        { t: 'Prioritize', d: 'A workshop with owners to agree the order and the owner of each action.' },
      ],
      duration: '2 to 3 weeks', format: 'Remote or in Lima', related: 'morosidad',
      faq: [
        { q: 'Do I need a written data strategy?', a: 'No. The assessment is what lays the groundwork for that strategy.' },
        { q: 'Does it include implementing the fixes?', a: 'No. It delivers the plan; implementation is proposed separately if you need it.' },
        { q: 'Does it cover Peru’s Personal Data Protection Law?', a: 'Yes, personal data processing is reviewed as one of the risk dimensions.' },
      ],
    },
    {
      id: 'ml', slug: 'machine-learning-mlops-azure', n: '02', cat: 'Build',
      title: 'Machine Learning & MLOps on Azure',
      purpose: 'Take a model from idea to production, and keep it working when the data changes.',
      forWhom: [
        'You have a clear case (risk, collections, churn, demand) and historical data.',
        'There are models in notebooks that never reached production.',
        'Production models fail silently when the data changes.',
      ],
      deliverables: [
        { t: 'Architecture and model', d: 'An Azure design (Data Factory, Databricks or Azure ML) and a model validated on business metrics.' },
        { t: 'Pipeline with data validation', d: 'Automated training and scoring, with quality tests before every run.' },
        { t: 'Monitoring and handover', d: 'Drift and performance alerts, documentation and training for the team that will run it.' },
      ],
      steps: [
        { t: 'Scope', d: 'Define the decision the model improves, the success metric and the available data.' },
        { t: 'Build', d: 'Data preparation, modeling, out-of-sample validation and bias review.' },
        { t: 'Operate', d: 'Deployment, monitoring and handover to the team with a support period.' },
      ],
      duration: '6 to 10 weeks per use case', format: 'Remote with sessions in Lima', related: 'desercion',
      faq: [
        { q: 'Do you only work with Azure?', a: 'It is where I have the most production experience, but the approach applies to other clouds.' },
        { q: 'Who maintains the model afterwards?', a: 'Your team. That is why handover and documentation are part of the service.' },
        { q: 'What if the data is not enough?', a: 'You will know within the first two weeks, with a recommendation on what data to get.' },
      ],
    },
    {
      id: 'genai', slug: 'generative-ai-adoption', n: '03', cat: 'Adopt',
      title: 'Generative AI adoption',
      purpose: 'Pick one or two use cases with real return, build the pilot and set rules for responsible use.',
      forWhom: [
        'Your team already uses ChatGPT or Copilot on its own, with no rules or measurement.',
        'You want an assistant over your documents, regulations or internal processes.',
        'You need to prove value before buying licenses or platforms.',
      ],
      deliverables: [
        { t: 'Use-case matrix', d: 'Use cases ranked by value, risk and available data, with the estimated cost of each.' },
        { t: 'Evaluated pilot', d: 'An LLM assistant or workflow tested against a set of real questions and accuracy metrics.' },
        { t: 'Responsible-use policy', d: 'Which data can be used, what a person reviews and how to comply with Peru’s AI law (Law 31814).' },
      ],
      steps: [
        { t: 'Discover', d: 'Workshops with each area to surface repetitive tasks and key documents.' },
        { t: 'Pilot', d: 'Build the pilot (RAG, agents or automation) with evaluation from day one.' },
        { t: 'Scale', d: 'Results, real costs and a plan to extend it to more areas with control.' },
      ],
      duration: '4 to 6 weeks', format: 'Remote or in Lima', related: 'ley-datos',
      faq: [
        { q: 'Does my data leave the company?', a: 'That is decided up front. There are options with models in your own cloud or with anonymized data.' },
        { q: 'Which AI model do you use?', a: 'Whichever solves the case best at a reasonable cost; the pilot compares more than one.' },
        { q: 'How is the result measured?', a: 'With a set of real questions or tasks and their accuracy rate, before and after.' },
      ],
    },
    {
      id: 'lead', slug: 'fractional-data-ai-leadership', n: '04', cat: 'Lead',
      title: 'Fractional Data & AI leadership',
      purpose: 'Senior data and AI direction one to three days a week, without a full-time hire.',
      forWhom: [
        'Your data team is growing and lacks a leader with production experience.',
        'You need to sort out a portfolio of AI projects and decide which to keep.',
        'You need to cover a leadership role while you hire.',
      ],
      deliverables: [
        { t: 'Quarterly plan', d: 'Goals, prioritized projects and progress metrics agreed with management.' },
        { t: 'AI portfolio governance', d: 'Criteria to approve, measure and close initiatives, with a monthly review.' },
        { t: 'Team development', d: 'Technical coaching, design reviews and a training plan.' },
      ],
      steps: [
        { t: 'Short assessment', d: 'Two weeks to understand the team, projects and expectations.' },
        { t: 'Plan', d: 'A quarterly plan approved by management.' },
        { t: 'Execution', d: 'A fixed weekly commitment with a monthly results report.' },
      ],
      duration: '1 to 3 days a week, from 3 months', format: 'Hybrid in Lima or remote',
      faq: [
        { q: 'Is this the same as a consultant?', a: 'No. I take responsibility for results and the team, like an internal leader working part time.' },
        { q: 'Can it become a full-time role?', a: 'Yes, it can be discussed if both sides see it as a good fit.' },
        { q: 'What happens at the end?', a: 'A plan is left in place and, if needed, help selecting the person who takes over.' },
      ],
    },
  ],
};

export const courses: Record<Lang, Course[]> = {
  es: [
    { id: 'py', title: 'Python para análisis de datos', who: 'Analistas y profesionales que hoy trabajan en Excel.', outcome: 'Limpiar, analizar y visualizar datos reales con pandas, y automatizar reportes repetitivos.', modules: ['Python y notebooks sin miedo', 'pandas: limpiar y combinar datos', 'Visualización para decidir', 'Automatizar un reporte de punta a punta'], hours: '16 h', format: 'In company · en vivo online' },
    { id: 'ml', title: 'Machine Learning aplicado al negocio', who: 'Analistas con base de Python y líderes que deciden proyectos de ML.', outcome: 'Plantear un problema como modelo, entrenarlo, validarlo y explicar su valor en soles.', modules: ['De la pregunta de negocio al modelo', 'Clasificación: abandono y riesgo', 'Clustering: segmentar sin etiquetas', 'Validar, explicar y evitar la fuga de información'], hours: '20 h', format: 'In company · en vivo online', sample: NB + '01_churn_telco.ipynb' },
    { id: 'genai', title: 'IA generativa para equipos', who: 'Equipos de cualquier área que ya usan o van a usar asistentes de IA.', outcome: 'Usar asistentes con criterio: buenas instrucciones, verificación de resultados y datos que no deben compartirse.', modules: ['Qué hace bien y qué hace mal un LLM', 'Instrucciones que funcionan', 'Verificar antes de confiar', 'Reglas de uso responsable y la Ley 31814'], hours: '8 h', format: 'In company · taller presencial u online' },
    { id: 'gov', title: 'Gobierno y calidad de datos', who: 'Dueños de datos, analistas, auditoría y TI.', outcome: 'Definir roles, políticas e indicadores de calidad, y armar un primer plan de gobierno.', modules: ['Roles: dueños, custodios y usuarios', 'Calidad: reglas, pruebas e indicadores', 'Datos personales y cumplimiento', 'Gobierno de datos para IA'], hours: '12 h', format: 'In company · en vivo online', sample: NB + '02_calidad_datos_secado.ipynb' },
    { id: 'mlops', title: 'MLOps en Azure', who: 'Ingenieros y científicos de datos que quieren llevar modelos a producción.', outcome: 'Construir un pipeline de entrenamiento y scoring con validación de datos y monitoreo.', modules: ['Arquitectura de datos en Azure', 'Pipelines con Data Factory y Databricks', 'Validación automática de datos', 'Despliegue y monitoreo de modelos'], hours: '16 h', format: 'In company · en vivo online' },
    { id: 'ti', title: 'Tecnologías de la información para la gestión', who: 'Gerentes y profesionales no técnicos.', outcome: 'Entender cómo la tecnología, los datos y la IA crean valor, y cómo evaluar proyectos de TI.', modules: ['Estrategia y TI', 'Datos y analítica para decidir', 'IA en la empresa: casos y riesgos', 'Evaluar y priorizar proyectos'], hours: '12 h', format: 'In company · formato universitario o ejecutivo' },
  ],
  en: [
    { id: 'py', title: 'Python for data analysis', who: 'Analysts and professionals who work in Excel today.', outcome: 'Clean, analyze and visualize real data with pandas, and automate repetitive reports.', modules: ['Python and notebooks without fear', 'pandas: cleaning and joining data', 'Visualization for decisions', 'Automating a report end to end'], hours: '16 h', format: 'In company · live online' },
    { id: 'ml', title: 'Machine Learning for business', who: 'Analysts with basic Python and leaders who decide on ML projects.', outcome: 'Frame a problem as a model, train it, validate it and explain its value in money.', modules: ['From business question to model', 'Classification: churn and risk', 'Clustering: segmenting without labels', 'Validating, explaining and avoiding leakage'], hours: '20 h', format: 'In company · live online', sample: NB + '01_churn_telco.ipynb' },
    { id: 'genai', title: 'Generative AI for teams', who: 'Teams in any area that use or will use AI assistants.', outcome: 'Use assistants with judgment: good instructions, checking results and data that must not be shared.', modules: ['What an LLM does well and badly', 'Instructions that work', 'Verify before you trust', 'Responsible-use rules and Peru’s AI law'], hours: '8 h', format: 'In company · in-person or online workshop' },
    { id: 'gov', title: 'Data governance and quality', who: 'Data owners, analysts, audit and IT.', outcome: 'Define roles, policies and quality metrics, and draft a first governance plan.', modules: ['Roles: owners, stewards and users', 'Quality: rules, tests and metrics', 'Personal data and compliance', 'Data governance for AI'], hours: '12 h', format: 'In company · live online', sample: NB + '02_calidad_datos_secado.ipynb' },
    { id: 'mlops', title: 'MLOps on Azure', who: 'Data engineers and scientists who want to take models to production.', outcome: 'Build a training and scoring pipeline with data validation and monitoring.', modules: ['Data architecture on Azure', 'Pipelines with Data Factory and Databricks', 'Automated data validation', 'Model deployment and monitoring'], hours: '16 h', format: 'In company · live online' },
    { id: 'ti', title: 'Information technology for management', who: 'Managers and non-technical professionals.', outcome: 'Understand how technology, data and AI create value, and how to assess IT projects.', modules: ['Strategy and IT', 'Data and analytics for decisions', 'AI in the enterprise: cases and risks', 'Assessing and prioritizing projects'], hours: '12 h', format: 'In company · university or executive format' },
  ],
};

export const roles: Record<Lang, Role[]> = {
  es: [
    { id: 'head', title: 'Head o Gerente de Datos e IA', what: 'Estrategia de datos e IA, portafolio de proyectos y un equipo que entrega modelos a producción.', proof: ['10 proyectos de ML coordinados con MLOps en Azure', 'Más de 14 años en banca y microfinanzas'] },
    { id: 'eng', title: 'Gerente de Ingeniería de Datos', what: 'Plataforma de datos, ingesta, calidad y arquitectura en la nube.', proof: ['Ingesta reducida de 10 horas a 45 minutos', 'Azure Data Factory, Databricks y Synapse'] },
    { id: 'gov', title: 'Líder de Gobierno de Datos', what: 'Políticas, roles, calidad y cumplimiento de datos personales e IA.', proof: ['Validación automática de datos en MLOps', 'Asistente de IA sobre la Ley 29733 (proyecto público)'] },
    { id: 'frac', title: 'Data & AI Lead por horas', what: 'Liderazgo senior de uno a tres días por semana, mientras la empresa crece o contrata.', proof: ['Experiencia como subgerente de ingeniería de datos', 'Docente universitario desde 2009'] },
  ],
  en: [
    { id: 'head', title: 'Head of Data & AI', what: 'Data and AI strategy, a project portfolio and a team that ships models to production.', proof: ['10 ML projects coordinated with MLOps on Azure', '14+ years in banking and microfinance'] },
    { id: 'eng', title: 'Data Engineering Manager', what: 'Data platform, ingestion, quality and cloud architecture.', proof: ['Ingestion cut from 10 hours to 45 minutes', 'Azure Data Factory, Databricks and Synapse'] },
    { id: 'gov', title: 'Data Governance Lead', what: 'Policies, roles, quality and compliance for personal data and AI.', proof: ['Automated data validation in MLOps', 'AI assistant on Peru’s data protection law (public project)'] },
    { id: 'frac', title: 'Fractional Data & AI Lead', what: 'Senior leadership one to three days a week, while the company grows or hires.', proof: ['Former deputy manager of data engineering', 'University lecturer since 2009'] },
  ],
};

export const paths = {
  consulting: (l: Lang) => (l === 'es' ? '/consultoria/' : '/en/consulting/'),
  service: (l: Lang, slug: string) => (l === 'es' ? `/consultoria/${slug}/` : `/en/consulting/${slug}/`),
  courses: (l: Lang) => (l === 'es' ? '/cursos/' : '/en/courses/'),
  projects: (l: Lang) => (l === 'es' ? '/proyectos/' : '/en/projects/'),
  project: (l: Lang, slug: string) => (l === 'es' ? `/proyectos/${slug}/` : `/en/projects/${slug}/`),
  roles: (l: Lang) => (l === 'es' ? '/roles/' : '/en/roles/'),
  about: (l: Lang) => (l === 'es' ? '/sobre-mi/' : '/en/about/'),
  home: (l: Lang) => (l === 'es' ? '/' : '/en/'),
};
