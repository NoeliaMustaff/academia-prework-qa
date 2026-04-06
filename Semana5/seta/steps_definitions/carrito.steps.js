import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

  When('agrego el producto {string} al carrito', async function (producto) {
    const item = this.page.locator('.inventory_item').filter({
      has: this.page.getByText(producto),
    });
    await item.getByRole('button', { name: /Add to cart/i }).click();
  });
  