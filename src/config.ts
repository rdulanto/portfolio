// Datos públicos del sitio. Nada aquí es secreto.
export const SITE = {
  name: 'Ricardo Dulanto',
  linkedin: 'https://www.linkedin.com/in/rdulanto/',
  github: 'https://github.com/rdulanto',
  // Página de reservas de Google Calendar (cita de 20 min). Mientras esté vacía, el botón lleva a LinkedIn.
  calendar: '',
  // El ID de medición de GA4 es público por diseño; se inyecta al compilar.
  gaId: import.meta.env.PUBLIC_GA_ID ?? '',
};

export const BOOKING = SITE.calendar || SITE.linkedin;
