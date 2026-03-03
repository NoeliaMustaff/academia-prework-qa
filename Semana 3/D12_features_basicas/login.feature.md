Noelia Mustaff | Martín Cabrera

Feature: Inicio de sesión
    Como Usuario 
    Quiero Iniciar sesión
    Para Acceder a mi cuenta y usar funcionalidades protegidas.

    Scenario: Inicio de sesión con credenciales válidas
        Given El usuario tiene una cuenta existente y habilitada (no bloqueada/suspendida).
            And El usuario no tiene una sesión iniciada al comenzar.
            And El usuario cuenta con email/usuario y contraseña.
            And El servicio de autenticación está disponible (o, si no, se espera un error controlado).
        When El usuario ingresa credenciales válidas.
        Then El sistema inicia sesión y el usuario accede a su cuenta.

    Scenario: 
        Given 
        When 
        Then 

    Scenario: 
        Given 
        When 
        Then 

    Scenario: 
        Given 
        When 
        Then 
