Noelia Mustaff | Agustín Quintana

# D24 – Hooks y reutilización de steps

# Estructura:

D24_hooks_reutilizacion/
├── features/
│   ├── login.feature
│   ├── carrito.feature
│   ├── filtros.feature
│   ├── step_definitions/
│   │   ├── comunes.steps.js    # Steps compartidos (navegar, autenticar)
│   │   ├── login.steps.js
│   │   ├── carrito.steps.js
│   │   └── filtros.steps.js
│   └── support/
│       ├── world.js            # CustomWorld: open, close, headless, slowmo
│       └── hooks.js            # After (cleanup), screenshot on failure
└── README.md

# 5 pasos repetidos:
    1. "estoy en la pantalla de login de SauceDemo" (D22 login.steps, login2.steps) – mismo comportamiento (abrir URL).
    2. "inicio sesión con usuario X y password Y" (D22 login.steps, login2.steps) – misma lógica (fill + click).
    3. "veo un mensaje de error de login" (D22 login.steps, login2.steps) – misma validación.
    4. "veo la página de productos" / "accedo al catálogo de productos" – misma verificación (URL inventory + "Products").
    5. "se muestra el listado de productos" / "veo el listado de productos" – misma validación (.inventory_container).

# 3 patrones repetidos
    1. Navegar/abrir: open(url), page.goto() – en "estoy en la pantalla de login", "estoy logueado".
    2. Loggear: fill(username), fill(password), click(Login) – en "inicio sesión" y "estoy logueado".
    3. Validar mensaje visible: expect().toBeVisible(), expect().toHaveText() – en errores de login, listado, carrito.

# Soluciones aplicadas en D24
    - Steps reutilizables en comunes.steps.js (p. ej. "estoy en la pantalla de login", "estoy logueado").
    - Background para evitar repetir el Given en cada escenario.
    - World con open() que cierra browser previo antes de abrir uno nuevo.
    - Hooks: After para cierre de recursos.
    - Screenshots por fallo.
    - Variable headless + slowmo.
    - Reporte HTML: cucumber-report.html