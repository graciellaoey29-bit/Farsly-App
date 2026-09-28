const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Console errors
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));

  // Test 1: Homepage
  await page.goto('http://localhost:5173/');
  await new Promise(r => setTimeout(r, 2000));
  const homeH1 = await page.evaluate(() => document.querySelector('h1')?.innerText || 'NO H1');
  console.log('HOME H1:', homeH1);

  // Test 2: Menu
  await page.goto('http://localhost:5173/#/menu');
  await new Promise(r => setTimeout(r, 2000));
  const menuH1 = await page.evaluate(() => document.querySelector('h1')?.innerText || 'NO H1');
  console.log('MENU H1:', menuH1);

  // Test 3: Customer Dashboard  
  await page.goto('http://localhost:5173/#/customer');
  await new Promise(r => setTimeout(r, 2000));
  const dashH1 = await page.evaluate(() => document.querySelector('h1')?.innerText || 'NO H1');
  console.log('DASH H1:', dashH1);

  // Check sections
  const sections = await page.evaluate(() => {
    const els = document.querySelectorAll('.dashboard-section-title');
    return Array.from(els).map(e => e.innerText);
  });
  console.log('DASH SECTIONS:', sections);

  // Check active order
  const activeOrder = await page.evaluate(() => {
    const el = document.querySelector('.dashboard-active-order');
    return el ? 'HAS ACTIVE ORDER' : 'NO ACTIVE ORDER';
  });
  console.log('ACTIVE ORDER:', activeOrder);

  // Check recent orders map
  const orderCards = await page.evaluate(() => {
    return document.querySelectorAll('.dashboard-order-card').length;
  });
  console.log('RECENT ORDER CARDS:', orderCards);

  // Test 4: Favorites
  await page.goto('http://localhost:5173/#/favorites');
  await new Promise(r => setTimeout(r, 1000));
  const favH1 = await page.evaluate(() => document.querySelector('h1')?.innerText || 'NO H1');
  console.log('FAV H1:', favH1);

  // Test 5: Cart
  await page.goto('http://localhost:5173/#/cart');
  await new Promise(r => setTimeout(r, 1000));
  const cartH1 = await page.evaluate(() => document.querySelector('h1')?.innerText || 'NO H1');
  console.log('CART H1:', cartH1);

  console.log('ERRORS:', errors.length ? errors : 'NONE');
  await browser.close();
})();
