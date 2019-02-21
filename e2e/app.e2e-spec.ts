import { AppPage } from './pageobjects/app.po';
import { browser, logging } from 'protractor';
import { viewEyes } from "./eyeConfig";
// Initialize the eyes SDK.
var Eyes = require("eyes.selenium").Eyes;
var eyes = new Eyes();

//Setting up Eyes configuration and private API key
var eyeView = new viewEyes();
eyeView.setup(eyes);


// Defining ViewPorts for the no headless BROWSER in case we want to re adjust screen after setting initial viewport.
// let width = 800;
// let height = 600;
// browser.driver.manage().window().setSize(width, height);

describe('GSuite English', () => {
  let page: AppPage;
  browser.manage().deleteAllCookies();
  page = new AppPage();
  beforeEach(() => {
    //Eyes need to be re open for each 'it' function in order to obtain difference between each run.
    eyes.open(browser, eyeView.appName, eyeView.testName);
  });

  it('Gsuite English', () => {
    page.navigateToWeb('https://gsuite.google.com/features/');
    eyes.checkWindow('Gsuite English');
  });
  it('English – Australia', () => {
    page.navigateToWeb('https://gsuite.google.com/intl/en_au/features/');
    eyes.checkWindow('Gsuite Australia');
  });

  afterEach(async () => {
    //Handling results from eyes in console.
    eyes.close(false).then(function (result) {
      eyeView.handleResult(result);
    });
  });
});
