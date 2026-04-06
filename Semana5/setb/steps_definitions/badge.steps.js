import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

When('agrego el producto {string} al carrito', async function (nombreProducto) {
  const item = this.page.locator('.inventory_item').filter({
    has: this.page.getByText(nombreProducto),
  });
  await item.getByRole('button', { name: /Add to cart/i }).click();
});

When('remuevo el producto {string} del carrito', async function (nombreProducto) {
  const item = this.page.locator('.inventory_item').filter({
    has: this.page.getByText(nombreProducto),
  });
  await item.getByRole('button', { name: /Remove/i }).click();
});

Then('el badge del carrito muestra {string}', async function (cantidad) {
  const badge = this.page.locator('[data-test="shopping-cart-badge"]');
  await expect(badge).toBeVisible();
  await expect(badge).toHaveText(cantidad);
});

Then('el badge del carrito no es visible', async function () {
  const badge = this.page.locator('[data-test="shopping-cart-badge"]');
  await expect(badge).toHaveCount(0);
});