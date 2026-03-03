Noelia Mustaff | Martín Cabrera

Flujo de negocio: Login

    Objetivo del usuario: El usuario accede a su cuenta personal para utilizar funciones del sistema de forma segura.

    Precondiciones:
        - El usuario tiene una cuenta registrada previamente.
        - La cuenta del usuario está activa.
        - El usuario tiene credenciales válidas.
        - Existe una base de datos con los usuarios registrados.

    Comportamientos clave:
        - Si el usuario ingresa credenciales válidas, accede a su cuenta personal del sistema.
        - El sistema valida que las credenciales correspondan a la cuenta registrada.
        - La sesión se mantiene activa hasta que el usuario cierra sesión o expira por inactividad.
        - El sistema registra los intentos de acceso fallidos.
        - El sistema informa al usuario cuando las credenciales no son correctas.
        - El sistema valida que los campos obligatorios estén completos antes de procesar la autenticación.
        - Si el usuario inicia sesión en un dispositivo nuevo, el sistema valida la autenticación con un código de seguridad proporcionado al usuario, según la política de seguridad definida.
        - El sistema asocia la sesión al perfil correspondiente.
        - El sistema no especifica cual de las credenciales es incorrecta, por seguridad.
        - El sistema no expone información sensible en los mensajes de error.

Casos alternativos:

 Negativos: 
        - Si el usuario supera el límite de intentos para acceder a su cuenta, el sistema bloquea temporalmente la cuenta.
        - Si la cuenta está bloqueada, el sistema impide el acceso e informa la situación.
        - Si el usuario ingresa credenciales no válidas, el sistema no permite el acceso.

 Preguntas:
        - ¿Cuántos son los intentos fallidos antes de bloquear la cuenta temporalmente?
        - ¿Cuánto tiempo debe estar la sesión inactiva para expirar?
        - ¿El sistema permite recuperación de contraseña desde el flujo de login?