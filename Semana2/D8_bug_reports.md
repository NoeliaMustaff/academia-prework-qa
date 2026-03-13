Entregable 1: 5 bug reports completos

Título: El botón "Close" no cierra el modal de confirmación de datos.

    Severidad: Baja

    Prioridad: Baja

    Ambiente: Producción, URL App: https://demoqa.com/automation-practice-form, Fecha/hora: 25/02/2026 15:15 ART

    Browser/Dispositivo: Chrome (última versión), Desktop - SO: Windows 10

    Pasos para reproducir: 
        1- Completar el formulario con datos válidos
        2- Click en "Submit"
        3- Esperar a que aparezca el modal de confirmación de datos
        4- Click en "Close"

    Resultado esperado: El modal con los datos se cierra al hacer click en el botón "Close"

    Resultado actual: Al hacer click en el botón "Close" no se ejecuta ninguna acción visible y el modal permanece visible.

    Evidencia: ...\Evidencias D8 Bug Reports\boton-close.gif (Video corto donde se muestra que el botón no funciona al hacer click en el mismo.)

    Notas adicionales: El usuario si puede salir del modal de confirmación de datos al hacer click fuera de el. Sería recomendable revisar si el botón tiene correctamente asociado el evento onclick.

-----------------------------------------------------------------------------------------------------------

Título: El campo “City” permite seleccionar ciudades que no corresponden al “State” luego de modificarlo.

    Severidad: Alta

    Prioridad: Media

    Ambiente: Producción, URL App: https://demoqa.com/automation-practice-form, Fecha/hora: 25/02/2026 15:40 ART

    Browser/Dispositivo: Chrome (última versión), Desktop - SO: Windows 10

    Pasos para reproducir: 
        1- Completar el formulario con los datos obligatorios (Name, Gender, Mobile)
        2- En el campo “State”, seleccionar una opción (ej: NCR).
        3- Abrir el desplegable del campo “City” y seleccionar una opción (ej: Delhi).
        4- En el campo “State”, seleccionar una opción distinta a la primera, (ej: Uttar Pradesh)
        5- Observar que el campo “City” mantiene el valor previamente seleccionado.
        6- Click en "Submit"
        7- Observar el modal de datos de confirmación 

    Resultado esperado: El campo "City" tiene que quedar vacío al modificar el campo "State", y requerir una nueva selección.

    Resultado actual: El campo “City” mantiene la ciudad previamente seleccionada, aunque no corresponde al nuevo “State”, permitiendo una combinación inconsistente.

    Evidencia: ...\Evidencias D8 Bug Reports\state-and-city.gif (Video corto donde se muestra la combinación inválida de datos y luego se muestra en el modal de confirmación de datos.)

    Notas adicionales: Este comportamiento permite el almacenamiento de datos inconsistentes, afectando la integridad del sistema y potencialmente generando errores en procesos posteriores que dependan de esta información.

-----------------------------------------------------------------------------------------------------------

Título: El campo “Date of birth” permite registrar usuarios fuera del rango de edad permitido (18–65 años)

    Severidad: Alta

    Prioridad: Alta

    Ambiente: Producción, URL App: https://demoqa.com/automation-practice-form, Fecha/hora: 25/02/2026 16:10 ART

    Browser/Dispositivo: Chrome (última versión), Desktop - SO: Windows 10

    Pasos para reproducir: 
        1- Completar el formulario con los datos obligatorios (Name, Gender, Mobile)
        2- Observar que el campo “Date of Birth” aparece automáticamente con la fecha actual.
        3- No modificar la fecha actual.
        4- Click en "Submit"
        Adicional:
        5- Modificar la fecha actual por una fecha futura (ej: 26/02/2026).
        6- Click en "Submit"

    Resultado esperado: 
        - El campo no preselecciona una fecha inválida.
        - El sistema valida que el usuario tenga entre 18-65 años.
        - El campo no acepta fechas futuras.
        - El campo muestra un mensaje de error claro ante incumplimiento de condiciones.
        - El campo no debería permitir seleccionar fechas posteriores a la actual.

    Resultado actual:
        - El campo se completa automáticamente con la fecha actual y la acepta como válida.
        - El campo acepta como válido fechas futuras a la actual.
        - El sistema no valida el rango de edad.
        - El campo no muestra un mensaje de error claro.

    Evidencia: ...\Evidencias D8 Bug Reports\fechas-invalidas.gif (Video corto donde se muestra como el formulario toma como válido fechas actuales o futuras sin hacer la validación de edad.)

    Notas adicionales: Este comportamiento no cumple con la regla de negocio definida para la inscripción universitaria (edad permitida: 18–65 años) y permite el almacenamiento de datos inválidos.

-----------------------------------------------------------------------------------------------------------

Título: El formulario permite enviarse sin completar campos obligatorios definidos para la inscripción

    Severidad: Alta

    Prioridad: Alta

    Ambiente: Producción, URL App: https://demoqa.com/automation-practice-form, Fecha/hora: 25/02/2026 16:10 ART

    Browser/Dispositivo: Chrome (última versión), Desktop - SO: Windows 10

    Pasos para reproducir: 
        1- Completar el formulario con los datos obligatorios actualmente (Name, Gender, Mobile)
        2- Dejar vacíos los demás campos
        3- Click en "Submit"

    Resultado esperado: El sistema impide el envío del formulario y mostrar mensajes de validación indicando que los campos obligatorios faltantes deben completarse.

    Resultado actual: El sistema permite enviar el formulario exitosamente tomando como obligatorios solo tres campos (Name, Gender, Mobile).

    Evidencia:
        - ...\Evidencias D8 Bug Reports\campos-obligatorios-vacios.gif (Video corto donde se muestra como el formulario solicita como campos obligatorios solo algunos de los necesarios.)
        - ...\Evidencias D8 Bug Reports\campos-obligatorios.gif (Video corto donde se muestra como el formulario toma como válidos los campos obligatorios actuales.)

    Notas adicionales: Este comportamiento no cumple con la regla de negocio definida para la inscripción universitaria, donde los campos obligatorios deberían ser: Name, Email, Mobile, Date of Birth, Subjects, Current Address, State and City. El formulario permite almacenar registros incompletos, afectando la integridad de la información académica.

-----------------------------------------------------------------------------------------------------------

Título: El sistema no muestra una pantalla final de confirmación tras enviar la inscripción

    Severidad: Media

    Prioridad: Media

    Ambiente: Producción, URL App: https://demoqa.com/automation-practice-form, Fecha/hora: 25/02/2026 16:50 ART

    Browser/Dispositivo: Chrome (última versión), Desktop - SO: Windows 10

    Pasos para reproducir: 
        1- Completar el formulario con los datos obligatorios (Name, Gender, Mobile)
        2- Opcional: Dejar vacíos o completar los demás campos.
        3- Click en "Submit"

    Resultado esperado: Luego del modal de confirmación de datos, el formulario ya no es editable ni visible para el usuario. El sistema muestra una pantalla indicando que la inscripción fue recibida. 

    Resultado actual: Luego de cerrar el modal, el sistema no muestra la pantalla final, sino que sigue siendo visible y editable el formulario.

    Evidencia: ...\Evidencias D8 Bug Reports\formulario-post-envio.gif (Video corto donde se muestra como luego de cerrar el modal, no se muestra una pantalla de confirmación, sino que se vuelve a al formulario y es editable.)

    Notas adicionales: Este comportamiento podría generar registros duplicados y confusión en el usuario ante la persistencia del formulario editable.
