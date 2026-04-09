import { Given, When } from '@cucumber/cucumber';
import { BasePage } from '../pages/BasePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { URLS } from '../constants/urls.js';
import usersData from '../data/users.json' with { type: 'json' };

Given('estoy logueado en SauceDemo con usuario válido', async function () {
  const login = new LoginPage(this.page);
  const inventory = new InventoryPage(this.page);

  await login.openSauceDemo();
  await login.login(usersData.validUser.username, usersData.validUser.password);
  await inventory.assertLoaded();
});

When('agrego el producto {string} al carrito', async function (producto) {
  const inventory = new InventoryPage(this.page);
  await inventory.addToCart(producto);
});