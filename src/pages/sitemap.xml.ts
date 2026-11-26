import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { publishedNotes, notePath } from '../lib/notes';
import { services, paths } from '../data/offer';
import { simPaths } from '../data/simulators';

// Se genera al compilar: cada proyecto nuevo entra solo al sitemap.
export const GET: APIRoute = async ({ site }) => {
  const base = site!.toString().replace(/\/$/, '');
  const projects = await getCollection('projects');
  const urls = [
    ...(['es', 'en'] as const).flatMap((l) => [
      paths.home(l), paths.consulting(l), ...services[l].map((s) => paths.service(l, s.slug)),
      paths.courses(l), paths.projects(l), paths.roles(l), paths.about(l), l === 'es' ? '/blog/' : '/en/blog/',
      simPaths.maturity(l),
    ]),
    simPaths.sme,
    ...projects.map((p) => paths.project(p.data.lang, p.data.slug)),
    ...(await publishedNotes()).map((n) => notePath(n.data.lang, n.data.slug)),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((p) => `  <url><loc>${base}${p}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
