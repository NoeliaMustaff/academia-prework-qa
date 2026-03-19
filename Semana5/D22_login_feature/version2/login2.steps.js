const { Given, When, Then, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

setDefaultTimeout(30000);

Given('estoy en la pantalla de login de SauceDemo {string}', async function (url) 
{
  await this.open(url);
});

When('inicio sesión con usuario {string} y password {string}',
    async function (username, password) 
    {
      await this.page.getByPlaceholder('Username').fill(username);
      await this.page.getByPlaceholder('Password').fill(password);
      await this.page.getByRole('button', { name: 'Login' }).click();
    });

Then('accedo al catálogo de productos', async function () 
{
  await expect(this.page).toHaveURL(/inventory\.html/);
  await expect(this.page.getByText('Products')).toBeVisible();
});

Then('veo el listado de productos', async function () 
{
    await expect(this.page.locator('.inventory_container')).toBeVisible();
});

Then('veo un mensaje de error de login {string}', async function (errorText) {
    const error = this.page.getByRole('heading', { name: errorText });
    await expect(error).toBeVisible();
  });

Then('permanezco en la pantalla de login', async function ()
{
  await expect(this.page).not.toHaveURL(/inventory\.html/);
  await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();
});

After(async function () 
{
  await this.close();
});