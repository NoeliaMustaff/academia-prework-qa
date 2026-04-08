import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorBox = page.locator('[data-test="error"]');
  }

  async openSauceDemo() {
    await this.open('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertOnLogin() {
    await expect(this.page).toHaveURL(/.*saucedemo\.com\/?$/);
    await expect(this.loginButton).toBeVisible();
  }

  async assertError(expectedText) {
    await expect(this.errorBox).toBeVisible();
    await expect(this.errorBox).toContainText(expectedText);
  }
}