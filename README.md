# ricardodulanto.com

Sitio personal bilingüe (ES/EN) de Ricardo Dulanto: consultoría y liderazgo en IA, Machine Learning y Gobierno de Datos.

- **Stack:** [Astro](https://astro.build) 7, estático, sin base de datos ni servidor de aplicación.
- **Hosting:** Cloudflare Workers con archivos estáticos (`wrangler.jsonc`: comando `npm run build`, carpeta `dist`, despliegue `npx wrangler deploy`; las cabeceras de seguridad están en `public/_headers`). También funciona en Railway con `npm start`, que usa `serve.json`. Si cambias una cabecera, cámbiala en los dos archivos.
- **Analítica:** GA4 cargado solo con consentimiento. El ID de medición (`PUBLIC_GA_ID`) es público por diseño y se define como variable en Railway.
- **Seguridad:** cabeceras CSP, HSTS, X-Frame-Options y Referrer-Policy en `serve.json`. No hay secretos en el repositorio.
- **Asistente:** `worker/index.ts` atiende `/api/chat` y responde solo con el texto del sitio, que `scripts/build-kb.mjs` extrae de `dist/` en cada build. Usa Workers AI (`@cf/google/gemma-4-26b-a4b-it`) dentro de la cuota gratuita diaria de Cloudflare (10 000 neuronas, unas 60 preguntas); al agotarse, muestra el botón de agendar hasta las 00:00 UTC. Si se define el secreto `ANTHROPIC_API_KEY` en Cloudflare (Worker → Settings → Variables and Secrets), pasa a usar Claude (de pago). Límite de 8 preguntas por minuto por IP; no guarda conversaciones.
- **IA:** `public/robots.txt` bloquea el entrenamiento de modelos (GPTBot, ClaudeBot, CCBot, Google-Extended y otros) y permite los buscadores.

## Publicar un proyecto nuevo

1. Crea `src/content/projects/es/<slug>.md` y `src/content/projects/en/<slug>.md` con el mismo valor en `ref` (así se enlazan la versión en español y en inglés). Usa los existentes como plantilla; el campo `demo` es el enlace al dashboard en Railway.
2. Agrega las imágenes en `public/img/`.
3. Haz push a `main`. Railway compila y publica solo.

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:4321
npm run build && npm start
```
