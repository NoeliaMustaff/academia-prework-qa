import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async assertItemWithPrice(productName, expectedPrice) {
    const cartItem = this.page.locator('.cart_item').filter({
      has: this.page.getByText(productName),
    });

    await expect(cartItem).toBeVisible();
    await expect(cartItem.locator('.inventory_item_price')).toHaveText(expectedPrice);
  }
}