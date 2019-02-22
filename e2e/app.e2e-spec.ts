import { AppPage } from './pageobjects/app.po';
import { browser, logging } from 'protractor';
import { viewEyes } from './eyeConfig';

// Defining ViewPorts for the no headless BROWSER in case we want to re adjust screen after setting initial viewport.
// let width = 800;
// let height = 600;
// browser.driver.manage().window().setSize(width, height);


const json = require('../e2e/pageobjects/testUrls.json');
for (const site of json) {
  if (site.Run === 'Yes') {
    // Initialize the eyes SDK.
    const Eyes = require('eyes.selenium').Eyes;
    const eyes = new Eyes();

    // Setting up Eyes configuration and private API key
    const eyeView = new viewEyes(site.Locale);
    eyeView.setup(eyes);

    describe('GSuite ' + site.Locale, () => {
      let page: AppPage;
      browser.manage().deleteAllCookies();
      page = new AppPage();
      // In case excel needs to be converted to json or to update urls from excel
      // page.convertUrlsExcel();
      beforeEach(() => {
        // Eyes need to be re open for each 'it' function in order to obtain difference between each run.
        eyes.open(browser, eyeView.appName, eyeView.testName);
      });

      it(site.Locale, () => {
        console.log(site.URL);
        page.navigateToWeb(site.URL);
        eyes.checkWindow(site.Locale);
      });
      it(site.Locale + 'GORO', () => {
        console.log(site.GORO);
        page.navigateToWeb(site.GORO);
        eyes.checkWindow(site.Locale + ' Goro');
      });

      afterEach(async () => {
        // Handling results from eyes in console.
        eyes.close(false).then((result) => {
          eyeView.handleResult(result);
        });
      });
    });
  } else {
    console.log(site.Locale + ' Was set to not run therefore it\'d be skipped');
  }
}
