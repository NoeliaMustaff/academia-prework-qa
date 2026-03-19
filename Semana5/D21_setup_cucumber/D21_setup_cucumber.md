Noelia Mustaff | Agustín Quintana

•	¿Qué instalaron?
    Instalamos @cucumber/cucumber como dependencia de desarrollo, para poder ejecutar escenarios escritos en formato Gherkin e integrarlos con Playwright.

•	¿Qué estructura armaron?
       features/
     smoke.feature (contiene el escenario escrito en lenguaje Gherkin.)
     step_definitions/
        smoke.steps.js (contiene la implementación de los pasos que ejecuta Playwright.)

•	¿Cómo ejecutaron?
    Script dentro de package.json: "bdd": "cucumber-js"
    Feature en smoke.feature
    Lógica en smoke.steps.js
    Ejecutamos el comando: npm run bdd, que ejecuta cucumber-js, que busca automáticamente los archivos `.feature` y sus correspondientes step definitions.

•	capturas/outputs relevantes si algo falló
    Nada falló, y este fue el resultado de la terminal: 
    1 scenario (1 passed)
    2 steps (2 passed)