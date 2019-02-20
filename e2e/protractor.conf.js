// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  allScriptsTimeout: 11000,
  suites: {
    homepage: './*.e2e-spec.ts',
    search: ['tests/e2e/contact_search/**/*Spec.js',
      'tests/e2e/venue_search/**/*Spec.js']
  },
  splitTestsBetweenCapabilities: true,
  multiCapabilities: [
    {
      browserName: 'firefox',

      'moz:firefoxOptions': {
        args: ["--headless"]
      }
    },
    {
      browserName: 'chrome',
      count: 1,
      "goog:chromeOptions": {
        'args': ['no-sandbox', '--headless', 'disable-gpu', '--window-size=1200,900']
      },
    },
    {
      browserName: 'chrome',
      count: 1,
      "goog:chromeOptions": {
        'args': ['no-sandbox', '--headless', 'disable-gpu', '--window-size=300,600']
      },
    }
  ],
  //Uncomment line below if test will be run locally instead of using docker selenium hub.
  directConnect: true,
  baseUrl: 'https://www.google.com/?hl=en',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
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

    //Taking a screenshot at the end of each spec
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