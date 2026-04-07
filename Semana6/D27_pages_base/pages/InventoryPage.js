import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.inventoryContainer = page.locator('.inventory_container');
    this.productsTitle = page.getByText('Products');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.firstItemName = page.locator('.inventory_item_name').first();
    this.firstItemPrice = page.locator('.inventory_item_price').first();
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.productsTitle).toBeVisible();
  }

  async assertInventoryVisible() {
    await expect(this.inventoryContainer).toBeVisible();
  }

  async sortBy(value) {
    await this.sortSelect.selectOption(value);
  }

  async assertFirstProductName(expectedName) {
    await expect(this.firstItemName).toHaveText(expectedName);
  }

  async assertFirstPrice(expectedPrice) {
    await expect(this.firstItemPrice).toHaveText(expectedPrice);
  }

  async addToCart(productName) {
    const item = this.page.locator('.inventory_item').filter({
      has: this.page.getByText(productName),
    });
    await item.getByRole('button', { name: /Add to cart/i }).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}