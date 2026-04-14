## 1) HTML clásico + Allure

### HTML clásico (Cucumber)

- **Decisión:** mantener el reporte HTML nativo de Cucumber junto con Allure para comparar enfoques y cumplir pipelines que solo pidan un HTML simple.
- **Comando usado (ejemplo `ENV=staging`, `LOG_LEVEL=verbose`):**

```bash
npx cross-env ENV=staging LOG_LEVEL=verbose cucumber-js "D32_reportes_y_screenshots/D31_ambientes/features/**/*.feature" --import "D32_reportes_y_screenshots/D31_ambientes/support/world.js" --import "D32_reportes_y_screenshots/D31_ambientes/support/hooks.js" --import "D32_reportes_y_screenshots/D31_ambientes/steps_definitions/**/*.js" --format progress --format html:D32_reportes_y_screenshots/D31_ambientes/reports/cucumber-report.html
```

- **Archivo generado:** `playwright/D32_reportes_y_screenshots/D31_ambientes/reports/cucumber-report.html`
- **Cómo abrirlo:** abrir ese archivo con Chrome o Edge (doble click o “Abrir con…”).

### Allure

- **Decisión:** usar el formatter `allure-cucumberjs/reporter` en la misma corrida que el HTML clásico.
- **Comando de ejecución de tests (incluye Allure + HTML clásico):**

```bash
npx cross-env ENV=staging LOG_LEVEL=verbose cucumber-js "D32_reportes_y_screenshots/D31_ambientes/features/**/*.feature" --import "D32_reportes_y_screenshots/D31_ambientes/support/world.js" --import "D32_reportes_y_screenshots/D31_ambientes/support/hooks.js" --import "D32_reportes_y_screenshots/D31_ambientes/steps_definitions/**/*.js" --format progress --format html:D32_reportes_y_screenshots/D31_ambientes/reports/cucumber-report.html --format allure-cucumberjs/reporter
```

- **Carpeta de resultados crudos (`allure-results`):** `playwright/allure-results/` (salida por defecto del formatter con `cwd` en `playwright`).
- **Comando para generar el sitio estático:**

```bash
npx allure generate allure-results --clean -o allure-report
```

- **Carpeta del reporte generado:** `playwright/allure-report/` (abrir `index.html`).
- **Cómo abrirlo en local:** `npx allure open allure-report` o abrir `allure-report/index.html` en el navegador.

---

## 2) Exportación para un cliente (zip)

- **Qué se entrega en el zip (decisión práctica):**
  - carpeta `allure-report/` completa (sitio estático);
  - opcional: `D32_reportes_y_screenshots/D31_ambientes/reports/cucumber-report.html`;
  - opcional: `D32_reportes_y_screenshots/D31_ambientes/reports/pw-api-stderr.log` si la corrida usó `DEBUG=pw:api`;
  - opcional: `D32_reportes_y_screenshots/D31_ambientes/visual-baselines/` para trazabilidad de regresión visual.
- **Instrucciones para el receptor:** descomprimir el zip y abrir `allure-report/index.html` en el navegador.

---

## 3) Log `DEBUG=pw:api` (o resumen equivalente) por job

- **Estrategia elegida (combinada):**
1. **Resumen HTTP por escenario** (estrategia tipo D31): listeners `page.on('request')` y `page.on('response')` en `support/hooks.js`, líneas acumuladas en `diagnosticLogLines`. Se adjuntan con `this.attach(..., 'text/plain')` si `LOG_LEVEL=verbose` o si el escenario **falló**.
  2. **Volcado crudo de `DEBUG=pw:api` por corrida:** stderr redirigido a archivo en el comando; en **fallo** se lee ese archivo y se adjunta al reporte (misma corrida).

- **Cómo se genera el volcado `pw:api`:** variable `DEBUG=pw:api` (vía `cross-env`) y redirección de stderr del proceso a un `.log`. En **cmd.exe** se usa `set PW_API_LOG_PATH=...` para que el hook sepa qué archivo leer y `2>` hacia ese mismo path.

- **Ejemplo de comando completo (staging + verbose + Allure + HTML + log stderr):**

```cmd
set PW_API_LOG_PATH=D32_reportes_y_screenshots\D31_ambientes\reports\pw-api-stderr.log && npx cross-env ENV=staging LOG_LEVEL=verbose DEBUG=pw:api cucumber-js "D32_reportes_y_screenshots/D31_ambientes/features/**/*.feature" --import "D32_reportes_y_screenshots/D31_ambientes/support/world.js" --import "D32_reportes_y_screenshots/D31_ambientes/support/hooks.js" --import "D32_reportes_y_screenshots/D31_ambientes/steps_definitions/**/*.js" --format progress --format html:D32_reportes_y_screenshots/D31_ambientes/reports/cucumber-report.html --format allure-cucumberjs/reporter 2> D32_reportes_y_screenshots\D31_ambientes\reports\pw-api-stderr.log
```

- **Dónde queda el archivo de log:** `playwright/D32_reportes_y_screenshots/D31_ambientes/reports/pw-api-stderr.log`

- **Cómo llega al reporte:** en `support/hooks.js`, hook `After`: si el escenario falló, si existe `process.env.PW_API_LOG_PATH` y el archivo está en disco, se lee y se hace `await this.attach(pwApiText, 'text/plain')`. Así el volcado pesado no se adjunta en escenarios verdes.

---

## 4) Screenshots (fallo + modo adicional)

- **Screenshot en fallo:** implementado en `support/hooks.js`, hook `After`: si `scenario.result?.status === Status.FAILED` y hay `this.page`, se hace `page.screenshot({ fullPage: true })` y `await this.attach(..., 'image/png')`.

- **Modo adicional (ambos cubiertos en código):**
  - **AfterStep (auditoría, desactivado por defecto):** en `hooks.js`, `AfterStep` solo actúa si `process.env.SCREENSHOT_EACH_STEP === 'true'`; adjunta captura full page tras cada step. En corridas normales no se define la variable, para no inflar el reporte.
  - **Bajo demanda en un step:** en `steps_definitions/login.steps.js`, step `Then('veo el error de tipo {string}', ...)`: después de `assertError` se captura la pantalla y se adjunta como `image/png` (evidencia de negocio: mensaje de error visible en login).

---

## 5) Validación visual (opcional recomendado)

- **Enfoque usado:** **Opción A** de la consigna — `pixelmatch` + `pngjs`, baselines en disco, helper `support/visualCompare.js` (misma lógica que el ejemplo del curso: crear baseline con `VISUAL_UPDATE=1` o si no existe archivo; en diferencia se adjuntan actual, baseline y diff y se lanza error con métrica).

- **Dónde se aplica en los tests:** step `When('agrego el producto {string} al carrito', ...)` en `steps_definitions/common.steps.js`: tras `addToCart` y `expectCartBadgeCount(1)` se compara contra `inventory/despues-agregar-{slugDelNombre}.png` (slug derivado del nombre del producto para el `Scenario Outline` de carrito).

- **Ubicación de baselines:** `playwright/D32_reportes_y_screenshots/D31_ambientes/visual-baselines/` (ruta resuelta con `process.cwd()` = `playwright`).

- **Parámetros usados en la comparación:** `threshold: 0.1`, `maxDiffRatio: 0` (comparación estricta a nivel de ratio; cualquier diferencia por encima de 0 falla el step).

- **Cómo actualizar baselines de forma intencional:** ejecutar con `VISUAL_UPDATE=1` (solo cuando hay cambio de UI aceptado o primera generación). Ejemplo:

```bash
npx cross-env VISUAL_UPDATE=1 ENV=staging cucumber-js "D32_reportes_y_screenshots/D31_ambientes/features/**/*.feature" --import "D32_reportes_y_screenshots/D31_ambientes/support/world.js" --import "D32_reportes_y_screenshots/D31_ambientes/support/hooks.js" --import "D32_reportes_y_screenshots/D31_ambientes/steps_definitions/**/*.js" --format progress
```

- **Qué pasa si falla:** según `visualCompare.js`, se adjuntan buffers PNG (actual, baseline leída, imagen diff) y se lanza un error con cantidad de píxeles distintos y porcentaje del área.

---

## Qué le importa a un stakeholder

- **Resumen pasados / fallidos:** da una respuesta rápida sobre si la corrida es aceptable y qué flujos rompieron.
- **Reporte Allure empaquetado (`allure-report/`):** permite revisar resultados sin clonar el repositorio ni instalar dependencias.
- **Resumen HTTP (REQ/RES) y, en fallos, log `DEBUG=pw:api`:** aportan trazabilidad de lo que hizo el navegador y de la actividad interna de Playwright cuando hace falta depurar.
- **Screenshot en fallo:** muestra el estado real de la UI en el momento del error; reduce ambigüedad (“en mi máquina pasaba”).
- **Capturas bajo demanda (login con error esperado):** evidencia entendible de reglas de negocio visibles (mensajes de validación).
- **Regresión visual (pixelmatch):** detecta cambios de interfaz respecto a una referencia acordada; requiere disciplina al actualizar baselines.
- **Riesgos:** fallos en login, carrito o checkout suelen ser críticos para confianza en el producto; conviene priorizar su revisión y evidencia asociada.
