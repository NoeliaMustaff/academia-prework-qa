import { setWorldConstructor } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';


class CustomWorld {
  constructor({ parameters }) {
    this.parameters = parameters;
    this.browser = null;
    this.context = null;
    this.page = null;
    // headless: por defecto false (headed), usar HEADLESS=true para headless
    this.headless = process.env.HEADLESS === 'true';
  }

  async open(url) {
    if (this.browser) {
      await this.close();
    }
    const slowMo = Number(process.env.SLOWMO ?? 0);
    this.browser = await chromium.launch({
      headless: this.headless,
      slowMo: Number.isFinite(slowMo) ? slowMo : 0,
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    await this.page.goto(url);
  }

  async takeScreenshotOnFailure(scenario) {
    if (scenario?.result?.status === 'failed' && this.page) {
      const screenshotsDir = path.join(process.cwd(), 'screenshots');
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
      }
      const name = scenario.pickle.name.replace(/\s+/g, '_').toLowerCase();
      const filepath = path.join(screenshotsDir, `failed_${Date.now()}_${name}.png`);
      await this.page.screenshot({ path: filepath });
      console.log(`  Screenshot guardado: ${filepath}`);
    }
  }

  async close() {
    try {
      if (this.context) await this.context.close();
    } finally {
      if (this.browser) await this.browser.close();
    }
    this.browser = null;
    this.context = null;
    this.page = null;
  }
}

setWorldConstructor(CustomWorld);