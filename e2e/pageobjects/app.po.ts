import { browser, by, element } from 'protractor';

browser.waitForAngularEnabled(false);

export class AppPage {

  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('.home-page-today__text')).getText() as Promise<string>;
  }

  getWebTitle() {
    return browser.getTitle() as Promise<string>;
  }

  navigateToWeb(WebUrl) {
    return browser.get(WebUrl) as Promise<any>;
  }

  getURLs() {
    const gSuiteUrls = [
      { name: 'Gsuite', adress: 'https://www.google.com/', car: null },
      { name: 'Gsuite', adress: 'https://www.google.com/?hl=id', car: null }
    ];
    return gSuiteUrls;
  }

  convertUrlsExcel() {
    let xls_json = require('xls-to-json');

    xls_json({
      input: __dirname + '/ListUrls.xls',
      output: __dirname + '/testUrls.json',
      sheet: 'Sheet2'
    }, function (err, result) {

      if (err) {
        console.error(err);
      } else {
        console.log(result);
      }

    });
  }
}
