export class viewEyes {
    eyesAPI = 'LtBfXNSccE0IRGNsYp73AMlIz4Y7OD976MqkRIQfa088110';
    appName: string;
    testName: string;
    runAsBatch: boolean;
    changeTest: boolean;
    fullScreenShot: boolean;
    resultStr: string;

    constructor() {
        // In case you need to create a new baseline just change appname and testname below.
        this.appName = 'Home GSuite 04';
        this.testName = 'Gsuite visual Automation 004';
        // runAsBatch to be set to true in case of jenkins CI.
        this.runAsBatch = false;
        this.changeTest = false;
        this.fullScreenShot = true;
        this.resultStr = '';
    }

    setup(eyes) {
        eyes.setApiKey(this.eyesAPI);
        // Enabling FULL Page Screenshots. true,false
        eyes.setForceFullPageScreenshot(this.fullScreenShot);
        if (this.runAsBatch) {
            eyes.setBatch(process.env.APPLITOOLS_BATCH_NAME, process.env.APPLITOOLS_BATCH_ID);
        }
        // Eliminate artifacts caused by a blinking cursor - on by default in latest SDK
        eyes.setIgnoreCaret(true);
    }
    // Handling results from EYES in console
    handleResult(result) {
        const totalSteps = result.steps;
        if (result.isNew) {
            this.resultStr = 'New Baseline Created: ' + totalSteps + ' steps';
        } else if (result.isPassed) {
            this.resultStr = 'All steps passed: ' + totalSteps + ' steps';
        } else {
            this.resultStr = 'Test Failed:';
            this.resultStr += ' matches=' + result.matches; /* matched the baseline */
            this.resultStr += ' missing=' + result.missing; /* missing in the test*/
            this.resultStr += ' mismatches=' + result.mismatches; /* did not match the baseline */
        }
        this.resultStr += '\n' + 'results at ';
        console.log(this.resultStr);
    }
}
