import fs from 'node:fs';
import path from 'node:path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const BASE_DIR = path.join(
  process.cwd(),
  'D32_reportes_y_screenshots',
  'D31_ambientes',
  'visual-baselines'
);

export async function compareToBaseline(world, page, relativeName, options = {}) {
  const threshold = options.threshold ?? 0.1;
  const maxDiffRatio = options.maxDiffRatio ?? 0;

  const baselinePath = path.join(BASE_DIR, relativeName);
  const actualBuf = await page.screenshot({ fullPage: true });

  if (process.env.VISUAL_UPDATE === '1' || !fs.existsSync(baselinePath)) {
    fs.mkdirSync(path.dirname(baselinePath), { recursive: true });
    fs.writeFileSync(baselinePath, actualBuf);
    await world.attach(actualBuf, 'image/png');
    return;
  }

  const expected = PNG.sync.read(fs.readFileSync(baselinePath));
  const actual = PNG.sync.read(actualBuf);

  if (expected.width !== actual.width || expected.height !== actual.height) {
    await world.attach(actualBuf, 'image/png');
    throw new Error(
      `Tamaño distinto: baseline ${expected.width}x${expected.height}, actual ${actual.width}x${actual.height}`
    );
  }

  const { width, height } = expected;
  const diff = new PNG({ width, height });
  const diffPixels = pixelmatch(expected.data, actual.data, diff.data, width, height, { threshold });
  const ratio = diffPixels / (width * height);

  if (ratio > maxDiffRatio) {
    await world.attach(actualBuf, 'image/png');
    await world.attach(fs.readFileSync(baselinePath), 'image/png');
    await world.attach(PNG.sync.write(diff), 'image/png');
    throw new Error(
      `Regresión visual: ${diffPixels} píxeles distintos (${(ratio * 100).toFixed(4)} % del área)`
    );
  }
}