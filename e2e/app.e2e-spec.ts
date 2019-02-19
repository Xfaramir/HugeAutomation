import { AppPage } from './pageobjects/app.po';
import { browser, logging } from 'protractor';
import { viewEyes } from "./eyeConfig";
// Initialize the eyes SDK.
var Eyes = require("eyes.selenium").Eyes;
var eyes = new Eyes();

//Setting up Eyes configuration and private API key
var eyeView = new viewEyes();
eyeView.setup(eyes);


// Defining ViewPorts for the no headless BROWSER 
// let width = 800;
// let height = 600;
// browser.driver.manage().window().setSize(width, height);

describe('workspace-project App', () => {
  let page: AppPage;
  browser.manage().deleteAllCookies();
  page = new AppPage();
  beforeEach(() => {
    //Eyes need to be re open for each it function in order to obtain difference between each run which is basically the it function below.
    eyes.open(browser, eyeView.appName, eyeView.testName);
  });
  it('Test Initial Loading Sites', () => {
    page.navigateToWeb("https://www.protractortest.org/");
    eyes.checkWindow("Loading Website");


  });

  it('Test Second Loading Sites', () => {
    page.navigateToWeb("https://www.protractortest.org/");
    eyes.checkWindow("Loading Website");


  });

  afterEach(async () => {
    //Handling results from eyes in console.
    eyes.close(false).then(function (result) {
      eyeView.handleResult(result);
    });
  });
});