

---

## 1) Entregado:

```gherkin
Feature: Inicio de sesión
    Como usuario registrado
    Quiero iniciar sesión
    Para acceder a mi cuenta y usar funcionalidades protegidas.

    Background:
        Given el sistema requiere autenticación para acceder a funcionalidades protegidas
        And el usuario está previamente registrado en el sistema
        And el usuario se encuentra en la pantalla de inicio de sesión        
        And el servicio de autenticación se encuentra disponible

    Scenario Outline: Intento de inicio de sesión con credenciales
        When el usuario intenta iniciar sesión con "<email>" y "<contraseña>"
        Then el sistema <resultado>

        Examples:
        | email             | contraseña         | resultado                                               |
        | noe@email.com     | ClaveSegura123     | inicia sesión y permite el acceso a la cuenta           |
        | noe@email.com     | Clavesegura1234    | no inicia sesión y muestra un mensaje genérico de error |
        | noenair@email.com | ClaveSegura123     | no inicia sesión y muestra un mensaje genérico de error |

    Scenario Outline: Validación de campos obligatorios
        When el usuario intenta iniciar sesión con "<email>" y "<contraseña>"
        Then el sistema informa que el "<campo>" es obligatorio
        And no permite enviar la solicitud

        Examples:
          | email         | contraseña      | campo        |
          |               | ClaveSegura123  | email        |
          | noe@email.com |                 | contraseña   |

    Scenario: Bloqueo temporal por múltiples intentos fallidos
        Given el usuario ingresa una contraseña incorrecta tres veces consecutivas
        When intenta iniciar sesión nuevamente
        Then el sistema bloquea temporalmente el acceso
        And informa que la cuenta se encuentra bloqueada

    Scenario: Expiración de sesión por inactividad
        Given el usuario tiene la sesión iniciada
        When transcurren 15 minutos de inactividad
        Then el sistema cierra la sesión automáticamente
        And solicita iniciar sesión nuevamente
```

---

## 2) Qué corregir y por qué (según consigna y checklist)

| Punto | Cómo está | Cómo debería estar / por qué |
|-------|-----------|------------------------------|
| **Parte A – Background** | "El sistema requiere autenticación..." y "El servicio de autenticación se encuentra disponible" son más descripción del sistema que precondiciones repetidas que el tester “arma” antes de cada escenario. | El Background debe contener solo **precondiciones comunes** que aplican a todos los escenarios (usuario registrado, en pantalla de login). Evitar pasos que suenan a infraestructura. |
| **Parte B – Scenario Outline** | El primer Outline mezcla **un caso exitoso** (fila 1) con **casos inválidos** (filas 2 y 3), y el `Then` usa `<resultado>` con texto largo y distinto por fila. | La consigna pide “caso data-driven (ej.: login inválido con varias combinaciones)”. Conviene tener: (1) un **Scenario** único para “login exitoso” y (2) un **Scenario Outline** solo para “login inválido” con 2–3 filas, donde el `Then` sea el mismo (no inicia sesión + mensaje) y solo cambien los datos. Así se ve clara la “conversión de 2–3 escenarios similares” en un Outline. |
| **Examples – columna resultado** | La columna `resultado` tiene frases largas (“inicia sesión y permite el acceso…”, “no inicia sesión y muestra…”). | En Gherkin suele preferirse que el `Then` sea el mismo para todas las filas del Outline y que los datos solo cambien **inputs** (email/contraseña). Si el resultado esperado es distinto (éxito vs error), es más claro separar en un Scenario para éxito y un Outline para los inválidos. |

| **Segundo Outline (campos obligatorios)** | Está bien como idea; solo asegurar que los placeholders `<email>`, `<contraseña>`, `<campo>` coincidan con la tabla. | Se mantiene; es un segundo caso data-driven válido. |

---

## 3) Ejemplo completo corregido según consigna del día 13.

A continuación, el `.feature` completo con Background ajustado, un Scenario para login exitoso, un Scenario Outline solo para login inválido (2–3 combinaciones), el Scenario Outline de validación de campos obligatorios, los dos Scenarios de bloqueo y expiración, y la Parte C (Notas).

```gherkin
Feature: Inicio de sesión
  Como usuario registrado
  Quiero iniciar sesión
  Para acceder a mi cuenta y usar funcionalidades protegidas

  Background:
    Given el usuario está previamente registrado en el sistema
    And el usuario se encuentra en la pantalla de inicio de sesión

  Scenario: Login exitoso con credenciales válidas
    When el usuario intenta iniciar sesión con "noe@email.com" y "ClaveSegura123"
    Then el sistema inicia la sesión
    And el usuario accede a su cuenta

  Scenario Outline: Login inválido con varias combinaciones
    When el usuario intenta iniciar sesión con "<email>" y "<contraseña>"
    Then el sistema no inicia la sesión
    And el usuario ve un mensaje genérico de error

    Examples:
      | email             | contraseña      |
      | noe@email.com     | Clavesegura1234  |
      | noenair@email.com | ClaveSegura123   |
      | noe@email.com     | claveincorrecta |

  Scenario Outline: Validación de campos obligatorios
    When el usuario intenta iniciar sesión con "<email>" y "<contraseña>"
    Then el sistema informa que el "<campo>" es obligatorio
    And no permite enviar la solicitud

    Examples:
      | email         | contraseña     | campo      |
      |               | ClaveSegura123 | email      |
      | noe@email.com |                | contraseña |

  Scenario: Bloqueo temporal por múltiples intentos fallidos
    Given el usuario ingresa una contraseña incorrecta tres veces consecutivas
    When intenta iniciar sesión nuevamente
    Then el sistema bloquea temporalmente el acceso
    And informa que la cuenta se encuentra bloqueada

  Scenario: Expiración de sesión por inactividad
    Given el usuario tiene la sesión iniciada
    When transcurren 15 minutos de inactividad
    Then el sistema cierra la sesión automáticamente
    And solicita iniciar sesión nuevamente

# Notas:
# - Qué duplicación eliminamos: las precondiciones "usuario registrado" y "en pantalla de inicio de sesión" estaban implícitas en todos; las pasamos al Background. Tres escenarios de "login inválido" se convirtieron en un solo Scenario Outline con Examples.
# - Qué mejoró en legibilidad: los escenarios se leen por intención; el Outline de login inválido evita repetir el mismo When/Then; el Outline de campos obligatorios concentra email vacío y contraseña vacía.
# - Qué dudas quedan (si aplica): ¿Cuántos intentos fallidos exactos disparan el bloqueo (3 u otro)? ¿Los 15 minutos de inactividad son configurables?
```

---

## 4) Resumen de cambios aplicados

- **Background**: Solo 2 precondiciones (registrado + en pantalla de login). Se quitaron “el sistema requiere autenticación” y “el servicio de autenticación disponible” para no mezclar con el test.
- **Login exitoso**: Un solo `Scenario` con datos concretos (no dentro del Outline).
- **Login inválido**: Un solo `Scenario Outline` con 3 filas de datos; el `Then` es idéntico en todas (no inicia sesión + mensaje genérico). Sin columna `resultado`.
- **Campos obligatorios**: Se mantiene tu segundo Outline; solo se unificó indentación y nombres de columnas.
- **Bloqueo y expiración**: Se mantienen igual; ya estaban bien.
- **Parte C**: Añadida la sección `# Notas:` con duplicación eliminada, legibilidad y dudas.
- **Indentación**: 2 espacios en todos los pasos.

---

## 5) Te adjunto ejemplos extras sacados de casos de pruebas anteriores para que tengas más idea de cómo realizar los scenarios outline.

A continuación, cuatro **Scenario Outline** de otros casos de prueba: uno de login exitoso con variaciones (inspirado en `login.feature`) y tres más inspirados en `busqueda_y_filtros.feature` y en casos que suelen faltar. Sirven como referencia para practicar Outline + Examples; la información de los casos proviene de esos archivos, escritos aquí del modo que tendrían que estar bien hechos.

### 5.1 Login exitoso con variaciones

Varios usuarios válidos (distintas cuentas o roles) que inician sesión correctamente; el mismo resultado para todos.

```gherkin
  Scenario Outline: Login exitoso con distintas cuentas válidas
    When el usuario intenta iniciar sesión con "<email>" y "<contraseña>"
    Then el sistema inicia la sesión
    And el usuario accede a su cuenta

    Examples:
      | email              | contraseña     |
      | noe@email.com      | ClaveSegura123 |
      | admin@sistema.com  | Admin#2024     |
      | soporte@email.com  | Soporte99!     |
```

### 5.2 Búsqueda con distintos criterios que devuelven resultados

A partir de la idea de “buscar por nombre” y “aplicar filtro por categoría”: un Outline que varía el tipo de criterio (nombre, categoría, etc.) y el valor, con el mismo resultado (se muestran resultados).

```gherkin
  Scenario Outline: Búsqueda con criterio válido muestra resultados
    Given existen productos cargados en el sistema
    When el usuario busca por "<tipo_criterio>" con valor "<valor>"
    Then el sistema muestra productos que coinciden

    Examples:
      | tipo_criterio | valor        |
      | nombre       | laptop       |
      | categoría    | electrónica  |
      | marca        | Acme         |
```

### 5.3 Búsqueda sin resultados con distintos criterios inexistentes

Variación del caso “realizar una búsqueda sin resultados”: mismo When/Then, varios criterios que no devuelven nada (evita repetir 3 escenarios casi iguales).

```gherkin
  Scenario Outline: Búsqueda sin resultados según criterio inexistente
    Given existen productos cargados en el sistema
    When el usuario realiza una búsqueda con "<criterio>"
    Then el sistema informa que no se encontraron resultados (acá si necesitás espoecificar, podes ingresar una variable para el mensaje e introducir el mensaje como uan columna adicional en los examples, pero siempre va a ser el mismo mensaje)

    Examples:
      | criterio           |
      | xyznombreinexistente |
      | categoría fantasma  |
      | SKU-99999          |
```

### 5.4 Aplicar filtros combinados (categoría y rango de precio)

Inspirado en “aplicar varios filtros”: un Outline con distintas combinaciones categoría + rango, mismo resultado (productos que cumplen ambos criterios).

```gherkin
  Scenario Outline: Filtros combinados por categoría y rango de precio
    Given existen productos de distintas categorías y precios
    When el usuario aplica filtro por categoría "<categoria>"
    And aplica filtro por rango de precio "<rango_min>" a "<rango_max>"
    Then el sistema muestra solo los productos que cumplen ambos criterios

    Examples:
      | categoria   | rango_min | rango_max |
      | electrónica| 100       | 500       |
      | hogar      | 50        | 200       |
      | deportes   | 20        | 150       |
```
