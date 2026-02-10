Pareja: Noelia Mustaff | Agustín Quintana
--------------------------------------------------------------------
# Historia: HU-01

Como: Usuario de Supermercados DÍA.
Quiero: Agregar productos al carrito.
Para: evaluar mi compra y decidir qué productos y cantidades adquirir.

Valor de negocio:
- Permite que el usuario organice sus compras, compare precios, evalúe una posible compra múltiple u obtenga un descuento.

Criterios de aceptación:
1. El usuario puede agregar múltiples unidades del mismo producto desde el carrito.
2. Al modificar la cantidad de productos, el total de la compra que se muestra se debe modificar.
3. Se debe mostrar un "Resumen de Compra" con los datos de los productos, costo de envío, total y continuar con la compra.
4. Si se pierde la conexión a internet, el sistema debe permitir retomar la compra una vez restablecida la conexión.
5. Se debe poder agregar un código de cupón de descuento en caso de que el usuario lo tenga.

Notas de QA:
- Supuestos: El usuario está registrado en la plataforma, y cuenta con los medios digitales para hacer el pago.
- Riesgos: Que dos usuarios intenten comprar el último artículo en stock al mismo tiempo. Que el precio del producto cambie mientras está en el carrito.
- Preguntas: ¿Existe un límite máximo de unidades por producto para sumar al carrito?

Ideas de prueba:
- Happy path: El usuario agrega productos al carrito y realiza la compra.
- Negativo 1: El usuario no puede realizar el pago por fondos insuficientes.
- Negativo 2: El usuario intenta agregar al carrito una cantidad mayor al stock disponible.
- Límite: Que supere el límite de tiempo de espera en la pantalla de pago.
- Validación: Se muestra una confirmación de compra donde detalla los datos de los productos, datos del usuario, medio de pago y total de la compra.

--------------------------------------------------------------------

# Historia: HU-02

Como: Usuario de Mercado Pago.
Quiero: Realizar una transferencia a otro usuario.
Para: Pagar una compra a un vendedor independiente.

Valor de negocio:
- Permite a los usuarios enviar dinero entre cuentas, fomentando el uso de la plataforma y mejorando la experiencia del cliente.

Criterios de aceptación:
1. El usuario puede ingresar el alias, CBU/CVU, celular o nombre del destinatario como método de identificación.
2. El sistema valida que el destinatario tenga una cuenta antes de realizar la transferencia.
3. El usuario puede ingresar el monto a transferir y visualizar el saldo disponible.
4. Al completar la operación, se muestra un comprobante con los datos de la transferencia.
5. El sistema debe solicitar una confirmación explícita antes de ejecutar la transferencia.

Notas de QA:
- Supuestos: Ambos usuarios tienen una cuenta en una billetera virtual o aplicación bancaria para realizar la transferencia.
- Riesgos: El destinatario recibe transferencias duplicadas por fallas de conexión. El usuario no tiene opción de cancelar o revertir la transferencia luego de confirmarla.
- Preguntas: ¿Se puede programar una transferencia a futuro?

Ideas de prueba:
- Happy path: El dinero se transfiere correctamente.
- Negativo 1: El usuario intenta transferir más dinero del saldo disponible.
- Negativo 2: El usuario no puede realizar la transferencia por conexión inestable.
- Límite: El monto de transferencia excede el límite permitido.
- Validación: El sistema muestra claramente los datos del destinatario antes de la confirmación final. Se genera un comprobante de la transferencia que se puede descargar y compartir. El sistema notifica al usuario cuando la transferencia fue exitosa. 

--------------------------------------------------------------------

# Historia: HU-03

Como: Usuario de ARCA.
Quiero: Generar un comprobante electrónico.
Para: Respaldar la presentación de una factura.

Valor de negocio:
- Permite generar comprobantes de manera digital para brindar mayor comodidad al usuario, evitando la compra de talonarios o completar de forma manual las facturas.

Criterios de aceptación:
1. El sistema debe permitir que el usuario elija que tipo de comprobante desea generar.
2. El usuario debe poder descargar el comprobante generado.
3. Al emitir una factura el sistema la registra automáticamente en ARCA.
4. El sistema valida que los datos ingresados sean correctos antes de emitir la factura.

Notas de QA:
- Supuestos: El usuario está registrado.
- Riesgos: El usuario accidentalmente bloquea su cuenta por no recordar la contraseña y superar el límite de intentos para volver a ingresarla.
- Preguntas: ¿Cuántos intentos puede hacer como máximo ante una contraseña incorrecta?

Ideas de prueba:
- Happy path: El usuario esta registrado, ingresa al sistema y genera el comprobante.
- Negativo 1: El usuario intenta generar un comprobante sin completar campos obligatorios (CUIT, importe, tipo de comprobante, etc).
- Negativo 2: El usuario está registrado pero olvidó su contraseña.
- Límite: El usuario quiere ingresar una contraseña incorrecta más veces de lo permitido.
- Validación: Se muestra un ejemplo final de como queda el comprobante con una para confirmación del alta del documento.