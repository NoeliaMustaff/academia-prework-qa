Feature: Restful Booker — ping, autenticación y recurso inexistente
 
 Scenario: La API responde al ping
   When consulto el endpoint ping
   Then recibo status 201 en el ping
 
 Scenario: Obtengo token de administrador
   When solicito token con credenciales demo
   Then recibo status 200 y un token valido
 
 Scenario: Un booking inexistente devuelve 404
   When consulto un booking que no existe
   Then recibo status 404