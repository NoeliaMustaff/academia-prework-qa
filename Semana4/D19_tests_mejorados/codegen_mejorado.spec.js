import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
});


test('agregar producto al carrito', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="item-4-title-link"]').click();
  await page.locator('[data-test="add-to-cart"]').click();
  /* await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  Se había intentado usar este selector, pero no funcionaba porque no era el correcto
  para la página en la que se estaba trabajando, que era la de detalles del producto.
  Entonces, no se realizó ningún cambio en todo el archivo, ya que se llegó a la conclusión
  de que los selectores utilizados cumplen con buenas prácticas.*/
  await page.locator('[data-test="back-to-products"]').click();
});


test('eliminar producto del carrito', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await page.locator('[data-test="continue-shopping"]').click();
});
