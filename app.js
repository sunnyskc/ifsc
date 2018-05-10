const puppeteer = require('puppeteer');
const url = 'http://www.ifsc-climbing.org/index.php/world-competition/calendar#!filter[cat_id]=69&filter[cup]=!';

let scrapper = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url)

  const competitions = await page.evaluate(() => {
     const data = [];
     const elements = document.querySelectorAll('#ifsc_calendar > div.competitions > div.competition');

     for (const el of elements) {
        let title = el.querySelector('a > div.title').innerText
        let country = title.match(/\((\w{3})\)/)
        let city = title.match(/-\s(.*)\s\(\w{3}\)/)
        let date = el.querySelector('div.date').innerText.match(/\d{1,2}\s-\s(\d{1,2}.*)/);
        data.push ({ title, 
        date: date[1], 
        city: city[1], 
        country: country[1]
        });
     }
     return data;
   });
  await browser.close();
  console.log(competitions)
  return competitions

};


(async () => { await scrapper() })()
