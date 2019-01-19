/*
 * Unit Tests
 *
 */

// Dependencies
var sampleFunctions = require('../app/lib');
var assert = require('assert');


// Holder fot tests
var unit = {};

// Assert that the sum function adds 2 numbers correctly
unit['sampleFunctions.sum should return sum of 2 numbers'] = function(done){
  var val = sampleFunctions.sum(2,2);
  assert.equal(val,4);
  done();
};

// Assert that the product function multiplies 2 numbers correctly
unit['sampleFunctions.product should return the product of 2 numbers'] = function(done){
  var val = sampleFunctions.product(2,3);
  assert.equal(val,6);
  done();
};

// This illustrates that the testing is working correctly
// Assert that the product function does not think 3 x 3 equals 10
unit['sampleFunctions.product should return 9 not 10'] = function(done){
  var val = sampleFunctions.product(3,3);
  assert.equal(val,10);
  done();
};

// Assert that the sum function will return false if given non number arguments
unit['sampleFunctions.sum should return false if non numbers are sent in'] = function(done){
  var val = sampleFunctions.sum('a',2);
  assert.ok(val === false);
  done();
}

// Assert that the funnyExists function returns true when funny is in a string and false otherwise
unit['sampleFunctions.funnyExists should return true or false if funny is in the string'] = function(done){
  var testString = 'Javascript has a funny way of driving my crazy';
  var val = sampleFunctions.funnyExists(testString);
  assert.ok(val);
  done();
};


// Export the tests to the runner
module.exports = unit;
