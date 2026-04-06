import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

// Login y producto en carrito: common.steps.js + steps de carrito (no repetir aquí).

When('voy al carrito', async function () {
  await this.page.locator('[data-test="shopping-cart-link"]').click();
  await expect(this.page).toHaveURL(/.*cart\.html/);
});

When('inicio el proceso de checkout', async function () {
  await this.page.locator('[data-test="checkout"]').click();
  await expect(this.page).toHaveURL(/.*checkout-step-one\.html/);
});

When('completo los datos con nombre {string}, apellido {string} y zip {string}', async function (nombre, apellido, zip) {
  if (nombre) await this.page.locator('[data-test="firstName"]').fill(nombre);
  if (apellido) await this.page.locator('[data-test="lastName"]').fill(apellido);
  if (zip) await this.page.locator('[data-test="postalCode"]').fill(zip);
});

When('confirmo la compra', async function () {
  await this.page.locator('[data-test="continue"]').click();
  await expect(this.page).toHaveURL(/.*checkout-step-two\.html/);
  await this.page.locator('[data-test="finish"]').click();
  await expect(this.page).toHaveURL(/.*checkout-complete\.html/);
});

When('intento continuar con el checkout', async function () {
  await this.page.locator('[data-test="continue"]').click();
});

Then('veo el mensaje de orden completada', async function () {
  const container = this.page.locator('[data-test="checkout-complete-container"]');
  await expect(container).toBeVisible();
  await expect(container).toContainText('Thank you for your order!');
});

Then('veo el error de envío {string}', async function (mensajeError) {
  const error = this.page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  await expect(error).toContainText(mensajeError);
});

// --- Mismos pasos con los textos de features/checkout.feature ---

When('abro el carrito de compras', async function () {
  await this.page.locator('[data-test="shopping-cart-link"]').click();
  await expect(this.page).toHaveURL(/.*cart\.html/);
});

When('hago clic en el botón {string}', async function (nombreBoton) {
  await this.page.getByRole('button', { name: nombreBoton }).click();
});

When(
  'completo el formulario de checkout con nombre {string}, apellido {string} y código postal {string}',
  async function (nombre, apellido, zip) {
    if (nombre) await this.page.locator('[data-test="firstName"]').fill(nombre);
    if (apellido) await this.page.locator('[data-test="lastName"]').fill(apellido);
    if (zip) await this.page.locator('[data-test="postalCode"]').fill(zip);
  }
);

When('avanzo en el checkout hasta finalizar el pedido', async function () {
  await this.page.locator('[data-test="continue"]').click();
  await expect(this.page).toHaveURL(/.*checkout-step-two\.html/);
  await this.page.locator('[data-test="finish"]').click();
  await expect(this.page).toHaveURL(/.*checkout-complete\.html/);
});

Then('veo el mensaje {string}', async function (texto) {
  const container = this.page.locator('[data-test="checkout-complete-container"]');
  await expect(container).toBeVisible();
  await expect(container).toContainText(texto);
});

Then('veo el mensaje de error {string}', async function (mensajeError) {
  const error = this.page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  await expect(error).toContainText(mensajeError);
});