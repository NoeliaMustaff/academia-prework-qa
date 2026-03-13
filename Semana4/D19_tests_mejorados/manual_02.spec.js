import { test, expect } from '@playwright/test';

test('login inválido', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secretsauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="login-container"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toBeVisible();

});