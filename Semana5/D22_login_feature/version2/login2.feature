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

  Scenario: Usuario bloqueado
    When inicio sesión con usuario "locked_out_user" y password "secret_sauce"
    Then veo un mensaje de error de login "Epic sadface: Sorry, this user has been locked out."
    And permanezco en la pantalla de login