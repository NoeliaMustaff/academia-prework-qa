import { BeforeAll, AfterAll, Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { environment } from '../config/loadEnvironment.js';
import { AfterStep } from '@cucumber/cucumber';
import fs from 'node:fs';

setDefaultTimeout(60000);

const logLevel = process.env.LOG_LEVEL ?? 'info';
const logQuiet = logLevel === 'quiet';
const logVerbose = logLevel === 'verbose';

let globalBrowser;

function registerNetworkDiagnostics(world) {
  world.diagnosticLogLines = [];

  const push = (line) => {
    world.diagnosticLogLines.push(line);
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

  // Estrategia 1 (resumen controlado por escenario)
  const text = (this.diagnosticLogLines ?? []).join('\n');
  if (text && (logVerbose || failed)) {
    await this.attach(text, 'text/plain');
  }

  // Estrategia D32 (por job): adjuntar DEBUG=pw:api SOLO si falló
  if (failed) {
    const logPath = process.env.PW_API_LOG_PATH;
    if (logPath && fs.existsSync(logPath)) {
      const pwApiText = fs.readFileSync(logPath, 'utf8');
      if (pwApiText) {
        await this.attach(pwApiText, 'text/plain');
      }
    }
  }

  if (failed && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  }

  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
});

AfterStep(async function ({ pickleStep }) {
  if (process.env.SCREENSHOT_EACH_STEP !== 'true') return;
  if (!this.page) return;

  const label = pickleStep?.text?.replace(/[^\w\-]+/g, '_').slice(0, 80) ?? 'step';
  const png = await this.page.screenshot({ fullPage: true });
  await this.attach(png, 'image/png');
});

AfterAll(async function () {
  if (globalBrowser) await globalBrowser.close();
});