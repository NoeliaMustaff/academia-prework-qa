import { Given, When, Then } from '@cucumber/cucumber';
import { ensureAllPages } from '../support/pageHelpers.js';
import { ERRORS } from '../constants/messages.js';
import usersData from '../data/users.json' with { type: 'json' };

Given('que abro Sauce Demo', async function () {
  ensureAllPages(this);
  await this.basePage.open('/');
});

When('inicio sesión con credenciales válidas', async function () {
  ensureAllPages(this);
  await this.loginPage.login(
    usersData.validUser.username,
    usersData.validUser.password
  );
});

When(
  'inicio sesión con el usuario {string} y la contraseña {string}',
  async function (u, p) {
    ensureAllPages(this);
    await this.loginPage.login(u, p);
  }
);

Then('accedo al catálogo de productos', async function () {
  ensureAllPages(this);
  await this.productsPage.assertLoaded();
});

Then('veo el listado de productos', async function () {
  ensureAllPages(this);
  await this.productsPage.assertInventoryVisible();
});

Then('veo el error de tipo {string}', async function (tipo) {
  ensureAllPages(this);
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
  await this.loginPage.assertError(esperado);
});

Then('permanezco en la pantalla de login', async function () {
  ensureAllPages(this);
  await this.loginPage.assertOnLogin();
});

Then('forzamos un fallo para ver el reporte', async function () {
  throw new Error('Fallo intencional D31: screenshot + adjunto de red en el HTML');
});