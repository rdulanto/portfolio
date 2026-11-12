import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ricardodulanto.com',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
