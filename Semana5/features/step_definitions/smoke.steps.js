const { Given, Then, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser;
let page;

Given('abro la pagina {string}', async function (url) {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto(url);
});

Then('veo el texto {string}', async function (texto) {
  await page.waitForSelector(`text=${texto}`);
});

After(async function () {
  if (browser) await browser.close();
});