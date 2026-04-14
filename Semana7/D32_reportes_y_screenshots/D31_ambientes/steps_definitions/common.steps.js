import { Given, When } from '@cucumber/cucumber';
import { ensureAllPages } from '../support/pageHelpers.js';
import usersData from '../data/users.json' with { type: 'json' };
import { compareToBaseline } from '../support/visualCompare.js';

function baselineSlug(producto) {
  return producto
    .replace(/[^a-z0-9]+/gi, '_')
    .replace(/^_+|_+$/g, '');
}

Given('estoy logueado en SauceDemo con usuario válido', async function () {
  ensureAllPages(this);
  await this.loginPage.openSauceDemo();
  await this.loginPage.login(
    usersData.validUser.username,
    usersData.validUser.password
  );
  await this.productsPage.assertLoaded();
});

When('agrego el producto {string} al carrito', async function (producto) {
  ensureAllPages(this);
  await this.productsPage.addToCart(producto);

  // Estabiliza la UI antes del screenshot (badge = 1 en cada escenario aislado)
  await this.productsPage.navbar.expectCartBadgeCount(1);

  const relative = `inventory/despues-agregar-${baselineSlug(producto)}.png`;
  await compareToBaseline(this, this.page, relative, {
    threshold: 0.1,
    maxDiffRatio: 0,
  });
});