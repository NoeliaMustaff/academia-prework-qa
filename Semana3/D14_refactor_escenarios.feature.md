Feature: Refactor de escenarios malos
 
# Escenarios originales
 
  Scenario: Comprar un producto
    Given el usuario hace click en "#login"
    When espera "5s"
    And escribe "standard_user" en "#user"
    And escribe "secret_sauce" en "#pass"
    Then ve el div ".inventory"
 
  Scenario: Filtrar productos
    Given estoy en la página "/products"
    When hago click en ".filter:nth-child(3)"
    Then veo resultados
 
 
# Escenarios refactorizados "BIEN"
 
  Scenario: Acceder al catálogo de productos
    Given el usuario tiene una cuenta válida
    When inicia sesión con credenciales válidas
    Then accede al catálogo de productos disponibles
 
  Scenario: Filtrar productos por categoría
    Given el usuario se encuentra visualizando el catálogo de productos
    When aplica un filtro por una categoría específica
    Then el sistema muestra únicamente los productos que pertenecen a esa categoría
 
 
# Antipatrones detectados:
# - Uso de selectores del DOM (#login, #user, .filter:nth-child) dentro de escenarios Gherkin
# - Inclusión de detalles técnicos de UI en lugar de describir comportamiento de negocio
# - Uso de tiempos de espera ("5s") que no representan comportamiento del usuario
# - Escenarios enfocados en acciones técnicas (click, escribir) en lugar de objetivos del usuario
# - Resultados poco claros como "ve el div", que no describen un resultado de negocio verificable