# Servidores MCP de diseño

`.mcp.json` (en la raíz) ya declara, para este proyecto:

- **playwright**: servidor oficial `@playwright/mcp` (navegar, capturar, probar hover/foco).
- **figma**: servidor oficial remoto de Figma (`https://mcp.figma.com/mcp`). No usa token: la
  primera vez, en Claude Code escribe `/mcp`, elige `figma` y pulsa *Authenticate* para entrar
  con tu cuenta de Figma.

## Comprobar qué tienes instalado

```bash
claude mcp list          # lista servidores globales (user), locales y de proyecto
claude mcp get playwright
claude mcp get figma
```

## Instalarlos de forma global (para todos tus proyectos)

```bash
claude mcp add --scope user playwright -- npx -y @playwright/mcp@0.0.86
claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp
```

## Alternativa con token personal de Figma

Solo si prefieres token en vez de iniciar sesión (o usas Figma sin acceso al MCP oficial).

1. Crea el token en Figma: *Settings → Security → Personal access tokens* (permiso de lectura de
   archivos). Empieza por `figd_`.
2. **Pega el token aquí, en tu terminal, no en el repositorio**: añade a `~/.zshrc`
   ```bash
   export FIGMA_API_KEY="figd_PEGA_AQUI_TU_TOKEN"
   ```
   y ejecuta `source ~/.zshrc`.
3. Registra el servidor (global):
   ```bash
   claude mcp add --scope user figma-token -e FIGMA_API_KEY="$FIGMA_API_KEY" -- npx -y figma-developer-mcp@0.13.2 --stdio
   ```
   O, solo para este proyecto, copia el bloque de `figma-token.template.json` dentro de
   `mcpServers` en `.mcp.json`: lee el token de la variable `${FIGMA_API_KEY}`, así que el archivo
   se puede subir sin exponer nada.

Nunca hagas commit de un token real. Si uno se filtra, revócalo en Figma de inmediato.
