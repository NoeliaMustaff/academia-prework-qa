import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

When('aplico el filtro {string}', async function (filtro) {
  let value = 'az';
  if (filtro.includes('precio')) {
    value = filtro.includes('menor a mayor') ? 'lohi' : 'hilo';  // "menor a mayor" = lohi
  } else if (filtro.includes('Z a A')) {
    value = 'za';
  } else if (filtro.includes('A a Z')) {
    value = 'az';
  }
  await this.page.locator('.product_sort_container').selectOption(value);
});

Then('el primer producto es {string}', async function (producto) {
  const first = this.page.locator('.inventory_item_name').first();
  await expect(first).toHaveText(producto);
});