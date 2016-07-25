# echoNote
An Amazon Alexa Skill that transcribes your thoughts / ideas into a Google Spreadsheet.

This is alpha code, it requires several manual steps to get it running.

## Prerequisites
* Node
* Npm
* AWS account
* Amazon Alexa-enabled device

## Installation
* Clone this repo to your local machine
* Run ```npm install```

### Set up Google Sheets 
* Go to [Google Developer Console](https://console.developers.google.com/project)
* Select your project or create a new one (and then select it)
* Enable the Drive API for your project
    * In the sidebar on the left, expand APIs & auth > APIs
    * Search for "drive"
    * Click on "Drive API"
    * click the blue "Enable API" button
* Create a service account for your project
    * In the sidebar on the left, expand APIs & auth > Credentials
    * Click blue "Add credentials" button
    * Select the "Service account" option
    * Select the "JSON" key type option
    * Click blue "Create" button
    * your JSON key file is generated and downloaded to your machine (it is the only copy!)
    * note your service account's email address (also available in the JSON key file)

* Share the sheets doc with your service account using the email noted above

* Add the JSON key that was downloaded to this repo directory, rename it to ```creds.json```

* Update ```index.js``` with the ID of your spreadsheet (from it's URL).  The line to update begins:
```var doc = new GoogleSpreadsheet(```

### Create a Lambda App
* Log into Amazon AWS
* Select N. Virginia region - the only region currently capable of hosting Alexa apps
* Create a new app as documented [here](http://tobuildsomething.com/2015/08/14/Amazon-Echo-Alexa-Tutorial-The-Definitive-Guide-to-Coding-an-Alexa-Skill/)
* Zip the contents of this product directory, including creds.json and upload it.

### Create an Alexa App

* Log into [Amazon Developer Console](https://developer.amazon.com)
* Create a new Alexa app, called echoNote
* Use Invocation name "echo note"
* Copy the "intent schema" and "sample utterences" from the ```speechAssets``` subdirectory
* Under the "Configuration" tab, set the endpoint to the Lambda ARN we created in the previous step.

### Add the app to your Alexa account
* Log into the Alexa console
* Go to the "Skills" page
* In the top RH corner is a link "Your Skills" - click it
* You should see the skill we've just created, click it and ensure it's enabled
    
    
## Usage


* Say "Alexa, ask echoNote to remember <idea>”
* The <idea> will be sent to your google spreadsheet, and Alexa will repeat your idea back to you.

The structure of this command is:

* “echoNote" - invocation name of our custom “Alexa Skill” - this can be changed in the developer console
* “Remember" - intent name - changing this requires a change to index.js

You can try other ways of invoking the skill such as saying “Alexa, open Inkling”  then “Remember <idea>"


## Future Improvements
At the moment there are quite a lot of errors.  Sometimes Alexa fails to launch our skill, she doesn’t hear me say “Inkling”.  Sometimes she stops recording my words before I’ve finished speaking - only short sentences seem possible at the moment.  And sometimes she just bombs out without a clue as to why.

The only thing we can (maybe) do something about is getting her to expect longer strings of text.  The place to experiment is in the Developer console.  

* Go to [developer console](https://developer.amazon.com/edw/home.html#/skill/amzn1.echo-sdk-ams.app.8e4ef364-0b52-4be1-bb7f-58f5f92bfc4e/intentSchema/list)   
* Go to Alexa
* Click “Get Started” on “Alexa Skills Kit”
* Edit “Inkling”
* Go to “Interaction Model”
* Play with the stuff in “Sample Utterances” 

There are some tips on what should go in there on the “Literal Slot Type Reference” section of [this page](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-interaction-model-reference).  

