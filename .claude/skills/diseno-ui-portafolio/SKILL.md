---
name: diseno-ui-portafolio
description: Reglas obligatorias de diseño UI/UX del sitio ricardodulanto.com. Léelas antes de escribir o cambiar cualquier HTML, CSS, componente Astro/React o clase Tailwind, y al revisar si una vista se ve genérica o poco profesional.
---

# Reglas de diseño del portafolio

Este archivo es la referencia obligatoria antes de tocar cualquier vista. Resume y adapta al sitio
dos fuentes abiertas (licencia MIT, ver "Fuentes" al final): **Taste Skill** (tasteskill.dev) para
evitar el diseño genérico, y la **ingeniería de diseño de Emil Kowalski** para el movimiento y los
estados. Si una regla de las fuentes choca con este archivo, gana este archivo: las decisiones de
marca de Rick ya están tomadas.

## 0. Decisiones fijas de marca (no se cambian sin que Rick lo pida)

- Paleta D, aprobada por Rick el 2026-11-23: fondo blanco (`--bg #FFFFFF`), tinta grafito `--ink #16181D`,
  amarillo `--mark #FFC72C` (botón principal, punto del logo, resaltador de cifras `.hl`) y ámbar
  oscuro `--accent #8A6400` solo para etiquetas e índices. Los enlaces usan `--link` (grafito). Nunca
  texto amarillo sobre fondo blanco.
  (hover `--accent-ink #0B4855`). Modo oscuro opcional con los tokens de `src/styles/global.css`.
- Tipografía: **Inter Variable** (`@fontsource-variable/inter`) para todo el texto, y **JetBrains Mono
  Variable** (`--mono`) solo para etiquetas técnicas: categorías, índices 01/02, fechas, duraciones y stack
  (clases `.eyebrow`, `.mono`, `.tag`). Aprobado por Rick el 2026-11-23. No añadir otra familia.
- Minimalista y muy profesional. Bilingüe ES/EN: toda vista existe en los dos idiomas y ambas
  versiones deben caber sin romper el diseño (el inglés suele ser más corto, el español más largo).
- Logo: wordmark "ricardo dulanto" + punto amarillo (`src/components/Logo.astro`).
- No mostrar email ni teléfono. No nombrar a empleadores anteriores.
- Todo color, radio y medida sale de los tokens de `:root` en `global.css`. Nada de hex sueltos en
  componentes; si falta un token, se añade a `:root` (y a su variante oscura).

## 1. Jerarquía tipográfica

Una sola escala, usada siempre igual. Máximo 4 tamaños visibles por pantalla.

| Rol | Tamaño | Peso | Interlineado | Tracking |
|---|---|---|---|---|
| H1 (hero) | `clamp(2.25rem, 5vw, 3.5rem)` | 650–700 | 1.08 | -0.025em |
| H2 (sección) | `clamp(1.6rem, 3vw, 2rem)` | 650 | 1.15 | -0.02em |
| H3 (tarjeta) | 1.1rem | 600 | 1.3 | -0.01em |
| Cuerpo | 17px (16px en móvil) | 400 | 1.6 | 0 |
| Lead / entradilla | 1.05rem, color `--muted` | 400 | 1.55 | 0 |
| Eyebrow / etiqueta | .8–.85rem, mayúsculas | 600 | 1.2 | +0.08em |

- Líneas de texto corrido a **65ch como máximo** (`max-width: 65ch`).
- Los títulos grandes llevan tracking negativo; el texto pequeño en mayúsculas, positivo.
- Cifras que cambian o se comparan (métricas, AUC, %): `font-variant-numeric: tabular-nums`.
- La jerarquía se marca con tamaño y peso, no con colores nuevos. Gris (`--muted`) solo para texto
  secundario, y siempre con contraste AA (4.5:1 cuerpo, 3:1 títulos grandes) en claro y oscuro.
- Un solo H1 por página; los encabezados bajan de nivel de uno en uno.
- Nada de texto justificado, ni de cursivas o subrayados decorativos.

## 2. Espaciado consistente

- Escala base de 4px: **4, 8, 12, 16, 24, 32, 40, 48, 64, 88**. No usar valores fuera de la escala
  (nada de 13px, 22px o 37px).
- Sección: 88px de padding vertical en escritorio, 64px en móvil (ya en `section`).
- Contenedor `.wrap`: ancho máximo `--max` (1080px) y 24px de margen lateral (16px en móvil).
  **Bordes izquierdo y derecho iguales**: todo bloque se alinea a `.wrap` o a las columnas del grid.
- Relación de proximidad: el espacio entre un título y su texto es menor que el espacio entre dos
  bloques distintos (p. ej. 12–16px dentro, 40–64px entre bloques).
- Gap de grids y listas de tarjetas: 20–24px. Padding interno de tarjeta: 24px.
- Un solo radio para tarjetas (`--radius` 14px) y píldora (999px) para botones y etiquetas.
  No mezclar más radios.
- Máximo dos cajas anidadas (sección > tarjeta). Nada de tarjeta dentro de tarjeta dentro de panel.

## 3. Paleta sobria

- Tres familias, nada más: neutros (bg, card, sand, line, ink, muted), el amarillo con su ámbar de texto y,
  solo si comunica un estado de datos, un color semántico (p. ej. rojo para morosidad alta en un
  gráfico). El amarillo ocupa poca superficie: botón principal, punto del logo, cifras resaltadas y acentos de la banda oscura.
- **Prohibido**: degradados de colores, violeta o lavanda, neones, fondos con "glow", sombras
  de color, glassmorphism, más de un color de acento.
- Sombras: casi ninguna. Si hace falta separar, primero borde `1px solid var(--line)`; una sombra
  solo en hover de tarjeta enlazada y muy suave (`0 6px 20px -12px rgb(0 0 0 / .18)`).
- El modo oscuro no es invertir colores: usa los tokens oscuros ya definidos, revisa contraste del
  acento (`#4FB3C4`) y que las imágenes no queden con fondo blanco brillante.

## 4. Estados hover, focus y active (obligatorios en todo lo clicable)

Todo enlace, botón y tarjeta enlazada responde visiblemente al puntero y al teclado.

- **Hover** solo en dispositivos con puntero fino, para que en móvil no se quede "pegado":
  ```css
  @media (hover: hover) and (pointer: fine) { .card-link:hover { transform: translateY(-2px); } }
  ```
- Botón principal: el fondo pasa a `--accent-ink`; botón fantasma: fondo `--sand`.
- Tarjeta enlazada: sube 2px y el borde se oscurece; su imagen, si tiene, escala 1.02–1.03 dentro
  de su marco (`overflow: hidden`). La tarjeta nunca crece ni se inclina.
- Enlace de texto: subrayado de 1px con `text-underline-offset: 3px`; en hover el subrayado se
  engrosa o aparece, nunca cambia el tamaño del texto.
- **Active** (presión): `transform: scale(0.97)` en botones (rango 0.95–0.98).
- **Focus**: siempre `:focus-visible` con anillo de 2px del acento y `outline-offset: 3px`.
  Nunca `outline: none` sin reemplazo. El anillo no debe quedar tapado por la cabecera fija.
- Área táctil mínima de **44×44px** para todo control fuera del texto corrido (ampliar con
  padding o un pseudo-elemento si el elemento visible es menor).
- Disabled: opacidad .5 y `cursor: not-allowed`, sin hover.

## 5. Microinteracciones fluidas (Emil Kowalski)

Detalle completo en `.claude/skills/emil-design-eng/SKILL.md`. Lo esencial:

- **¿Debe animarse?** Lo que se usa cientos de veces al día, no. Hover y foco: transición corta.
  Modales, menús, toasts: animación estándar. Solo momentos raros (entrada del hero) pueden
  lucirse un poco más. "Se ve bonito" no es razón suficiente.
- **Curvas** (añadir como tokens en `:root` cuando se usen):
  - `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`: entrar y salir de pantalla (por defecto).
  - `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`: mover algo que ya está en pantalla.
  - `ease` simple para cambios de color. **Nunca `ease-in`** en interfaz.
- **Duraciones**: presión de botón 100–160ms; hover y color 150–200ms; menús y popovers
  150–250ms; modal o panel 200–300ms. Salir ≈20% más rápido que entrar. Nada de interfaz pasa
  de 300ms salvo la entrada única del hero.
- Animar solo `transform` y `opacity`. Nunca `width`, `height`, `margin`, `padding` ni `top`.
- Nunca aparecer desde `scale(0)`: empezar en `scale(0.95)` + `opacity: 0`.
- Popovers y menús crecen desde su disparador (`transform-origin`); los modales, desde el centro.
- Transiciones CSS para lo interrumpible (hover, abrir/cerrar). Keyframes solo para cosas que
  corren una vez.
- Escalonados entre elementos de 30–80ms, y nunca bloquean la interacción.
- `prefers-reduced-motion: reduce`: quitar el movimiento (transform), conservar fundidos de
  opacidad y color. Nada debe quedar oculto si la animación no corre.

## 6. Evitar el diseño genérico ("AI slop")

Tomado y adaptado de Taste Skill. Una vista no se da por buena si tiene cualquiera de estos:

- Hero de plantilla: título centrado vago + subtítulo + dos botones + degradado detrás.
  El primer pantallazo dice **qué hace Rick, para quién y con un dato concreto**.
- Rejilla de tres tarjetas iguales con un icono genérico arriba cada una.
- Iconos dibujados o emojis como decoración. Usar iconos solo si aclaran (y de un mismo set,
  trazo fino, en `currentColor`).
- Animaciones de aparición al hacer scroll en cada tarjeta o sección; parallax en texto;
  scroll-jacking; carruseles; pestañas que rotan solas; tarjetas que se inclinan o siguen al cursor;
  botones "magnéticos".
- Texto de relleno, lorem ipsum, cifras, clientes o testimonios inventados.
- Pies de foto que explican lo obvio bajo cada imagen.
- Palabras vacías en el copy: "innovador", "soluciones integrales", "de vanguardia", "potencia tu
  negocio", "sinergia", "seamless", "next-level". Los títulos nombran cosas; los botones dicen
  verbo + objeto ("Agendar una llamada de 20 min", "Ver el dashboard").
- Varias variantes de botón, de tarjeta o de enlace en el mismo sitio. **Un sistema**: un par de
  botones (principal y fantasma), un estilo de tarjeta, un estilo de enlace.
- Más de dos acciones en el hero; la misma acción repetida más de una vez por pantalla.
- Mostrar el trabajo de verdad: capturas reales de los dashboards, métricas reales del proyecto.

## 7. Responsividad

- Revisar siempre en **1440, 1024, 768 y 390 px** (y 320 para desbordes).
- Nada de scroll horizontal en ningún ancho.
- En 390px: una columna, botones del hero a ancho completo, texto de cuerpo 16px.
- Imágenes con `width`/`height` o `aspect-ratio` para que no salten (CLS), `loading="lazy"`
  salvo la del hero, formatos webp para miniaturas.
- Nada se superpone ni queda bajo la cabecera fija.

## 8. Accesibilidad mínima

- `lang` correcto por idioma (`es` / `en`), `title` y `description` en cada página.
- `alt` descriptivo en imágenes con contenido; `alt=""` en las decorativas.
- Todo control con nombre accesible; nada con `tabindex` mayor que 0.
- El contraste se comprueba en claro **y** en oscuro.

## 9. Antes de dar por terminada una vista

Seguir el flujo de `.claude/skills/validacion-visual/SKILL.md` (servidor local + Playwright +
capturas + correcciones). Ninguna tarea de frontend está terminada sin ese paso.

## Fuentes y atribución

- **Taste Skill** 2.5.1, de Leonxlnx, https://tasteskill.dev · https://github.com/Leonxlnx/taste-skill
  (commit f6b7657), licencia MIT. Copia de referencia del `SKILL.md` original y de
  `system.md`, `motion.md` y `copy-tells.md` en `referencias/taste-skill/` con su `LICENSE`.
  No se instala completo a propósito: reparte paletas y fuentes al azar, añade efectos WebGL y un
  hook de cierre con scripts propios (≈70 MB), lo que chocaría con la marca ya decidida. Si Rick
  quiere probarlo entero: `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"`.
- **Emil Kowalski, skill `emil-design-eng`**, https://github.com/emilkowalski/skills (commit 64eb3de),
  licencia MIT, copiada sin cambios en `.claude/skills/emil-design-eng/`.
- Las secciones 0 a 9 de este archivo son una síntesis propia adaptada al sitio, no una copia.
