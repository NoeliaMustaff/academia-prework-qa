import { BasePage } from '../pages/BasePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage.js';

export function ensureAllPages(world) {
  if (world.loginPage) return;
  world.basePage = new BasePage(world.page);
  world.loginPage = new LoginPage(world.page);
  world.productsPage = new InventoryPage(world.page);
  world.cartPage = new CartPage(world.page);
  world.checkoutPage = new CheckoutPage(world.page);
  world.checkoutOverviewPage = new CheckoutOverviewPage(world.page);
}