import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ricardodulanto.com',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // Sin fuentes incrustadas como data: (la CSP solo permite fuentes del propio sitio).
  vite: { build: { assetsInlineLimit: 0 } },
});
