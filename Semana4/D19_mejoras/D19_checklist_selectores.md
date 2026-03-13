## 10 reglas de cómo elegir selectores:

    1. Priorizar atributos pensados para testing: Si en la app existen data-testid, data-test o data-qa, usarlos primero; suelen ser estables y no cambian con el rediseño.

    2. Preferir getByRole() con nombre: Para botones, links e inputs, usar rol + nombre visible (ej. getByRole('button', { name: 'Login' })) suele ser más estable que clases o estructura del DOM.

    3. Preferir getByLabel() para inputs: Cuando el input tiene <label> o   aria-label, el locator por label es más robusto que por clase o placeholder.

    4. Usar getByPlaceholder() solo si es estable: Sirve cuando el placeholder no cambia con copy/UX; si puede cambiar, es mejor rol, label o data-test.

    5. Evitar selectores por estilo: No depender de clases genéricas (.btn, .card, .container) ni de estilos; cambian con el diseño y rompen tests.

    6. Evitar índices y posiciones: No usar nth-child, .nth(0) ni “el primero/  segundo elemento”; el orden puede cambiar y el test se vuelve frágil.

    7. Evitar XPaths largos: XPaths que dependen de muchos niveles del DOM (ej. //  div/div[2]/div/button) se rompen con pequeños cambios; si usás XPath, que sea corto y con atributos estables.

    8. Escopar con contenedores: Primero ubicar el bloque correcto (por texto, rol  o testid) y después buscar el elemento dentro; reduce ambigüedad y hace el selector más estable.

    9. Un selector, una intención clara: Elegir locators que expresen la intención (qué elemento es) y usar el mismo criterio para interacciones y para expect, sin mezclar estrategias innecesarias.

    10. Validar en DevTools antes y después: Comprobar que el selector matchea un solo elemento y que sigue siendo correcto después de cambios pequeños en copy, orden o estilos.

## 5 ejemplos de “selector frágil → selector mejor” 

    1. Clase genérica → rol + nombre (intención de usuario)

    Frágil: page.locator('.btn.primary')
    Mejor: page.getByRole('button', { name: 'Login' }) — expresa la acción (botón de login) y no depende del estilo.
    
    2. Índice / posición → atributo estable de testing

    Frágil: page.locator('.inventory_item').nth(0).locator('button')
    Mejor: page.locator('[data-test="add-to-cart-sauce-labs-backpack"]') — un solo elemento, estable ante cambios de orden.
    
    3. XPath largo → data-test (o id estable)

    Frágil: page.locator('xpath=//div[@id="root"]/div/div[2]/div[1]/button')
    Mejor: page.locator('[data-test="login-button"]') — corto, único y pensado para tests.
    
    4. Texto genérico que se repite → data-test por elemento

    Frágil: page.getByText('Add to cart') — puede matchear varios.
    Mejor: page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]') —    identifica un solo botón por producto.
   
    5. Estructura del DOM → escopar + rol o data-test

    Frágil: page.locator('div.inventory_item_name >> xpath=.. >> button')
    Mejor: Escopar por contenedor con texto/testid y luego el control:
    page.getByRole('link', { name: 'Sauce Labs Bike Light' }).locator('..').    getByRole('button', { name: 'Add to cart' }) o, si existe: page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]') — un solo selector estable por elemento.