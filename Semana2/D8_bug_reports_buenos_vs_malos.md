Entregable 2: Documento corto “buenos vs malos” (pedido explícito)

Título: El carrito de compras no actualiza el total al modificar la cantidad de productos

    Severidad: Alta

    Prioridad: Alta

    Ambiente: Producción, URL App: https://www.tiendaonline-demo.com, Fecha/hora: 26/02/2026 10:15 ART

    Browser/Dispositivo: Chrome (última versión), Desktop - SO: Windows 10

    Pasos para reproducir: 
        1- Agregar un producto al carrito (ej: Zapatillas – $500.000)
        2- Ir al carrito de compras
        3- Modificar la cantidad del producto de 1 a 3 unidades
        4- Observar el total mostrado en el resumen de compra

    Resultado esperado: Al modificar la cantidad del producto, el sistema recalcula automáticamente el total de la compra en función del nuevo valor y lo muestra en tiempo real (ej: 3 x $500.000 = $1.500.000).

    Resultado actual: El sistema mantiene el total original correspondiente a una sola unidad ($500.000), aunque la cantidad haya sido modificada a 3.

    Evidencia: Capturas de pantalla donde se muestra el carrito con 1 producto y su precio correspondiente, y luego la cantidad modificada y el total que no se actualiza.

    Notas adicionales: Este comportamiento puede generar inconsistencias en el proceso de pago, pérdidas económicas y desconfianza del usuario, ya que el total mostrado no refleja la cantidad real seleccionada.

-----------------------------------------------------------------------------------------------------------

Título: El sistema permite crear contraseñas que no cumplen con los criterios de seguridad definidos

    Severidad: Alta

    Prioridad: Alta

    Ambiente: Producción, URL App: https://www.portalacademico-demo.com/register, Fecha/hora: 26/02/2026 13:10 ART

    Browser/Dispositivo: Chrome (última versión), Desktop - SO: Windows 10

    Pasos para reproducir: 
        1- Ingresar a la pantalla de registro de usuario
        2- Completar los campos obligatorios
        3- En el campo “Password”, ingresar una contraseña que no cumpla con los criterios
        4- Click en el botón “Crear cuenta”

    Resultado esperado: El sistema impide la creación de la cuenta y muestra un mensaje de validación claro indicando qué criterio no se cumple en la contraseña ingresada. (Criterios: 8-12 caracteres, por lo menos un numero, por lo menos una mayúscula, por lo menos un caracter especial, sin espacios)

    Resultado actual: El sistema permite crear la cuenta exitosamente aun cuando la contraseña no cumple con uno o más de los criterios definidos.

    Evidencia: Captura de pantalla del registro exitoso. Dato de password utilizada: abc123

    Notas adicionales: La ausencia de validaciones adecuadas en la creación de contraseñas representa un riesgo de seguridad, ya que permite credenciales débiles que podrían facilitar accesos no autorizados al sistema. 

-----------------------------------------------------------------------------------------------------------

Título: La contraseña no valida bien

    Severidad: Alta

    Prioridad: Alta

    Ambiente: Producción

    Browser/Dispositivo: Chrome 

    Pasos para reproducir: 
        1- Ir a login
        2- Poner una contraseña cualquiera
        3- Crear cuenta

    Resultado esperado: Que valide correctamente la contraseña.

    Resultado actual: La deja pasar aunque no cumple los requisitos.

    Evidencia: Captura de pantalla.

    Notas adicionales: Revisar validaciones.
-----------------------------------------------------------------------------------------------------------

Título: El total del carrito está mal

    Severidad: Alta

    Prioridad: Alta

    Ambiente: Producción

    Browser/Dispositivo: Chrome 

    Pasos para reproducir: 
        1- Agregar un producto al carrito
        2- Cambiar la cantidad

    Resultado esperado: Que el total se actualice correctamente.

    Resultado actual: El total no se actualiza.

    Evidencia: Captura de pantalla.

    Notas adicionales: Revisar cálculo del total.
-----------------------------------------------------------------------------------------------------------

10 reglas de oro para escribir buenos bug reports:

    1- El título debe ser descriptivo y conciso
    2- El bug debe ser reproducible
    3- Separar Resultado esperado vs Resultado actual
    4- Describir el ambiente de forma detallada
    5- Adjuntar evidencia concreta
    6- No mezclar múltiples problemas en un mismo reporte
    7- No usar términos ambiguos
    8- Asignar severidad y prioridad con criterio
    9- Describir los pasos para reproducir de forma clara y concisa
    10- Utilizar notas adicionales para ampliar contexto