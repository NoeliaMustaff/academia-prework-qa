import { Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('estoy en la pantalla de login de SauceDemo {string}', async function (url) {
  await this.open(url);
});

Given('estoy logueado en SauceDemo {string}', async function (url) {
  await this.open(url);
  await this.page.getByPlaceholder('Username').fill('standard_user');
  await this.page.getByPlaceholder('Password').fill('secret_sauce');
  await this.page.getByRole('button', { name: 'Login' }).click();
  await expect(this.page).toHaveURL(/inventory\.html/);
});