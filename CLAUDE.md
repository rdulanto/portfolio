# Reglas del proyecto (sitio ricardodulanto.com)

Sitio estático en Astro 7, bilingüe ES/EN. Ver `README.md` para stack, hosting y cómo publicar.

## Diseño (obligatorio antes de escribir HTML, CSS, componentes o Tailwind)

1. Lee `.claude/skills/diseno-ui-portafolio/SKILL.md`: decisiones de marca fijas (fondo claro,
   Inter, fondo blanco, grafito y acento amarillo `#FFC72C`, modo oscuro opcional), escala tipográfica, escala de
   espaciado de 4px, paleta sobria, estados hover/focus/active y lista de patrones genéricos
   prohibidos.
2. Para animaciones y microinteracciones, aplica `.claude/skills/emil-design-eng/SKILL.md`.
3. Usa siempre los tokens de `src/styles/global.css`; no añadas colores, fuentes ni radios sueltos.
4. Todo cambio de texto visible existe en español y en inglés (`src/i18n.ts` y las colecciones
   `src/content/**/es` y `/en`).

## Validación visual (obligatoria al crear o modificar cualquier vista)

Cada vez que generes o modifiques una vista, componente o estilo, antes de dar la tarea por
terminada:

1. Levanta el servidor local (`npm run dev`, http://localhost:4321).
2. Ábrela con Playwright (`npm run qa:visual -- --pages <rutas>` o el servidor MCP `playwright`)
   en 1440, 1024, 768 y 390 px, en tema claro y oscuro, en ES y EN.
3. Toma las capturas y **míralas**: audita fallos visuales, de alineación, de contraste y de
   responsividad según `.claude/skills/validacion-visual/SKILL.md`.
4. Corrige lo que encuentres y repite hasta que no haya errores. Informa qué revisaste y qué
   corregiste.

## Seguridad y contenido

- Nunca subas tokens ni claves. El token de Figma va en la variable de entorno `FIGMA_API_KEY`
  de tu equipo, no en `.mcp.json` ni en ningún archivo del repo.
- No muestres email ni teléfono, y no nombres a empleadores anteriores en el sitio.
- Si cambias una cabecera de seguridad, cámbiala en `public/_headers` y en `serve.json`.
