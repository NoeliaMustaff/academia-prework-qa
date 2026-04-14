import { Given, When } from '@cucumber/cucumber';
import { ensureAllPages } from '../support/pageHelpers.js';
import usersData from '../data/users.json' with { type: 'json' };

Given('estoy logueado en SauceDemo con usuario válido', async function () {
  ensureAllPages(this);
  await this.loginPage.openSauceDemo();
  await this.loginPage.login(
    usersData.validUser.username,
    usersData.validUser.password
  );
  await this.productsPage.assertLoaded();
});

When('agrego el producto {string} al carrito', async function (producto) {
  ensureAllPages(this);
  await this.productsPage.addToCart(producto);
});