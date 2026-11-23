#!/usr/bin/env node
// Auditoría visual con Playwright: capturas por ancho y tema + chequeos automáticos.
//
// Uso:
//   node .claude/skills/validacion-visual/scripts/shoot.mjs [--base http://localhost:4321] [--pages /,/en/] [--out .qa]
//   npm run qa:visual -- --pages /proyectos/morosidad-microfinanzas/
//
// Variables opcionales:
//   CHROMIUM_PATH  ruta a un Chromium ya instalado (si no, usa el de `npx playwright install chromium`).
//
// Sale con código 1 si encuentra fallos (desborde horizontal, errores de consola, imágenes rotas,
// peticiones fallidas). Los avisos (áreas táctiles pequeñas, contraste) no hacen fallar.

import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => {
    if (a.startsWith('--')) acc.push([a.slice(2), all[i + 1] && !all[i + 1].startsWith('--') ? all[i + 1] : 'true']);
    return acc;
  }, []),
);

const BASE = (args.base || 'http://localhost:4321').replace(/\/$/, '');
const PAGES = (args.pages || '/,/en/,/notas/,/en/notes/').split(',').map((p) => p.trim()).filter(Boolean);
const OUT = args.out || '.qa';
const WIDTHS = (args.widths || '1440,1024,768,390').split(',').map(Number);
const THEMES = (args.themes || 'light,dark').split(',');
const HEIGHTS = { 1440: 900, 1024: 768, 768: 1024, 390: 844, 320: 640 };

const slug = (p) => (p.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'inicio');

const browser = await chromium.launch({
  ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
});

const report = [];
let failures = 0;

for (const pagePath of PAGES) {
  for (const theme of THEMES) {
    for (const width of WIDTHS) {
      const context = await browser.newContext({
        viewport: { width, height: HEIGHTS[width] || 900 },
        deviceScaleFactor: 1,
        colorScheme: theme,
        hasTouch: width <= 768,
        isMobile: width <= 390,
      });
      const page = await context.newPage();
      const consoleErrors = [];
      const failedRequests = [];
      page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()));
      page.on('pageerror', (e) => consoleErrors.push(String(e)));
      page.on('requestfailed', (r) => failedRequests.push(`${r.url()} (${r.failure()?.errorText})`));
      page.on('response', (r) => r.status() >= 400 && failedRequests.push(`${r.url()} (HTTP ${r.status()})`));

      const url = BASE + pagePath;
      let status = 0;
      try {
        const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        status = res?.status() ?? 0;
      } catch (e) {
        consoleErrors.push(`No se pudo abrir ${url}: ${e.message}`);
      }
      await page.waitForTimeout(400); // deja terminar la entrada del hero

      const checks = await page.evaluate(() => {
        const doc = document.documentElement;
        const vw = doc.clientWidth;
        const overflow = doc.scrollWidth - vw;
        const offenders = [];
        if (overflow > 1) {
          for (const el of document.querySelectorAll('body *')) {
            const r = el.getBoundingClientRect();
            if (r.right > vw + 1 && r.width > 0 && getComputedStyle(el).position !== 'fixed') {
              offenders.push(`${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : ''} (right=${Math.round(r.right)})`);
              if (offenders.length >= 5) break;
            }
          }
        }
        const brokenImages = [...document.images]
          .filter((i) => i.complete && i.naturalWidth === 0 && i.loading !== 'lazy')
          .map((i) => i.currentSrc || i.src);
        const smallTargets = [...document.querySelectorAll('a, button, [role="button"], input, select, textarea')]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            if (!r.width || !r.height) return false;
            const inText = el.tagName === 'A' && el.closest('p, li') && getComputedStyle(el).display === 'inline';
            return !inText && (r.height < 44 || r.width < 24);
          })
          .slice(0, 8)
          .map((el) => `${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30)}" ${Math.round(el.getBoundingClientRect().width)}×${Math.round(el.getBoundingClientRect().height)}`);
        const missingAlt = [...document.images].filter((i) => !i.hasAttribute('alt')).map((i) => i.src).slice(0, 5);
        const h1 = document.querySelectorAll('h1').length;
        return { overflow, offenders, brokenImages, smallTargets, missingAlt, h1, lang: doc.lang, title: document.title };
      });

      const dir = path.join(OUT, slug(pagePath));
      await mkdir(dir, { recursive: true });
      const fold = path.join(dir, `${width}-${theme}-pantalla.png`);
      const full = path.join(dir, `${width}-${theme}-completa.png`);
      await page.screenshot({ path: fold });
      await page.screenshot({ path: full, fullPage: true });

      const errors = [];
      if (status >= 400 || status === 0) errors.push(`HTTP ${status}`);
      if (checks.overflow > 1) errors.push(`scroll horizontal de ${checks.overflow}px: ${checks.offenders.join(', ')}`);
      if (checks.brokenImages.length) errors.push(`imágenes rotas: ${checks.brokenImages.join(', ')}`);
      if (consoleErrors.length) errors.push(`consola: ${consoleErrors.slice(0, 5).join(' | ')}`);
      if (failedRequests.length) errors.push(`peticiones fallidas: ${failedRequests.slice(0, 5).join(', ')}`);
      if (checks.h1 !== 1) errors.push(`${checks.h1} elementos h1 (debe haber 1)`);
      const warnings = [];
      if (checks.smallTargets.length) warnings.push(`áreas táctiles < 44px: ${checks.smallTargets.join('; ')}`);
      if (checks.missingAlt.length) warnings.push(`imágenes sin alt: ${checks.missingAlt.join(', ')}`);
      if (!checks.lang) warnings.push('sin atributo lang');

      failures += errors.length;
      report.push({ page: pagePath, theme, width, screenshots: [fold, full], errors, warnings });
      const mark = errors.length ? '✗' : warnings.length ? '△' : '✓';
      console.log(`${mark} ${pagePath} ${width}px ${theme}`);
      for (const e of errors) console.log(`    ERROR  ${e}`);
      for (const w of warnings) console.log(`    aviso  ${w}`);
      await context.close();
    }
  }
}

await browser.close();
await mkdir(OUT, { recursive: true });
await writeFile(path.join(OUT, 'reporte.json'), JSON.stringify(report, null, 2));
console.log(`\nCapturas y reporte en ${OUT}/ — ${failures ? `${failures} error(es)` : 'sin errores automáticos'}.`);
console.log('Recuerda: los chequeos automáticos no sustituyen mirar las capturas.');
process.exit(failures ? 1 : 0);
