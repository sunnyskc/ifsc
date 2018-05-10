const puppeteer = require('puppeteer');
const url = 'http://www.ifsc-climbing.org/index.php/world-competition/calendar#!filter[cat_id]=69&filter[cup]=!'

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url)

  let list = await page.evaluate( () => { 
   document.querySelector('div.competition > a > div.title').textContent 
  })

  list.forEach( (el) => { console.log(el) } )
  await browser.close();
})();
