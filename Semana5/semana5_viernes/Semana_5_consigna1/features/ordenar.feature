Feature: Ordenar productos en SauceDemo
 
  Background:
    Given navego a SauceDemo y me logueo
 
  Scenario: Ordenar por nombre de Z a A
    When ordeno los productos por "za"
    Then el primer producto es "Test.allTheThings() T-Shirt (Red)"
 
  Scenario: Ordenar por precio de menor a mayor
    When ordeno los productos por "lohi"
    Then el primer precio es "$7.99"