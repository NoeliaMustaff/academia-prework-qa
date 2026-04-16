import axios from 'axios';
import assert from 'node:assert/strict';
import { Given } from '@cucumber/cucumber';
import auth from '../data/auth.json' with { type: 'json' };

export const BASE_URL = 'https://restful-booker.herokuapp.com';

export function summarizeHttpError({ method, url, status, data }) {
  // No incluir headers (Cookie/Authorization) ni token
  return [
    `HTTP ${method} ${url}`,
    `status: ${status}`,
    `data: ${typeof data === 'string' ? data : JSON.stringify(data)}`,
  ].join('\n');
}

export function summarizeAxiosError(error) {
  if (error.response) {
    return summarizeHttpError({
      method: String(error.config?.method || '').toUpperCase(),
      url: String(error.config?.url || ''),
      status: error.response.status,
      data: error.response.data,
    });
  }
  return `Sin response HTTP: ${error.message}`;
}

export async function crearBooking(world) {
  const newBooking = {
    firstname: 'Juan',
    lastname: 'Perez',
    totalprice: 123,
    depositpaid: true,
    bookingdates: {
      checkin: '2024-01-01',
      checkout: '2024-01-10',
    },
    additionalneeds: 'Breakfast',
  };

  const url = `${BASE_URL}/booking`;

  const response = await axios.post(url, newBooking, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': 'QA-CYS-D34-cucumber',
    },
    validateStatus: () => true, // evita AxiosError en 418/500/etc
  });

  world.createResponse = response;
  world.newBooking = newBooking;

  if (response.status !== 200) {
    world.lastAxiosErrorSummary = summarizeHttpError({
      method: 'POST',
      url,
      status: response.status,
      data: response.data,
    });

    throw new Error(`POST /booking falló con status ${response.status}`);
  }

  assert.ok(response.data?.bookingid, 'La respuesta debe incluir bookingid');
  assert.ok(response.data?.booking, 'La respuesta debe incluir booking');

  world.bookingId = response.data.bookingid;
  world.bookingFromCreate = response.data.booking;
}

Given('que tengo credenciales válidas de Restful Booker', function () {
  this.authPayload = { username: auth.username, password: auth.password };
});

Given('que ya existe un booking creado en la API', async function () {
  if (!this.bookingId) {
    await crearBooking(this);
  }
});