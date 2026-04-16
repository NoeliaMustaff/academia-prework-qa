## Mustaff | Cabrera
### Parte A1 – Autenticación con token (Restful Booker)

- **Dónde se guarda el token**:
  - En el flujo Node + axios (`booking.crud.test.js`) se guarda en un contexto en memoria `testContext`.
  - En Cucumber se guarda en el World (`support/world.js`) y se comparte entre steps.
- **Cómo se pasa el token en axios**:
  - En `booking.crud.test.js` se usa un helper (`authHeaders`) que construye:
    - `headers: { Cookie: \`token=${token}\` }`
  - En Cucumber (`steps_definitions/api.steps.js`) se envía el mismo header `Cookie: token=...` directamente en los requests que lo requieren (PUT/DELETE).

### Parte A3 – IDs o campos “opacos”

- **Ejemplo hipotético de ID tipo Base64**:
  - Supongamos que la API devolviera un `bookingId` como un string largo tipo `eyJpZCI6MTIzLCJ1c2VyIjoiZGVtbyJ9` en vez de un entero.
  - Ese valor podría ser Base64 de un JSON. En Node se podría inspeccionar así (solo en entornos de prueba):
    - `Buffer.from(bookingId, 'base64').toString('utf8')`
  - En este ejercicio se documenta la idea en lugar de modificar el comportamiento real de Restful Booker (que usa enteros).
- **Si no se puede generar un ID válido manipulando datos**:
  - Es lo esperable en una API segura: aunque un tester pueda decodificar o ver la estructura interna, la API debería validar firma, cifrado y formato.
  - Conclusión: la manipulación manual de IDs “opacos” suele romper la firma/cifrado y la API correctamente responde con error (por ejemplo 400 o 404).