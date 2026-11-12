// Datos públicos del sitio. Nada aquí es secreto.
export const SITE = {
  name: 'Ricardo Dulanto',
  linkedin: 'https://www.linkedin.com/in/rdulanto/',
  github: 'https://github.com/rdulanto',
  // TODO(Rick): crear el evento de 20 min en Cal.com y confirmar este enlace.
  calendar: 'https://cal.com/rdulanto/20min',
  cv: { es: '/cv/Ricardo_Dulanto_CV_ES.pdf', en: '/cv/Ricardo_Dulanto_CV_EN.pdf' },
  // El ID de medición de GA4 es público por diseño; se inyecta al compilar.
  gaId: import.meta.env.PUBLIC_GA_ID ?? '',
};
