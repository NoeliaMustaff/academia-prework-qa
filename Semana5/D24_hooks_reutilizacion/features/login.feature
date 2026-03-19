Feature: Login

  Como usuario de SauceDemo
  Quiero iniciar sesión
  Para acceder al catálogo de productos

  Background:
    Given estoy en la pantalla de login de SauceDemo "https://www.saucedemo.com/"

  Scenario: Login válido
    When inicio sesión con usuario "standard_user" y password "secret_sauce"
    Then accedo al catálogo de productos
    And veo el listado de productos

  Scenario: Login inválido por usuario incorrecto
    When inicio sesión con usuario "usuario_fake" y password "secret_sauce"
    Then veo un mensaje de error de login "Epic sadface: Username and password do not match any user in this service"
    And permanezco en la pantalla de login

  Scenario: Login inválido por password incorrecto
    When inicio sesión con usuario "standard_user" y password "wrong_pass"
    Then veo un mensaje de error de login "Epic sadface: Username and password do not match any user in this service"
    And permanezco en la pantalla de login

  Scenario: Login con usuario bloqueado
    When inicio sesión con usuario "locked_out_user" y password "secret_sauce"
    Then veo un mensaje de error de login "Epic sadface: Sorry, this user has been locked out."
    And permanezco en la pantalla de login

  Scenario Outline: Login inválido por campos vacíos
    When inicio sesión con usuario "<username>" y password "<password>"
    Then veo un mensaje de error de login "<error>"
    And permanezco en la pantalla de login

    Examples:
      | username       | password     | error                                        |
      |                | secret_sauce | Epic sadface: Username is required            |
      | standard_user  |              | Epic sadface: Password is required            |