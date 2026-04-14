Feature: Checkout complejo — validación del item total

  Background:
    Given que abro Sauce Demo

  Scenario: Item total igual a la suma de precios de los ítems
    When inicio sesión con credenciales válidas
    And agrego dos productos al carrito
    And voy al carrito y presiono Checkout
    And completo los datos de envío con nombre "Ana", apellido "Gómez" y código postal "2000"
    And continúo al resumen del pedido
    Then el item total es la suma exacta de los precios de los productos