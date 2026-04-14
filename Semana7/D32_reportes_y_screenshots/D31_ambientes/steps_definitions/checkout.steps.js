import { When, Then } from '@cucumber/cucumber';
import { ensureAllPages } from '../support/pageHelpers.js';

When(
  'completo el checkout con nombre {string}, apellido {string} y código postal {string}',
  async function (nombre, apellido, codigoPostal) {
    ensureAllPages(this);
    await this.productsPage.navbar.goToCart();
    await this.cartPage.assertLoaded();
    await this.cartPage.startCheckout();
    await this.checkoutPage.fillYourInformation(nombre, apellido, codigoPostal);
    await this.checkoutPage.continueToOverview();
    await this.checkoutPage.finishOrder();
  }
);

Then('veo la confirmación del pedido {string}', async function (mensaje) {
  ensureAllPages(this);
  await this.checkoutPage.assertOrderComplete(mensaje);
});