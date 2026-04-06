Feature: Checkout en SauceDemo

  Background:
    Given estoy logueado en SauceDemo como "standard_user" con clave "secret_sauce"
    And agrego el producto "Sauce Labs Backpack" al carrito

  Scenario: Checkout exitoso con datos completos
    When abro el carrito de compras
    And hago clic en el botón "Checkout"
    And completo el formulario de checkout con nombre "Juan", apellido "Pérez" y código postal "12345"
    And avanzo en el checkout hasta finalizar el pedido
    Then veo el mensaje "Thank you for your order!"

  Scenario Outline: Checkout con campo vacío muestra error
    When abro el carrito de compras
    And hago clic en el botón "Checkout"
    And completo el formulario de checkout con nombre "<nombre>", apellido "<apellido>" y código postal "<zip>"
    And hago clic en el botón "Continue"
    Then veo el mensaje de error "<mensaje_error>"

    Examples:
      | nombre | apellido | zip   | mensaje_error                    |
      |        | Doe      | 12345 | Error: First Name is required  |
      | John   |          | 12345 | Error: Last Name is required     |
      | John   | Doe      |       | Error: Postal Code is required   |