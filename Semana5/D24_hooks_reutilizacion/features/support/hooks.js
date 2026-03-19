import { After, setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(30000);

After(async function (scenario) {
  await this.takeScreenshotOnFailure(scenario);
});

After(async function () {
  try {
    await this.close();
  } catch (e) {}
});