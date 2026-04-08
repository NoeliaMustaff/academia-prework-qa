## Revisión de Calidad

### 5 cosas que mejoraron con POM
1. **Selectores centralizados**: los localizadores viven en `pages/`; si cambia el DOM, el impacto se acota a la Page correspondiente.
2. **Steps más legibles**: los step definitions pasaron a ser orquestación (instanciar Pages y llamar métodos) en lugar de mezclar intención del test con detalle de UI.
3. **Reutilización**: login, ir al carrito, agregar producto y checkout se expresan con métodos reutilizables (`login`, `goToCart`, `startCheckout`, etc.).
4. **Separación de responsabilidades**: hooks/world (ciclo de vida del navegador) vs Pages (pantallas) vs steps (lenguaje Gherkin).
5. **Mantenimiento del checkout**: el flujo multi-página (carrito → step one → step two → complete) quedó encapsulado en `CartPage` + `CheckoutPage`, sin repetir pasos en varios archivos.

---

### 3 cosas que todavía me preocupan
1. **Fragilidad por datos en Gherkin**: precios y textos exactos en español/inglés dependen del copy de SauceDemo; un cambio de wording rompe asserts.
2. **Mezcla de estrategias de localización**: en inventario/carrito aún hay CSS (`.inventory_item`, `.cart_item`) por practicidad; me gustaría converger más hacia `getByRole` / criterios accesibles donde sea viable.
3. **Timeouts y entorno**: sin `setDefaultTimeout` (o equivalente), Cucumber corta a 5s y los fallos parecen “de test” cuando en realidad es lentitud de red o del runner; hay que documentar bien el entorno de ejecución.

---

### 5 decisiones de selectores (y por qué)
1. **Login (`getByPlaceholder` + `getByRole` para Login)**: el formulario expone placeholders claros y el botón tiene rol/nombre estable; prioriza accesibilidad y lectura frente a CSS genérico.
2. **Checkout – datos (`getByPlaceholder` en First/Last/Zip y `getByRole` en Continue/Finish)**: imita cómo un usuario “ve” el formulario; evita acoplarse a `data-test` si el objetivo es parecerse a un proyecto real.
3. **Botón Checkout en carrito (`getByRole('button', { name: 'Checkout' })`)**: el texto del botón es el contrato visible de la UI; robusto frente a cambios de clase si el label se mantiene.
4. **Confirmación de pedido (título estable, p. ej. `.complete-header`, y assert por texto del feature)**: el mensaje puede parametrizarse desde Gherkin; el anclaje del nodo es más estable que repetir el texto dentro del locator.
5. **Listado de productos / ítems (`.inventory_item` + `filter` + `getByText` + botón Add to cart)**: SauceDemo no siempre ofrece un `data-test` por fila “amigable” para el nombre del producto; el filtrado por texto refleja la intención del usuario (“esta tarjeta”).