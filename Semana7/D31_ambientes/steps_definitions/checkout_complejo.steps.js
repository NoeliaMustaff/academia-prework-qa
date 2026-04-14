import { When, Then } from '@cucumber/cucumber';
import { ensureAllPages } from '../support/pageHelpers.js';

When('agrego dos productos al carrito', async function () {
  ensureAllPages(this);
  await this.productsPage.addFirstTwoProductsToCart();
});

When('voy al carrito y presiono Checkout', async function () {
  ensureAllPages(this);
  await this.productsPage.navbar.goToCart();
  await this.cartPage.assertLoaded();
  await this.cartPage.startCheckout();
});

When(
  'completo los datos de envío con nombre {string}, apellido {string} y código postal {string}',
  async function (nombre, apellido, codigoPostal) {
    ensureAllPages(this);
    await this.checkoutPage.fillYourInformation(nombre, apellido, codigoPostal);
  }
);

When('continúo al resumen del pedido', async function () {
  ensureAllPages(this);
  await this.checkoutPage.continueToOverview();
});

Then(
  'el item total es la suma exacta de los precios de los productos',
  async function () {
    ensureAllPages(this);
    await this.checkoutOverviewPage.assertItemTotalMatchesSumOfLineItems();
  }
);