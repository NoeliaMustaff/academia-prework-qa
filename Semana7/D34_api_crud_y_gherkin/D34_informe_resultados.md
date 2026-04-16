## Mustaff | Cabrera
## D34 – Informe de resultados (PARTE D)

### Qué se probó (lista corta)

- Autenticación en Restful Booker con `POST /auth` para obtener token.
- Flujo CRUD completo de reservas:
  - Crear reserva (`POST /booking`) y guardar `bookingid`.
  - Consultar reserva (`GET /booking/:id`).
  - Actualizar reserva (`PUT /booking/:id`) con autenticación.
  - Eliminar reserva (`DELETE /booking/:id`) con autenticación.
- Integración de casos en Gherkin (`api.feature`) con steps implementados en `steps_definitions/api.steps.js` (y pasos comunes en `steps_definitions/common.steps.js`).
- Validaciones mínimas por paso: status code, estructura JSON y campo clave.

### Qué salió bien / qué falló

- **Salió bien**:
  - Se obtuvo token válido en autenticación.
  - El `bookingid` se capturó desde el POST inicial y se reutilizó como fuente de verdad.
  - El flujo Create, Read, Update y Delete respondió con códigos esperados cuando el servicio estuvo estable.
  - Se logró expresar la Parte C con lenguaje de intención en Gherkin y ejecución técnica en steps con axios.
- **Qué falló o puede fallar**:
  - Restful Booker puede tener intermitencias; ante caídas o saturación algunos pasos pueden fallar por disponibilidad externa.
  - Se observó intermitencia con respuestas no exitosas en creación (por ejemplo `418 I'm a teapot`) cuando el servicio público está saturado o limita tráfico automatizado.
  - En eliminación, el comportamiento posterior puede variar según el estado del entorno compartido.

### Riesgos detectados

- Dependencia de un servicio público externo (inestabilidad o rate limiting).
- Posible colisión de datos en entorno compartido al no tener aislamiento total por usuario.
- Riesgo de falsos negativos si expira token o cambia comportamiento temporal del endpoint.
- Riesgo de seguridad si se suben secretos al repo (mitigado usando variables de entorno y sin exponer claves reales).

### Evidencia disponible

- Código de pruebas CRUD: `D34_api_crud_y_gherkin/booking.crud.test.js`.
- Escenarios Gherkin: `D34_api_crud_y_gherkin/api.feature`.
- Definiciones de steps con validaciones: `D34_api_crud_y_gherkin/steps_definitions/api.steps.js`.
- Notas técnicas y decisiones: `D34_api_crud_y_gherkin/notas.md`.
- Evidencia de ejecución: reporte HTML de Cucumber (si se genera con `--format html:...`) y adjuntos del hook `support/hooks.js` en escenarios fallidos (incluye `bookingId` y un resumen controlado del último error HTTP cuando corresponde).

### Token temporal o campos codificados (sin secretos)

- Se documentó el patrón de token temporal (API Key en variable de entorno, obtención de access token y manejo de expiración 401/403) sin exponer secretos; para IDs/campos opacos se usa siempre el valor emitido por el sistema como fuente de verdad, sin inventar datos manualmente.