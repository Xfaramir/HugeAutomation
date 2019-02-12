import { AppPage } from './pageobjects/app.po';
import { browser, logging } from 'protractor';

// Initialize the eyes SDK and set your private API key.
var Eyes = require("eyes.selenium").Eyes;
var eyes = new Eyes();
setup(eyes);

//Defining ViewPorts
var width = 801;
var height = 600;
browser.driver.manage().window().setSize(width, height);

// Website and Test Name
var appName: string = "Home 001";

//If you want to change the BASELINE for EYES update number below
var testName: string = "Huge Automation 0003";
var resultStr;

//set the value of runAsBatch to true so that the tests run as a single batch
var runAsBatch = false;

// set the value of changeTest to true to introduce changes that Eyes will detect as mismatches
var changeTest = false;

//Adding configuration to Eyes
function setup(eyes) {
  eyes.setApiKey("FoLZm17nLHd1IjxD98SCyidR0CT0kSPvSaE101Riqh41gg110");
  //Enabling FULL Page Screenshots. true,false
  eyes.setForceFullPageScreenshot(false);
  if (runAsBatch) {
    var batchName = "Hello World Batch";
    eyes.setBatch(batchName);
  }
  //Eliminate artifacts caused by a blinking cursor - on by default in latest SDK
  eyes.setIgnoreCaret(true);
}
//Handling results from EYES
function handleResult(result) {
  var totalSteps = result.steps;
  if (result.isNew) {
    resultStr = "New Baseline Created: " + totalSteps + " steps";
  } else if (result.isPassed) {
    resultStr = "All steps passed: " + totalSteps + " steps";
  } else {
    resultStr = "Test Failed:";
    resultStr += " matches=" + result.matches; /* matched the baseline */
    resultStr += " missing=" + result.missing; /* missing in the test*/
    resultStr += " mismatches=" + result.mismatches; /* did not match the baseline */
  }
  resultStr += "\n" + "results at ";
  console.log(resultStr);
}
describe('workspace-project App', () => {
  let page: AppPage;
  browser.manage().deleteAllCookies();
  page = new AppPage();
  beforeEach(() => {

    //Eyes need to be re open for each it function in order to obtain difference between each run.
    eyes.open(browser, appName, testName);
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
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
    eyes.close(false).then(function (result) {
      handleResult(result);
    });
  });
});