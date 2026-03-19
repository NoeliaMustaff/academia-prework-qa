import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

When('agrego el producto {string} al carrito', async function (producto) {
  const item = this.page.locator('.inventory_item').filter({
    has: this.page.getByText(producto),
  });
  await item.getByRole('button', { name: /Add to cart/i }).click();
});

When('voy al carrito', async function () {
  await this.page.locator('.shopping_cart_link').click();
  await expect(this.page).toHaveURL(/cart\.html/);
});

When('elimino el producto {string} del carrito', async function (producto) {
  const cartItem = this.page.locator('.cart_item').filter({
    has: this.page.getByText(producto),
  });
  await cartItem.getByRole('button', { name: /Remove/i }).click();
});

Then('el carrito muestra el producto {string} con su precio {string}', async function (producto, precio) {
  if (!this.page.url().includes('cart.html')) {
    await this.page.locator('.shopping_cart_link').click();
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  const cartItem = this.page.locator('.cart_item').filter({
    has: this.page.getByText(producto),
  });
  await expect(cartItem).toBeVisible();
  await expect(cartItem.locator('.inventory_item_price')).toHaveText(`$${precio}`);
});

Then('el carrito no muestra el producto {string}', async function (producto) {
  await expect(this.page.locator('.cart_item').filter({ has: this.page.getByText(producto) })).toHaveCount(0);
});

Then('el carrito está vacío', async function () {
  await expect(this.page.locator('.cart_item')).toHaveCount(0);
});