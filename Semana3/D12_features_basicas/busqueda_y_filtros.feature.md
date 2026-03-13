Noelia Mustaff | Martín Cabrera

Feature: Búsqueda y filtrado de productos
  Como usuario del sistema
  Quiero buscar y aplicar filtros a los productos
  Para encontrar rápidamente lo que necesito
 
  Scenario: Buscar un producto por nombre
    Given existen productos cargados en el sistema
    When el usuario realiza una búsqueda por nombre válido
    Then el sistema muestra los productos que coinciden
 
  Scenario: Aplicar un filtro por categoría
    Given existen productos de distintas categorías
    When el usuario aplica un filtro por una categoría específica
    Then el sistema muestra solo los productos de esa categoría
 
  Scenario: Realizar una búsqueda sin resultados
    Given existen productos cargados en el sistema
    When el usuario realiza una búsqueda con un criterio inexistente
    Then el sistema informa que no se encontraron resultados
 
  Scenario: Intentar buscar sin ingresar datos
    Given el usuario puede realizar una búsqueda
    When intenta realizar una búsqueda sin ingresar ningún criterio
    Then el sistema solicita que ingrese un valor para buscar
 
  Scenario: Aplicar varios filtros
    Given existen productos de distintas categorías y precios
    When el usuario aplica un filtro por categoría
    And aplica un filtro por rango de precio
    Then el sistema muestra solo los productos que cumplen ambos criterios