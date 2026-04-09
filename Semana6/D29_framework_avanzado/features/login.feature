Feature: Login

  Background:
    Given que abro Sauce Demo

  Scenario: Login válido
    When inicio sesión con credenciales válidas
    Then accedo al catálogo de productos
    And veo el listado de productos

  Scenario Outline: Errores por campos obligatorios vacíos
    When inicio sesión con el usuario "<username>" y la contraseña "<password>"
    Then veo el error de tipo "<tipoError>"
    And permanezco en la pantalla de login

    Examples:
      | username      | password     | tipoError       |
      |               | secret_sauce | missingUsername |
      | standard_user |              | missingPassword |

  Scenario Outline: Errores por credenciales inválidas o usuario bloqueado
    When inicio sesión con el usuario "<username>" y la contraseña "<password>"
    Then veo el error de tipo "<tipoError>"
    And permanezco en la pantalla de login

    Examples:
      | username        | password     | tipoError          |
      | locked_out_user | secret_sauce | lockedOut          |
      | usuario_fake    | secret_sauce | invalidCredentials |
      | standard_user   | wrong_pass   | invalidCredentials |