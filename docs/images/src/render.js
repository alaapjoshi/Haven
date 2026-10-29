// Renders every *.html here to ../<name>.png at 2x. Usage: npm i playwright && node docs/images/src/render.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SIZES = {
  'cover': [1280, 640],
  'cover-linkedin': [1200, 627],
};

(async () => {
  const browser = await chromium.launch();
  for (const file of fs.readdirSync(__dirname).filter(f => f.endsWith('.html'))) {
    const name = path.basename(file, '.html');
    const [width, height] = SIZES[name] || [1600, 1000];
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 });
    await page.goto('file://' + path.join(__dirname, file), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(__dirname, '..', name + '.png') });
    await page.close();
    console.log('rendered', name);
  }
  await browser.close();
})();
