import { setWorldConstructor } from '@cucumber/cucumber';

export class ApiWorld {
  constructor() {
    this.lastStatus = null;
    this.lastData = null;
    this.lastToken = null;
  }
}

setWorldConstructor(ApiWorld);