Feature: Reprogramar turno médico
    Como paciente
    Quiero reprogramar un turno confirmado
    Para elegir una fecha y hora que me quede mejor

Background:
    Given el paciente tiene una sesión iniciada
    And tiene un turno confirmado

# CA2 + CA3: flujo exitoso (Scenario individual)
Scenario: Reprogramar turno con nuevo horario válido
    Given el paciente selecciona un nuevo horario válido
    When el paciente confirma la reprogramación con el nuevo horario
    Then el turno original queda cancelado
    And el nuevo turno queda confirmado
    And el paciente recibe un mail con la información del nuevo turno confirmado

# CA1: solo muestra horarios disponibles del mismo profesional (Scenario individual)
Scenario: Elegir horarios válidos del mismo profesional
    Given el paciente inicia el proceso para reprogramar un turno
    When visualiza el calendario de horarios disponibles
    Then solo se muestran horarios del mismo profesional con dos horas de anticipación

# CA5: turno pasado (Scenario individual)
Scenario: No se puede reprogramar un turno pasado
    Given el paciente tiene un turno en una fecha anterior a la fecha actual
    Then la opción "Reprogramar" no está disponible

# CA6 + CA7: restricciones de anticipación (Scenario Outline)
Scenario Outline: Restricciones para reprogramar un turno
    Given el paciente inicia el proceso para reprogramar un turno "<descripcion_caso>"
    When elige un día u horario inválido "<nuevo_horario>"
    Then el sistema no reprograma el turno
    And muestra el mensaje "<mensaje_esperado>"

Examples:
    Examples:
    | descripcion_caso | nuevo_horario | mensaje_esperado |
    | horario dentro de las 2 próximas horas (ej. ahora 13:30) | 14:30 | El horario debe superar las dos horas de anticipación |
    | fecha fuera de los tres próximos meses (ej. hoy 09/03/2026) | 10/07/2026 | La fecha no puede superar los tres meses desde la fecha actual |

# CA4: fechas pasadas deshabilitadas (Scenario individual)
Scenario: No se pueden elegir fechas pasadas
    Given el paciente inicia el proceso para reprogramar un turno
    When visualiza el calendario de fechas
    Then las fechas anteriores a la actual se encuentran deshabilitadas y no son seleccionables
