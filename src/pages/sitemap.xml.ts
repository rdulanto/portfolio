import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { publishedNotes, notePath } from '../lib/notes';

// Se genera al compilar: cada proyecto nuevo entra solo al sitemap.
export const GET: APIRoute = async ({ site }) => {
  const base = site!.toString().replace(/\/$/, '');
  const projects = await getCollection('projects');
  const paths = ['/', '/en/', ...projects.map((p) =>
    p.data.lang === 'es' ? `/proyectos/${p.data.slug}/` : `/en/projects/${p.data.slug}/`),
    '/notas/', '/en/notes/', ...(await publishedNotes()).map((n) => notePath(n.data.lang, n.data.slug))];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${base}${p}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
