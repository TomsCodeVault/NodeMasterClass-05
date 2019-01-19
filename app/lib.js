/*
 * Sample functions
 *
 */


 // Container for functions

 var sampleFunctions = {};

 // Get product of 2 numbers
 sampleFunctions.product = function(a,b){
   if(!isNaN(parseFloat(a)) && !isNaN(parseFloat(b))){
       return a * b;
   } else {
     return false;
   }
 };

 // Get sum of 2 numbers
 sampleFunctions.sum = function(a,b){
   if(!isNaN(parseFloat(a)) && !isNaN(parseFloat(b))){
       return a + b;
   } else {
     return false;
   }
 };

 // Test if the word "funny" is in the supplied string
 sampleFunctions.funnyExists = function(string){
   if(typeof(string) == 'string'){
     arr = string.split(' ');
     if(arr.length > 0){
       return arr.indexOf('funny') > -1;
     } else {
       return false;
     }
   } else {
     return false;
   }
 };


 module.exports = sampleFunctions;
