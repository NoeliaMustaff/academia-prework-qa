import { When, Then } from '@cucumber/cucumber';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';

When(
  'completo el checkout con nombre {string}, apellido {string} y código postal {string}',
  async function (nombre, apellido, codigoPostal) {
    const inventory = new InventoryPage(this.page);
    const cart = new CartPage(this.page);
    const checkout = new CheckoutPage(this.page);

    await inventory.goToCart();
    await cart.assertLoaded();
    await cart.startCheckout();
    await checkout.fillYourInformation(nombre, apellido, codigoPostal);
    await checkout.continueToOverview();
    await checkout.finishOrder();
  }
);

Then('veo la confirmación del pedido {string}', async function (mensaje) {
  const checkout = new CheckoutPage(this.page);
  await checkout.assertOrderComplete(mensaje);
});