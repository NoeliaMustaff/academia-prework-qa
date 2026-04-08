import { Given, When } from '@cucumber/cucumber';
import { BasePage } from '../pages/BasePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

Given('que navego a la página {string}', async function (url) {
  const base = new BasePage(this.page);
  await base.open(url);
});

Given(
  'estoy logueado en SauceDemo como {string} con clave {string}',
  async function (usuario, clave) {
    const login = new LoginPage(this.page);
    const inventory = new InventoryPage(this.page);

    await login.openSauceDemo();
    await login.login(usuario, clave);
    await inventory.assertLoaded();
  }
);

When('inicio sesión con el usuario {string} y la contraseña {string}', async function (u, p) {
  const login = new LoginPage(this.page);
  await login.login(u, p);
});

When('agrego el producto {string} al carrito', async function (producto) {
  const inventory = new InventoryPage(this.page);
  await inventory.addToCart(producto);
});