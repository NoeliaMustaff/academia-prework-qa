Pareja: Noelia Mustaff | Celeste Olmedo
--------------------------------------------------------------------

# Historia: HU-01 "Inicio de Sesión"

| Historia | ID    | Riesgo                                                                                   | Tipo  | Impacto | Prob. | Mitigación                                                                                                                                  |
|:--------:|-------|------------------------------------------------------------------------------------------|-------|---------|:-----:|---------------------------------------------------------------------------------------------------------------------------------------------|
| HU-01    | Ri-1 | Iniciar sesión con credenciales incorrectas.                                             | Funcional | Alto    | Baja  | Pruebas con credenciales incorrectas.                                                                                                       |
| HU-01    | Ri-2 | Al presionar el botón de iniciar sesión ingresa aunque los campos estén incompletos. | Funcional | Alto    | Baja  | Deshabilitar el botón hasta que los campos estén completos. Validar en el frontend y el backend que los  campos sean obligatorios. |
| HU-01    | Ri-3 | No muestra mensaje de error ante credenciales incorrectas.                            | Funcional | Medio   | Media | Verificar mensaje visible y claro en la interfaz.                                                                                           |
| HU-01    | Ri-4 | Bloqueo de cuenta, sin aviso, ante intentos reiterados.                               | Negocio | Alto    | Media | Validar límite de intentos. Mostrar un mensaje de advertencia con el límite de intentos restantes.                                    |
| HU-01    | Ri-5 | Pérdida de confianza por fallas en autenticación.                                        | Negocio | Alto    | Baja  | Pruebas en el flujo de autenticación.                                                                                                       |
| HU-01    | Ri-6 | Falta de encriptación ante datos sensibles.                                              | Técnico | Alto    | Baja  | Verificar sistema de verificación en el backend. Evaluar otro servicio de encriptación en caso de fallas reiteradas.                  |

-------------------------------------------------------------------

# Historia: HU-02 "Carrito de compra"

| Historia | ID     | Riesgo                                                                                                                    | Tipo  | Impacto | Prob. | Mitigación                                                                                                                 |
|----------|--------|---------------------------------------------------------------------------------------------------------------------------|-------|---------|-------|----------------------------------------------------------------------------------------------------------------------------|
| HU-02    | Ri-7  | Se permite agregar más unidades que el stock disponible.                                                                | Funcional | Alto    | Media | Pruebas de actualización del límite de stock luego de una compra.                                                       |
| HU-02    | Ri-8  | El total no se actualiza correctamente al modificar cantidades de productos. | Funcional | Alto    | Media | Pruebas de cálculo con distintos escenarios (descuentos, envío, múltiples cantidades).                                  |
| HU-02    | Ri-9  | No se muestra correctamente el resumen de compra.                                                                         | Funcional | Medio   | Baja  | Verificar que incluya toda la información disponible y necesaria antes de confirmar la compra.                       |
| HU-02    | Ri-10 | El precio de un producto en el carrito cambia y no se  notifica al usuario.                                            | Negocio | Alto    | Media | Mostrar un mensaje de advertencia con actualización del precio.                                                         |
| HU-02    | Ri-11 | Cobro incorrecto de envío por mal cálculo.                                                                                | Negocio | Alto    | Baja  | Validar función del cálculo por zona geográfica.                                                                           |
| HU-02    | Ri-12 | Falla de conexión durante el proceso de pago por caída del servidor.                                                   | Técnico | Alto    | Media | Validar que el sistema maneje correctamente errores del tipo 500. Hacer pruebas de simulación de caída del servidor. |

-------------------------------------------------------------------

# Historia: HU-03 "Transferencia bancaria"

| Historia | ID     | Riesgo                                                                                                                    | Tipo  | Impacto | Prob. | Mitigación                                                                                                                 |
|----------|--------|---------------------------------------------------------------------------------------------------------------------------|-------|---------|-------|----------------------------------------------------------------------------------------------------------------------------|
| HU-03    | Ri-13 | Monto descontado superior al monto enviado.                                                           | Funcional | Alto    | Baja  | Validación de monto en el backend antes de confirmar el pago.                                                                              |
| HU-03    | Ri-14 | Cierre de sesión por límite de tiempo superado.                                                       | Funcional | Medio   | Media | Mostrar alerta con el tiempo restante de sesión.                                                                                              |
| HU-03    | Ri-15 | Bloqueo temporal por superar el límite de Transacciones diarias.                                  | Funcional | Medio   | Alta  | Mensaje claro inicial de cantidad de transacciones días permitidos. Aumentar límite según frecuencia de ingreso del usuario.           |
| HU-03    | Ri-16 | Pérdida de clientes por transacciones duplicadas.                                                  | Negocio  | Alto    | Media  | Validar los ID de transacción en el backend. Verificar doble confirmación.                                                                |
| HU-03    | Ri-17 | Nuevas regulaciones legales para transacciones bancarias.                                          | Negocio  | Medio   | Media |Revisar periódicamente las normativas vigentes.                                                                                               |
| HU-03    | Ri-18 | Alta demora en impacto de pagos por alto volumen de transacciones simultáneas.                     | Técnico   | Medio   | Alta  |Realizar pruebas de carga y de estrés Monitorear en tiempo real la cantidad de transacciones.                                            |

-------------------------------------------------------------------

Top 5: Riesgos de todo el Sistema:

1. Ri-1: Iniciar sesión con credenciales incorrectas. Este riesgo tiene máxima prioridad porque si no se validan las credenciales de ingreso, las cuentas quedan vulnerables a ingresos no autorizados, lo que derivar en robo de información, dinero y pérdida de reputación para la empresa.

2. Ri-13: Monto descontado superior al monto enviado.

3. Ri-16: Pérdida de clientes por transacciones duplicadas. 

4. Ri-11: Cobro incorrecto de envío por mal cálculo. 

Estos riesgos generan un impacto económico directo en el cliente y pueden causar problemas legales, reclamos y pérdida de credibilidad por parte del cliente.

5. Ri-17: Nuevas regulaciones legales para transacciones bancarias. El impacto es alto porque puede implicar multas, cambios obligatorios en el sistema o bloqueo de operaciones.

-------------------------------------------------------------------

Mini plan de pruebas:

| Nombre de Prueba                                                                                                                       | Prioridad |
|----------------------------------------------------------------------------------------------------------------------------------------|-----------|
| El usuario ingresa con credenciales válidas.                                                                                           | Alta      |
| El usuario intenta ingresar con credenciales incorrectas.                                                                              | Alta      |
| El usuario intenta ingresar con campos obligatorios vacíos.                                                                            | Media     |
| El usuario agrega productos al carrito y realiza la compra.                                                                            | Alta      |
| El usuario intenta agregar al carrito una cantidad mayor al stock disponible.                                                          | Media     |
| Se muestra una confirmación de compra donde detalla los datos de los productos, datos del usuario, medio de pago y total de la compra. | Baja      |
| El usuario transfiere dinero y que se resta correctamente de la cuenta.                                                                | Alta      |
| El usuario transfiere a otra cuenta el monto "0".                                                                                      | Baja      |
| El usuario intenta transferir más dinero del saldo disponible.                                                                         | Media     |
| Al transferir se genera un comprobante de la transferencia que se puede descargar y compartir.                                         | Media     |

-------------------------------------------------------------------

¿Qué evidencia guardarían?

Como evidencia guardaríamos comprobantes de transferencia, mails de confirmación de inicio de sesión, capturas de pantalla de los resultados obtenidos, ID's de transacciones generadas y las respuestas de las API's, para respaldar el funcionamiento del sistema.