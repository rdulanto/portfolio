# ricardodulanto.com

Sitio personal bilingüe (ES/EN) de Ricardo Dulanto: consultoría y liderazgo en IA, Machine Learning y Gobierno de Datos.

- **Stack:** [Astro](https://astro.build) 7, estático, sin base de datos ni servidor de aplicación.
- **Hosting:** Cloudflare Pages (comando `npm run build`, carpeta `dist`; las cabeceras de seguridad están en `public/_headers`). También funciona en Railway con `npm start`, que usa `serve.json`. Si cambias una cabecera, cámbiala en los dos archivos.
- **Analítica:** GA4 cargado solo con consentimiento. El ID de medición (`PUBLIC_GA_ID`) es público por diseño y se define como variable en Railway.
- **Seguridad:** cabeceras CSP, HSTS, X-Frame-Options y Referrer-Policy en `serve.json`. No hay secretos en el repositorio.
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
