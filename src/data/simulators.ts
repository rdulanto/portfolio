// Contenido de los simuladores de diagnóstico. Todo corre en el navegador del visitante:
// no se guarda ni se envía ninguna respuesta. Para cambiar una pregunta, un texto o un umbral,
// edita este archivo; el motor está en src/scripts/simulator.ts.
import type { Lang } from '../i18n';

/* ------------------------------------------------------------------ */
/* 1. Autodiagnóstico para pymes (solo español, público de Lima)       */
/* ------------------------------------------------------------------ */

export type Rubro = 'resto' | 'farma' | 'hotel' | 'bodega';

export interface SmeOption { t: string; pts: number }
export interface SmeQuestion {
  id: string;
  q: string | Record<Rubro, string>; // pregunta común o una por rubro
  hint?: string;
  options: SmeOption[] | Record<Rubro, SmeOption[]>;
  opp?: string; // oportunidad que se activa si el puntaje es 0 o 1
  scored: boolean;
}
export interface SmeOpportunity {
  id: string; title: string | Record<Rubro, string>; gain: string | Record<Rubro, string>;
  service: 'diag' | 'board' | 'auto';
}

const o = (...t: string[]): SmeOption[] => t.map((x, i) => ({ t: x, pts: i }));

export const sme = {
  rubros: [
    { id: 'resto', t: 'Restaurante', d: 'Cevichería, pollería, menú, café' },
    { id: 'farma', t: 'Farmacia', d: 'Botica o cadena pequeña' },
    { id: 'hotel', t: 'Hotel', d: 'Hostal, hotel o casa de huéspedes' },
    { id: 'bodega', t: 'Bodega', d: 'Bodega, minimarket o tienda' },
  ] as { id: Rubro; t: string; d: string }[],
  questions: [
    {
      id: 'ventas', scored: true, opp: 'registro',
      q: '¿Cómo registras tus ventas?',
      options: o('En un cuaderno', 'En Excel', 'En una caja o POS, sin mirar reportes', 'En un sistema y reviso sus reportes'),
    },
    {
      id: 'margen', scored: true, opp: 'margen',
      q: { resto: '¿Sabes qué platos te dejan más ganancia?', farma: '¿Sabes qué productos te dejan más ganancia?', hotel: '¿Sabes qué tipo de habitación o canal te deja más ganancia?', bodega: '¿Sabes qué productos te dejan más ganancia?' },
      options: o('No lo sé', 'Por intuición', 'Lo calculo de vez en cuando', 'Sí, lo veo en un reporte'),
    },
    {
      id: 'caja', scored: true, opp: 'caja',
      q: '¿Cuánto tardas en cuadrar caja cada día?',
      hint: 'Contando el efectivo, Yape, Plin y tarjetas.',
      options: o('Más de una hora', 'Entre 30 y 60 minutos', 'Entre 10 y 30 minutos', 'Menos de 10 minutos'),
    },
    {
      id: 'stock', scored: true, opp: 'stock',
      q: { resto: '¿Cada cuánto te quedas sin un insumo clave?', farma: '¿Cada cuánto te quedas sin un producto o se te vence algo?', hotel: '¿Cada cuánto te falta algo (amenities, ropa de cama, insumos)?', bodega: '¿Cada cuánto te quedas sin un producto que la gente pide?' },
      options: o('Cada semana', 'Cada mes', 'Rara vez', 'Nunca, tengo alertas'),
    },
    {
      id: 'whatsapp', scored: true, opp: 'whatsapp',
      q: { resto: '¿Cómo atiendes los pedidos por WhatsApp?', farma: '¿Cómo atiendes los pedidos y consultas por WhatsApp?', hotel: '¿Cómo atiendes las consultas y reservas por WhatsApp?', bodega: '¿Cómo atiendes los pedidos por WhatsApp?' },
      options: o('A mano, y a veces se pierden', 'A mano, sin perder ninguno', 'Con respuestas rápidas guardadas', 'Con un sistema que responde solo'),
    },
    {
      id: 'numeros', scored: true, opp: 'tablero',
      q: '¿Cada cuánto revisas los números de tu negocio?',
      options: o('Casi nunca', 'A fin de mes', 'Cada semana', 'Cada día'),
    },
    {
      id: 'rubro', scored: true, opp: 'rubro',
      q: { resto: '¿Mides cuánto insumo se pierde (merma)?', farma: '¿Cómo controlas las fechas de vencimiento?', hotel: '¿Conoces tu ocupación y tarifa promedio por canal (Booking, directo, agencias)?', bodega: '¿Cómo controlas el fiado?' },
      options: {
        resto: o('No lo mido', 'A ojo', 'Cada mes', 'Cada semana, con registro'),
        farma: o('No las controlo', 'Reviso cuando me acuerdo', 'Con una lista en Excel', 'Con alertas automáticas'),
        hotel: o('No', 'Solo la ocupación', 'Ambas, a fin de mes', 'Ambas, cada semana'),
        bodega: o('De memoria', 'En un cuaderno', 'En Excel', 'En una app'),
      },
    },
    {
      id: 'prioridad', scored: false,
      q: '¿Qué te gustaría resolver primero?',
      hint: 'Esto pone tu prioridad en primer lugar del resultado.',
      options: [
        { t: 'Ganar más con lo que ya vendo', pts: 0 },
        { t: 'No quedarme sin stock ni botar producto', pts: 1 },
        { t: 'Cuadrar caja rápido y sin errores', pts: 2 },
        { t: 'No perder pedidos ni clientes', pts: 3 },
      ],
    },
  ] as SmeQuestion[],
  // prioridad elegida (índice de opción) → oportunidad que sube al primer lugar
  priorityOpp: ['margen', 'stock', 'caja', 'whatsapp'],
  // Desempate: qué pesa más en cada rubro (primero = más importante)
  weight: {
    resto: ['margen', 'rubro', 'whatsapp', 'stock', 'caja', 'tablero', 'registro'],
    farma: ['rubro', 'stock', 'margen', 'whatsapp', 'caja', 'tablero', 'registro'],
    hotel: ['rubro', 'whatsapp', 'tablero', 'margen', 'caja', 'stock', 'registro'],
    bodega: ['rubro', 'caja', 'stock', 'margen', 'registro', 'tablero', 'whatsapp'],
  } as Record<Rubro, string[]>,
  // Minutos de cuadre según la respuesta a "caja" (para estimar horas al mes).
  cajaMinutes: [75, 45, 20, 5],
  opportunities: [
    { id: 'registro', service: 'diag', title: 'Registra tus ventas sin esfuerzo', gain: 'Ver las ventas del día en tu celular, sin sumar a mano.' },
    { id: 'margen', service: 'board', title: { resto: 'Conoce el margen de cada plato', farma: 'Conoce el margen de cada producto', hotel: 'Conoce qué canal te deja más', bodega: 'Conoce el margen de cada producto' }, gain: { resto: 'Saber qué platos empujar, cuáles subir de precio y cuáles sacar de la carta.', farma: 'Saber qué productos empujar y qué precios revisar.', hotel: 'Saber dónde invertir en publicidad y qué tarifas ajustar.', bodega: 'Saber qué productos empujar y dónde ajustar precios.' } },
    { id: 'caja', service: 'board', title: 'Cuadra caja en minutos', gain: 'CAJA' },
    { id: 'stock', service: 'auto', title: 'Alertas antes de que falte algo', gain: { resto: 'Comprar a tiempo y no decir “se acabó” en plena hora punta.', farma: 'Reponer a tiempo y no perder ventas por quiebre de stock.', hotel: 'Reponer antes de que el huésped lo note.', bodega: 'Reponer lo que más sale antes de que se acabe.' } },
    { id: 'whatsapp', service: 'auto', title: 'Pedidos por WhatsApp sin perder ninguno', gain: 'Respuestas al instante y cada pedido anotado, aunque estés ocupado.' },
    { id: 'tablero', service: 'board', title: 'Un tablero semanal de 5 minutos', gain: 'Ventas, margen y gastos en una sola vista, sin esperar al cierre de mes.' },
    { id: 'rubro', service: 'board', title: { resto: 'Controla la merma de insumos', farma: 'Alertas de vencimiento', hotel: 'Ocupación y tarifa por canal', bodega: 'Fiado bajo control' }, gain: { resto: 'Saber cuánto se pierde y en qué insumo, para comprar mejor.', farma: 'Rotar a tiempo lo que está por vencer en vez de botarlo.', hotel: 'Ver cada semana ocupación, tarifa promedio y qué canal te trae reservas.', bodega: 'Saber quién te debe, cuánto y desde cuándo, sin depender de la memoria.' } },
  ] as SmeOpportunity[],
  services: {
    diag: { t: 'Diagnóstico Express', d: 'En una semana reviso cómo trabajas hoy y te muestro tus 3 mejores oportunidades, con su ahorro estimado.' },
    board: { t: 'Tablero de Gestión', d: 'Un tablero con tus datos reales (ventas, margen, caja) que revisas en 5 minutos desde el celular.' },
    auto: { t: 'Automatización e IA', d: 'Alertas, respuestas y registros que trabajan solos: WhatsApp, stock, vencimientos.' },
  },
  levels: [
    { max: 5, n: 1, t: 'A ojo', d: 'Tu negocio funciona por experiencia. Hay mucho por ganar con poco esfuerzo.' },
    { max: 11, n: 2, t: 'Con registros', d: 'Ya anotas, pero tus números todavía no te dicen qué hacer.' },
    { max: 16, n: 3, t: 'Con control', d: 'Tienes orden. El siguiente paso es verlo todo en un tablero y ahorrar tiempo.' },
    { max: 21, n: 4, t: 'Decide con datos', d: 'Vas adelante. Lo que sigue es automatizar y sumar IA.' },
  ],
};

/* ------------------------------------------------------------------ */
/* 2. Madurez en datos e IA para empresas (ES y EN)                    */
/* ------------------------------------------------------------------ */

export interface Dimension { id: string; t: string; short: string; items: string[]; action: string; service: 'lead' | 'gov' | 'ml' | 'genai' | 'courses' }

export const maturity: Record<Lang, {
  scale: string[]; levels: { min: number; t: string; d: string }[]; dims: Dimension[];
  services: Record<Dimension['service'], string>;
}> = {
  es: {
    scale: ['No existe', 'A medias', 'En algunas áreas', 'En toda la empresa', 'Se mide y mejora'],
    levels: [
      { min: 0, t: 'Inicial', d: 'Los datos dependen de personas clave y de esfuerzos aislados.' },
      { min: 1.8, t: 'Reactivo', d: 'Hay iniciativas, pero responden a urgencias y no escalan.' },
      { min: 2.6, t: 'Definido', d: 'Existen procesos y roles; falta llevarlos a toda la empresa.' },
      { min: 3.4, t: 'Gestionado', d: 'Los datos se gestionan como activo y se miden.' },
      { min: 4.2, t: 'Optimizado', d: 'La mejora es continua y la IA ya genera valor medible.' },
    ],
    dims: [
      { id: 'strategy', t: 'Estrategia y patrocinio', short: 'Estrategia', service: 'lead', items: ['Hay un responsable de datos con presupuesto propio.', 'Los proyectos de datos e IA se priorizan por valor de negocio.', 'La alta dirección revisa indicadores de datos al menos cada trimestre.'], action: 'Nombrar un responsable de datos e IA y acordar con la gerencia 3 casos priorizados por valor.' },
      { id: 'gov', t: 'Gobierno y calidad de datos', short: 'Gobierno', service: 'gov', items: ['Cada dato crítico tiene un dueño de negocio.', 'Existe un glosario de términos y un catálogo de datos.', 'La calidad de los datos críticos se mide con reglas y alertas.'], action: 'Elegir los 10 datos más críticos, asignarles un dueño y medir su calidad cada semana.' },
      { id: 'platform', t: 'Plataforma de datos', short: 'Plataforma', service: 'ml', items: ['Los datos de las áreas llegan a un repositorio central en la nube.', 'Las cargas de datos son automáticas y se monitorean.', 'Los usuarios acceden a datos confiables sin pedirlos a TI.'], action: 'Automatizar y monitorear las 5 cargas de datos que más reportes alimentan.' },
      { id: 'ml', t: 'Analítica y modelos en producción', short: 'Modelos', service: 'ml', items: ['Hay modelos predictivos en uso diario, no solo pilotos.', 'Los modelos se vigilan y se reentrenan con un proceso definido.', 'Se mide el impacto de negocio de cada modelo.'], action: 'Llevar un caso con datos históricos a producción, con una métrica de negocio y monitoreo desde el día uno.' },
      { id: 'genai', t: 'IA generativa', short: 'IA generativa', service: 'genai', items: ['Hay casos de uso de IA generativa aprobados y medidos.', 'Existe una política de uso seguro de IA (datos personales y confidencialidad).', 'Los asistentes usan información interna con control de acceso.'], action: 'Publicar una política de uso de IA y lanzar un piloto medido sobre documentos internos.' },
      { id: 'people', t: 'Personas y cultura', short: 'Personas', service: 'courses', items: ['Los equipos de negocio usan tableros por sí mismos.', 'Hay un plan de formación en datos e IA.', 'Las decisiones importantes se sustentan con datos.'], action: 'Formar a los líderes de área en lectura de datos y uso responsable de IA, con un caso propio.' },
    ],
    services: { lead: 'Liderazgo de datos e IA', gov: 'Diagnóstico de datos y gobierno', ml: 'Machine Learning y MLOps en Azure', genai: 'Adopción de IA generativa', courses: 'Formación para equipos' },
  },
  en: {
    scale: ['Not in place', 'Partly', 'In some areas', 'Company-wide', 'Measured and improved'],
    levels: [
      { min: 0, t: 'Initial', d: 'Data depends on key people and isolated efforts.' },
      { min: 1.8, t: 'Reactive', d: 'There are initiatives, but they answer urgencies and do not scale.' },
      { min: 2.6, t: 'Defined', d: 'Processes and roles exist; they still need to reach the whole company.' },
      { min: 3.4, t: 'Managed', d: 'Data is managed as an asset and measured.' },
      { min: 4.2, t: 'Optimized', d: 'Improvement is continuous and AI already delivers measurable value.' },
    ],
    dims: [
      { id: 'strategy', t: 'Strategy and sponsorship', short: 'Strategy', service: 'lead', items: ['A data leader has their own budget.', 'Data and AI projects are prioritized by business value.', 'Senior management reviews data metrics at least quarterly.'], action: 'Appoint a data and AI owner and agree with management on 3 use cases ranked by value.' },
      { id: 'gov', t: 'Data governance and quality', short: 'Governance', service: 'gov', items: ['Every critical data element has a business owner.', 'There is a business glossary and a data catalog.', 'Quality of critical data is measured with rules and alerts.'], action: 'Pick the 10 most critical data elements, give each an owner and measure their quality weekly.' },
      { id: 'platform', t: 'Data platform', short: 'Platform', service: 'ml', items: ['Data from every area lands in a central cloud repository.', 'Data loads are automated and monitored.', 'Users reach trusted data without asking IT.'], action: 'Automate and monitor the 5 data loads that feed the most reports.' },
      { id: 'ml', t: 'Analytics and models in production', short: 'Models', service: 'ml', items: ['Predictive models are used daily, not just piloted.', 'Models are monitored and retrained through a defined process.', 'The business impact of each model is measured.'], action: 'Take one use case with historical data to production, with a business metric and monitoring from day one.' },
      { id: 'genai', t: 'Generative AI', short: 'GenAI', service: 'genai', items: ['Generative AI use cases are approved and measured.', 'There is a safe-use AI policy (personal and confidential data).', 'Assistants use internal information with access control.'], action: 'Publish an AI use policy and launch a measured pilot on internal documents.' },
      { id: 'people', t: 'People and culture', short: 'People', service: 'courses', items: ['Business teams use dashboards on their own.', 'There is a data and AI training plan.', 'Major decisions are backed by data.'], action: 'Train area leaders in data literacy and responsible AI use, on a case of their own.' },
    ],
    services: { lead: 'Data and AI leadership', gov: 'Data governance assessment', ml: 'Machine Learning and MLOps on Azure', genai: 'Generative AI adoption', courses: 'Team training' },
  },
};

export const simPaths = {
  sme: '/diagnostico/negocio/',
  maturity: (l: Lang) => (l === 'es' ? '/diagnostico/madurez/' : '/en/assessment/'),
};
