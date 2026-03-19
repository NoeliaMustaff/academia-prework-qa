import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

When('inicio sesión con usuario {string} y password {string}', async function (username, password) {
  await this.page.getByPlaceholder('Username').fill(username);
  await this.page.getByPlaceholder('Password').fill(password);
  await this.page.getByRole('button', { name: 'Login' }).click();
});

Then('accedo al catálogo de productos', async function () {
  await expect(this.page).toHaveURL(/inventory\.html/);
  await expect(this.page.getByText('Products')).toBeVisible();
});

Then('veo el listado de productos', async function () {
  await expect(this.page.locator('.inventory_container')).toBeVisible();
});

Then('veo un mensaje de error de login {string}', async function (errorText) {
  await expect(this.page.getByText(errorText)).toBeVisible();
});

Then('permanezco en la pantalla de login', async function () {
  await expect(this.page).toHaveURL(/.*saucedemo\.com\/?$/);
  await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();
});