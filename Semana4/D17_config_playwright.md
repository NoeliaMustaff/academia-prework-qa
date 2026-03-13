# Parte A: leer la config y anotar

• ¿Qué valor tiene use.baseURL? (si existe)
    No hay baseURL configurado. La opción aparece comentada en el archivo de configuración.

• ¿Qué browsers/proyectos están configurados? (Chromium/Firefox/WebKit)
    Browsers configurados:
    Chromium
    Firefox
    WebKit

• ¿Hay reporter configurado?
    Se utiliza el reporter HTML de Playwright para generar reportes de ejecución de los tests.

# Parte B: comandos útiles (ejecutar y registrar)

• npx playwright test --help:
    Muestra la lista completa de opciones y parámetros disponibles para ejecutar tests con Playwright desde la línea de comandos.

• npx playwright test --list:
    Lista todos los tests disponibles en el proyecto sin ejecutarlos.

• npx playwright test -g \"\" ("has title"):
    Ejecuta únicamente los tests cuyo nombre coincide con el texto indicado.

# Parte C: cambios controlados en config

1. Cambio realizado:
    Se agregó la configuración headless: false en la sección use.

    Resultado observado:
    Los tests se ejecutan mostrando el navegador en pantalla durante la ejecución.

2. Cambio realizado:
    Se configuró "retries: 1" en el archivo playwright.config.js.

    Resultado observado:
    Si un test falla, Playwright vuelve a ejecutarlo automáticamente una vez.