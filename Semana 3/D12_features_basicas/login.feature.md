Noelia Mustaff | Martín Cabrera

Feature: Inicio de sesión
    Como Usuario registrado
    Quiero Iniciar sesión
    Para Acceder a mi cuenta y usar funcionalidades protegidas.

    Background: 
        Given El usuario tiene una cuenta existente.
        And no tiene una sesión iniciada al comenzar.
        And El servicio de autenticación está disponible (o, si no, se espera un error controlado).

        Scenario: Inicio de sesión con credenciales válidas
            Given El usuario posee una cuenta habilitada.
            When ingresa credenciales válidas.
            Then El sistema inicia sesión
            And accede a su cuenta.

        Scenario: Expiración de sesión por inactividad
            Given El usuario inició sesión.
            When Pasa T de inactividad
            Then la sesión se cierra.

        Scenario: Inicio de sesión con credenciales inválidas.
            Given El usuario posee una cuenta habilitada.
            When Ingresa credenciales inválidas.
            Then El sistema no inicia sesión.
            And Muestra un mensaje genérico de error.

        Scenario: Bloqueo temporal por reiterados intentos fallidos de inicio de sesión.
            Given El usuario posee una cuenta habilitada.
            When Supera N intentos fallidos de inicio de sesión
            Then El sistema bloquea temporalmente el acceso
            And Informa el bloqueo

        Scenario: Campos obligatorios vacíos.
            Given El usuario posee una cuenta habilitada.
            When intenta iniciar sesión sin completar email o contraseña
            Then El sistema bloquea el inicio de sesión
            And Informa que el campo es obligatorio