import { test, expect } from '@playwright/test';

test.describe('The Internet – carga dinámica (ejemplo 1)', () => {
  test('Start muestra Hello World sin waitForTimeout', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

    await page.getByRole('button', { name: 'Start' }).click();

    await expect(page.locator('#loading')).toBeHidden();

    await expect(page.locator('#finish')).toContainText('Hello World!');
  });
});