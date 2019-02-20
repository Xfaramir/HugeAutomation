export class viewEyes {

    eyesAPI: string = "oHcCogwCORqZrNHOfi6s102VaTh3P0rcflIK8TGkccdjM110";
    appName: string;
    testName: string;
    runAsBatch: boolean;
    changeTest: boolean;
    fullScreenShot: boolean;
    resultStr: string;

    constructor() {

        this.appName = "Home 001";
        this.testName = "Huge Automation 0004";
        this.runAsBatch = true;
        this.changeTest = false;
        this.fullScreenShot = false;
        this.resultStr = '';
    }

    setup(eyes) {
        eyes.setApiKey(this.eyesAPI);
        //Enabling FULL Page Screenshots. true,false
        eyes.setForceFullPageScreenshot(this.fullScreenShot);
        if (this.runAsBatch) {
            eyes.setBatch(process.env.APPLITOOLS_BATCH_NAME, process.env.APPLITOOLS_BATCH_ID);
        }
        //Eliminate artifacts caused by a blinking cursor - on by default in latest SDK
        eyes.setIgnoreCaret(true);
    }
    //Handling results from EYES
    handleResult(result) {
        var totalSteps = result.steps;
        if (result.isNew) {
            this.resultStr = "New Baseline Created: " + totalSteps + " steps";
        } else if (result.isPassed) {
            this.resultStr = "All steps passed: " + totalSteps + " steps";
        } else {
            this.resultStr = "Test Failed:";
            this.resultStr += " matches=" + result.matches; /* matched the baseline */
            this.resultStr += " missing=" + result.missing; /* missing in the test*/
            this.resultStr += " mismatches=" + result.mismatches; /* did not match the baseline */
        }
        this.resultStr += "\n" + "results at ";
        console.log(this.resultStr);
    }

}
