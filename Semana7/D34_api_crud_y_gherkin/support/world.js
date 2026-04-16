import { setWorldConstructor } from '@cucumber/cucumber';

class ApiWorld {
  constructor({ attach } = {}) {
    this.attach = attach;

    this.token = null;
    this.bookingId = null;

    this.authPayload = null;

    this.newBookingPayload = null;
    this.updatedBookingPayload = null;

    this.authResponse = null;
    this.createResponse = null;
    this.readResponse = null;
    this.updateResponse = null;
    this.deleteResponse = null;
    this.readAfterDeleteResponse = null;
  }

  resetApiState() {
    this.token = null;
    this.bookingId = null;

    this.authPayload = null;

    this.newBookingPayload = null;
    this.updatedBookingPayload = null;

    this.authResponse = null;
    this.createResponse = null;
    this.readResponse = null;
    this.updateResponse = null;
    this.deleteResponse = null;
    this.readAfterDeleteResponse = null;
  }
}

setWorldConstructor(ApiWorld);