
/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');
var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');

// Update this line with your Google sheet ID
var doc = new GoogleSpreadsheet('1FLvjBwfperB2NrHo-lqvDGy5RTFQdO-owSG0_qyt-oE');
var creds = require('./creds.json');

var EchoNote = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
EchoNote.prototype = Object.create(AlexaSkill.prototype);
EchoNote.prototype.constructor = EchoNote;

EchoNote.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("EchoNote onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

EchoNote.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("EchoNote onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Hey, what's the big idea?";
    var repromptText = "what's the big idea?";
    response.ask(speechOutput, repromptText);
};

EchoNote.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("EchoNote onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

EchoNote.prototype.intentHandlers = {
    // Register custom intent handlers
    "RecordIdeaIntent": function (intent, session, response) {
        var idea_slot = intent.slots.idea;
        var idea = idea_slot.value;
        
        if (idea_slot && idea) {
          async.series([
            function setAuth(step) {
              doc.useServiceAccountAuth(creds, step);
            },
            function addRow(step) {
              var d = new Date();
              var date_formatted = 
                [d.getDate(),
                 d.getMonth()+1,
                 d.getFullYear()].join('/')+', '+
                [d.getHours(),
                 d.getMinutes()].join(':');
               
              var new_row = {
                timestamp: date_formatted,
                full_message: idea_slot.value
              }
              doc.addRow(1, new_row, step)
            },
            function log(step){
              response.tellWithCard("OK, your idea is "+ idea, "Inkling", "Your idea is "+ idea);
            },
            function(err){
              if( err ) {
                console.log('Error: ' + err);
                response.tellWithCard("Hmm, I can't connect to your google spreadsheet", "Hmm, I can't connect to your google spreadsheet");
              }
            }
          ]);
          
        }
        else response.tellWithCard("What?", "Inkling", "What?");
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can tell me to remember ideas!", "You can tell me to remember ideas");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the EchoNote skill.
    var echonote = new EchoNote();
    echonote.execute(event, context);
};

