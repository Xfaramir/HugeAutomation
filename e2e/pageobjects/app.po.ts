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
  
}
