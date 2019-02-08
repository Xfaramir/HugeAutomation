import { AppPage } from './pageobjects/app.po';
import { browser, logging } from 'protractor';

// Initialize the eyes SDK and set your private API key.
var Eyes = require("eyes.selenium").Eyes;
var eyes = new Eyes();
eyes.setApiKey("FoLZm17nLHd1IjxD98SCyidR0CT0kSPvSaE101Riqh41gg110");

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    eyes.open(browser, "Hello World!", "My first Protractor Test!");
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Today at Huge.');
    eyes.checkWindow("Hello!");
    eyes.checkWindow("Click!");

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
    eyes.close();
  });
});
