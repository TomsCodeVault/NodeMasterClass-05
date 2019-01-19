


// Dependencies
var path = require('path');
var fs = require('fs');
var _data = require('./data');
var https = require('https');
var http = require('http');
var helpers = require('./helpers');
var _logs = require('./logs');
var util = require('util');
var debug = util.debuglog('workers');

// Instantiate the workers object
var workers = {};


// Log all requests and responses to and from the api to file
workers.log = function(requestData,responseStatus,responsePayload){
  // Form the log data
  // First make sure to remove any password that may be sent as part of the request
  if(requestData.payload.hasOwnProperty('password')){
    delete requestData.payload.password;
  };
  // Construct the string to send to the log file
  var timeOfRequest = new Date().toISOString();
  var serverLogString = timeOfRequest+' - ';
  serverLogString += 'Path: '+requestData.trimmedPath+', ';
  serverLogString += 'Method: '+requestData.method.toUpperCase()+', ';
  serverLogString += 'headers: '+JSON.stringify(requestData.headers)+', ';
  serverLogString += 'requestPayload: '+JSON.stringify(requestData.payload)+'\n';
  serverLogString += 'Response Status: '+responseStatus;
  if([200, 204].indexOf(responseStatus) == -1){
    serverLogString += ', Response Payload: '+JSON.stringify(responsePayload);
  }

  // Convert data to a string
  // var logString = JSON.stringify(logData);

  // Determine the name of the log file
  var logFileName = 'server';

  // Append the log string to the log file
   _logs.append(logFileName,serverLogString,function(err){
    if(!err){
      debug("Logging to file succeeded");
    } else {
      debug("Logging to file failed");
    }
  });
};

// Compress log files, save compressed file with new name and truncate old file
workers.rotateLogs = function(fileName){
  var oldFileName = typeof(fileName) == 'string' && fileName.length > 0 ? fileName : false;
  // Make sure a fileName is supplied
  if(oldFileName) {
    // create date string to append to the old file name
    var cd = new Date(Date.now());
    var year = cd.getFullYear();
    var month = ('0'+(cd.getMonth() + 1)).slice(-2);
    var day = ('0'+cd.getDate()).slice(-2);
    var dateString = year+'-'+month+'-'+day;
    var newFileName = oldFileName+'-'+dateString;
    _logs.compress(oldFileName,newFileName,function(err){
      if(!err){
        // Truncate to log file
        _logs.truncate(oldFileName,function(err){
          if(!err){
            debug('Success truncating log file');
          } else {
            debug('Error truncating log file');
          }
        });
      } else {
        debug('Could not create or write to new file',err);
      }
    });
  } else {
    debug('No file name was supplied');
  }
};

// Timer to execute the log-rotation of server logs once per day
workers.serverLogRotationLoop = function(){
  setInterval(function(){
    workers.rotateLogs('server');
  },1000 * 60 * 60 * 24);
};

// Init script
workers.init = function(){
  // Send message to console in yellow
  console.log('\x1b[33m%s\x1b[0m','Log rotation is active');

  // Compress server log on startup
  workers.rotateLogs('server');

  // Call the server log loop so the server logs will be compressed daily
  //workers.serverLogRotationLoop();

};


// Export to workers module
module.exports = workers;
