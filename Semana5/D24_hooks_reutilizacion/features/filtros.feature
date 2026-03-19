Feature: Filtros

  Como usuario de SauceDemo
  Quiero ordenar el catálogo de productos
  Para encontrar items por nombre o precio

  Background:
    Given estoy logueado en SauceDemo "https://www.saucedemo.com/"

  Scenario: Ordenar productos por nombre A-Z
    When aplico el filtro "nombre A a Z"
    Then el primer producto es "Sauce Labs Backpack"

  Scenario: Ordenar productos por nombre Z-A
    When aplico el filtro "nombre Z a A"
    Then el primer producto es "Test.allTheThings() T-Shirt (Red)"

  Scenario: Ordenar productos por precio menor a mayor
    When aplico el filtro "precio de menor a mayor"
    Then el primer producto es "Sauce Labs Onesie"

  Scenario: Ordenar productos por precio mayor a menor
    When aplico el filtro "precio de mayor a menor"
    Then el primer producto es "Sauce Labs Fleece Jacket"