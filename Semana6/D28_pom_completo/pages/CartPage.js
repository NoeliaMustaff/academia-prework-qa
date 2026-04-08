import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItemRows = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async startCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
  }

  async assertItemWithPrice(productName, expectedPrice) {
    const row = this.cartItemRows.filter({
      has: this.page.getByText(productName),
    });
    await expect(row).toBeVisible();
    await expect(row.locator('.inventory_item_price')).toHaveText(expectedPrice);
  }
}