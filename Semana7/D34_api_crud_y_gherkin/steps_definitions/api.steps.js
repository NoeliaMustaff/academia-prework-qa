import axios from 'axios';
import assert from 'node:assert/strict';
import { When, Then } from '@cucumber/cucumber';
import { BASE_URL, crearBooking, summarizeHttpError, summarizeAxiosError} from './common.steps.js';

When('me autentico contra la API de Restful Booker', async function () {
  const url = `${BASE_URL}/auth`;

  try {
    const response = await axios.post(url, this.authPayload, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'QA-CYS-D34-cucumber',
      },
      validateStatus: () => true,
    });

    if (response.status !== 200 || !response.data?.token) {
      this.lastAxiosErrorSummary = summarizeHttpError({
        method: 'POST',
        url,
        status: response.status,
        data: response.data,
      });
    }

    assert.equal(response.status, 200, 'POST /auth debe responder 200');
    assert.ok(response.data.token, 'La respuesta de /auth debe incluir un token');

    this.token = response.data.token;
  } catch (e) {
    if (!this.lastAxiosErrorSummary) this.lastAxiosErrorSummary = summarizeAxiosError(e);
    throw e;
  }
});

When('creo un nuevo booking válido', async function () {
  try {
    await crearBooking(this);
    assert.equal(this.createResponse.status, 200, 'POST /booking debe responder 200');
  } catch (e) {
    if (!this.lastAxiosErrorSummary) this.lastAxiosErrorSummary = summarizeAxiosError(e);
    throw e;
  }
});

When('consulto los datos del booking por su id', async function () {
  const url = `${BASE_URL}/booking/${this.bookingId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'QA-CYS-D34-cucumber',
      },
    });

    this.readResponse = response;
  } catch (e) {
    this.lastAxiosErrorSummary = summarizeAxiosError(e);
    throw e;
  }
});

When('actualizo los datos del booking con información válida', async function () {
  const updatedBooking = {
    firstname: 'Carlos',
    lastname: 'Gomez',
    totalprice: 200,
    depositpaid: false,
    bookingdates: {
      checkin: '2024-02-01',
      checkout: '2024-02-05',
    },
    additionalneeds: 'Late checkout',
  };

  const url = `${BASE_URL}/booking/${this.bookingId}`;

  try {
    const response = await axios.put(url, updatedBooking, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'QA-CYS-D34-cucumber',
        Cookie: `token=${this.token}`,
      },
    });

    this.updateResponse = response;
    this.updatedBooking = updatedBooking;
  } catch (e) {
    this.lastAxiosErrorSummary = summarizeAxiosError(e);
    throw e;
  }
});

When('elimino el booking por su id', async function () {
  const url = `${BASE_URL}/booking/${this.bookingId}`;

  try {
    const response = await axios.delete(url, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'QA-CYS-D34-cucumber',
        Cookie: `token=${this.token}`,
      },
    });

    this.deleteResponse = response;
  } catch (e) {
    this.lastAxiosErrorSummary = summarizeAxiosError(e);
    throw e;
  }
});

When('si intento consultar el booking eliminado', async function () {
  const url = `${BASE_URL}/booking/${this.bookingId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'QA-CYS-D34-cucumber',
      },
      validateStatus: () => true,
    });

    this.readAfterDeleteResponse = response;
  } catch (e) {
    this.lastAxiosErrorSummary = summarizeAxiosError(e);
    throw e;
  }
});

Then('obtengo un bookingid numérico', function () {
  const body = this.createResponse.data;

  assert.equal(typeof body.bookingid, 'number', 'bookingid debe ser un número');
  assert.ok(this.bookingId, 'Debemos haber guardado el bookingId en el World');
});

Then('el booking creado contiene los mismos datos que envié', function () {
  const booking = this.bookingFromCreate;

  assert.equal(booking.firstname, this.newBooking.firstname, 'firstname debe coincidir');
  assert.equal(booking.lastname, this.newBooking.lastname, 'lastname debe coincidir');
});

Then('la API responde con código 200', function () {
  assert.equal(this.readResponse.status, 200, 'GET /booking/:id debe responder 200');
});

Then('obtengo un JSON con los datos del booking', function () {
  const data = this.readResponse.data;
  assert.equal(typeof data, 'object', 'La respuesta debe ser un objeto JSON');
});

Then('al menos el firstname y lastname son válidos', function () {
  const data = this.readResponse.data;

  assert.equal(typeof data.firstname, 'string', 'firstname debe ser string');
  assert.equal(typeof data.lastname, 'string', 'lastname debe ser string');
});

Then('la API responde con código 200 en la actualización', function () {
  assert.equal(this.updateResponse.status, 200, 'PUT /booking/:id debe responder 200');
});

Then('el booking actualizado refleja los nuevos datos', function () {
  const data = this.updateResponse.data;

  assert.equal(data.firstname, this.updatedBooking.firstname);
  assert.equal(data.lastname, this.updatedBooking.lastname);
  assert.equal(data.totalprice, this.updatedBooking.totalprice);
});

Then('la API responde indicando que el borrado fue exitoso', function () {
  assert.equal(
    this.deleteResponse.status,
    201,
    'DELETE /booking/:id debería responder 201 en borrado exitoso'
  );
});

Then('obtengo la respuesta esperada para un booking inexistente', function () {
  assert.equal(
    this.readAfterDeleteResponse.status,
    404,
    'GET /booking/:id de un booking eliminado debería devolver 404'
  );
});