# ricardodulanto.com

Sitio personal bilingüe (ES/EN) de Ricardo Dulanto: consultoría y liderazgo en IA, Machine Learning y Gobierno de Datos.

- **Stack:** [Astro](https://astro.build) 7, estático, sin base de datos ni servidor de aplicación.
- **Hosting:** Railway (`npm run build` y `npm start`), con Cloudflare delante para el dominio, HTTPS y bloqueo de bots de IA.
- **Analítica:** GA4 cargado solo con consentimiento. El ID de medición (`PUBLIC_GA_ID`) es público por diseño y se define como variable en Railway.
- **Seguridad:** cabeceras CSP, HSTS, X-Frame-Options y Referrer-Policy en `serve.json`. No hay secretos en el repositorio.
- **IA:** `public/robots.txt` bloquea el entrenamiento de modelos (GPTBot, ClaudeBot, CCBot, Google-Extended y otros) y permite los buscadores.

## Publicar un proyecto nuevo

1. Crea `src/content/projects/es/<slug>.md` y `src/content/projects/en/<slug>.md` con el mismo orden de archivo (ver los existentes como plantilla).
2. Agrega las imágenes en `public/img/`.
3. Haz push a `main`. Railway compila y publica solo.

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:4321
npm run build && npm start
```
