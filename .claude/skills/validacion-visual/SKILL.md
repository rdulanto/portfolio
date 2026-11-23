---
name: validacion-visual
description: Flujo obligatorio para auditar visualmente una vista del sitio con Playwright (servidor local, capturas en 4 anchos y 2 temas, chequeos de desborde, consola, imágenes y áreas táctiles) y corregir antes de cerrar cualquier tarea de frontend.
---

# Validación visual con Playwright

Se usa cada vez que se crea o modifica una vista, un componente o un estilo. Una tarea de frontend
no está terminada hasta completar este ciclo sin errores.

## 1. Levantar el servidor local

```bash
npm install            # solo la primera vez
npm run dev            # Astro en http://localhost:4321 (dejarlo corriendo en segundo plano)
```

Para revisar lo que se publica de verdad (cabeceras CSP incluidas): `npm run build && npm start`
y usar `--base http://localhost:3000`.

## 2. Capturar y auditar

Opción A, script del proyecto (rápido y repetible):

```bash
npm run qa:visual                                   # inicio y notas, ES y EN
npm run qa:visual -- --pages /proyectos/<slug>/,/en/projects/<slug>/
```

Genera en `.qa/` (ignorado por git) una captura del primer pantallazo y otra de la página completa
en **1440, 1024, 768 y 390 px**, en **claro y oscuro**, y un `reporte.json`. Falla si hay scroll
horizontal, errores de consola, peticiones o imágenes rotas, o un número de `h1` distinto de 1.
Avisa de áreas táctiles menores de 44px e imágenes sin `alt`.

La primera vez en un equipo nuevo: `npx playwright install chromium`.

Opción B, servidor MCP de Playwright (`.mcp.json`): navegar con `browser_navigate`, cambiar
tamaño con `browser_resize`, capturar con `browser_take_screenshot` y revisar
`browser_console_messages`. Útil para probar interacciones (hover, foco con Tab, menú, cambio de
idioma o de tema).

## 3. Mirar las capturas (no solo el reporte)

Abrir las capturas de las páginas tocadas y revisar contra
`.claude/skills/diseno-ui-portafolio/SKILL.md`:

- Bordes izquierdo y derecho iguales; nada desalineado ni fuera del `.wrap`.
- Jerarquía tipográfica clara; un solo H1; líneas de texto de 65ch como máximo.
- Espaciado de la escala (sin huecos raros ni bloques pegados).
- Nada superpuesto, cortado o bajo la cabecera; botones del hero a ancho completo en 390px.
- Modo oscuro: contraste correcto, sin imágenes con fondo blanco brillante.
- Que ES y EN se vean igual de bien (el texto en español es más largo).
- Estados: pasar por los enlaces con Tab (anillo de foco visible) y hover en escritorio.

## 4. Corregir y repetir

Corregir cada fallo, volver a ejecutar **solo las páginas afectadas** y repetir hasta que no haya
errores ni defectos visibles. Al cerrar la tarea, informar qué se revisó (páginas, anchos, temas)
y qué se corrigió. Si algo no se pudo corregir, decirlo explícitamente.
