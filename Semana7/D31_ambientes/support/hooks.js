import { BeforeAll, AfterAll, Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { environment } from '../config/loadEnvironment.js';

setDefaultTimeout(60000);

const logLevel = process.env.LOG_LEVEL ?? 'info';
const logQuiet = logLevel === 'quiet';
const logVerbose = logLevel === 'verbose';

const MAX_DIAG_LINES = 400;

let globalBrowser;

function registerNetworkDiagnostics(world) {
  world.diagnosticLogLines = [];
  let count = 0;
  const push = (line) => {
    if (count >= MAX_DIAG_LINES) return;
    world.diagnosticLogLines.push(line);
    count++;
    if (count === MAX_DIAG_LINES) {
      world.diagnosticLogLines.push('… (límite de líneas alcanzado)');
    }
  };

  world.page.on('request', (req) => {
    push(`REQ ${req.method()} ${req.url()}`);
  });
  world.page.on('response', (res) => {
    push(`RES ${res.status()} ${res.url()}`);
  });
}

BeforeAll(async function () {
  const slowMo = Number(process.env.SLOWMO ?? 0);
  globalBrowser = await chromium.launch({
    headless: process.env.HEADED !== 'true',
    slowMo: Number.isFinite(slowMo) ? slowMo : 0,
  });
});

Before(async function ({ pickle }) {
  this.browser = globalBrowser;
  this.context = await this.browser.newContext({ baseURL: environment.baseUrl });
  this.page = await this.context.newPage();
  registerNetworkDiagnostics(this);

  if (!logQuiet) {
    if (logLevel === 'info' || logVerbose) {
      console.log(`Ambiente: ${environment.name} | baseUrl: ${environment.baseUrl}`);
    }
    if (logVerbose && pickle?.name) {
      console.log(`Escenario: ${pickle.name}`);
    }
  }
});

After(async function (scenario) {
  const failed = scenario.result?.status === Status.FAILED;
  const text = (this.diagnosticLogLines ?? []).join('\n');

  if (text && (logVerbose || failed)) {
    await this.attach(text, 'text/plain');
  }

  if (failed && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  }
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
});

AfterAll(async function () {
  if (globalBrowser) await globalBrowser.close();
});