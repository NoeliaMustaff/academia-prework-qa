## Mustaff | Cabrera
### Parte A2 – Token temporal y API Key previa (patrón general)

- **Valor que se guarda como key**:
  - Se asume una API Key de ejemplo guardada en una variable de entorno, por ejemplo `process.env.MI_API_KEY` en local.
  - En este repo no se sube `.env`; solo se mencionaría en un hipotético `.env.example` sin valores reales.
- **Cómo se obtendría el token temporal**:
  - La API Key se envía en un header (ej. `x-api-key`) o en un body de `POST /oauth/token` o `/session`.
  - La respuesta devuelve un `access_token` (por ejemplo un JWT) junto con un tiempo de vida (`expires_in` o `exp`).

- **Cómo detectar expiración en tests**:
  - Cuando el token expira, la API suele responder con `401 Unauthorized` o `403 Forbidden`.
  - Un test podría:
    - Hacer una llamada con un token viejo y esperar `401/403`.
    - Volver a ejecutar el flujo de obtención de token temporal y repetir la llamada esperando ahora un `2xx`.