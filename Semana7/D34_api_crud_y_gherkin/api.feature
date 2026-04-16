Feature: Gestión completa de bookings en la API de Restful Booker

  Background:
    Given que tengo credenciales válidas de Restful Booker

  Scenario: Autenticar y crear un booking válido
    When me autentico contra la API de Restful Booker
    And creo un nuevo booking válido
    Then obtengo un bookingid numérico
    And el booking creado contiene los mismos datos que envié

  Scenario: Leer un booking existente
    Given que ya existe un booking creado en la API
    When consulto los datos del booking por su id
    Then la API responde con código 200
    And obtengo un JSON con los datos del booking
    And al menos el firstname y lastname son válidos

  Scenario: Actualizar un booking existente con autenticación
    Given que ya existe un booking creado en la API
    And me autentico contra la API de Restful Booker
    When actualizo los datos del booking con información válida
    Then la API responde con código 200 en la actualización
    And el booking actualizado refleja los nuevos datos

  Scenario: Eliminar un booking existente con autenticación
    Given que ya existe un booking creado en la API
    And me autentico contra la API de Restful Booker
    When elimino el booking por su id
    Then la API responde indicando que el borrado fue exitoso
    And si intento consultar el booking eliminado
    Then obtengo la respuesta esperada para un booking inexistente