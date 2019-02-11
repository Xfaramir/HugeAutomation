import { AppPage } from './pageobjects/app.po';
import { browser, logging } from 'protractor';

// Initialize the eyes SDK and set your private API key.
var Eyes = require("eyes.selenium").Eyes;
var eyes = new Eyes();
setup(eyes);

//Defining ViewPorts
var width = 1366;
var height = 768;


// Website and Test Name
var appName: string = "Home";
var testName: string = "Huge Test";
var resultStr;

//set the value of runAsBatch to true so that the tests run as a single batch
var runAsBatch = false;

// set the value of changeTest to true to introduce changes that Eyes will detect as mismatches
var changeTest = false;

function setup(eyes) {
  eyes.setApiKey("FoLZm17nLHd1IjxD98SCyidR0CT0kSPvSaE101Riqh41gg110");
  if (runAsBatch) {
    var batchName = "Hello World Batch";
    eyes.setBatch(batchName);
  }
  //eliminate artifacts caused by a blinking cursor - on by default in latest SDK
  eyes.setIgnoreCaret(true);
}


function handleResult(result) {
  var totalSteps = result.steps;
  if (result.isNew) {
    resultStr = "New Baseline Created: " + totalSteps + " steps";
  } else if (result.isPassed) {
    resultStr = "All steps passed:     " + totalSteps + " steps";
  } else {
    resultStr = "Test Failed:";
    resultStr += " matches=" + result.matches;      /*  matched the baseline */
    resultStr += " missing=" + result.missing;       /* missing in the test*/
    resultStr += " mismatches=" + result.mismatches; /* did not match the baseline */
  }
  resultStr += "\n" + "results at ";
  console.log(resultStr);
}


describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    browser.manage().deleteAllCookies();
    browser.driver.manage().window().maximize();
    browser.driver.manage().window().setSize(width, height);
    page = new AppPage();
    eyes.open(browser, appName, testName);
  });

  if (!changeTest) {
    try {
      it('Test Initial Loading Site', () => {
        page.navigateTo();
        eyes.checkWindow("Loading Website");
        page.navigateToWeb("https://www.google.com/?hl=en");
        eyes.checkWindow("New Site");
        eyes.close(false).then(function (result) {
          handleResult(result);
        });

      });
    } finally {
      eyes.abortIfNotClosed().then();
    }

  }

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));

  });
});
