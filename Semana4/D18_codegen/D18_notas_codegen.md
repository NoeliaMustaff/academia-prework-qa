1. ¿Qué selectores generó?

    En los flujos grabados con Playwright Codegen se generaron principalmente selectores CSS  basados en atributos `data-test`.
    Ejemplos utilizados en el script:

    * `[data-test="username"]`
    * `[data-test="password"]`
    * `[data-test="login-button"]`
    * `[data-test="item-4-title-link"]`
    * `[data-test="add-to-cart"]`
    * `[data-test="shopping-cart-link"]`

    Estos selectores son selectores CSS que utilizan atributos específicos agregados al HTML para testing.

    No se generaron selectores XPath ni roles accesibles, ya que Codegen detectó que los    atributos `data-test` eran más confiables.

2. ¿Qué partes te parecen frágiles?

    Algunos selectores pueden resultar frágiles si cambian los identificadores internos de los  productos. Por ejemplo:

    * `[data-test="item-4-title-link"]`
    * `[data-test="add-to-cart-sauce-labs-backpack"]`
    * `[data-test="add-to-cart-sauce-labs-bike-light"]`

    Estos selectores dependen de nombres específicos de productos.
    Si el nombre del producto cambia o el identificador interno se modifica, el test podría fallar.

    En cambio, los selectores de login (`username`, `password`, `login-button`) son más estables  porque pertenecen a elementos centrales de la aplicación.

3. ¿Qué cosas repetidas ves?

    En los tres tests se repiten varias acciones:   

    * Abrir la página con `page.goto('https://www.saucedemo.com/')`
    * Completar el usuario
    * Completar la contraseña
    * Hacer click en el botón de login  

    Esto significa que el flujo de login está duplicado en cada test.
    En proyectos reales, esta repetición suele evitarse usando herramientas como `beforeEach()` o funciones reutilizables para el login.
