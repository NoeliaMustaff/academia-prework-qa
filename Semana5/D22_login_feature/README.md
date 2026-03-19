Noelia Mustaff | Celeste Olmedo

# Selectores utilizados y justificación

Para esta automatización se decidió no utilizar `data-test`, ya que en entornos reales muchas veces estos atributos no están disponibles.

En su lugar, se usaron selectores más cercanos al comportamiento del usuario:

# Inputs (usuario y contraseña)

getByPlaceholder('Username')
getByPlaceholder('Password')

Se eligieron porque representan el texto visible dentro de los campos
No dependen de atributos técnicos internos

---

# Botón de login

getByRole('button', { name: 'Login' })

Es la forma recomendada por Playwright
Más robusto y mantenible

---

# Mensaje de error

getByRole('heading', { name: errorText })

Permite validar dinámicamente distintos mensajes
Usa accesibilidad en lugar de clases o IDs

---

# Validación de pantalla de productos

getByText('Products')

Se utilizó porque el elemento no tenía un rol semántico (no era un heading)
Permite validar contenido visible al usuario

---

# Contenedor de productos

locator('.inventory_container')

Opción recomendada por SelectorHub

---

# Assertions utilizadas

# Login exitoso

await expect(page).toHaveURL(/inventory\.html/);
await expect(page.getByText('Products')).toBeVisible();

Se valida:

* Redirección correcta (URL)
* Presencia de contenido clave en pantalla

---

# Login fallido (usuario bloqueado)

await expect(error).toBeVisible();
await expect(page).toHaveURL('https://www.saucedemo.com/');

Se valida:

* Visualización del mensaje de error
* Permanencia en la pantalla de login

---

# Sesión no creada

await expect(page).not.toHaveURL(/inventory\.html/);

Se asegura que el usuario no accede al sistema