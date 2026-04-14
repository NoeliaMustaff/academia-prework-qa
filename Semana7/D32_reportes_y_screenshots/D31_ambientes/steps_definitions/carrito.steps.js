import { Then } from '@cucumber/cucumber';
import { ensureAllPages } from '../support/pageHelpers.js';

Then('el carrito muestra el producto {string} con su precio {string}', async function (producto, precio) {
  ensureAllPages(this);
  await this.productsPage.navbar.goToCart();
  await this.cartPage.assertLoaded();
  await this.cartPage.assertItemWithPrice(producto, precio);
});