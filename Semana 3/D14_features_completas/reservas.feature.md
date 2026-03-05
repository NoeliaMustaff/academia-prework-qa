Feature: Reservas de habitaciones
    Como cliente 
    Quiero reservar una habitación
    Para poder alojarme en las fechas seleccionadas

    Background:
        Given el cliente desea realizar una reserva
        And ha seleccionado una fecha de estadía
        And ha indicado la cantidad de persona    

    Scenario: Reserva exitosa cuando hay disponibilidad
        Given existen habitaciones disponibles para la cantidad de personas indicada
        When el cliente selecciona una habitación
        And confirma la reserva
        Then el sistema registra la reserva
        And envía una confirmación al cliente 

    Scenario: Mostrar distintas opciones de habitación
        Given existen distintos tipos de habitaciones disponibles
        When el sistema muestra las opciones de alojamiento
        Then el cliente puede ver las características de cada habitación
        And puede elegir la opción que prefiere    

    Scenario: Cancelación de reserva confirmada
        Given el cliente tiene una reserva confirmada
        When solicita cancelar la reserva
        Then el sistema cancela la reserva
        And informa que la cancelación fue realizada correctamente 

    Scenario Outline: Reserva según tipo de habitación y cantidad de personas
        Given existe disponibilidad para el tipo de habitación <tipo_habitacion>
        When el cliente intenta reservar para <Xpersonas>
        Then el sistema <resultado>     

        Examples:
          | tipo_habitacion | Xpersonas | resultado                                                   |
          | individual      | 1         | permite completar la reserva                                |
          | doble           | 2         | permite completar la reserva                                |
          | doble           | 3         | informa que la capacidad máxima fue superada                |
          | familiar        | 4         | permite completar la reserva                                |

    Scenario Outline: Aplicación de descuentos según tipo de cliente y método de pago
        Given el cliente realiza una reserva con un precio base de <precio_base>
        And el cliente se encuentra <estado_cliente> en el sistema
        When el cliente selecciona <metodo_pago> como método de pago
        Then el sistema aplica un descuento de <descuento>
        And el precio final de la reserva es <precio_final>

        Examples:
        | precio_base | estado_cliente | metodo_pago | descuento | precio_final |
        | 100         | registrado     | Visa        | 15%       | 85           |
        | 100         | registrado     | Mastercard  | 5%        | 95           |
        | 100         | no registrado  | Visa        | 10%       | 90           |
        | 100         | no registrado  | Efectivo    | 0%        | 100          |