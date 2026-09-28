const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/');
  await new Promise(r => setTimeout(r, 2000));
  
  // Click Menu link
  const menuLink = await page.$x("//a[contains(text(), 'Menu')]");
  if (menuLink.length > 0) {
    console.log('CLICKING MENU');
    await menuLink[0].click();
    await new Promise(r => setTimeout(r, 2000));
    console.log('URL AFTER CLICK:', page.url());
    const html = await page.evaluate(() => document.body.innerHTML);
    console.log('IS HOMEPAGE?', html.includes('Freshly made'));
  }
  await browser.close();
})();
