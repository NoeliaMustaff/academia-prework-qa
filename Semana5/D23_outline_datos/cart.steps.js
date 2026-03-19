const { Given, When, Then, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

setDefaultTimeout(30000);

Given('estoy logueado en SauceDemo {string}', async function (url) 
{
  await this.open(url);
  await this.page.getByPlaceholder('Username').fill('standard_user');
  await this.page.getByPlaceholder('Password').fill('secret_sauce');
  await this.page.getByRole('button', { name: 'Login' }).click();
  await expect(this.page).toHaveURL(/inventory\.html/);
});

When('agrego el producto {string} al carrito', async function (producto) 
{
  const item = this.page.locator('.inventory_item').filter({
    has: this.page.getByText(producto),
  });
  await item.getByRole('button', { name: /Add to cart/i }).click();
});

Then('el carrito muestra el producto {string} con su precio {string}', async function (producto, precio) 
  {
    await this.page.locator('.shopping_cart_link').click();
    await expect(this.page).toHaveURL(/cart\.html/);

    const cartItem = this.page.locator('.cart_item').filter({
      has: this.page.getByText(producto),
    });

    await expect(cartItem).toBeVisible();
    await expect(cartItem.locator('.inventory_item_price')).toHaveText(`$${precio}`);
  });

After(async function () 
{
  await this.close();
});