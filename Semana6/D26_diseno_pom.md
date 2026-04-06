1) Qué problema estás viendo hoy

- Selectores y localizadores duplicados en varios pasos.
- Uso directo y repetido de la API de página (locator, fill, click) dentro de los steps en lugar de encapsularlo.
- Steps largos que mezclan navegación, interacción y aserciones en un solo bloque.
- Intención del test mezclada con detalles de la UI (cómo se encuentra cada elemento).
- Acciones comunes (login, agregar al carrito, ir al checkout) no reutilizables de forma uniforme.
- Cambios en la UI que impactan muchos tests a la vez (alto acoplamiento al DOM).
- Inconsistencia al localizar el mismo control (distintas estrategias o selectores equivalentes en distintos flujos).
- Aserciones acopladas a detalles frágiles (orden, primer elemento, URL exacta) sin una abstracción clara.
- Difícil saber dónde actualizar cuando cambia una pantalla concreta (no hay un “dueño” del mapeo página ↔ automatización).
- Legibilidad y mantenimiento empeoran al crecer el número de features y steps.

---

2) Decidir “qué es una Page” en tu app

- LoginPage

    * Abrir la URL base y dejar la pantalla de login lista para usar.
    * Completar usuario y contraseña y enviar el formulario (acción de login).
    * Leer o asertar mensajes de error visibles cuando el login falla.
    * Comprobar que se sigue en login o que la navegación posterior es la esperada (según el escenario).
    * Encapsular los localizadores de campos, botón de envío y mensajes de esa pantalla.

- InventoryPage 

    * Verificar que el listado de productos está cargado y es interactuable.
    * Agregar o quitar productos del carrito desde el listado (por nombre u otro criterio estable del test).
    * Cambiar el criterio de ordenamiento y exponer lecturas del primer ítem (nombre, precio) cuando el test lo necesite.
    * Representar el enlace o icono hacia el carrito si forma parte del “chrome” de esa vista (o delegarlo a otra Page si preferís un solo lugar para el header).
    * Mantener en un solo sitio los selectores de ítems, precios y el control de orden.

- CartPage 

    * Abrir el carrito desde la navegación global y comprobar que la URL o el contenedor corresponden al carrito.
    * Comprobar que un producto aparece en el listado del carrito y leer su precio o cantidad.
    * Iniciar el checkout cuando el flujo lo requiera (transición hacia el primer paso de compra).
    * Eliminar ítems o vaciar el carrito si los escenarios lo cubren.
    * Centralizar localizadores de filas de ítem, totales y botón de checkout de esta pantalla.

- CheckoutPage 

    * Modelar el primer paso (datos de envío o equivalente): completar campos, intentar continuar, leer errores de validación.
    * Modelar el resumen antes de confirmar: revisar ítems y totales si los tests lo validan.
    * Confirmar la compra y llegar a la pantalla de orden completada.
    * Leer el mensaje de éxito o cualquier identificador visible de orden terminada.

---

3) Propuesta de estructura de carpetas

tests/
  pages/
    BasePage.js          # opcional: page, helpers comunes
    LoginPage.js
    InventoryPage.js
    CartPage.js
    CheckoutPage.js
  step_definitions/
    ...
  features/
    ...

---

4) Convenciones de nombres

- Clases y archivos

  * Una clase por pantalla: nombre en PascalCase terminado en Page (LoginPage, InventoryPage).
  * Un archivo por clase, mismo nombre que la clase (LoginPage.js).

- Métodos de acción (verbos / imperativos)

  * Expresan qué hace el usuario o el flujo, no el selector: login, open, addToCart, goToCart, startCheckout, sortBy, fillShippingInfo, finishOrder.
  * Preferir un verbo principal; si hace falta detalle, sufijo claro: addProductToCartByName, openCartFromHeader.
  * Los métodos no devuelven locators crudos hacia afuera; devuelven otras Pages cuando el flujo cambia de pantalla (login → instancia o navegación hacia * InventoryPage), o this si la acción sigue en la misma vista.

- Locators (privados y con nombre de dominio)

  * Convención sugerida: prefijo guión bajo para marcar uso interno (_usernameField, _loginButton, _productList, _cartLink), o agruparlos en un objeto _loc si el equipo lo prefiere.
  * El nombre describe el elemento en la app (“campo usuario”, “botón login”), no la estrategia técnica (“div rojo”); la estrategia (getByRole, getByTestId) queda dentro de la definición del locator.
  * Un mismo control un solo locator en la Page; los steps y otros métodos no redefinen el selector.

- Métodos de lectura / consulta / estado

  * Prefijos get, is, has, expect según el caso: getErrorMessage, getFirstProductName, isLoggedIn, isCartBadgeVisible, hasProductInCart.
  * Si el test solo necesita texto o booleano, el método devuelve eso; si la aserción es sistemática de Playwright, puede ser expectErrorVisible(message) o similar para mantener el patrón del proyecto.
  * Evitar nombres ambiguos: checkLogin → mejor isOnInventory o expectInventoryLoaded según lo que realmente validás.

---

5) Lista de migración (plan corto)

| Step actual | Dónde vive hoy | A dónde iría |
| ----------- | ---------- | ---------- |
| Navegar a URL | common.steps.js | `BasePage.goto()` / `LoginPage.open()` |
| Login completo (precondición) | common.steps.js | `LoginPage.login()` + `InventoryPage.expectLoaded()` |
| Login con usuario y clave | common.steps.js | `LoginPage.login()` |
| Ver URL del catálogo | login.steps.js | `InventoryPage.expectLoaded()` |
| Ver listado de productos | login.steps.js | `InventoryPage.expectProductListVisible()` |
| Ver mensaje de error de login | login.steps.js | `LoginPage.expectErrorMessage()` |
| Seguir en pantalla de login | login.steps.js | `LoginPage.expectStillOnLogin()` |
| Agregar producto al carrito | carrito.steps.js | `InventoryPage.addToCart()` |
| Abrir carrito y validar ítem y precio | carrito.steps.js | `CartPage.open()` + `CartPage.expectLineItemWithPrice()` |
| Ordenar productos | ordenar.steps.js | `InventoryPage.sortBy()` |
| Validar primer producto / precio | ordenar.steps.js | `InventoryPage.expectFirstProductName()` / `expectFirstProductPrice()` |