Noelia Mustaff | Martín Cabrera

Feature: Búsqueda y filtrado de productos
  Como usuario del sistema
  Quiero buscar y aplicar filtros a los productos
  Para encontrar rápidamente lo que necesito
 
  Background:
    Given existen productos disponibles en el sistema
 
  Scenario: Aplicar un filtro por categoría
    Given existen diferentes categorias
    When el usuario aplica un filtro por una categoría específica
    Then el sistema muestra solo los productos de esa categoría
 
  Scenario: Intentar buscar sin ingresar datos
    When intenta realizar una búsqueda sin ingresar ningún criterio
    Then el sistema solicita que ingrese un valor para buscar
 
  Scenario: Aplicar múltiples filtros combinados
    Given existen productos de distintas categorías y precios
    When el usuario aplica un filtro por categoría
    And aplica un filtro por rango de precio
    Then el sistema muestra solo los productos que cumplen ambos criterios
 
  Scenario Outline: Búsqueda por nombre
    When el usuario realiza una búsqueda con <criterio>
    Then el sistema <resultado>
 
    Examples:
      | criterio                | resultado                                      |
      | un nombre válido        | muestra los productos que coinciden            |
      | un nombre inexistente   | informa que no se encontraron resultados       |
 
 
# Notas:
# - Se movió la precondición común de existencia de productos al Background.
# - Se unificaron los escenarios de búsqueda con y sin resultados mediante Scenario Outline.
# - Se redujo duplicación manteniendo claridad en los casos especiales (validación y filtros combinados).