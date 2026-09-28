const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  await page.goto('http://localhost:5173/');
  await new Promise(r => setTimeout(r, 4000));
  
  await page.goto('http://localhost:5173/#/menu');
  await new Promise(r => setTimeout(r, 4000));
  await browser.close();
})();
