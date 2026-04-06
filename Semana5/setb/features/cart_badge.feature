Feature: Badge del carrito en SauceDemo

  Background:
    Given estoy logueado en SauceDemo como "standard_user" con clave "secret_sauce"

  Scenario: Agregar 1 producto muestra badge con valor 1
    When agrego el producto "Sauce Labs Backpack" al carrito
    Then el badge del carrito muestra "1"

  Scenario: Agregar 2 productos muestra badge con valor 2
    When agrego el producto "Sauce Labs Backpack" al carrito
    And agrego el producto "Sauce Labs Bike Light" al carrito
    Then el badge del carrito muestra "2"

  Scenario: Remover un producto actualiza el badge
    When agrego el producto "Sauce Labs Backpack" al carrito
    And agrego el producto "Sauce Labs Bike Light" al carrito
    And remuevo el producto "Sauce Labs Backpack" del carrito
    Then el badge del carrito muestra "1"

  Scenario: Sin productos el badge no es visible
    Then el badge del carrito no es visible