// Genera worker/kb.generated.json con el texto visible de cada página compilada (dist/).
// El asistente del sitio responde SOLO con este contenido. Se ejecuta después de `astro build`.
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';
const SKIP = [/^diagnostico\/negocio/]; // simulador de pymes: preguntas, no información sobre Ricardo

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (f === 'index.html') out.push(p);
  }
  return out;
}

const decode = (s) => s
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'")
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));

function text(html) {
  const main = (html.match(/<main[\s\S]*?<\/main>/i) || [html])[0];
  return decode(main
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<(h[1-6])[^>]*>/gi, '\n## ')
    .replace(/<(li)[^>]*>/gi, '\n- ')
    .replace(/<\/(p|div|section|h[1-6]|li|tr|dt|dd|article|header)>/gi, '\n')
    .replace(/<[^>]+>/g, ' '))
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const kb = { es: [], en: [] };
for (const file of walk(DIST).sort()) {
  const rel = relative(DIST, file).split(sep).join('/').replace(/index\.html$/, '');
  if (SKIP.some((r) => r.test(rel))) continue;
  const html = readFileSync(file, 'utf8');
  const title = decode((html.match(/<title>([^<]*)<\/title>/i) || [, ''])[1]).trim();
  const lang = rel.startsWith('en/') ? 'en' : 'es';
  kb[lang].push(`<page url="/${rel}" title="${title.replace(/"/g, "'")}">\n${text(html)}\n</page>`);
}

mkdirSync('worker', { recursive: true });
const out = { es: kb.es.join('\n\n'), en: kb.en.join('\n\n') };
writeFileSync('worker/kb.generated.json', JSON.stringify(out));
console.log(`kb: es ${kb.es.length} páginas / ${out.es.length} car., en ${kb.en.length} páginas / ${out.en.length} car.`);
