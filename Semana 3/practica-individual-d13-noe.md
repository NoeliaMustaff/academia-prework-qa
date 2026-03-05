Feature: Inicio de sesión
    Como usuario registrado
    Quiero iniciar sesión
    Para acceder a mi cuenta y usar funcionalidades protegidas.

    Background:
        Given el sistema requiere autenticación para acceder a funcionalidades protegidas
        And el usuario está previamente registrado en el sistema
        And el usuario se encuentra en la pantalla de inicio de sesión        
        And el servicio de autenticación se encuentra disponible

    Scenario Outline: Intento de inicio de sesión con credenciales
        When el usuario intenta iniciar sesión con "<email>" y "<contraseña>"
        Then el sistema <resultado>

        Examples:
        | email             | contraseña         | resultado                                               |
        | noe@email.com     | ClaveSegura123     | inicia sesión y permite el acceso a la cuenta           |
        | noe@email.com     | Clavesegura1234    | no inicia sesión y muestra un mensaje genérico de error |
        | noenair@email.com | ClaveSegura123     | no inicia sesión y muestra un mensaje genérico de error |

    Scenario Outline: Validación de campos obligatorios
        When el usuario intenta iniciar sesión con "<email>" y "<contraseña>"
        Then el sistema informa que el "<campo>" es obligatorio
        And no permite enviar la solicitud

        Examples:
          | email         | contraseña      | campo        |
          |               | ClaveSegura123  | email        |
          | noe@email.com |                 | contraseña   |

    Scenario: Bloqueo temporal por múltiples intentos fallidos
        Given el usuario ingresa una contraseña incorrecta tres veces consecutivas
        When intenta iniciar sesión nuevamente
        Then el sistema bloquea temporalmente el acceso
        And informa que la cuenta se encuentra bloqueada

    Scenario: Expiración de sesión por inactividad
        Given el usuario tiene la sesión iniciada
        When transcurren 15 minutos de inactividad
        Then el sistema cierra la sesión automáticamente
        And solicita iniciar sesión nuevamente
