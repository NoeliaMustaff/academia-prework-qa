import { Given, When, Then } from '@cucumber/cucumber';
import { BasePage } from '../pages/BasePage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { ERRORS } from '../constants/messages.js';
import { URLS } from '../constants/urls.js';
import usersData from '../data/users.json' with { type: 'json' };

Given('que abro Sauce Demo', async function () {
  const base = new BasePage(this.page);
  await base.open(URLS.base);
});

When('inicio sesión con credenciales válidas', async function () {
  const login = new LoginPage(this.page);
  await login.login(
    usersData.validUser.username,
    usersData.validUser.password
  );
});

When(
  'inicio sesión con el usuario {string} y la contraseña {string}',
  async function (u, p) {
    const login = new LoginPage(this.page);
    await login.login(u, p);
  }
);

Then('accedo al catálogo de productos', async function () {
  const inventory = new InventoryPage(this.page);
  await inventory.assertLoaded();
});

Then('veo el listado de productos', async function () {
  const inventory = new InventoryPage(this.page);
  await inventory.assertInventoryVisible();
});

Then('veo el error de tipo {string}', async function (tipo) {
  const login = new LoginPage(this.page);
  const porTipo = {
    lockedOut: ERRORS.lockedOut,
    invalidCredentials: ERRORS.invalidCredentials,
    missingUsername: ERRORS.missingUsername,
    missingPassword: ERRORS.missingPassword,
  };
  const esperado = porTipo[tipo];
  if (!esperado) {
    throw new Error(`Tipo de error desconocido: ${tipo}`);
  }
  await login.assertError(esperado);
});

Then('permanezco en la pantalla de login', async function () {
  const login = new LoginPage(this.page);
  await login.assertOnLogin();
});