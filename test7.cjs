const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/#/menu/salmon-signature');
  await new Promise(r => setTimeout(r, 2000));
  const html = await page.evaluate(() => document.body.innerHTML);
  console.log('HTML LENGTH:', html.length);
  console.log('TITLE:', await page.evaluate(() => document.querySelector('h1')?.innerText));
  await browser.close();
})();
