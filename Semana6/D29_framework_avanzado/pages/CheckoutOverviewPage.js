import { expect } from '@playwright/test';

export class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.itemPrices = page.locator('.inventory_item_price');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
  }

  async assertItemTotalMatchesSumOfLineItems() {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);

    const textos = await this.itemPrices.allTextContents();
    const suma = textos.reduce((acc, text) => {
      const limpio = text.replace('$', '');
      return acc + parseFloat(limpio);
    }, 0);

    await expect(this.subtotalLabel).toBeVisible();
    const textoSubtotal = await this.subtotalLabel.textContent();
    const sinPeso = textoSubtotal.replace('$', '');
    const parteNumerica = sinPeso.trim().split(/\s+/).filter(Boolean).pop();
    const totalMostrado = parseFloat(parteNumerica);

    expect(suma).toBeCloseTo(totalMostrado, 2);
  }
}