import { expect } from '@playwright/test';

export class NavbarComponent {
  constructor(page) {
    this.page = page;
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  /** @returns {Promise<number>} */
  async getCartItemCount() {
    if (!(await this.cartBadge.isVisible())) {
      return 0;
    }
    const text = (await this.cartBadge.textContent())?.trim() ?? '';
    const n = parseInt(text, 10);
    return Number.isFinite(n) ? n : 0;
  }

  async expectCartBadgeCount(count) {
    if (count === 0) {
      await expect(this.cartBadge).toBeHidden();
    } else {
      await expect(this.cartBadge).toHaveText(String(count));
    }
  }
}