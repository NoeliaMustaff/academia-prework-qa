import axios from 'axios';
import assert from 'node:assert/strict';

/**
 * PARTE B - CRUD COMPLETO (Node + axios)
 * Flujo Create → Read → Update → Delete contra Restful Booker.
 *
 * Ejecutar (desde la carpeta del archivo):
 *   node booking.crud.test.js
 */

const API_BASE = 'https://restful-booker.herokuapp.com';

// Contexto simple en memoria para compartir datos entre pasos
const testContext = {
  token: null,
  bookingId: null,
};

async function createAuthToken() {
  const response = await axios.post(
    `${API_BASE}/auth`,
    {
      username: 'admin',
      password: 'password123',
    },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  assert.equal(response.status, 200, 'POST /auth debe responder 200');
  assert.ok(response.data?.token, 'POST /auth debe devolver token');

  testContext.token = response.data.token;
  return testContext.token;
}

function authHeaders() {
  if (!testContext.token) {
    throw new Error('Token no inicializado: ejecutá primero createAuthToken()');
  }

  // Según la doc de Restful Booker, el token suele enviarse en Cookie
  return { Cookie: `token=${testContext.token}` };
}

async function createBooking() {
  if (!testContext.token) await createAuthToken();

  const payload = {
    firstname: 'Martin',
    lastname: 'Cabrera',
    totalprice: 123,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-04-16',
      checkout: '2026-04-20',
    },
    additionalneeds: 'Breakfast',
  };

  const response = await axios.post(`${API_BASE}/booking`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  assert.equal(response.status, 200, 'POST /booking debe responder 200');
  assert.ok('bookingid' in response.data, 'La respuesta debe incluir bookingid');
  assert.ok('booking' in response.data, 'La respuesta debe incluir booking');
  assert.equal(response.data.booking.firstname, payload.firstname);

  testContext.bookingId = response.data.bookingid;
}

async function readBooking() {
  if (!testContext.bookingId) {
    throw new Error('bookingId no inicializado: ejecutá primero createBooking()');
  }

  const response = await axios.get(`${API_BASE}/booking/${testContext.bookingId}`);

  assert.equal(response.status, 200, 'GET /booking/:id debe responder 200');
  assert.ok('firstname' in response.data, 'GET debe devolver firstname');
  assert.equal(response.data.firstname, 'Martin');
  assert.ok('lastname' in response.data, 'GET debe devolver lastname');
}

async function updateBooking() {
  if (!testContext.bookingId) {
    throw new Error('bookingId no inicializado: ejecutá primero createBooking()');
  }
  if (!testContext.token) await createAuthToken();

  const payload = {
    firstname: 'Martin',
    lastname: 'Cabrera QA',
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-04-16',
      checkout: '2026-04-22',
    },
    additionalneeds: 'Breakfast',
  };

  const response = await axios.put(
    `${API_BASE}/booking/${testContext.bookingId}`,
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
    }
  );

  assert.equal(response.status, 200, 'PUT /booking/:id debe responder 200');
  assert.ok('lastname' in response.data, 'PUT debe devolver lastname');
  assert.equal(response.data.lastname, 'Cabrera QA');
  assert.equal(response.data.bookingdates.checkout, '2026-04-22');
}

async function deleteBooking() {
  if (!testContext.bookingId) {
    throw new Error('bookingId no inicializado: ejecutá primero createBooking()');
  }
  if (!testContext.token) await createAuthToken();

  const response = await axios.delete(`${API_BASE}/booking/${testContext.bookingId}`, {
    headers: authHeaders(),
  });

  // Restful Booker suele responder 201 en delete exitoso
  assert.ok(
    response.status >= 200 && response.status < 300,
    `DELETE /booking/:id debería ser 2xx, recibí ${response.status}`
  );
}

async function assertBookingGone() {
  if (!testContext.bookingId) {
    throw new Error('bookingId no inicializado');
  }

  const response = await axios.get(`${API_BASE}/booking/${testContext.bookingId}`, {
    validateStatus: () => true, // no tirar error en 404
  });

  assert.equal(
    response.status,
    404,
    'Tras DELETE, GET /booking/:id debería responder 404'
  );
}

async function runCrudFlow() {
  console.log('1) Auth...');
  await createAuthToken();

  console.log('2) Create...');
  await createBooking();

  console.log('3) Read...');
  await readBooking();

  console.log('4) Update...');
  await updateBooking();

  console.log('5) Delete...');
  await deleteBooking();

  console.log('6) Read post-delete (esperado 404)...');
  await assertBookingGone();

  console.log('CRUD completo OK.');
}

runCrudFlow().catch((error) => {
  if (error.response) {
    console.error('Request falló:', {
      status: error.response.status,
      data: error.response.data,
    });
  } else {
    console.error('Error:', error.message);
  }
  process.exitCode = 1;
});