Feature: Proceso de compra en carrito

  Como cliente
  Quiero agregar productos al carrito
  Para realizar una compra de diferentes productos

  Background:
    Given el cliente tiene una cuenta activa
    And existen productos disponibles para la venta

  Scenario: Agregar un producto al carrito
    Given el cliente selecciona un producto
    When agrega el producto al carrito
    Then el producto queda registrado en el carrito

  Scenario: Eliminar un producto del carrito
    Given el carrito contiene al menos un producto
    When el cliente elimina un producto
    Then el carrito queda sin ese producto

  Scenario: Confirmar compra con carrito válido
    Given el carrito contiene productos disponibles
    And el cliente tiene un método de pago válido
    When el cliente confirma la compra
    Then la orden se genera correctamente

  Scenario Outline: Validar stock durante el checkout
    Given el cliente tiene en su carrito < Xunidades> del producto
    And el stock disponible es < stockDisponible>
    When el cliente intenta confirmar la compra
    Then el resultado del checkout es < resultado>

    Examples:
      | Xunidades | stockDisponible | resultado                                                              |
      | 1         | 10              | el sistema permite la compra                                           |
      | -3        | 3               | el sistema no permite ingresar stock por debajo de cero                |
      | 5         | 2               | el sistema no permite la compra y notifica al usuario la falta de stock|
      | 10        | 0               | el sistema no permite la compra y notifica al usuario la falta de stock|

  Scenario Outline: Validar pago en checkout
    Given el cliente intenta pagar con el método < metodoPago>
    And el monto total de la compra es < monto>
    And su saldo disponible para la compra es < saldo>
    When el sistema procesa el pago
    Then el resultado del pago es < mensajederesultado>

    Examples:
      | metodoPago        | monto |  saldo        | mensajederesultado            |
      | tarjeta crédito   | 100   |  suficiente   | "Compra realizada con éxito"  |
      | tarjeta débito    | 10    |  insuficiente | "Saldo insuficiente"          |
      | transferencia     | 200   |  suficiente   | "Compra realizada con éxito"  |
      | efectivo          | -50   |  insuficiente | "Saldo insuficiente"          |