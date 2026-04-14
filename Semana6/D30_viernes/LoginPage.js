// LoginPage.js
import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async gotoLogin(url) {
    await this.page.goto(url);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectOnInventory() {
    await expect(this.page).toHaveURL(/inventory\.html/);
  }
}

// dynamic_loading.spec.js
import { test, expect } from '@playwright/test';
 
test('carga dinámica sin sleeps artificiales', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');
 
  const start = page.getByRole('button', { name: 'Start' });
  const loading = page.locator('#loading');
  const headline = page.locator('#finish');
 
  await start.click();
 
  await expect(loading).toBeHidden();
  await expect(headline).toHaveText('Hello World!');
});

/*Archivo data/users.json:
{
  "validUser": {
    "username": "standard_user",
    "password": "secret_sauce"
  },
  "lockedUser": {
    "username": "locked_out_user",
    "password": "secret_sauce"
  }
}
*/
import usersData from '../data/users.json' with { type: 'json' };
 
await this.loginPage.login(
  usersData.validUser.username,
  usersData.validUser.password
);

// constants/messages.js
 
export const ERRORS = {
  lockedOut:
    "Epic sadface: Sorry, this user has been locked out."
 
};

// CheckoutOverviewPage.js (fragmento)
import { expect } from '@playwright/test';
export class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.itemPrices = page.locator('.inventory_item_price');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
  }
  async expectItemTotalMatchesSum() {
    const texts = await this.itemPrices.allTextContents();
    const sum = texts
      .map((t) => parseFloat(t.replace('$', '').trim()))
      .reduce((acc, n) => acc + n, 0);
    const textoSubtotal = await this.subtotalLabel.textContent();
    const subtotalSinPeso = parseFloat(textoSubtotal.replace('Item total: $', '').trim());
    expect(sum).toBeCloseTo(subtotalSinPeso, 2);
  }
}


// NavbarComponent.js
export class NavbarComponent {
  constructor(page) {
    this.page = page;
    this.cartLink = page.locator('.shopping_cart_link');
  }
  async goToCart() {
    await this.cartLink.click();
  }
}

this.navbar = new NavbarComponent(page);