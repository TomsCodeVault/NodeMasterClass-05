/*
 * Request handlers
 *
 */

 // Dependencies
var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');

 // Define handlers
var handlers = {};

/*
 * HTML handlers
 *
 */

// Index handler
handlers.index = function(data,callback){
  // Reject any request that is no GET
  if(data.method == 'get'){

    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Pizza Delivered to You',
      'head.description' : 'We get hot fresh pizza to you home in record time.',
      'body.class' : 'index'
    }

    // Read in a template as as string
    helpers.getTemplate('index',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as html
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Create Account
handlers.accountCreate = function(data,callback){
  // Reject any request that is no GET
  if(data.method == 'get'){

    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Create an Account',
      'head.description' : 'Signup now and start enjoying pizza now.',
      'body.class' : 'accountCreate'
    }

    // Read in a template as as string
    helpers.getTemplate('accountCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as html
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Edit Account
handlers.accountEdit = function(data,callback){
  // Reject any request that is no GET
  if(data.method == 'get'){

    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Edit your Account',
      'body.class' : 'accountEdit'
    }

    // Read in a template as as string
    helpers.getTemplate('accountEdit',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as html
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Account has been deleted
handlers.accountDeleted = function(data,callback){
  // Reject any request that is no GET
  if(data.method == 'get'){

    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Deleted',
      'head.description' : 'Your account has been deleted',
      'body.class' : 'accountDeleted'
    }

    // Read in a template as as string
    helpers.getTemplate('accountDeleted',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as html
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Session has been deleted
handlers.sessionDeleted = function(data,callback){
  // Reject any request that is no GET
  if(data.method == 'get'){

    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Logged Out',
      'head.description' : 'You have been logged out of your account',
      'body.class' : 'sessionDeleted'
    }

    // Read in a template as as string
    helpers.getTemplate('sessionDeleted',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as html
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Create New Session
handlers.sessionCreate = function(data,callback){
  // Reject any request that is no GET
  if(data.method == 'get'){

    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Login to your Account',
      'head.description' : 'Please enter your phone number and password to log in.',
      'body.class' : 'sessionCreate'
    }

    // Read in a template as as string
    helpers.getTemplate('sessionCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as html
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// List Menu Items
handlers.menuList = function(data,callback){
  // Reject any request that is no GET
  if(data.method == 'get'){

    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Pizza Menu',
      'head.description' : 'Please select from our fine pizza offerings.',
      'body.class' : 'menuList'
    }

    // Read in a template as as string
    helpers.getTemplate('menuList',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as html
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Edit Cart
handlers.cartEdit = function(data,callback){
  // Reject any request that is no GET
  if(data.method == 'get'){

    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Shopping Cart',
      'body.class' : 'cartEdit'
    }

    // Read in a template as as string
    helpers.getTemplate('cartEdit',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as html
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Order Create (checkout)
handlers.orderCreate = function(data,callback){
  // Reject any request that is no GET
  if(data.method == 'get'){

    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Checkout',
      'body.class' : 'orderCreate',
      'date.max' : config.allowableLeadTime+''
    }

    // Read in a template as as string
    helpers.getTemplate('orderCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as html
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Page to send users to after they have place an order
handlers.orderCreated = function(data,callback){
  // Reject any request that is no GET
  if(data.method == 'get'){
    var orderId = !isNaN(data.queryStringObject.orderId) ? data.queryStringObject.orderId : false;

    var bodyMessage = '';
    if(orderId){
      var deliveryDate = false;
      // Get delivery date from order
      _data.read('orders',orderId,function(err,orderData){
        if(!err && orderData){
          deliveryDate = orderData.deliveryDate;
          if(deliveryDate && deliveryDate != "N/A"){
            bodyMessage = "Your delivery is scheduled for " + deliveryDate + ". If your plans change, please call us at least 1 hour before then.";
          } else {
            bodyMessage = "Your pizza will be prepared shortly and we'll get it to you as soon as possible";
          }
        } else {
        bodyMessage = "We received your order but seem to have lost the details. OOPS!!! Please call us.";
        }

        // Prepare data for interpolation
        var templateData = {
          'head.title' : 'Thank you for your order!',
          'body.class' : 'orderCreated',
          'body.message' : bodyMessage,
          'button.orderId' : orderId
        };

        // Read in a template as as string
        helpers.getTemplate('orderCreated',templateData,function(err,str){
          if(!err && str){
            // Add the universal header and footer
            helpers.addUniversalTemplates(str,templateData,function(err,str){
              if(!err && str){
                // Return that page as html
                callback(200,str,'html');
              } else {
                callback(500,undefined,'html');
              }
            });
          } else {
            callback(500,undefined,'html');
          }
        });
      });
    } else {
        callback(405,undefined,'html');
    }
  } else {
    callback(405,undefined,'html');
  }
};

// Order Details
handlers.orderDetail = function(data,callback){

  // Reject any request that is no GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Order Detail',
      'body.class' : 'orderDetail',
      'body.orderId' : data.queryStringObject.orderId
    }

    // Read in a template as as string
    helpers.getTemplate('orderDetail',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as html
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Order History
handlers.orderHistory = function(data,callback){
  // Reject any request that is no GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Order History',
      'body.class' : 'orderHistory'
    }

    // Read in a template as as string
    helpers.getTemplate('orderHistory',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as html
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// favicon
handlers.favicon = function(data,callback){
  // Reject any request that is no GET
  if(data.method == 'get'){
    // Read in favicon's data
    helpers.getStaticAsset('favicon.ico',function(err,data){
      if(!err && data){
        // Callback the data
        callback(200,data,'favicon');
      } else {
        callback(500);
      }
    });
  } else {
    callback(405);
  }
};



// Public assets
handlers.public = function(data,callback){
  // Reject any request that is no GET
  if(data.method == 'get'){
    // Get the file name being requested
    var trimmedAssetName = data.trimmedPath.replace('public/','').trim();

    if(trimmedAssetName.length > 0){
      // Read in the asset's data
      helpers.getStaticAsset(trimmedAssetName, function(err,data){

        if(!err && data){
          // Determine the content type (default to plain text)
          var contentType = 'plain';

          if(trimmedAssetName.indexOf('.css') > -1){
            contentType = 'css';
          }
          if(trimmedAssetName.indexOf('.png') > -1){
            contentType = 'png';
          }
          if(trimmedAssetName.indexOf('.jpg') > -1){
            contentType = 'jpg';
          }
          if(trimmedAssetName.indexOf('.ico') > -1){
            contentType = 'favicon';
          }
          // Callback the data
          callback(200,data,contentType);
        } else {
          callback(404);
        }
      });
    }
  } else {
    callback(405);
  }
};

/*
 * JSON API handlers
 *
 */

// Example error
handlers.exampleError = function(data,callback){
  var err = new Error('This is an example error');
  throw(err);
};


// users
handlers.users = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for the users submethods
handlers._users = {};

// Users - post
// Required data: firstName, lastName, phone, email, address, password, tosAgreement
// Optional data: none
handlers._users.post = function(data,callback){
  // Check that all required fields are supplied
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().indexOf('@',1) > -1 && data.payload.email.trim().indexOf('@') < data.payload.email.trim().length - 2 ? data.payload.email.trim() : false;
  var address = typeof(data.payload.address) == 'string' && data.payload.address.trim().length > 0 ? data.payload.address.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

  if(firstName && lastName && phone && password && email && tosAgreement && address){
    // Make sure that the user doesn't already exist
    _data.read('users',phone,function(err,data){
      if(err){
        var hashedPassword = helpers.hash(password);

        // Create the user object
        if(hashedPassword){
          var userObject = {
            'firstName' : firstName,
            'lastName' : lastName,
            'address' : address,
            'phone' : phone,
            'email' : email,
            'hashedPassword' : hashedPassword,
            'tosAgreement' : true
          };

          // Store the user
          _data.create('users',phone,userObject,function(err){
            if(!err){
              callback(204);
            } else {
              callback(500,{'Error' : 'Could not create the new user'});
            }
          });
        } else {
          callback(500,{'Error' : 'Could not hash the user\'s password'});
        }


      } else {
        callback(400,{'Error' : 'A user with this phone number already exists'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required fields'});
  }
};

// Users - get
// Required data: phone
// Optional data: none
handlers._users.get = function(data,callback){
  // Check that the phone number is valid
  var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if(phone){

    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    //Verify that the given token is valid for the phone number supplied
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
      if(tokenIsValid){
        // Lookup user
        _data.read('users',phone,function(err,data){
          if(!err && data){
            // Remove the hashed password from the user object before returning it to the requester
            delete data.hashedPassword;
            callback(200,data);
          } else {
            callback(404);
          }
        });
      } else {
        callback(403,{'Error' : 'Missing required token in header, or token is expired'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
};

// Users - put
// Required data: phone
// Optional data: firstName, lastName, password, email (at least one must be supplied)
handlers._users.put = function(data,callback){
  // Check for the required data
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;

  // Check for optional fields
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().indexOf('@',1) > -1 && data.payload.email.trim().indexOf('@') < data.payload.email.trim().length - 2 ? data.payload.email.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  // Error if the phone is invalid
  if(phone){
    if(firstName || lastName || password || email){
      // Get the token from the headers
      var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      //Verify that the given token is valid for the phone number supplied
      handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
        if(tokenIsValid){
          // Lookup the user
          _data.read('users',phone,function(err,userData){
            if(!err && userData){
              // Update the fields supplied
              if(firstName){
                userData.firstName = firstName;
              }
              if(lastName){
                userData.lastName = lastName;
              }
              if(password){
                userData.hashedPassword = helpers.hash(password);
              }
              if(email){
                userData.email = email
              }
              // Store the updated data
              _data.update('users',phone,userData,function(err){
                if(!err){
                  callback(204);
                } else {
                  callback(500,{'Error' : 'Unable to update user'});
                }
              })
            } else {
              callback(400,{'Error' : 'The specified user does not exist'});
            }
          });
        } else {
          callback(403,{'Error' : 'Missing required token in header, or token is expired'});
        }
      });
    } else {
      callback(400,{'Error' : 'Missing fields to update'});
    }
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
};

// Users - delete
// Required field: phone
// Required hearer: token
// @TODO Cleanup (delete) any other data files associated with this user
handlers._users.delete = function(data,callback){
  // Check that the phone number is valid

  var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if(phone){
    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    //Verify that the given token is valid for the phone number supplied
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
      if(tokenIsValid){
        // Lookup user
        _data.read('users',phone,function(err,data){
          if(!err && data){
            _data.delete('users',phone,function(err){
              if(!err){
                // Delete the cart associated with this user
                _data.delete('carts',phone,function(err){
                  if(!err){
                    callback(204);
                  } else {
                    callback(500,{'Error' : 'User has been deleted but the associated cart may not have been'});
                  }
                });
              } else {
                callback(500,{'Error' : 'Could not delete specified user'});
              }
            });
          } else {
            callback(400,{'Error' : 'Could not find the specified user'});
          }
        });
      } else {
        callback(403,{'Error' : 'Missing required token in header, or token is expired'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
};

// Tokens
handlers.tokens = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._tokens[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the tokens methods
handlers._tokens = {};

// Tokens - post
// Required data: phone, password
// Optional data: none
handlers._tokens.post = function(data,callback){
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  if(phone && password){
    // Lookup the user who matches that phone number
    _data.read('users',phone,function(err,userData){
      if(!err && userData){
        // Hash the sent password and compare it to the password stored in the user object
        var hashedPassword = helpers.hash(password);
        if(hashedPassword == userData.hashedPassword){
          // If valid create a token with a random name. Set expiration one hour in the future
          var tokenId = helpers.createRandomString(20);
          var expires = Date.now() + 1000 * 60 * 60;
          var tokenObject = {
            'phone' : phone,
            'id' : tokenId,
            'expires' : expires
          };

          // Store the token
          _data.create('tokens',tokenId,tokenObject,function(err){
            if(!err){
              callback(200,tokenObject);
            } else {
              callback(400,{'Error' : 'Could not create the token'});
            }
          });
        } else {
          callback(400,{'Error' : "Password did not match the specified user's stored password"});
        }
      } else {
        callback(400,{'Error' : 'Could not find the specified user'});
      }
    });

  } else {
    callback(400,{'Error' : 'Missing required field(s)'});
  }
};

// Tokens - get
// Required data: id
// Optional data: none
handlers._tokens.get = function(data,callback){
  // Check that the id provided is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the token
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        callback(200,tokenData);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
};

// Tokens - put
// Required data: id, extend
// Optional data: none
handlers._tokens.put = function(data,callback){
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
  var extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;
  if(id && extend){
    // Lookup the token
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        // Check to make sure the token isn't alreade expired
        if(tokenData.expires > Date.now()){
          // Set the expiration an hour from now
          tokenData.expires = Date.now() + 1000 * 60 * 60;

          // Store the new updates
          _data.update('tokens',id,tokenData,function(err){
            if(!err){
              callback(200);
            } else {
              callback(500,{'Error' : 'Could not update token\'s expiration'});
            }
          })
        } else {
          callback(400,{'Error' : 'Token has already expired and cannot be extended'});
        }
      } else {
        callback(400,{'Error' : 'Specified token does not exist'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
};
// Tokens - delete
// Required data: id
// Optional data: none
handlers._tokens.delete = function(data,callback){
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    _data.read('tokens',id,function(err,data){
      if(!err && data){
        _data.delete('tokens',id,function(err){
          if(!err){
            callback(204);
          } else {
            callback(500,{'Error' : 'Could not delete specified token'});
          }
        });
      } else {
        callback(400,{'Error' : 'Could not find the specified token'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
};

// Verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = function(id,phone,callback){
  //Lookup token
  _data.read('tokens',id,function(err,tokenData){
    if(!err && tokenData){
      // Check that the token is for the given user and has not expired
      if(tokenData.phone == phone && tokenData.expires > Date.now()){
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

// Shopping carts
// Users can add, update, and remove items from cart or empty their cart.
// These are all going to use the put method so sub routes are used to detemine which action to take
// Acceptable routes are carts, carts/items/update, carts/items/add, carts/items/remove, and carts/items/empty
handlers.carts = function(data,callback){
  // Parse trimmedPath
  var cartRoutes = data.trimmedPath.split('/',4);
  // Each route will accept different methods
  var acceptableMethods = [];
  if(cartRoutes.length == 2){
    var acceptableMethods = ['get'];
    if(acceptableMethods.indexOf(data.method) > -1){
      handlers._carts[data.method](data,callback);
    } else {
      callback(405);
    }
  } else if(cartRoutes.length == 4 && (cartRoutes[2] == 'items')){
    var acceptableMethods = ['put'];
    if(acceptableMethods.indexOf(data.method) > -1){
      handlers._carts[cartRoutes[3]][data.method](data,callback);
    } else {
      callback(405);
    }
  } else {
    callback(405);
  }
};

// Containers for carts methods
handlers._carts = {};
handlers._carts.empty = {};
handlers._carts.add = {};
handlers._carts.update = {};
handlers._carts.remove = {};

// Carts - get
// Required data: phone, token(in headers)
// Optional data: none
handlers._carts.get = function(data,callback){
  //Check for a valid phone number
  var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if(phone){
    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    //Verify that the given token is valid for the phone number supplied
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
      if(tokenIsValid){
        _data.read('carts',phone,function(err,data){
          if(!err && data){
            callback(200,data);
          } else {
            // If valid user sends valid token and there's no cart, create one
            var newCartData = {
              'items' : [],
              'totalPrice' : 0
            };
            _data.create('carts',phone,newCartData,function(err){
              if(!err){
                callback(200,newCartData)
              } else {
                callback('500',{'Error' : 'No cart exists for this user and a new one could not be created'});
              }
            });
          }
        });
      } else {
        callback(403,{'Error' : 'Missing required token in header, or token is invalid'});
      }
    });

  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
};

// Carts/item - put
// Required data: phone, cartItemId, quantity, token (in headers)
// Optional data: none
handlers._carts.update.put = function(data,callback){
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var cartItemId = typeof(data.payload.cartItemId) == 'string' && data.payload.cartItemId.trim().length == 20 ? data.payload.cartItemId.trim() : false;
  var quantity = !isNaN(data.payload.quantity) && Number(data.payload.quantity) > 0 ? Number(data.payload.quantity) : false;
  // Check for required data
  if(phone && cartItemId && quantity){
    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    //Verify that the given token is valid for the phone number supplied
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
      if(tokenIsValid){
        _data.read('carts',phone,function(err,cartContents){
          if(!err && cartContents){
            var items = typeof(cartContents.items) == 'object' && cartContents.items instanceof Array ? cartContents.items : false;
            if(items && items.length > 0){
              // Find the position of the item to be updated
              var itemPosition = -1;
              for(var index = 0; index < items.length; index++){
                if(items[index]['id'] == cartItemId){
                  itemPosition = index;
                }
              }
              if(itemPosition > -1){
                // Update the quantity of the specified cartItemId
                var itemObject = {
                  'id' : cartItemId,
                  'menuItemId' : items[itemPosition]['menuItemId'],
                  'quantity' : quantity,
                  'unitPrice' : items[itemPosition]['unitPrice']
                };
                // Update total price for the items in the cart after the update
                cartContents.totalPrice += (quantity * items[itemPosition]['unitPrice']) - (items[itemPosition]['quantity'] * items[itemPosition]['unitPrice']);
                cartContents.items[itemPosition] = itemObject;
                // Update the cart contents with updated data
                _data.update('carts',phone,cartContents,function(err){
                  if(!err){
                    callback(200);
                  } else {
                    callback(500,{'Error' : 'Could not update cartItemId'});
                  }
                });
              } else {
                callback(400,{'Error' : 'The specified cartItemId is not in the cart'});
              }
            } else {
              callback(400,{'Error' : 'There are no items in the cart to update'});
            }
          } else {
            callback(400,{'Error' : 'Could not retrieve content from specified cart'});
          }
        });
      } else {
        callback(403,{'Error' : 'Missing required token in header, or token is invalid'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required data'});
  }
};

// Carts - remove
// Required data: phone, cartItemId, token (in headers)
// Optional data: none
handlers._carts.remove.put = function(data,callback){
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var cartItemId = typeof(data.payload.cartItemId) == 'string' && data.payload.cartItemId.trim().length == 20 ? data.payload.cartItemId.trim() : false;
  if(phone && cartItemId){
    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    //Verify that the given token is valid for the phone number supplied
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
      if(tokenIsValid){
        _data.read('carts',phone,function(err,cartContents){
          if(!err && cartContents){
            // Check for existing item array in cart
            var items = typeof(cartContents.items) == 'object' && cartContents.items instanceof Array ? cartContents.items : false;
            if(items && items.length > 0){
              // Find the position of the item to be removed
              var itemPosition = -1;
              for(var index = 0; index < items.length; index++){
                if(items[index]['id'] == cartItemId){
                  itemPosition = index;
                }
              }
              if(itemPosition > -1){
                // Get price of item being removed so that the total price can be updated
                var subtotal = items[itemPosition].quantity * items[itemPosition].unitPrice;
                cartContents.totalPrice -= subtotal;
                // Remove specified item from the array
                cartContents.items.splice(itemPosition,1);
                // Update the cart contents with update data
                _data.update('carts',phone,cartContents,function(err){
                  if(!err){
                    callback(200);
                  } else {
                      callback(500,{'Error' : 'Could not remove cartItemId from cart'});
                  }
                });
              } else {
                callback(400,{'Error' : 'The cartItemId provided is not in the cart'});
              }
            } else {
              callback(400,{'Error' : 'There are no items in the cart to remove'});
            }
          } else {
            callback(400,{'Error' : 'Could not retrieve cart data'});
          }
        });
      } else {
        callback(400,{'Error' : 'Missing required token in header, or token is invalid'})
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required data'});
  }
};

// Carts - addToCart
// Required data: phone, menuItemId, quantity, token (in headers)
// Optional data: none
handlers._carts.add.put = function(data,callback){
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var menuItemId = typeof(data.payload.menuItemId) == 'string' && data.payload.menuItemId.trim().length == 20 ? data.payload.menuItemId.trim() : false;
  var quantity = !isNaN(data.payload.quantity) && Number(data.payload.quantity) > 0 ? Number(data.payload.quantity) : false;

  // Check for required data
  if(phone && menuItemId && quantity){
    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    //Verify that the given token is valid for the phone number supplied
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
      if(tokenIsValid){
        // Read item from existing cart
        _data.read('carts',phone,function(err,cartContents){
          if(err || !cartContents){
            // The cart may not exist yet so create one
            var newCartData = {
              'items' : [],
              'totalPrice' : 0
            };
            _data.create('carts',phone,newCartData,function(err){
              if(!err){
                // Add the new item to the cart
                handlers._carts._addItemToCart(data,newCartData,function(err){
                  if(!err){
                    callback(204);
                  } else {
                    callback(400,err);
                  }
                });
              } else {
                callback('500',{'Error' : 'No cart exists for this user and a new one could not be created'});
              }
            });
          } else {
            // Add the new item to the cart
            handlers._carts._addItemToCart(data,cartContents,function(err){
              if(!err){
                callback(204);
              } else {
                callback(400,err);
              }
            });
          }
        });
      } else {
        callback(403,{'Error' : 'Missing required token in header, or token is invalid'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required data'});
  }
};

handlers._carts._addItemToCart = function(data,cartContents,callback){
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var menuItemId = typeof(data.payload.menuItemId) == 'string' && data.payload.menuItemId.trim().length == 20 ? data.payload.menuItemId.trim() : false;
  var quantity = !isNaN(data.payload.quantity) && Number(data.payload.quantity) > 0 ? Number(data.payload.quantity) : false;

  // Check for required data
  if(phone && menuItemId && quantity){
    // Check to see if menuItemId is valid
    _data.read('menu',menuItemId,function(err,itemData){
      if(!err && itemData){
        // Get current unit price from itemData
        var unitPrice = typeof(itemData.price) == 'number' ? itemData.price : false;
        if(unitPrice){
          // Add item to existing items array
          // Create a unique id for the item in the carts
          var cartItemId = helpers.createRandomString(20);
          var itemObject = {
            'id' : cartItemId,
            'menuItemId' : menuItemId,
            'quantity' : quantity,
            'unitPrice' : unitPrice
          };
          cartContents.items.push(itemObject);
          // Update total price
          var subtotal = quantity * unitPrice;
          cartContents.totalPrice += subtotal;
          // Update cart cartContents
          _data.update('carts',phone,cartContents,function(err){
            if(!err){
              callback(false);
            } else {
              callback(err);
            }
          });
        } else {
          callback({'Error' : 'Could not retrieve price for this item from the menu'});
        }
      } else {
        callback({'Error' : 'Invalid menuItemId provided'});
      }
    });
  }
};

// Carts - empty
// Required data: phone, token (in headers)
// Optional data: none
handlers._carts.empty.put = function(data,callback){
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  // Check for required data
  if(phone){
    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    //Verify that the given token is valid for the phone number supplied
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
      if(tokenIsValid){
        // To empty the cart, just add write newCartData to it
        var newCartData = {
          'items' : [],
          'totalPrice' : 0
        };
        _data.update('carts',phone,newCartData,function(err){
          if(!err){
            callback(204);
          } else {
            callback(500,{'Error' : 'Could not empty cart'});
          }
        });
      } else {
        callback(403,{'Error' : 'Missing required token in header, or token is invalid'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required data'})
  }
};

// Menu
handlers.menu = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._menu[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for menu items
handlers._menu = {};

// Menu - post
// Required fields: description, price
// Optional data: none
handlers._menu.post = function(data,callback){
  var description = typeof(data.payload.description) == 'string' && data.payload.description.trim().length > 0 ? data.payload.description.trim() : false;
  var price = typeof(data.payload.price) == 'number' && data.payload.price > 0 ? data.payload.price : false;
  if(description && price){
    // Check existing menu items for duplicates
    handlers._menu.validateDescription(description,function(isValid){
      if(isValid){
        var itemId = helpers.createRandomString(20);
        var itemObject = {
          'id' : itemId,
          'description' : description,
          'price' : price
        };
        // Store the menu item
        _data.create('menu',itemId,itemObject,function(err){
          if(!err){
            callback(200,itemObject);
          } else {
            callback(400,{'Error' : 'Could not create the menu item'});
          }
        });
      } else {
        callback(403,{'Error' : 'Menu item with this description already exists'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field(s)'});
  }
};

// Menu - get
// Required data: none
// Optional data: id in queryString
// Function returns all items if no queryString is provided by the request
handlers._menu.get = function(data,callback){
  // If an id exists in the queryStringObject then return that item, otherwise if there is no queryString then return an object with all menu items
  if(helpers.isEmpty(data.queryStringObject)){
    // return all menu items in one object
    handlers._menu.buildMenu(function(menuObject){
      callback(200,menuObject);
    })
  } else {
    // Check that the id provided is valid
    var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
    if(id){
      // Lookup the menu item
      _data.read('menu',id,function(err,itemData){
        if(!err && itemData){
          callback(200,itemData);
        } else {
          callback(404);
        }
      });
    } else {
      callback(400,{'Error' : 'Missing valid id in queryString'});
    }
  }
};

// Menu - put
// Required data: id
// Optional data: description, price (at least one of these must be supplied)
handlers._menu.put = function(data,callback){
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
  var description = typeof(data.payload.description) == 'string' && data.payload.description.trim().length > 0 ? data.payload.description.trim() : false;
  var price = typeof(data.payload.price) == 'number' && data.payload.price > 0 ? data.payload.price : false;
  var newItemObject = {};
  if(id){
    // Get existing item object to use for validation
    _data.read('menu',id,function(err,itemData){
      if(!err){
        if(price && price == itemData.price){
          price = false;
        }
        if(description && description != itemData.description){
          // Verify if description is unique
          handlers._menu.validateDescription(description,function(isValid){
            if(!isValid){
              description = false;
            }
            // If either of these has is valid and has changed then update the item
            if(description || price){
              if(description){
                itemData.description = description;
              }
              if(price){
                itemData.price = price;
              }
              _data.update('menu',id,itemData,function(err){
                if(!err){
                  callback(204);
                } else {
                  callback(503,{'Error' : 'Could not update menue item'});
                }
              });
            } else {
              callback(400,{'Error' : 'No valid or modified data to update'});
            }
          });
        } else {
          if(price){
            itemData.price = price;
            _data.update('menu',id,itemData,function(err){
              if(!err){
                callback(204);
              } else {
                callback(503,{'Error' : 'Could not update menue item'});
              }
            });
          } else {
            callback(400,{'Error' : 'No valid or modified data to update'});
          }
        }
      } else {
        callback(404,{'Error' : 'Item not found'});
      }
    });
  } else {
    callback(403, {'Error' : 'Missing required field'});
  }
};

// Menu - delete
// Required data: id in queryString
handlers._menu.delete = function(data,callback){
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    _data.read('menu',id,function(err,data){
      if(!err && data){
        _data.delete('menu',id,function(err){
          if(!err){
            callback(204);
          } else {
            callback(500,{'Error' : 'Could not delete specified menu item'});
          }
        });
      } else {
        callback(400,{'Error' : 'Could not find the specified menu item'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
};

// Orders
handlers.orders = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._orders[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for orders methods
handlers._orders = {};

// Orders - post
// Required data: phone, ccName, ccNumber
// Optional data: deliveryDate (deliveries can be scheduled out as far as 48 in advance), email (could be different than user's email), deliveryAddress
handlers._orders.post = function(data,callback){
// initialize data
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  // Get the requested delivery date and time if one is specified and use helpers.validDeliveryDate to return a date string
  // If no date is provided, 'N/A' will be returned. if an invalid date is provided false will be returned
  var deliveryDate = helpers.validDeliveryDate(data.payload.deliveryDate); // Date as far as 48 hours in advance
  var dateRequested = data.payload.dateRequested == 'true' ? true : false;
  var deliveryAddress = typeof(data.payload.deliveryAddress) == 'string' && data.payload.deliveryAddress.length > 0 ? data.payload.deliveryAddress : false;
  var ccName = typeof(data.payload.ccName) == 'string' && data.payload.ccName.length > 0 ? data.payload.ccName : false;
  var ccNumber = typeof(data.payload.ccNumber) == 'string' && data.payload.ccNumber.length > 11 ? data.payload.ccNumber : false;
  var orderEmail = typeof(data.payload.email) == 'string' && data.payload.email.length > 5 ? data.payload.email : false;
  // Check for required data
  if(phone && ccName && ccNumber){
    // Check that deliveryDate is not false
    if(deliveryDate){
      // Get the token from the headers
      var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      //Verify that the given token is valid for the phone number supplied
      handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
        if(tokenIsValid){
          // Get cartContents and initialize the orderData
          var orderData = {};
          orderData.deliveryDate = deliveryDate;
          // In a
          handlers._orders.getOrderId(function(newOrderId){
            if(newOrderId){
              orderData.orderId = newOrderId;
              _data.read('carts',phone,function(err,cartContents){
                if(!err && cartContents){
                  // Make sure there are items in the cart and a total price > 0
                  if(cartContents.items.length > 0 && cartContents.totalPrice > 0){
                    orderData.items = cartContents.items;
                    orderData.totalPrice = cartContents.totalPrice
                    // Get the necessary data from the user record
                    _data.read('users',phone,function(err,userData){
                      if(!err && userData){
                        orderData.userName = userData.firstName + ' ' + userData.lastName;
                        orderData.address = userData.address;
                        orderData.phone = userData.phone;
                        orderData.email = userData.email;
                        orderData.orderDate = (new Date()).toLocaleDateString();
                        // add any optional fields that were supplied
                        if(dateRequested){
                          orderData.requestedDate = deliveryDate;
                        }
                        if(deliveryAddress && deliveryAddress != userData.address){
                          orderData.deliveryAddress = deliveryAddress;
                        } else {
                          orderData.deliveryAddress = userData.address;
                        }
                        if(orderEmail && orderEmail != userData.email){
                          orderData.receiptEmail = orderEmail;
                        }
                        // Process payment
                        // We'll need cc info and Stripe.com test key
                        var stripeOptions = {
                          'amount' : orderData.totalPrice * 100,
                          'currency' : 'usd',
                          'orderId' : orderData.orderId,
                          'source' : 'tok_visa',
                          'description' : 'Pizza Delivery Order',
                          'token' : config.stripeToken
                        };

                        helpers.processPayment(stripeOptions,function(err,res){
                          if(!err){
                            // Add credit card charge id to the order
                            orderData.chargeId = res.id;
                            // Create the order
                            _data.create('orders',orderData.orderId,orderData,function(err){
                              if(!err){
                                // Empty the cart
                                var emptyCartData = {
                                  'items' : [],
                                  'totalPrice' : 0
                                };
                                _data.update('carts',phone,emptyCartData,function(err,cartData){
                                  if(!err){
                                    // Add orderId to user's file
                                    _data.read('users',phone,function(err,userData){
                                      if(!err){
                                        if(userData.orders){
                                          userData.orders.push(orderData.orderId);
                                        } else {
                                          userData.orders = [orderData.orderId];
                                        }
                                        _data.update('users',phone,userData,function(err,userData){
                                          if(!err){
                                            // Email receipt to customer
                                            helpers.emailReceipt(orderData,function(err){
                                              if(!err){
                                                callback(200,{'orderId' : orderData.orderId});
                                              } else {
                                                callback(500,{'Error' : 'Order has been processed and paid but no email was sent'});
                                              }
                                            });
                                          } else {
                                            callback(500,{'Error' : 'An order has been processed but adding orderId to user file failed'});
                                          }
                                        });
                                      } else {
                                        callback(500,{'Error' : 'An order has been processed but adding orderId to user file failed'});
                                      }
                                    })
                                  } else {
                                    callback(500,{'Error' : 'Order has been placed and paid for but the cart has not been emptied'});
                                  }
                                })
                              } else {
                                callback(500,{'Error' : 'Could not create the order'});
                              }
                            });
                          } else {
                            callback(500,{'Error' : 'Payment processing failed'});
                          }
                        });
                      } else {
                        callback(500,{'Error' : 'Could not get user data'});
                      }
                    });
                  } else {
                    callback(500,{'Error' : 'The cart is empty or the price is 0'});
                  }
                } else {
                  callback(500,{'Error': 'Could not get contents of the specified cart'});
                }
              });
            } else {
              callback(500,{'Error' : 'Unable to get an orderId'});
            }
          });

        } else {
          callback(403,{'Error' : 'Missing required token in header, or token is invalid'});
        }
      });
    } else {
      callback(400,{'Error' : 'The requested delivery date is invalid'});
    }
  } else {
    callback(400,{'Error' : 'Missing required data'});
  }
};

// Orders - get
// Required data: orderId and token in header
// Optional data: none
handlers._orders.get = function(data,callback){
  var orderId = !isNaN(data.queryStringObject.orderId) && Number(data.queryStringObject.orderId) > 0 ? data.queryStringObject.orderId : false;

  if(orderId) {
    _data.read('orders',orderId,function(err,orderData){
      if(!err && orderData){
        // Get the token from the headers
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        //Verify that the given token is valid for the phone number supplied
        handlers._tokens.verifyToken(token,orderData.phone,function(tokenIsValid){
          if(tokenIsValid){
            callback(200,orderData);
          } else {
            callback(403,{'Error' : 'Missing required token in header, or token is invalid'});
          }
        });
      } else {
        callback(400,{'Error' : 'Could not get order data'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required paramater'});
  }
};

// Orders - put
// Not implemented. Orders should not be changed after they're created
handlers._orders.put = function(data,callback){

};

// Orders - delete
// Not implemented. Orders should not be deleted
handlers._orders.delete = function(data,callback){

};

// Get a new orderId by reading the value stored in the lastOrderId file and incrementing it by one
handlers._orders.getOrderId = function(callback){
  _data.read('ids','lastOrderId',function(err,data){
    var newOrderId = 1000;
    var lastId = typeof(data.orderId) == 'number' ? data.orderId : 1000;
    if(!err && lastId){
      newOrderId = lastId;
    }
    idObject = {'orderId' : ++lastId};
    _data.update('ids','lastOrderId',idObject,function(err){
      callback(newOrderId);
    });
  });
};

// Get an array of all menu items
handlers._menu.getItemList = function(callback){
  _data.list('menu',function(err,data){
    if(!err && data){
      callback(false,data);
    } else {
      callback(err);
    }
  });
};

// Check to make sure the new description is not already being used
handlers._menu.validateDescription = function(description, callback){
  // Get list of all items
  handlers._menu.getItemList(function(err,itemList){
    if(!err && itemList && itemList.length > 0){
      // Iterate through all itmes, adding an element to the descriptionList array for each item
      var descriptionList = [];
      itemList.forEach(function(item){
        _data.read('menu',item,function(err,itemObject){
          if(!err){
            descriptionList.push(itemObject.description);
          } else {
            descriptionList.push('');
          }
          // If all descriptions have been added to array, check to see if the new description already exists
          if(descriptionList.length == itemList.length){
            if(descriptionList.indexOf(description) > -1){
              callback(false);
            } else {
              callback(true);
            }
          }
        });
      });
    } else {
      callback(true);
    }
  });
};

handlers._menu.buildMenu = function(callback){
  // Get list of all items
  handlers._menu.getItemList(function(err,itemList){
    if(!err && itemList){
      // Iterate through all itmes, adding an element to the menu object for each item
      var menu = {};
      var counter = 0;
      itemList.forEach(function(item){
        _data.read('menu',item,function(err,itemObject){
          // Create object for each menu item and add it to the menu object
          if(!err){
            var menuItem = {
              'id' : itemObject.id,
              'description' : itemObject.description,
              'price' : itemObject.price
            };
            menu[itemObject.id] = menuItem;
          }
          if(++counter === itemList.length){
            callback(menu);
          }
        });
      });
    } else {
      callback({});
    }
  });
};

// Ping handler
handlers.ping = function(data,callback){
	callback(200);
};

// Not found handler
handlers.notFound = function(data,callback){
	callback(404);
};

// Export the module
module.exports = handlers;
