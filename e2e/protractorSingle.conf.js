// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
// How to connect to Browser Drivers 
// 1. seleniumServerJar - to start a standalone Selenium Server locally.
// 2. seleniumAddress - to connect to a Selenium Server which is already
//    running.
// 3. sauceUser/sauceKey - to use remote Selenium Servers via Sauce Labs.
// 4. browserstackUser/browserstackKey - to use remote Selenium Servers via
// BrowserStack.
// 5. directConnect - to connect directly to the browser Drivers.
//    This option is only available for Firefox and Chrome.

// If you want to run just a single suite and not the entire specs you can use something like "protractor protractor.conf.js --suite homepage,search" 

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  directConnect: true,
  seleniumAddress: 'http://localhost:4444/wd/hub',
  allScriptsTimeout: 20000,
  suites: {
    homepage: './*.e2e-spec.ts',
    search: ['tests/e2e/contact_search/**/*Spec.js',
      'tests/e2e/venue_search/**/*Spec.js']
  },
  splitTestsBetweenCapabilities: true,
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },
  
  baseUrl: '',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 300000,
    print: function () { }
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    //Creating Allure report from jasmine results
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: './allure-results'
    }));
    //Taking a screenshot at the end of each spec for jenkins allure report
    jasmine.getEnv().afterEach(function (done) {
      browser.takeScreenshot().then(function (png) {
        allure.createAttachment('Screenshot', function () {
          return new Buffer(png, 'base64')
        }, 'image/png')();
        done();
      })
    });
  }
};