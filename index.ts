const fs = require('fs');
const puppeteer = require('puppeteer');

const RC_URL = 'https://rcmakelaars.nl/woningaanbod/';

(async () => {
    // init browser and page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // go to url
    await page.goto(RC_URL);

    // scrape the data
    let data = await page.evaluate(() => {
        const links: string[] = [];
        const anchors: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(
            '.aanbodholder > a',
        );

        anchors.forEach((anchor) => {
            links.push(anchor.href);
        });

        return {
            links,
        };
    });

    fs.writeFile('.links.ts', JSON.stringify(data.links), (err: Error) => {
        if (err) return new Error('Oops...');
    });

    console.log(data);

    await browser.close();
})();
