import { When, Then } from '@cucumber/cucumber';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';

When('agrego el producto {string} al carrito', async function (producto) {
  const inventory = new InventoryPage(this.page);
  await inventory.addToCart(producto);
});

Then('el carrito muestra el producto {string} con su precio {string}', async function (producto, precio) {
  const inventory = new InventoryPage(this.page);
  await inventory.goToCart();

  const cart = new CartPage(this.page);
  await cart.assertLoaded();

  await cart.assertItemWithPrice(producto, precio);
});