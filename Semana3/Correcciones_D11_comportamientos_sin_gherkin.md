## Correcciones – Día 11 – Comportamientos “sin Gherkin” (BDD) – Noelia Mustaff + Martín Cabrera

**Base**: `D11_comportamientos_sin_gherkin.md`  
**Objetivo**: reescribir en lenguaje de negocio, con comportamientos **observables** y reglas explícitas, sin depender de UI.

---

## 1) Objetivo del usuario (1–2 líneas)

### Cómo lo hicieron ustedes

> “El usuario accede a su cuenta personal para utilizar funciones del sistema de forma segura.”

### Versión mejorada (más concreta y verificable)

- El usuario quiere **iniciar sesión** para acceder a su cuenta y usar funcionalidades protegidas.
- El sistema debe permitir el acceso solo si las credenciales son válidas y la cuenta está habilitada.

---

## 2) Precondiciones (3–5 bullets)

### Cómo lo hicieron ustedes

> - El usuario tiene una cuenta registrada previamente.  
> - La cuenta del usuario está activa.  
> - El usuario tiene credenciales válidas.  
> - Existe una base de datos con los usuarios registrados.

### Versión mejorada (sin “detalle técnico” innecesario)

- El usuario tiene una cuenta existente y habilitada (no bloqueada/suspendida).
- El usuario **no** tiene una sesión iniciada al comenzar.
- El usuario cuenta con email/usuario y contraseña.
- El servicio de autenticación está disponible (o, si no, se espera un error controlado).

> Nota: “Existe una base de datos…” es infraestructura; en BDD se prefiere expresar el estado de negocio (“existe usuario habilitado”).

---

## 3) Comportamientos clave (8–12 bullets)

### A) Reescritura para volverlos “observables” (qué ve/obtiene el usuario)

#### 1) Validación de credenciales

**Cómo lo hicieron ustedes**

> “El sistema valida que las credenciales correspondan a la cuenta registrada.”

**Versión mejorada**

- Si el usuario ingresa credenciales válidas, entonces el sistema inicia sesión y el usuario accede a su cuenta.
- Si el usuario ingresa credenciales inválidas, entonces el sistema no inicia sesión y muestra un mensaje genérico de error.

#### 2) Mensajes de error (seguridad / no disclosure)

**Cómo lo hicieron ustedes**

> “El sistema no especifica cual de las credenciales es incorrecta, por seguridad.”  
> “El sistema no expone información sensible en los mensajes de error.”

**Versión mejorada (más verificable)**

- Si el usuario falla el login, el sistema muestra un mensaje genérico (ej.: “Credenciales inválidas”) sin indicar si falló email o contraseña.
- El sistema no revela si un usuario existe o no a través del texto del mensaje.

#### 3) Campos obligatorios

**Cómo lo hicieron ustedes**

> “El sistema valida que los campos obligatorios estén completos antes de procesar la autenticación.”

**Versión mejorada**

- Si el usuario deja email vacío y confirma, el sistema bloquea el login e informa que el email es obligatorio.
- Si el usuario deja contraseña vacía y confirma, el sistema bloquea el login e informa que la contraseña es obligatoria.

#### 4) Intentos fallidos y bloqueo

**Cómo lo hicieron ustedes**

> “El sistema registra los intentos de acceso fallidos.”

**Versión mejorada**

- El sistema registra los intentos fallidos.
- Si el usuario supera N intentos fallidos, el sistema bloquea temporalmente el acceso e informa el bloqueo.

#### 5) Sesión y expiración

**Cómo lo hicieron ustedes**

> “La sesión se mantiene activa hasta que el usuario cierra sesión o expira por inactividad.”

**Versión mejorada (con regla explícita)**

- La sesión permanece activa hasta que el usuario cierra sesión o hasta que pasa T de inactividad (definir T).
- Si la sesión expira, el sistema solicita re-autenticación para acceder a páginas protegidas.

#### 6) “Dispositivo nuevo” / 2FA (convertir en regla explícita o pregunta)

**Cómo lo hicieron ustedes**

> “Si el usuario inicia sesión en un dispositivo nuevo, el sistema valida la autenticación con un código de seguridad…”

**Versión mejorada (como comportamiento + pregunta)**

- Si el usuario inicia sesión desde un dispositivo no reconocido, el sistema solicita un segundo factor (código) antes de permitir el acceso.
- **Pregunta asociada**: ¿Qué se considera “dispositivo nuevo” y cómo se valida (SMS/email/app)?

### B) Comportamiento a ajustar (demasiado interno)

**Cómo lo hicieron ustedes**

> “El sistema asocia la sesión al perfil correspondiente.”

**Versión mejorada**

- Cuando el login es exitoso, el usuario ve su cuenta y puede acceder a funcionalidades acorde a su rol/perfil.

---

## 4) Casos negativos / alternativos (3 bullets)

### Cómo lo hicieron ustedes

> - Si el usuario supera el límite de intentos… bloquea temporalmente la cuenta.  
> - Si la cuenta está bloqueada… impide el acceso e informa.  
> - Si el usuario ingresa credenciales no válidas… no permite el acceso.

### Versión mejorada (sin duplicar y cubriendo variedad)

- Credenciales inválidas: bloquea acceso y muestra mensaje genérico.
- Cuenta bloqueada/suspendida: bloquea acceso e informa el estado (sin filtrar datos sensibles).
- Servicio de autenticación caído: bloquea acceso y muestra error controlado (sin dejar al usuario “sin respuesta”).

---

## 5) Preguntas de clarificación (3 bullets)

### Cómo lo hicieron ustedes

> - “¿Cuántos son los intentos fallidos antes de bloquear la cuenta temporalmente?”  
> - “¿Cuánto tiempo debe estar la sesión inactiva para expirar?”  
> - “¿El sistema permite recuperación de contraseña desde el flujo de login?”

### Versión mejorada (misma idea, con foco en regla/evidencia)

- ¿Cuál es N de intentos fallidos y cuánto dura el bloqueo?
- ¿Cuál es T de inactividad para expirar sesión y qué mensaje se muestra?
- ¿La recuperación de contraseña está disponible desde login y cuál es el comportamiento esperado (mensaje, canal, tiempos)?

