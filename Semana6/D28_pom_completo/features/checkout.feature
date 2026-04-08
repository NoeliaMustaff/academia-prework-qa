Feature: Checkout

  Background:
    Given estoy logueado en SauceDemo como "standard_user" con clave "secret_sauce"

  Scenario: Compra exitosa de un producto
    When agrego el producto "Sauce Labs Backpack" al carrito
    And completo el checkout con nombre "Juan", apellido "Pérez" y código postal "5000"
    Then veo la confirmación del pedido "Thank you for your order!"