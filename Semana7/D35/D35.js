// config/loadEnvironment.js
import all from './environments.json' with { type: 'json' };
const envName = process.env.ENV ?? 'dev';
const current = all[envName];

if (!current?.baseUrl) {
  throw new Error(`Ambiente "${envName}" inválido o sin baseUrl`);
}

export const environment = {
  name: envName,
  baseUrl: current.baseUrl,
};

//Se vuelve a llamar a la url en vez de usar environment.baseUrl, rompe con el uso del ambiente dinámico
 
await this.page.goto('/inventory.html');

/*Parte A:
1. Variables de entorno multiplataforma:
npm install -D cross-env
2. CLI de Allure (para npx allure generate / npx allure open):
npm install -D allure-commandline
3. Generación (entrada = resultados crudos, salida = reporte HTML):
npx allure generate reports/allure-results --clean -o reports/allure-report
4. Abrir el reporte ya generado:
npx allure open reports/allure-report
5. Script en package.json:
"test:staging": "cross-env ENV=staging DEBUG=pw:api cucumber-js"

Parte B:
npx allure generate reports/allure-results --clean -o reports/allure-report-single --single-file*/

//Parte A:
export async function attachCriticalScreenshot(world, label) 
{
    if (process.env.SCREENSHOT_KEY_POINTS !== 'true' || !world.page) return;
    const png = await world.page.screenshot({ fullPage: true });
    await world.attach(png, 'image/png');
}

//Parte B:
await attachCriticalScreenshot(this, 'Tras confirmar pedido — número de orden visible');

import axios from 'axios';
import assert from 'node:assert/strict';

const BASE = 'https://restful-booker.herokuapp.com';

export async function getPing() {
  const res = await axios.get(`${BASE}/ping`, { validateStatus: () => true });
  assert.equal(res.status, 201);
  //assert.match(String(res.data), /Created/i);
}

export async function postAuth() {
  const res = await axios.post(
    `${BASE}/auth`,
    { username: 'admin', password: 'password123' },
    {
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      validateStatus: () => true,
    }
  );
  assert.equal(res.status, 200);
  //assert.ok(typeof res.data?.token === 'string' && res.data.token.length > 0);
}

export async function getBookingNotFound() {
  const res = await axios.get(`${BASE}/booking/999999999`, { validateStatus: () => true });
  assert.equal(res.status, 404);
}

/*package.json:
{
  "name": "set-c-api-cucumber",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "test:axios": "node helpers/Api.js",
    "test:cucumber": "cucumber-js features/api.feature --import features/support/world.js --import features/support/hooks.js --import features/step_definitions/api.steps.js"
  },
  "dependencies": {
    "axios": "^1.7.9"
  },
  "devDependencies": {
    "@cucumber/cucumber": "^11.2.0"
  }
}

world.js:
import { setWorldConstructor } from '@cucumber/cucumber';

export class ApiWorld {
  constructor() {
    this.lastStatus = null;
    this.lastData = null;
    this.lastToken = null;
  }
}

setWorldConstructor(ApiWorld);

api.steps.js:
import { When, Then } from '@cucumber/cucumber';
import assert from 'node:assert/strict';
import { getPing, postAuth, getBookingNotFound } from '../../helpers/api.js';

When('consulto el endpoint ping', async function () {
  const res = await getPing();
  this.lastStatus = res.status;
  this.lastData = res.data;
});

Then('recibo status 201 en el ping', function () {
  assert.equal(this.lastStatus, 201);
});

When('solicito token con credenciales demo', async function () {
  const res = await postAuth();
  this.lastStatus = res.status;
  this.lastToken = res.data.token;
});

Then('recibo status 200 y un token valido', function () {
  assert.equal(this.lastStatus, 200);
  assert.equal(typeof this.lastToken, 'string');
  assert.ok(this.lastToken.length > 0);
});

When('consulto un booking que no existe', async function () {
  const res = await getBookingNotFound();
  this.lastStatus = res.status;
});

Then('recibo status 404', function () {
  assert.equal(this.lastStatus, 404);
});*/

