// Contenido para reclutadores en la página Roles: ficha, competencias, simulador de encaje y plan de 90 días.
// Solo datos ya publicados en el sitio o confirmados por Rick. Nada de empleadores con nombre.
import type { Lang } from '../i18n';

export type Fit = 'full' | 'partial' | 'no';
export interface Req { id: string; t: string; fit: Fit; proof: string }
export interface ReqGroup { k: string; items: Req[] }

const proj = (l: Lang, slug: string) => (l === 'es' ? `/proyectos/${slug}/` : `/en/projects/${slug}/`);

export const recruiters = {
  es: {
    card: {
      k: 'Ficha en 30 segundos', t: 'Lo esencial para tu filtro',
      rows: [
        { k: 'Disponibilidad', v: 'Inmediata' },
        { k: 'Modalidad', v: 'Lima, presencial o híbrido · remoto' },
        { k: 'Idiomas', v: 'Español nativo · inglés C1 (EF SET)' },
        { k: 'Experiencia', v: '14+ años en banca y microfinanzas' },
        { k: 'Equipos', v: 'De 5 a 10 especialistas y proveedores' },
        { k: 'Formación', v: '2 maestrías en Dirección de TI · maestría en IA en curso' },
        { k: 'Roles que busco', v: 'Head de Datos e IA · Gerente de Ingeniería de Datos · Gobierno de Datos' },
        { k: 'Referencias', v: 'Disponibles a pedido' },
      ],
    },
    comp: {
      k: 'Competencias', t: 'Cada competencia, con su prueba', lead: 'Sin barras de habilidad ni porcentajes inventados: lo que hice, con la cifra o el enlace que lo respalda.',
      head: ['Competencia', 'Evidencia', 'Dónde verlo'],
      rows: [
        { c: 'Ingeniería de datos en Azure', e: 'Ingesta diaria de +30 GB y +100 tablas, de 10 horas a 45 minutos, con Data Factory, Databricks y Synapse.', l: null },
        { c: 'Machine Learning y MLOps', e: '10 modelos en producción (riesgo, cobranzas, comercial, clientes y tipo de cambio) con validación automática de datos.', l: { t: 'Proyecto: deserción universitaria', h: proj('es', 'desercion-universitaria') } },
        { c: 'Gobierno y calidad de datos', e: 'Reglas de calidad y validación previa a cada ejecución de modelos; tratamiento de datos personales según la Ley 29733.', l: { t: 'Proyecto: morosidad en microfinanzas', h: proj('es', 'morosidad-microfinanzas') } },
        { c: 'IA generativa', e: 'Asistente de búsqueda sobre la Ley 29733 y su reglamento, con búsqueda híbrida y evaluación medida.', l: { t: 'Proyecto: asistente de datos personales', h: proj('es', 'asistente-ley-datos-personales') } },
        { c: 'Liderazgo de equipos y proveedores', e: 'Equipos de 5 a 10 especialistas; +10 procesos de información automatizados.', l: null },
        { c: 'CRM y experiencia del cliente', e: '+10,000 contratos y +5,000 clientes en 7 canales de atención, como jefe de CRM y experiencia del cliente.', l: null },
        { c: 'Formar y comunicar', e: '1,000+ profesionales y estudiantes formados desde 2009; IEEE Senior Member y coautor en Scopus.', l: { t: 'Cursos', h: '/cursos/' } },
      ],
    },
    fit: {
      k: 'Simulador', t: '¿Encajo con tu vacante?', lead: 'Marca lo que pide tu vacante y mira al instante qué cubro, con la prueba de cada punto. También te digo con honestidad lo que no es mi fuerte.',
      groups: [
        { k: 'Liderazgo', items: [
          { id: 'lead-team', t: 'Liderar un equipo de datos', fit: 'full', proof: 'Equipos de 5 a 10 especialistas y proveedores.' },
          { id: 'lead-strat', t: 'Definir estrategia y hoja de ruta de datos e IA', fit: 'full', proof: 'Portafolio de 10 modelos priorizados por valor de negocio.' },
          { id: 'lead-big', t: 'Equipos de más de 20 personas', fit: 'no', proof: 'Mi mayor equipo fue de 10 personas entre especialistas y proveedores.' },
        ] },
        { k: 'Técnico', items: [
          { id: 'azure', t: 'Azure (Data Factory, Databricks, Synapse)', fit: 'full', proof: 'Ingesta de 10 horas a 45 minutos en Azure.' },
          { id: 'mlops', t: 'MLOps y modelos en producción', fit: 'full', proof: '10 modelos en producción con MLOps y validación de datos.' },
          { id: 'python', t: 'Python y SQL', fit: 'full', proof: 'Código público en GitHub y docencia en Python desde 2009.' },
          { id: 'genai', t: 'IA generativa / LLM / RAG', fit: 'full', proof: 'Asistente público sobre la Ley 29733 con evaluación medida.' },
          { id: 'aws', t: 'AWS o Google Cloud en producción', fit: 'partial', proof: 'Mi producción ha sido en Azure; los principios de arquitectura y MLOps se transfieren.' },
          { id: 'bi', t: 'Power BI o tableros de gestión', fit: 'full', proof: 'Tableros públicos en Python y docencia en Power BI.' },
        ] },
        { k: 'Gobierno y negocio', items: [
          { id: 'gov', t: 'Gobierno y calidad de datos', fit: 'full', proof: 'Validación automática de datos y reglas de calidad en MLOps.' },
          { id: 'privacy', t: 'Protección de datos personales (Ley 29733)', fit: 'full', proof: 'Proyecto público sobre la ley y su reglamento.' },
          { id: 'fin', t: 'Experiencia en banca o microfinanzas', fit: 'full', proof: '14+ años en servicios financieros: riesgo, cobranzas y canales.' },
          { id: 'retail', t: 'Experiencia en retail, salud o telecom', fit: 'partial', proof: 'Mi experiencia directa es financiera; en clase trabajo casos de abandono en telecom.' },
          { id: 'crm', t: 'CRM y experiencia del cliente', fit: 'full', proof: 'Jefe de CRM y experiencia del cliente en 7 canales.' },
        ] },
        { k: 'Condiciones', items: [
          { id: 'lima', t: 'Presencial o híbrido en Lima', fit: 'full', proof: 'Vivo en Lima.' },
          { id: 'remote', t: 'Remoto para otro país', fit: 'full', proof: 'Inglés C1; dicto cursos en vivo online y publico mi trabajo en GitHub.' },
          { id: 'english', t: 'Inglés avanzado', fit: 'full', proof: 'Inglés C1 certificado (EF SET).' },
          { id: 'now', t: 'Incorporación inmediata', fit: 'full', proof: 'Disponibilidad inmediata.' },
        ] },
      ] as ReqGroup[],
      ui: {
        empty: 'Marca al menos un requisito para ver el resultado.', match: 'de encaje', selected: 'requisitos marcados',
        full: 'Lo cubro', partial: 'En parte', no: 'No es mi fuerte',
        verdict: [
          { min: 85, t: 'Encaje muy alto. Conversemos.' },
          { min: 65, t: 'Buen encaje, con puntos a conversar.' },
          { min: 0, t: 'Encaje parcial. Te digo con franqueza dónde sumo y dónde no.' },
        ],
        copy: 'Copiar resumen para el hiring manager', copied: 'Copiado', cta: 'Conversar en LinkedIn', clear: 'Limpiar',
        summaryHead: 'Ricardo Dulanto · encaje con la vacante',
      },
    },
    plan: {
      k: 'Primeros 90 días', t: 'Cómo empezaría como Head de Datos e IA', lead: 'Un plan base que ajusto en la primera semana con lo que encuentre.',
      phases: [
        { d: 'Días 1 a 30', t: 'Escuchar y medir', items: ['Entrevistas con negocio, TI, riesgo y cumplimiento', 'Inventario de datos, modelos y tableros que ya existen', 'Línea base de calidad y tiempos de entrega de datos'], out: 'Diagnóstico con 3 a 5 oportunidades priorizadas por valor' },
        { d: 'Días 31 a 60', t: 'Priorizar y entregar', items: ['Acordar la hoja de ruta con la gerencia', 'Dueños de datos para los indicadores críticos', 'Primera mejora visible: una carga automatizada o un modelo en piloto'], out: 'Hoja de ruta aprobada y una victoria temprana medida' },
        { d: 'Días 61 a 90', t: 'Escalar y gobernar', items: ['Ritual mensual de indicadores de datos con la gerencia', 'Estándares de MLOps y calidad para todo proyecto nuevo', 'Plan de formación para el equipo y las áreas usuarias'], out: 'Un modelo de operación que sigue funcionando sin mí en cada reunión' },
      ],
    },
  },
  en: {
    card: {
      k: '30-second profile', t: 'The essentials for your screen',
      rows: [
        { k: 'Availability', v: 'Immediate' },
        { k: 'Work mode', v: 'Lima, on-site or hybrid · remote' },
        { k: 'Languages', v: 'Native Spanish · English C1 (EF SET)' },
        { k: 'Experience', v: '14+ years in banking and microfinance' },
        { k: 'Teams', v: '5 to 10 specialists and vendors' },
        { k: 'Education', v: '2 master’s degrees in IT management · MSc in AI in progress' },
        { k: 'Target roles', v: 'Head of Data & AI · Data Engineering Manager · Data Governance' },
        { k: 'References', v: 'Available on request' },
      ],
    },
    comp: {
      k: 'Competencies', t: 'Every competency, with its proof', lead: 'No skill bars or made-up percentages: what I did, with the number or link that backs it.',
      head: ['Competency', 'Evidence', 'Where to see it'],
      rows: [
        { c: 'Data engineering on Azure', e: 'Daily ingestion of 30+ GB and 100+ tables, cut from 10 hours to 45 minutes, with Data Factory, Databricks and Synapse.', l: null },
        { c: 'Machine Learning and MLOps', e: '10 models in production (risk, collections, sales, customers and FX) with automated data validation.', l: { t: 'Project: university dropout', h: proj('en', 'university-dropout') } },
        { c: 'Data governance and quality', e: 'Quality rules and validation before every model run; personal-data handling under Peru’s Law 29733.', l: { t: 'Project: microfinance delinquency', h: proj('en', 'microfinance-delinquency') } },
        { c: 'Generative AI', e: 'Search assistant over Peru’s data protection law and its regulation, with hybrid search and measured evaluation.', l: { t: 'Project: data protection assistant', h: proj('en', 'data-protection-assistant') } },
        { c: 'Leading teams and vendors', e: 'Teams of 5 to 10 specialists; 10+ information processes automated.', l: null },
        { c: 'CRM and customer experience', e: '10,000+ contracts and 5,000+ customers across 7 service channels, as head of CRM and customer experience.', l: null },
        { c: 'Teaching and communication', e: '1,000+ professionals and students trained since 2009; IEEE Senior Member and Scopus co-author.', l: { t: 'Courses', h: '/en/courses/' } },
      ],
    },
    fit: {
      k: 'Simulator', t: 'Do I fit your opening?', lead: 'Tick what your role requires and see instantly what I cover, with the proof for each point. I’ll also tell you honestly what isn’t my strength.',
      groups: [
        { k: 'Leadership', items: [
          { id: 'lead-team', t: 'Lead a data team', fit: 'full', proof: 'Teams of 5 to 10 specialists and vendors.' },
          { id: 'lead-strat', t: 'Set data and AI strategy and roadmap', fit: 'full', proof: 'Portfolio of 10 models prioritized by business value.' },
          { id: 'lead-big', t: 'Teams of 20+ people', fit: 'no', proof: 'My largest team was 10 people, specialists and vendors combined.' },
        ] },
        { k: 'Technical', items: [
          { id: 'azure', t: 'Azure (Data Factory, Databricks, Synapse)', fit: 'full', proof: 'Ingestion cut from 10 hours to 45 minutes on Azure.' },
          { id: 'mlops', t: 'MLOps and models in production', fit: 'full', proof: '10 models in production with MLOps and data validation.' },
          { id: 'python', t: 'Python and SQL', fit: 'full', proof: 'Public code on GitHub and teaching Python since 2009.' },
          { id: 'genai', t: 'Generative AI / LLM / RAG', fit: 'full', proof: 'Public assistant on Peru’s data law with measured evaluation.' },
          { id: 'aws', t: 'AWS or Google Cloud in production', fit: 'partial', proof: 'My production work has been on Azure; architecture and MLOps principles carry over.' },
          { id: 'bi', t: 'Power BI or management dashboards', fit: 'full', proof: 'Public Python dashboards and teaching Power BI.' },
        ] },
        { k: 'Governance and business', items: [
          { id: 'gov', t: 'Data governance and quality', fit: 'full', proof: 'Automated data validation and quality rules in MLOps.' },
          { id: 'privacy', t: 'Personal data protection', fit: 'full', proof: 'Public project on Peru’s data protection law.' },
          { id: 'fin', t: 'Banking or microfinance experience', fit: 'full', proof: '14+ years in financial services: risk, collections and channels.' },
          { id: 'retail', t: 'Retail, healthcare or telecom experience', fit: 'partial', proof: 'My direct experience is financial; in class I work on telecom churn cases.' },
          { id: 'crm', t: 'CRM and customer experience', fit: 'full', proof: 'Head of CRM and customer experience across 7 channels.' },
        ] },
        { k: 'Conditions', items: [
          { id: 'lima', t: 'On-site or hybrid in Lima', fit: 'full', proof: 'I live in Lima.' },
          { id: 'remote', t: 'Remote for another country', fit: 'full', proof: 'English C1; I teach live online courses and publish my work on GitHub.' },
          { id: 'english', t: 'Advanced English', fit: 'full', proof: 'Certified English C1 (EF SET).' },
          { id: 'now', t: 'Immediate start', fit: 'full', proof: 'Available immediately.' },
        ] },
      ] as ReqGroup[],
      ui: {
        empty: 'Tick at least one requirement to see the result.', match: 'fit', selected: 'requirements ticked',
        full: 'Covered', partial: 'Partly', no: 'Not my strength',
        verdict: [
          { min: 85, t: 'Very strong fit. Let’s talk.' },
          { min: 65, t: 'Good fit, with points to discuss.' },
          { min: 0, t: 'Partial fit. I’ll tell you plainly where I add value and where I don’t.' },
        ],
        copy: 'Copy summary for the hiring manager', copied: 'Copied', cta: 'Talk on LinkedIn', clear: 'Clear',
        summaryHead: 'Ricardo Dulanto · fit with the role',
      },
    },
    plan: {
      k: 'First 90 days', t: 'How I would start as Head of Data & AI', lead: 'A baseline plan I adjust in the first week to what I find.',
      phases: [
        { d: 'Days 1 to 30', t: 'Listen and measure', items: ['Interviews with business, IT, risk and compliance', 'Inventory of existing data, models and dashboards', 'Baseline for data quality and delivery times'], out: 'An assessment with 3 to 5 opportunities ranked by value' },
        { d: 'Days 31 to 60', t: 'Prioritize and deliver', items: ['Agree on the roadmap with management', 'Data owners for the critical metrics', 'A first visible win: an automated load or a model in pilot'], out: 'An approved roadmap and one measured early win' },
        { d: 'Days 61 to 90', t: 'Scale and govern', items: ['Monthly data-metrics review with management', 'MLOps and quality standards for every new project', 'Training plan for the team and user areas'], out: 'An operating model that keeps working without me in every meeting' },
      ],
    },
  },
} satisfies Record<Lang, unknown>;
