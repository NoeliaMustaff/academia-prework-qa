import { Then } from '@cucumber/cucumber';
import { InventoryPage } from '../pages/InventoryPage.js';
import { LoginPage } from '../pages/LoginPage.js';

Then('accedo al catálogo de productos', async function () {
  const inventory = new InventoryPage(this.page);
  await inventory.assertLoaded();
});

Then('veo el listado de productos', async function () {
  const inventory = new InventoryPage(this.page);
  await inventory.assertInventoryVisible();
});

Then('veo el mensaje de error {string}', async function (errorText) {
  const login = new LoginPage(this.page);
  await login.assertError(errorText);
});

Then('permanezco en la pantalla de login', async function () {
  const login = new LoginPage(this.page);
  await login.assertOnLogin();
});