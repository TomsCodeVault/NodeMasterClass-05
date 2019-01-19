/*
 * CLI-Related Tasks
 *
 */

 // Dependencies
 var readline = require('readline');
 var util = require('util');
 var debug = util.debuglog('cli');
 var events = require('events');
 class _events extends events{};
 var e = new _events();
 var os = require('os');
 var v8 = require('v8');
 var _data = require('./data');
 var fs = require('fs');
 var path = require('path');

 // Instantiate the CLI module object
 var cli = {};

 // Define base direction of the data folder
 cli.baseDir = path.join(__dirname,'/../.data/');

 // Input handlers
 e.on('man',function(str){
   cli.responders.man();
 });

 e.on('help',function(str){
   cli.responders.man();
 });

 e.on('exit',function(str){
   cli.responders.exit();
 });

 e.on('stats',function(str){
   cli.responders.stats();
 });

 e.on('list users',function(str){
   cli.responders.listUsers(str);
 });

 e.on('more user info',function(str){
   cli.responders.moreUserInfo(str);
 });

 e.on('list menu items',function(str){
   cli.responders.listMenuItems(str);
 });

 e.on('list orders',function(str){
   cli.responders.listOrders(str);
 });

 e.on('more order info',function(str){
   cli.responders.moreOrderInfo(str);
 });

 // Responders object
 cli.responders = {};

 // Help/Man
 cli.responders.man = function(){
   var commands = {
     'exit' : {
       'name' : 'exit',
       'description' : 'Kill the CLI (and the rest of the application)'
     },
     'help' : {
       'name' : 'help',
       'description' : 'Alias of the "man" command'
     },
     'man' : {
       'name' : 'man',
       'description' : 'Show this manual page'
     },
     'stats' : {
       'name' : 'stats',
       'description' : 'Get statistics on the underlying operating system and resource utilization'
     },
     'list menu items' : {
       'name' : 'list menu items',
       'description' : 'Show a list of all menu items'
     },
     'list users' : {
       'name' : 'list users',
       'description' : 'Show a list of all users who have registered in the last 24 hours',
       'options' : {
         '--{hours}' : '(optional) Integer from 0 to 24, useful for testing'
       }
     },
     'more user info' : {
       'name' : 'more user info',
       'description' : 'Show details of a specific user',
       'options' : {
         '--{userId}' : '(required) Id (phone) of a registered user'
       }
     },
     'list orders' : {
       'name' : 'list orders',
       'description' : 'Show a list of all orders placed in the last 24 hours',
       'options' : {
         '--{hours}' : '(optional) Integer from 0 to 24, useful for testing'
       }
     },
     'more order info' : {
       'name' : 'more order info',
       'description' : 'Show details of a specific order',
       'options' : {
         '--{orderId}' : '(required) Unique order number'
       }
     }
   }

   // Show a header for the help page that is as wide as the screen
   cli.horizontalLine();
   cli.centered('CLI MANUAL');
   cli.horizontalLine();
   cli.verticalSpace(2);

   // Show each command, followed by its explanation, in white and yellow respectively
   var leftPadding = '     '; // 5 spaces
   var line = '';
   for(var key in commands){
     if(commands.hasOwnProperty(key)){
       var descriptionPadding = 30;
       line = '\x1b[33m'+commands[key]['name']+'\x1b[0m';
       descriptionPadding -= line.length;
       var padding = '';
       for(var i = 0; i < descriptionPadding; i++){
         padding += ' ';
       }
       line += padding+commands[key]['description'];
       console.log(line);
       cli.verticalSpace();
       if(commands[key].hasOwnProperty('options')){
         for(var option in commands[key]['options']){
           line = leftPadding+'Options:';
           console.log(line);
           cli.verticalSpace();
           line = leftPadding+leftPadding+'\x1b[33m'+option+'\x1b[0m - '+commands[key]['options'][option];
           console.log(line);
           cli.verticalSpace(2);
         }
       }
     }
   }
   cli.verticalSpace();
   cli.horizontalLine();
 };

 // Create a vertical space
 cli.verticalSpace = function(lines){
   lines = typeof(lines) == 'number' && lines > 0 ? lines : 1;
   for(var i = 0; i < lines; i++){
     console.log('');
   }
 };

 // Create a vertical line across the screen
 cli.horizontalLine = function(){
   // Get the available screen size
   var width = process.stdout.columns;

   var line = '';
   for(var i=0; i < width; i++){
     line+='-';
   }
   console.log(line);
 };

 // Create centered text on the screen
 cli.centered = function(str){
   str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : '';

   // Get the available screen size
   var width = process.stdout.columns;

   // Calculate the left padding there should be
   var leftPadding = Math.floor((width - str.length) / 2);

   // Put in left padding spaces before the string itself
   var line = '';
   for(var i=0; i < leftPadding; i++){
     line+=' ';
   }
   line+= str;
   console.log(line);
 };

 // Exit
 cli.responders.exit = function(){
   process.exit(0);
 };

// Stats
cli.responders.stats = function(){
  // Compile and object of stats
  var stats = {
    'Load Average' : os.loadavg().join(' '),
    'CPU Count' : os.cpus().length,
    'Free Memory' : os.freemem(),
    'Current Malloced Memory' : v8.getHeapStatistics().malloced_memory,
    'Peak Malloced Memory' : v8.getHeapStatistics().peak_malloced_memory,
    'Allocated Heap Used (%)' : Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100),
    'Available Heap Allocated (%)' : Math.round((v8.getHeapStatistics().total_heap_size / v8.getHeapStatistics().heap_size_limit) * 100),
    'Uptime' : Math.round(os.uptime())+' Seconds'
  };

  // Create a header for the stats page
  cli.horizontalLine();
  cli.centered('SYSTEM STATISTICS');
  cli.horizontalLine();
  cli.verticalSpace(2);

  // Show each command, followed by its explanation, in white and yellow respectively
  for(var key in stats){
    if(stats.hasOwnProperty(key)){
      var value = stats[key];
      var line = '\x1b[33m'+key+'\x1b[0m';
      var padding = 60 - line.length;
      for(var i = 0; i < padding; i++){
        line+=' ';
      }
      line+=value;
      console.log(line);
      cli.verticalSpace();
    }
  }

  cli.verticalSpace();

  // End with another horizontalLine
  cli.horizontalLine();
};

// List Users - optional parameter for hour to look back (for testing purposes)
cli.responders.listUsers = function(str){
  var arr = str.split('--');
  // Optionally allow user to provide a number of hours, up to 24, to go back, default to 24
  var hours = !isNaN(parseInt(arr[1])) && arr[1] >= 0 && arr[1] <= 24 ? arr[1] : 24;
  if (arr[1] > 24){
    cli.verticalSpace();
    console.log("Amount entered cannot be greater than 24. Only users registered in the last 24 hours will be listed.");
    cli.verticalSpace();
  }
  _data.list('users',function(err, userIds){
    if(!err && userIds && userIds.length > 0){
      var lookbackHours = 1000 * 60 * 60 * hours;
      var currentTime = Date.now();
      var counter = 0;
      var matches = 0;
      cli.verticalSpace();
      userIds.forEach(function(userId){
        fs.stat(cli.baseDir+'users/'+userId+'.json',function(err,fileStats){
          var userCreatedDate = Date.parse(fileStats.birthtime);
          _data.read('users',userId,function(err,userData){
            counter++;
            if(!err && userData && currentTime - lookbackHours <= userCreatedDate){
              matches++;
              var line = 'Phone: '+userId+' Email: '+userData.email+' User Name: '+userData.firstName+' '+userData.lastName+' Signup Date: '+(new Date(userCreatedDate)).toISOString();
              console.log(line);
              cli.verticalSpace();
            } else {
              if(counter === userIds.length && matches === 0){
                var line = "No users have signed up within the last ";
                line += hours == 1 ? "1 hour" : hours+" hours";
                console.log(line);
                cli.verticalSpace();
              }
            }
          });
        });
      });
    }
  });
};

// More User Info
cli.responders.moreUserInfo = function(str){
  // Get the email from the string that's provided
  var arr = str.split('--');
  var email = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
  if(email){
    _data.list('users',function(err, userIds){
      if(!err && userIds && userIds.length > 0){
        var counter = 0;
        var match = 0;
        userIds.forEach(function(userId){
          _data.read('users',userId,function(err,userData){
            counter++;
            if(!err && userData){
              if(userData.email == email){
                match++;
                // Remove the hashed password
                delete userData.hashedPassword;

                // Print the JSON with text highlighting
                cli.verticalSpace();
                console.dir(userData,{'colors' : true});
                cli.verticalSpace();
              } else {
                if(counter == userIds.length && match === 0){
                  cli.verticalSpace();
                  console.log('No users were found with the email supplied');
                  cli.verticalSpace();
                }
              }
            }
          });
        })
      }
    });
  } else {
    cli.verticalSpace();
    console.log('Missing or bad parameter');
    cli.verticalSpace();
  }
};

// List Menu Items
cli.responders.listMenuItems = function(){
  _data.list('menu',function(err, menuIds){
    if(!err && menuIds && menuIds.length > 0){
      cli.verticalSpace();
      menuIds.forEach(function(menuId){
        _data.read('menu',menuId,function(err,menuData){
          if(!err && menuData){
            var line = 'Id: '+menuData.id+' Description: '+menuData.description+' Price: '+menuData.price;
            console.log(line);
            cli.verticalSpace();
          } else {
            console.log("Unable to find any menu items at this time");
            cli.verticalSpace();
          }
        })
      })
    }
  });
};

// List Orders that have been placed in the last 24 hours
cli.responders.listOrders = function(str){
  var arr = str.split('--');
  // Optionally allow user to provide a number of hours, up to 24, to go back, default to 24
  var hours = !isNaN(parseInt(arr[1])) && arr[1] >= 0 && arr[1] <= 24 ? arr[1] : 24;
  if (arr[1] > 24){
    cli.verticalSpace();
    console.log("Amount entered cannot be greater than 24. Only orders placed in the last 24 hours will be listed.");
    cli.verticalSpace();
  }
  _data.list('orders',function(err, orderIds){
    if(!err && orderIds && orderIds.length > 0){
      var lookbackHours = 1000 * 60 * 60 * hours;
      var currentTime = Date.now();
      var counter = 0;
      var matches = 0;
      cli.verticalSpace();
      orderIds.forEach(function(orderId){
        fs.stat(cli.baseDir+'orders/'+orderId+'.json',function(err,fileStats){
          var orderCreatedDate = Date.parse(fileStats.birthtime);
          _data.read('orders',orderId,function(err,orderData){
            counter++;
            if(!err && orderData && currentTime - lookbackHours <= orderCreatedDate){
              matches++;
              var line = 'Order Number: '+orderData.orderId+' Order Date: '+(new Date(orderCreatedDate)).toISOString();
              console.log(line);
              cli.verticalSpace();
            } else {
              if(counter === orderIds.length && matches === 0){
                var line = "No orders have been places within the last ";
                line += hours == 1 ? "1 hour" : hours+" hours";
                console.log(line);
                cli.verticalSpace();
              }
            }
          });
        });
      });
    }
  });
};

// More Order Info
cli.responders.moreOrderInfo = function(str){
  // Get the id from the string that's provided
  var arr = str.split('--');
  var orderId = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
  if(orderId){
    // Lookup the user
    _data.read('orders',orderId,function(err,orderData){
      if(!err && orderData){
        // Print the JSON with text highlighting
        cli.verticalSpace();
        console.dir(orderData,{'colors' : true});
        cli.verticalSpace();
      } else {
        cli.verticalSpace();
        console.log('Order number '+orderId+' could not be found');
        cli.verticalSpace();
      }
    });
  } else {
    cli.verticalSpace();
    console.log('Missing Parameter --{orderId}');
    cli.verticalSpace();
  }
};


// Input processor
cli.processInput = function(str){
  str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : false;
  // Only process the input if the user actually wrote something.
  if(str){
    // Codify the unique strings that indentify the unique questions allowed to be asked
    var uniqueInputs = [
      'man',
      'help',
      'exit',
      'stats',
      'list users',
      'more user info',
      'list menu items',
      'list orders',
      'more order info'
    ];

    // Go through the possible inputs, emit event when a match is found
    var matchFound = uniqueInputs.some(function(input){
      if(str.toLowerCase().indexOf(input) > -1){
        // Emit an event matching the unique input, and include the full string given
        e.emit(input,str);
        return true;
      }
    });

    // if no match is found, tell the user to try again
    if(!matchFound){
      console.log("Sorry, try again");
    }
  }
};



// Init script
cli.init = function(){
  // Send the start message to the console in dark blue
  console.log('\x1b[34m%s\x1b[0m',"The CLI is running");

  // Start the interface
  var _interface = readline.createInterface({
    input: process.stdin,
    output : process.stdout,
    prompt : ''
  });

  // Create an initial prompt
  _interface.prompt();

  // Handle each line of input separately
  _interface.on('line',function(str){
    // Send to the input processor
    cli.processInput(str);

    // Re-initialize the prompt afterwards
    _interface.prompt();
  });

  // If the user stops the CLI, kill the assoicated process
  _interface.on('close',function(){
    process.exit(0);
  });

};










 // Export the module
 module.exports = cli;
