const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--start-fullscreen'] }); // true = cache le navigateur pour être plus rapide
  const page = await browser.newPage(); // ouvrir un onglet

  await page.goto('https://haddad-form.netlify.app', {"waitUntil" : "networkidle0"}); // aller à l'url
  await page.setViewport({ width: 1536, height: 864}); // modifier la résolution
  await page.waitForSelector('.form-left-panel', {visible: true, timeout : 5000}) // Attendre qu'un élément soit visible

  page.on('dialog', async dialog => dialog.accept()) // clique sur le bouton OK quand le formulaire sera envoyé et afficher dans une alerte
  
  const [submitButton] = await page.$$("button"); // récupérer un élément
  if (submitButton)
    await submitButton.click(); // cliquer

  await page.screenshot({ path: 'haddad-form.png', fullPage: true }); // prend une screenshot
  await page.pdf({ path: 'haddad-form.pdf', format: 'a4', printBackground : true, landscape : true,  width: 1536, height: 864 }); // génère un pdf à partir de la page

  const dimensions = await page.evaluate(() => { // récupère des informations de la page
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    };

    console.log('Dimensions:', dimensions);
  }) // s'abonner à un évènement
  
  await browser.close();
})(); 

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--start-fullscreen'] }); // true = cache le navigateur pour être plus rapide
  const page = await browser.newPage(); // ouvrir un onglet

  await page.setViewport({ width: 1536, height: 864}); // modifier la résolution
  await page.goto('http://haddad-benjamin-portfolio.azurewebsites.net/', {"waitUntil" : "networkidle0"}); // aller à l'url

  await page.screenshot({ path: 'portfolio.png', fullPage: true }); // prend une screenshot
  await page.pdf({ path: 'portfolio.pdf', format: 'a4', printBackground : true, landscape : true,  width: 1536, height: 864 }); // génère un pdf à partir de la page

  await browser.close();
})(); 