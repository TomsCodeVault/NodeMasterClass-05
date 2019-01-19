/*
 * Library for storing and rotating logs
 *
 */

 // Dependencies
 var fs = require('fs');
 var path = require('path');
 var zlib = require('zlib');

 // Container for the module
 var lib = {};

// Base directory of the logs folder
lib.baseDir = path.join(__dirname,'/../.logs/');

// Append a string to a file. Create the file if it does not exist.
lib.append = function(file,str,callback){
  //Open the file for appending
  fs.open(lib.baseDir+file+'.log','a',function(err,fileDescriptor){
    if(!err && fileDescriptor){
      // Append to the file and close it
      fs.appendFile(fileDescriptor,str+'\n',function(err){
        if(!err){
          fs.close(fileDescriptor,function(err){
            if(!err){
              callback(false);
            } else {
              callback('Error closing file that was being appended');
            }
          })
        } else {
          callback('Error appending to file');
        }
      });
    } else {
      callback('Could not open the file for appending')
    }
  });
};

// Compress the contents of a .log file into a .gz.b64 file
lib.compress = function(logId,newFileId,callback){
  var sourceFile = logId+'.log';
  var destFile = newFileId+'.gz.b64';

  // Read the source file
  fs.readFile(lib.baseDir+sourceFile,'utf8',function(err,inputString){
    if(!err && inputString){
      // Compress data using gzip
      zlib.gzip(inputString,function(err,buffer){
        if(!err && buffer){
          // Write compressed data to destination file
          fs.open(lib.baseDir+destFile,'wx',function(err,fileDescriptor){
            if(!err && fileDescriptor){
              fs.writeFile(fileDescriptor,buffer.toString('base64'),function(err){
                if(!err){
                  // Close the destination file
                  fs.close(fileDescriptor,function(err){
                    if(!err){
                      callback(false);
                    } else {
                      callback(err);
                    }
                  })
                } else {
                  callback(err);
                }
              });
            } else {
              callback(err);
            }
          });
        } else {
          callback(err);
        }
      });
    } else {
      callback(err);
    }
  });
};

// Decompress contents of a .gz file into a string
lib.decompress = function(fileId,callback){
  var fileName = fileId+'.gz.b64';
  fs.readFile(lib.baseDir+fileName,'utf8',function(err,string){
    if(!err && string){
      // Inflate the data
      var inputBuffer = Buffer.from(str,'base64');
      zlib.unzip(inputBuffer,function(err,outputBuffer){
        if(!err && outputBuffer){
          // callback the string
          var str = outputBuffer.toString();
          callback(false,str);
        } else {
          callback(err);
        }
      });
    } else {
      callback(err);
    }
  });
};


// Truncate a log file
lib.truncate = function(logId,callback){
  fs.truncate(lib.baseDir+logId+'.log',0,function(err){
    if(!err){
      callback(false);
    } else {
      callback(err);
    }
  });
};



 // Export the module
 module.exports = lib;
