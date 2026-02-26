Sección A: Clases de equivalencia (password)

Regla: 
     La contraseña debe tener:
        - Entre 10 y 20 caracteres
        - Incluir al menos una letra mayúscula
        - Incluir al menos un número
        - Incluir al menos un caracter especial
        - No contener espacios

Clases:
    Válida: La contraseña tiene la longitud permitida, incluye al menos una letra mayúscula, un número y un caracter especial y no tiene espacios
    Inválida :  - Menos de 10 caracteres
                - Más de 20 caracteres
                - No tiene por lo menos una letra mayúscula
                - No tiene por lo menos un número
                - No tiene por lo menos un caracter especial
                - Tiene espacios

Casos representativos:

| ID   | Datos       | Clase    | Resultado esperado                                                                                              |
|------|-----------------------|----------|-----------------------------------------------------------------------------------------------------------------|
| TC-1 | @bcdE12345            | Válida   | Se acepta                                                                                                       |
| TC-2 | Abcde1234567          | Inválida | Se rechaza con mensaje de error<br>"Debe incluir al menos un caracter especial"                                 |
| TC-3 | 123@bcde              | Inválida | Se rechaza con mensaje de error<br>"Debe tener al menos 10 caracteres"<br>"Debe incluir al menos una mayúscula" |
| TC-4 | Hol@0123456789111213  | Válida   | Se acepta                                                                                                       |
| TC-5 | Hola@ 12345           | Inválida | Se rechaza con mensaje de error<br>"No puede contener espacios"                                                 |
| TC-6 | Hol@Mund0123456789011 | Inválida | Se rechaza con mensaje de error<br>"No puede contener más de 20 caracteres"                                     |

------------------------------------------------------------------------------------------------------------

Sección B: Valores límite (edad o cantidad)

Regla: Notas de exámen del 1-10 (solo números enteros)

| ID   | Datos | Límite                         | Resultado Esperado                                              |
|------|-------|--------------------------------|-----------------------------------------------------------------|
| TC-1 | 0     | Justo por debajo<br>del mínimo | Se rechaza con un mensaje de error<br>"Ingrese una nota válida" |
| TC-2 | 1     | Mínimo                         | Se acepta                                                       |
| TC-3 | 2     | Justo por encima<br>del mínimo | Se acepta                                                       |
| TC-4 | 9     | Justo por debajo<br>del máximo | Se acepta                                                       |
| TC-5 | 10    | Máximo                         | Se acepta                                                       |
| TC-6 | 11    | Justo por encima<br>del Máximo | Se rechaza con un mensaje de error<br>"Ingrese una nota válida" |
| TC-7 | 5     | Normal                         | Se acepta                                                       |
| TC-8 | 8     | Normal                         | Se acepta                                                       |

------------------------------------------------------------------------------------------------------------

Sección C: Tabla de decisión (regla de negocio)

Regla: 
     Envío FULL gratis si:
        - La compra supera los $50.000
        - Hay stock del producto
        - La compra se efectúa en un rango de 2 horas desde que ingresó el producto al carrito

| Compra > 50.000 | Hay stock | Compra dentro de las 2 hrs. | Acción Esperada       |
|------------------|-----------|-----------------------------|-----------------------|
| 1                | 1         | 1                           | Envío FULL gratis     |
| 0                | 0         | 0                           | Sin envío FULL gratis |
| 1                | 1         | 0                           | Sin envío FULL gratis |
| 1                | 0         | 1                           | Sin envío FULL gratis |
| 0                | 1         | 0                           | Sin envío FULL gratis |
| 1                | 0         | 0                           | Sin envío FULL gratis |
| 0                | 0         | 1                           | Sin envío FULL gratis |
| 0                | 1         | 1                           | Sin envío FULL gratis |