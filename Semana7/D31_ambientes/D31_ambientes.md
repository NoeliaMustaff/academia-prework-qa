## Parte A — `environments.json`

**Ruta del archivo:** `academia-prework-qa/Semana7/D31_ambientes/config/environments.json`

**Contenido usado:** dos ambientes, cada uno con al menos `baseUrl`:

| Ambiente  | `baseUrl` |
|-----------|-----------|
| `dev`     | `https://www.saucedemo.com/` |
| `staging` | `https://www.saucedemo.com/` |

---

## Parte B — Loader de configuración (JS)

**Ruta del módulo:** `academia-prework-qa/Semana7/D31_ambientes/config/loadEnvironment.js`

**Comportamiento:**

1. Lee el nombre del ambiente desde `process.env.ENV`. Si no está definido, usa **`dev`** (`process.env.ENV ?? 'dev'`).
2. Carga `environments.json` con import ... with { type: 'json' }.
3. Exporta el objeto `environment` con:
   - `name`: nombre del ambiente activo
   - `baseUrl`: URL base de ese ambiente  
   Si falta la clave en el JSON o no hay `baseUrl`, lanza error y evita correr con configuración inválida.

**Decisión del ambiente:** variable de entorno **`ENV`** (por ejemplo `ENV=dev` o `ENV=staging`).

---

## Parte C — Playwright + Cucumber (`baseURL`)

**Dónde se configura:** `support/hooks.js`, en el hook `Before`, al crear el contexto:

- `await this.browser.newContext({ baseURL: environment.baseUrl })`

**Navegación sin repetir el host:**

- Se importa `environment` desde `config/loadEnvironment.js` (indirectamente el hook ya usa `environment.baseUrl`).
- Los Page Objects / steps usan rutas relativas, por ejemplo:
  - `await this.basePage.open('/')` para la pantalla de login
  - `LoginPage.openSauceDemo()` → `open('/')` apoyado en el `baseURL` del contexto.

**Ejemplo documentado:** *“Con `baseURL` igual a `https://www.saucedemo.com/`, un `page.goto('/')` abre el login sin escribir el dominio en cada step.”*

---

## Parte D — Scripts npm y `cross-env`

**Ubicación de los scripts (ejecución local):** `playwright/package.json` (carpeta `playwright` del workspace; se copia el proyecto D31 allí para correr con el mismo `node_modules`).

**Dependencia:** `cross-env` (devDependency) para que `ENV=...` funcione igual en Windows, Linux y macOS.

**Scripts definidos:**

| Script        | Comando (resumido) |
|---------------|--------------------|
| `test:dev`    | `cross-env ENV=dev cucumber-js` |
| `test:staging`| `cross-env ENV=staging cucumber-js` |

**Cómo ejecutar (desde la carpeta `playwright`):**

```bash
npx cross-env ENV=dev cucumber-js "D31_ambientes/features/**/*.feature" --import "D31_ambientes/support/world.js" --import "D31_ambientes/support/hooks.js" --import "D31_ambientes/steps_definitions/**/*.js" --format progress --format html:D31_ambientes/reports/cucumber-report.html 

npx cross-env ENV=staging cucumber-js "D31_ambientes/features/**/*.feature" --import "D31_ambientes/support/world.js" --import "D31_ambientes/support/hooks.js" --import "D31_ambientes/steps_definitions/**/*.js" --format progress --format html:D31_ambientes/reports/cucumber-report.html
``` 

---

## Parte E — Comando ejecutado (documentación)

**Directorio de trabajo:** carpeta `playwright` del proyecto (`d:\QA-CYS\playwright`).

**Comando usado (una sola línea):**

```bash
npx cross-env ENV=staging DEBUG=pw:api LOG_LEVEL=verbose cucumber-js "D31_ambientes/features/**/*.feature" --import "D31_ambientes/support/world.js" --import "D31_ambientes/support/hooks.js" --import "D31_ambientes/steps_definitions/**/*.js" --format progress --format html:D31_ambientes/reports/cucumber-report.html
```

**Salida en consola (resumen):**

Líneas propias del proyecto: ambiente activo (staging), baseUrl efectiva y nombre de cada escenario.
Muchas líneas adicionales por DEBUG=pw:api (actividad interna de Playwright); volumen alto, adecuado solo para depuración.

**Reporte HTML generado:**

Incluye, con LOG_LEVEL=verbose, adjuntos de texto (text/plain) con el log de peticiones/respuestas acumulado en los hooks; en escenarios fallidos, además screenshot (image/png) si aplica.

---

## Parte F — Adjuntos en el reporte HTML

**Estrategia:** listeners en `page` (`request` y `response`) que acumulan líneas en `this.diagnosticLogLines`; en el hook `After` se adjunta ese texto con `await this.attach(..., 'text/plain')` cuando `LOG_LEVEL=verbose` o cuando el escenario falla. En fallo también se adjunta screenshot `image/png`.

**Qué no cubre:** la salida de `DEBUG=pw:api` en consola no se incorpora automáticamente al HTML; el adjunto es un resumen controlado generado en código.

**Ubicación del reporte generado:** `playwright/D31_ambientes/reports/cucumber-report.html` (ruta relativa al repo; abrir con el navegador).

**Escenario de demostración (fallo intencional):** *Demo fallo reporte D31* (`login.feature`), step *Then forzamos un fallo para ver el reporte*, que lanza un error a propósito para validar adjuntos en el HTML.

### Qué se ve en el reporte (descripción)

- Resumen de la ejecución: la mayoría de escenarios en verde; **un escenario en rojo** (*Demo fallo reporte D31*).
- Al **expandir** ese escenario y el step que falla: el **mensaje de error** (texto del `throw` / stack).
- Sección de **adjuntos / embeddings** del escenario fallido:
  - **Texto** (`text/plain`): líneas tipo `REQ …` / `RES …` (tráfico capturado por los listeners en `hooks.js`).
  - **Imagen** (`image/png`): captura **full page** de la pantalla en el momento del fallo (incrustada en el reporte, no como archivo suelto en disco).

Los escenarios que **pasan** con `LOG_LEVEL=info` no incluyen el adjunto de red; con `LOG_LEVEL=verbose` sí pueden mostrar el texto en escenarios exitosos. El escenario de demo en **fallo** muestra **texto + imagen** aunque no se use verbose.

---

## Parte G — Validación dev y staging

| Ejecución | Comando resumido | `baseUrl` efectiva |
|-----------|------------------|---------------------|
| `ENV=dev` | `npx cross-env ENV=dev … cucumber-js …` (mismos `--import` y `--format` que arriba) | `https://www.saucedemo.com/` |
| `ENV=staging` | `npx cross-env ENV=staging …` | `https://www.saucedemo.com/` |

**Diferencias de comportamiento:** ninguna en la aplicación, porque en `environments.json` ambos ambientes usan la misma URL; la diferencia verificable es el valor de `ENV` / `environment.name` y los logs en consola cuando `LOG_LEVEL` no es `quiet`.