# Entregable 1: “Bug real que sufrí como usuario”

Estaba utilizando la billetera virtual "Cuenta DNI" para pagar la cuenta de una compra en un mercado de barrio.
Cuando entro a la sección de transferencias, ingreso el alias a donde quería transferir y el monto, pero cuando quise hacer la transferencia me llevó a la sección de "contactos agregados", entonces intento salir de esta sección y la aplicación comenzó a funcionar lento; vuelvo a intentar realizar la transferencia y en vez de darme los datos para validar que la transacción tenga los datos correctos (como usualmente lo hace), hizo el envío de dinero directamente.
Cuando leo el detalle, el dinero se había enviado por error a una persona de mi lista de contactos y no al alias que había ingresado.
Por lo que, perdí ese dinero y ya no volví a utilizar esa billetera.
Cabe destacar que el botón de contactos agregados era "nuevo", luego
de una actualización de la interfaz.

- Dimensiones de calidad afectadas:

* Funcionalidad: Fallo en la validación de datos antes de la transacción.
* Usabilidad: La actualización de interfaz entorpeció el modo de uso al que el usuario estaba acostumbrado.
* Confiabilidad: La aplicación no respondió de manera correcta al primer fallo, por ende, no se recuperó y no continuó funcionado de la manera esperada.

- Que habría hecho un buen QA:

Considero que como QA se deberían haber reforzado las pruebas unitarias, las pruebas de integración y pruebas de aceptación de usuario, principalmente considerando que el defecto vino luego de una actualización en un sector específico (la interfaz dentro del área de transferencias).

Entregable 1B (corto): mini “post‑mortem”

o	¿Qué pedirías en refinamiento?: En la etapa de refinamiento pediría que se definan claramente los cambios introducidos en la interfaz y como afectan a los flujos de transferencia, y que se especifique qué debería ocurrir cuando el usuario ingresa un alias de forma manual o utiliza uno de su lista de contactos.
Además, pediría que se detallen los pasos de confirmación antes de que se realice la transferencia, para asegurar que la validación exista siempre antes de ejecutarse el envío de dinero.

o	¿Qué validaciones probarías primero?: Priorizaría las validaciones funcionales y de datos, para asegurar que los datos ingresados van a ser procesados correctamente. Luego, validaría el flujo completo de la operación para asegurar que no se saltea el paso de validación de datos.
Además, haría validaciones sobre el cambio de interfaz, para asegurar que el usuario no se verá afectado o confundido por los cambios, sino que más bien facilitarán el uso de la aplicación. Y por último, pruebas de regresión para confirmar que los nuevos cambios no afecten el funcionamiento correcto que se tenía hasta el momento.

o	¿Qué evidencia guardarías si aparece el bug?: Guardaría evidencia clara del problema, si es posible capturas de pantalla, video-capturas o incluso el comprobante de transferencia si fuera posible. También documentaría los pasos exactos para reproducir el error y hacer una comparación entre el resultado esperado y el actual.

## Entregable 2: “Mi día a día como QA”

•	“Cómo imagino mi día a día como QA en una empresa":

Imagino mi día a día como QA comenzando a revisar tareas pendientes (si es que quedaron) y a organizar las tareas nuevas, además de participar en dailys y reuniones con el equipo para aclarar dudas o validar soluciones.
Después ya pondría manos a la obra para aplicar casos de prueba sobre funcionalidades hechas o modificadas, revisaría que los errores corregidos no afecten a las funcionalidades ya hechas.
Además, imagino un buen tiempo invertido en documentación de resultados de pruebas y reportes de bugs junto con su evidencia para corrección.
Y por último considero que van a existir días donde tenga que ponerme a aprender cosas nuevas para mejorar buenas prácticas, adquirir nuevas herramientas, o incluso frente a problemas complejos tenga que apoyarme en mis compañeros y superiores que puedan darme una mano y encontrar la mejor solución.

### Entregable 3 (micro): glosario personal

• Bug: Defecto detectado y reportado durante el proceso de pruebas.
• Defecto: Deficiencia o problema en el software respecto a lo esperado.
• Error: Acción de una persona que produce un defecto.
• Falla: Evento donde un componente o sistema no se comporta de acuerdo a los resultados esperados.
• Caso de prueba: Conjunto de acciones y condiciones que se utilizan para verificar que la funcionalidad sea la esperada.
• Evidencia: Pruebas con información que respaldan el reporte del error.
• Severidad: Nivel de impacto de un defecto sobre el desarrollo, componente, etc.
• Prioridad: Nivel de importancia que se le asigna a una tarea, funcionalidad, etc.
• QA (Aseguramiento/Garantía de calidad): Conjunto de actividades que tiene como fin asegurar resultados de calidad. (prevenir)
• QC (Control de calidad): Conjunto de actividades que evalúan la calidad del producto/servicio. (detectar)