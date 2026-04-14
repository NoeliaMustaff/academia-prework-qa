import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.orderCompleteHeading = page.getByRole('heading', {
      name: 'Thank you for your order!',
    });
  }

  async fillYourInformation(firstName, lastName, postalCode) {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
  }

  async finishOrder() {
    await this.finishButton.click();
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
  }

  async assertOrderComplete(expectedText) {
    await expect(
      this.page.getByRole('heading', { name: expectedText, exact: true })
    ).toBeVisible();
  }
}