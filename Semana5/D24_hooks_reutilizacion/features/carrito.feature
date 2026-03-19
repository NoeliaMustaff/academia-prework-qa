Feature: Carrito de compras

  Como usuario de SauceDemo
  Quiero gestionar productos en el carrito
  Para agregar, verificar y eliminar items según necesite

  Background:
    Given estoy logueado en SauceDemo "https://www.saucedemo.com/"

  Scenario: Agregar un producto y luego eliminarlo del carrito
    When agrego el producto "Sauce Labs Backpack" al carrito
    And voy al carrito
    Then el carrito muestra el producto "Sauce Labs Backpack" con su precio "29.99"
    When elimino el producto "Sauce Labs Backpack" del carrito
    Then el carrito está vacío

  Scenario: Agregar varios productos y eliminar uno del carrito
    When agrego el producto "Sauce Labs Backpack" al carrito
    And agrego el producto "Sauce Labs Bike Light" al carrito
    And voy al carrito
    Then el carrito muestra el producto "Sauce Labs Backpack" con su precio "29.99"
    And el carrito muestra el producto "Sauce Labs Bike Light" con su precio "9.99"
    When elimino el producto "Sauce Labs Backpack" del carrito
    Then el carrito no muestra el producto "Sauce Labs Backpack"
    And el carrito muestra el producto "Sauce Labs Bike Light" con su precio "9.99"

  Scenario Outline: Agregar distintos productos al carrito con su precio
    When agrego el producto "<producto>" al carrito
    Then el carrito muestra el producto "<producto>" con su precio "<precio>"

    Examples:
      | producto                  | precio |
      | Sauce Labs Bike Light     | 9.99   |
      | Sauce Labs Bolt T-Shirt   | 15.99  |
      | Sauce Labs Fleece Jacket  | 49.99  |
      | Sauce Labs Onesie         | 7.99   |