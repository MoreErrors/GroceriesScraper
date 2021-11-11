const puppeteer = require('puppeteer');

async function scrapeProduct(url){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);

    //nab
    const title = await page.title();
    console.log(title);

    //Pull first item from array        What html element has to be stored in an array?

    //Product titel -- WORKS
    const [prodTitle] = await page.$x('//*[@id="__layout"]/div/div[2]/div[2]/div/div[2]/div/h1');
    const txt = await prodTitle.getProperty('textContent');
    const rawTxt = await txt.jsonValue();

    //Product Prijs Helen
    const [ProdPH] = await page.$x('//*[@id="__layout"]/div/div[2]/div[2]/div/div[2]/div/div[1]/div[1]/span');
    const ProdPHsrc = await ProdPH.getProperty('textContent');
    const ProdPHRaw = await ProdPHsrc.jsonValue();

    //Product Prijs Centen
    const [ProdPC] = await page.$x('//*[@id="__layout"]/div/div[2]/div[2]/div/div[2]/div/div[1]/div[1]/sup');
    const ProdPCsrc = await ProdPC.getProperty('textContent');
    const ProdPCRaw = await ProdPCsrc.jsonValue();

    console.log({rawTxt, ProdPHRaw, ProdPCRaw});

    saveAs()
    await browser.close();
}

scrapeProduct('https://www.jumbo.com/producten/jumbo-courgette-302245STK')