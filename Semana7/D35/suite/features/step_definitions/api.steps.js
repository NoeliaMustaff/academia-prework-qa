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
});