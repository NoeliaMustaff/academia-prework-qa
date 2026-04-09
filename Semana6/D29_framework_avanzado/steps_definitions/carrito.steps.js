import { Then } from '@cucumber/cucumber';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';

Then('el carrito muestra el producto {string} con su precio {string}', async function (producto, precio) {
  const inventory = new InventoryPage(this.page);
  await inventory.navbar.goToCart();

  const cart = new CartPage(this.page);
  await cart.assertLoaded();

  await cart.assertItemWithPrice(producto, precio);
});