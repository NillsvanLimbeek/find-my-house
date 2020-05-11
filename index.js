const puppeteer = require("puppeteer");
const URL = "https://rcmakelaars.nl/woningaanbod/";

(async () => {
  // init browser and page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // go to url
  await page.goto(URL);

  let data = await page.evaluate(() => {
    const link = document.querySelector(".aanbodholder > a").href;
    const address = document.querySelector(".adres-homeblok > h3 > dl > dd")
      .textContent;
    const price = document.querySelector(".prijs-homeblok > dl > dd")
      .textContent;

    return {
      link,
      address,
      price,
    };
  });

  /* Outputting what we scraped */
  console.log(data);

  await page.goto(data.link);

  const newPage = await page.evaluate(() => {
    const features = document.querySelector(".kenmerken > dl").innerHTML;

    return { features };
  });

  console.log(newPage);

  await browser.close();
})();
