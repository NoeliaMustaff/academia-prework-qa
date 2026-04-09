import { When, Then } from '@cucumber/cucumber';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage.js';

When('agrego dos productos al carrito', async function () {
  const inventory = new InventoryPage(this.page);
  await inventory.addFirstTwoProductsToCart();
});

When('voy al carrito y presiono Checkout', async function () {
  const inventory = new InventoryPage(this.page);
  const cart = new CartPage(this.page);
  await inventory.navbar.goToCart();
  await cart.assertLoaded();
  await cart.startCheckout();
});

When(
  'completo los datos de envío con nombre {string}, apellido {string} y código postal {string}',
  async function (nombre, apellido, codigoPostal) {
    const checkout = new CheckoutPage(this.page);
    await checkout.fillYourInformation(nombre, apellido, codigoPostal);
  }
);

When('continúo al resumen del pedido', async function () {
  const checkout = new CheckoutPage(this.page);
  await checkout.continueToOverview();
});

Then(
  'el item total es la suma exacta de los precios de los productos',
  async function () {
    const overview = new CheckoutOverviewPage(this.page);
    await overview.assertItemTotalMatchesSumOfLineItems();
  }
);