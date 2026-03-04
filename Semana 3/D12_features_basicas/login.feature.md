Noelia Mustaff | Martín Cabrera

Feature: Inicio de sesión
    Como usuario registrado
    Quiero iniciar sesión
    Para acceder a mi cuenta y usar funcionalidades protegidas.

    Background: 
        Given el usuario tiene una cuenta existente
        And no tiene una sesión iniciada al comenzar
        And el servicio de autenticación está disponible (o, si no, se espera un error controlado)

    Scenario: Inicio de sesión con credenciales válidas
        Given el usuario posee una cuenta habilitada
        When ingresa credenciales válidas
        Then el sistema inicia sesión
        And accede a su cuenta

    Scenario: Expiración de sesión por inactividad
        Given el usuario tiene una sesión iniciada
        When transcurre T tiempo de inactividad
        Then el sistema cierra la sesión

    Scenario: Inicio de sesión con credenciales inválidas.
        Given el usuario posee una cuenta habilitada
        When ingresa credenciales inválidas
        Then el sistema no inicia sesión
        And muestra un mensaje genérico de error

    Scenario: Bloqueo temporal por reiterados intentos fallidos de inicio de sesión.
        Given el usuario posee una cuenta habilitada
        When supera N intentos fallidos de inicio de sesión
        Then el sistema bloquea temporalmente el acceso
        And informa el bloqueo

    Scenario: Campos obligatorios vacíos.
        Given el usuario posee una cuenta habilitada
        When intenta iniciar sesión sin completar email o contraseña
        Then el sistema bloquea el inicio de sesión
        And informa que el campo es obligatorio