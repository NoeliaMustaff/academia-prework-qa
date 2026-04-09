# Checkout: cómo sumo los precios y comparo con el Item total

1. **`allTextContents()`** (Playwright)  
   Sobre `this.itemPrices` (`locator('.inventory_item_price')`) obtengo un **array de strings** con el texto de cada precio (por ejemplo `"$29.99"`).

2. **Limpieza y número**  
   En cada string uso **`replace('$', '')`** y luego **`parseFloat(...)`** para pasar a número.

3. **Iteración y suma**  
   Recorro ese array y acumulo la suma con **`Array.prototype.reduce`**: el callback recibe un acumulador y cada texto de precio, devuelve `acumulador + parseFloat(textoSinPeso)`. El valor inicial del acumulador es `0`. 

4. **Total en pantalla**  
   Leo el texto de **`this.subtotalLabel`** (`.summary_subtotal_label`), quito el símbolo `$` y aíslo la parte numérica del mensaje para volver a usar **`parseFloat`**.

5. **Aserción**  
   Comparo la suma calculada con el total mostrado usando **`expect(suma).toBeCloseTo(totalMostrado, 2)`** de Playwright, para tolerar decimales en coma flotante sin falsos negativos.

Con esto, si en el escenario cambian los productos agregados al carrito, la suma se **recalcula en vivo** desde la UI; no hay monto esperado fijo en el feature.

## Otras decisiones del entregable

- **Navbar:** selectores del carrito (y menú) viven en `NavbarComponent`; las páginas usan composición (`this.navbar`) y no duplican esos locators.
- **Datos y textos:** credenciales en `data/users.json`; mensajes y URLs en `constants/`.
- **Esperas dinámicas (Parte A):** aserciones tipo `expect(locator).toBeVisible()` / `toBeHidden()` en lugar de `waitForTimeout`.