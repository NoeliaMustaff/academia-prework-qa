import { When, Then } from '@cucumber/cucumber';
import { InventoryPage } from '../pages/InventoryPage.js';

When('ordeno los productos por {string}', async function (criterio) {
  const inventory = new InventoryPage(this.page);
  await inventory.sortBy(criterio);
});

Then('el primer producto es {string}', async function (nombre) {
  const inventory = new InventoryPage(this.page);
  await inventory.assertFirstProductName(nombre);
});

Then('el primer precio es {string}', async function (precio) {
  const inventory = new InventoryPage(this.page);
  await inventory.assertFirstPrice(precio);
});