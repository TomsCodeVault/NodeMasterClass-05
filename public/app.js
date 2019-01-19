/*
 * Frontend Logic for application
 *
 */

// Container for frontend application
var app = {};

// Config
app.config = {
  'sessionToken' : false
};

// AJAX Client (for RESTful API)
app.client = {}

// Interface for making API calls
app.client.request = function(headers,path,method,queryStringObject,payload,callback){

  // Set defaults
  headers = typeof(headers) == 'object' && headers !== null ? headers : {};
  path = typeof(path) == 'string' ? path : '/';
  method = typeof(method) == 'string' && ['POST','GET','PUT','DELETE'].indexOf(method.toUpperCase()) > -1 ? method.toUpperCase() : 'GET';
  queryStringObject = typeof(queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
  payload = typeof(payload) == 'object' && payload !== null ? payload : {};
  callback = typeof(callback) == 'function' ? callback : false;

  // For each query string parameter sent, add it to the path
  var requestUrl = path+'?';
  var counter = 0;
  for(var queryKey in queryStringObject){
     if(queryStringObject.hasOwnProperty(queryKey)){
       counter++;
       // If at least one query string parameter has already been added, preprend new ones with an ampersand
       if(counter > 1){
         requestUrl+='&';
       }
       // Add the key and value
       requestUrl+=queryKey+'='+queryStringObject[queryKey];
     }
  }

  // Form the http request as a JSON type
  var xhr = new XMLHttpRequest();
  xhr.open(method, requestUrl, true);
  xhr.setRequestHeader("Content-type", "application/json");

  // For each header sent, add it to the request
  for(var headerKey in headers){
     if(headers.hasOwnProperty(headerKey)){
       xhr.setRequestHeader(headerKey, headers[headerKey]);
     }
  }

  // If there is a current session token set, add that as a header
  if(app.config.sessionToken){
    xhr.setRequestHeader("token", app.config.sessionToken.id);
  }

  // When the request comes back, handle the response
  xhr.onreadystatechange = function() {
      if(xhr.readyState == XMLHttpRequest.DONE) {
        var statusCode = xhr.status;
        var responseReturned = xhr.responseText;

        // Callback if requested
        if(callback){
          try{
            var parsedResponse = JSON.parse(responseReturned);
            callback(statusCode,parsedResponse);
          } catch(e){
            callback(statusCode,false);
          }

        }
      }
  }

  // Send the payload as JSON
  var payloadString = JSON.stringify(payload);
  xhr.send(payloadString);

};

// Bind the logout button
app.bindLogoutButton = function(){
  document.getElementById("logoutButton").addEventListener("click", function(e){

    // Stop it from redirecting anywhere
    e.preventDefault();

    // Log the user out
    app.logUserOut();

  });
};

// Bind the add to cart button
app.bindAddToCartButtons = function(){
  var atcButtons = document.getElementById("menuListTable").querySelectorAll("#addToCartButton");

  for(var i = 0; i < atcButtons.length; i++){
    atcButtons[i].addEventListener("click", function(e){
      // get the item number and quantity from other elements in the row
      e.preventDefault();
      var payloadObject = {
        'phone' : e.currentTarget.parentElement.getAttribute("phone"),
        'menuItemId' : e.currentTarget.parentElement.getAttribute("itemId"),
        'quantity' : e.currentTarget.parentElement.parentElement.querySelector(".menuQty").value
      };
      app.client.request(undefined,'api/carts/items/add','PUT',undefined,payloadObject,function(statusCode,responsePayload){
        window.location = '/cart/edit';
      });
    });
  }
};

// Bind the update cart buttons
app.bindUpdateCartButtons = function(){
  var ucButtons = document.getElementById("cartTable").querySelectorAll(".menuQty");

  for(var i = 0; i < ucButtons.length; i++){
    ucButtons[i].addEventListener("change", function(e){
      // get the item number and quantity from other elements in the row
      e.preventDefault();
      var payloadObject = {
        'phone' : e.currentTarget.parentElement.getAttribute("phone"),
        'cartItemId' : e.currentTarget.parentElement.getAttribute("itemId"),
        'quantity' : e.currentTarget.value
      };
      app.client.request(undefined,'api/carts/items/update','PUT',undefined,payloadObject,function(statusCode,responsePayload){
        if(statusCode == 200){
          location.reload();
        } else {
          // Display error message
        }
      });
    });
  }
};

// Bind the remove from cart buttons
app.bindRemoveFromCartButtons = function(){
  var ucButtons = document.getElementById("cartTable").querySelectorAll("#removeFromCartButton");

  for(var i = 0; i < ucButtons.length; i++){
    ucButtons[i].addEventListener("click", function(e){
      // get the item number and quantity from other elements in the row
      e.preventDefault();
      var payloadObject = {
        'phone' : e.currentTarget.parentElement.getAttribute("phone"),
        'cartItemId' : e.currentTarget.parentElement.getAttribute("itemId"),
      };
      app.client.request(undefined,'api/carts/items/remove','PUT',undefined,payloadObject,function(statusCode,responsePayload){
        if(statusCode == 200){
          location.reload();
        } else {
          // Display error message
        }
      });
    });
  }
};

app.bindDateTimeControls = function(){
  var dateTimeChk = document.getElementById("dateTimeChk");
  dateTimeChk.addEventListener('change', function(e){
    var dateControls = document.querySelector(".dateControls");
    dateControls.disabled = !dateControls.disabled;
    var datePartControls = dateControls.querySelectorAll(".datePartControl")
    for(var i = 0; i < datePartControls.length; i++){
      datePartControls[i].disabled = !datePartControls[i].disabled;
    }
  });
};

app._createDateFromControls = function(){
  var date = document.getElementById("dateInput").value;
  var hours = document.getElementById("hourControl").value;
  var minutes = document.getElementById("minuteControl").value;
  var am_pm = document.getElementById("am_pmControl").value;
  hours = hours == 12 ? "00" : hours;
  hours = am_pm == 'pm' && hours < 12 ? parseInt(hours) + 12 : hours;
  newDate = new Date(date+' '+hours+':'+minutes);
  return Date.parse(newDate);
}

app._validateDeliveryDate = function(formId){
  var newDate = app._createDateFromControls();
  if(!newDate){
    // Set the formError field with the error text and display it
    var errorDisplay = document.querySelector("#"+formId+" .formError");
    errorDisplay.innerHTML = "Invalid date value";
    errorDisplay.style.display = "block";
    return false;
  }
  var newDateString = (new Date(newDate)).toISOString();
  var hiddenDate = document.querySelector(".hiddenDateInput");
  var originalDate = hiddenDate.value;
  var leadTime = document.querySelector(".timeWrapper").getAttribute("dateMax");
  var allowableLeadTime = 60 * 60 * 1000 * leadTime;
  // Controls are rounded down to 5 minute intervals so allow them to be up to 5 minutes earlier than the hidden date field
  var originalDateMS = Date.parse(originalDate) - 300000;
  if(newDate - allowableLeadTime > originalDateMS || newDate < originalDateMS){
    // Set the formError field with the error text and display it
    var errorDisplay = document.querySelector("#"+formId+" .formError");
    errorDisplay.innerHTML = "Delivery date but be between 1 and "+leadTime+" hours from now";
    errorDisplay.style.display = "block";
    return false;
  } else {
    hiddenDate.value = newDateString;
    // return the original date in case the form needs to be reset later
    return originalDate;
  }
}

// Log the user out then redirect them
app.logUserOut = function(redirectUser){
  // Set redirectUser to default to true
  redirectUser = typeof(redirectUser) == 'boolean' ? redirectUser : true;

  // Get the current token id
  var tokenId = typeof(app.config.sessionToken.id) == 'string' ? app.config.sessionToken.id : false;

  // Send the current token to the tokens endpoint to delete it
  var queryStringObject = {
    'id' : tokenId
  };
  app.client.request(undefined,'api/tokens','DELETE',queryStringObject,undefined,function(statusCode,responsePayload){
    // Set the app.config token as false
    app.setSessionToken(false);

    // Send the user to the logged out page
    if(redirectUser){
      window.location = '/session/deleted';
    }

  });
};

// Bind the forms
app.bindForms = function(){
  if(document.querySelector("form")){

    var allForms = document.querySelectorAll("form");
    for(var i = 0; i < allForms.length; i++){
        allForms[i].addEventListener("submit", function(e){

        // Stop it from submitting
        e.preventDefault();
        var formId = this.id;
        var path = this.action;
        var method = this.method.toUpperCase();


        // Validate delivery date on order form before submitting
        if(formId == 'orderInfo'){
          // If user is requesting a specific date and time, make sure it's within allowable range
          if(document.getElementById("dateTimeChk").checked){
            var preservedOriginalDate = app._validateDeliveryDate(formId);
            if(!preservedOriginalDate){
              return false;
            }
          }
        }

        // Hide the error message (if it's currently shown due to a previous error)
        document.querySelector("#"+formId+" .formError").style.display = 'none';

        // Hide the success message (if it's currently shown due to a previous error)
        if(document.querySelector("#"+formId+" .formSuccess")){
          document.querySelector("#"+formId+" .formSuccess").style.display = 'none';
        }


        // Turn the inputs into a payload
        var payload = {};
        var elements = this.elements;
        for(var i = 0; i < elements.length; i++){
          if(elements[i].type !== 'submit'){
            if(!elements[i].disabled){
              var valueOfElement = elements[i].type == 'checkbox' ? elements[i].checked : elements[i].value;
              if(elements[i].name == '_method'){
                method = valueOfElement;
              } else {
                payload[elements[i].name] = valueOfElement;
              }
            }
          }
        }
        console.log(formId+' '+path+' '+method);

        // If the method is DELETE, turn payload into queryStringObject
        var queryStringObject = method == 'DELETE' ? payload : {};

        // Call the API
        app.client.request(undefined,path,method,queryStringObject,payload,function(statusCode,responsePayload){
          // Display an error on the form if needed
          if([200, 204].indexOf(statusCode) == -1){

            if(statusCode == 403){
              // log the user out
              app.logUserOut();

            } else {
              // If hidden date input was changed, change it back or validation won't work right
              if(preservedOriginalDate){
                document.querySelector(".hiddenDateInput").value = preservedOriginalDate;
              }

              // Try to get the error from the api, or set a default error message
              var error = typeof(responsePayload.Error) == 'string' ? responsePayload.Error : 'An error has occured, please try again';

              // Set the formError field with the error text
              document.querySelector("#"+formId+" .formError").innerHTML = error;

              // Show (unhide) the form error field on the form
              document.querySelector("#"+formId+" .formError").style.display = 'block';
            }
          } else {
            // If successful, send to form response processor
            app.formResponseProcessor(formId,payload,responsePayload);
          }

        });
      });
    }
  }
};

// Form response processor
app.formResponseProcessor = function(formId,requestPayload,responsePayload){
  var functionToCall = false;
  // If account creation was successful, try to immediately log the user in
  if(formId == 'accountCreate'){
    // Take the phone and password, and use it to log the user in
    var newPayload = {
      'phone' : requestPayload.phone,
      'password' : requestPayload.password
    };

    app.client.request(undefined,'api/tokens','POST',undefined,newPayload,function(newStatusCode,newResponsePayload){
      // Display an error on the form if needed
      if([200, 204].indexOf(newStatusCode) == -1){

        // Set the formError field with the error text
        document.querySelector("#"+formId+" .formError").innerHTML = 'Sorry, an error has occurred. Please try again.';

        // Show (unhide) the form error field on the form
        document.querySelector("#"+formId+" .formError").style.display = 'block';

      } else {
        // If successful, set the token and redirect the user
        app.setSessionToken(newResponsePayload);
        window.location = '/menu';
      }
    });
  }
  // If login was successful, set the token in localstorage and redirect the user
  if(formId == 'sessionCreate'){
    app.setSessionToken(responsePayload);
    window.location = '/menu';
  }

  // If forms saved successfully and they have success messages, show them
  var formsWithSuccessMessages = ['accountEdit1', 'accountEdit2'];
  if(formsWithSuccessMessages.indexOf(formId) > -1){
    document.querySelector("#"+formId+" .formSuccess").style.display = 'block';
  }

  // If the user deleted their account, redirect them to the account deleted page
  if(formId == 'accountEdit3'){
    app.logUserOut(false);
    window.location = 'account/deleted';
  }

  // If the user placed an order, redirect them to a thank you page
  if(formId == 'orderInfo'){
    if(responsePayload.orderId){
      window.location = '/order/created?orderId='+responsePayload.orderId;
    } else {
      window.location = '/menu';
    }
  }

};

// Get the session token from localstorage and set it in the app.config object
app.getSessionToken = function(){
  var tokenString = localStorage.getItem('token');
  if(typeof(tokenString) == 'string'){
    try{
      var token = JSON.parse(tokenString);
      app.config.sessionToken = token;
      if(typeof(token) == 'object'){
        app.setLoggedInClass(true);
      } else {
        app.setLoggedInClass(false);
      }
    }catch(e){
      app.config.sessionToken = false;
      app.setLoggedInClass(false);
    }
  }
};

// Set (or remove) the loggedIn class from the body
app.setLoggedInClass = function(add){
  var target = document.querySelector("body");
  if(add){
    target.classList.add('loggedIn');
    // If there are items in the cart, show cart menu item
    var phone = typeof(app.config.sessionToken.phone) == 'string' ? app.config.sessionToken.phone : false;
    if(phone){
      // Fetch the user data
      var queryStringObject = {
        'phone' : phone
      };
      app.client.request(undefined,'api/carts','GET',queryStringObject,undefined,function(statusCode,responsePayload){
        if(statusCode == 200 && responsePayload.items.length > 0){
          target.classList.add('notEmpty');
        }
      });
    }
  } else {
    target.classList.remove('loggedIn');
    target.classList.remove('notEmpty');
  }
};

// Set the session token in the app.config object as well as localstorage
app.setSessionToken = function(token){
  app.config.sessionToken = token;
  var tokenString = JSON.stringify(token);
  localStorage.setItem('token',tokenString);
  if(typeof(token) == 'object'){
    app.setLoggedInClass(true);
  } else {
    app.setLoggedInClass(false);
  }
};

// Renew the token
app.renewToken = function(callback){
  var currentToken = typeof(app.config.sessionToken) == 'object' ? app.config.sessionToken : false;
  if(currentToken){
    // Update the token with a new expiration
    var payload = {
      'id' : currentToken.id,
      'extend' : true,
    };
    app.client.request(undefined,'api/tokens','PUT',undefined,payload,function(statusCode,responsePayload){
      // Display an error on the form if needed
      if(statusCode == 200){
        // Get the new token details
        var queryStringObject = {'id' : currentToken.id};
        app.client.request(undefined,'api/tokens','GET',queryStringObject,undefined,function(statusCode,responsePayload){
          // Display an error on the form if needed
          if(statusCode == 200){
            app.setSessionToken(responsePayload);
            callback(false);
          } else {
            app.setSessionToken(false);
            callback(true);
          }
        });
      } else {
        app.setSessionToken(false);
        callback(true);
      }
    });
  } else {
    app.setSessionToken(false);
    callback(true);
  }
};

// Loop to renew token often
app.tokenRenewalLoop = function(){
  setInterval(function(){
    app.renewToken(function(err){
      if(!err){
        console.log("Token renewed successfully @ "+Date.now());
      }
    });
  },1000 * 60);
};

// Load data on the page
app.loadDataOnPage = function(){
  // Get the current page from the body class
  var bodyClasses = document.querySelector("body").classList;
  var primaryClass = typeof(bodyClasses[0]) == 'string' ? bodyClasses[0] : false;
  // Logic for account settings page
  if(primaryClass == 'accountEdit'){
    app.loadAccountEditPage();
  }

  if(primaryClass == 'menuList'){
    app.loadMenuListPage();
  }

  if(primaryClass == 'cartEdit'){
    app.loadCartPage();
  }

  if(primaryClass == 'orderCreate'){
    app.loadOrderCreatePage();
  }

  if(primaryClass == 'orderCreated'){
    app.loadOrderCreatedPage();
  }

  if(primaryClass == 'orderDetail'){
    app.loadOrderDetailPage();
  }

  if(primaryClass == 'orderHistory'){
    app.loadOrderHistoryPage();
  }
};

// Load the account edit page specifically
app.loadAccountEditPage = function(){
  // Get the phone number from the current token, or log the user out if none is there
  var phone = typeof(app.config.sessionToken.phone) == 'string' ? app.config.sessionToken.phone : false;
  if(phone){
    // Fetch the user data
    var queryStringObject = {
      'phone' : phone
    };
    app.client.request(undefined,'api/users','GET',queryStringObject,undefined,function(statusCode,responsePayload){
      if(statusCode == 200){
        // Put the data into the forms as values where needed
        document.querySelector("#accountEdit1 .firstNameInput").value = responsePayload.firstName;
        document.querySelector("#accountEdit1 .lastNameInput").value = responsePayload.lastName;
        document.querySelector("#accountEdit1 .displayPhoneInput").value = responsePayload.phone;
        document.querySelector("#accountEdit1 .emailInput").value = responsePayload.email;
        document.querySelector("#accountEdit1 .addressInput").value = responsePayload.address;

        // Put the hidden phone field into both forms
        var hiddenPhoneInputs = document.querySelectorAll("input.hiddenPhoneNumberInput");
        for(var i = 0; i < hiddenPhoneInputs.length; i++){
            hiddenPhoneInputs[i].value = responsePayload.phone;
        }

      } else {
        // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
        app.logUserOut();
      }
    });
  } else {
    app.logUserOut();
  }
};

// Load the menu page specifically
app.loadMenuListPage = function(){
  // Get the phone number from the current token, or log the user out if none is there
  var phone = typeof(app.config.sessionToken.phone) == 'string' ? app.config.sessionToken.phone : false;
  var loggedIn = false;
  if(phone){
    loggedIn = true;
  }
  // Get menu items
  app.client.request(undefined,'api/menu','GET',undefined,undefined,function(statusCode,responsePayload){
    if(statusCode == 200){

      // Determine how many checks the user has
      var menu = typeof(responsePayload) == 'object' ? responsePayload : {};
      var itemCounter = 0; // use to test for empty menu
      // Show each menu item as a new row in the table
      for(var key in menu){
        if(menu.hasOwnProperty(key)){
          itemCounter++;
          var menuItem = menu[key];
          // Create table row for each menu item
          var table = document.getElementById("menuListTable");
          var tr = table.insertRow(-1);
          tr.classList.add('menuRow');
          var td0 = tr.insertCell(0);
          td0.classList.add('menuDescription');
          var td1 = tr.insertCell(1);
          var td2 = tr.insertCell(2);
          var td3 = tr.insertCell(3);
          td3.setAttribute('itemId', menuItem['id']);
          td3.setAttribute('phone', phone);
          td0.innerHTML = menuItem['description'];
          td1.innerHTML = menuItem['price'].toLocaleString("en-US", {style:"currency", currency:"USD"});
          td2.innerHTML = 'Qty:<input type="number" name="quantity" class="menuQty" min="1" max="99" step="1" value="1" />';
          if(loggedIn){
            td3.innerHTML = '<a href="#" id="addToCartButton">add to cart</a>';
          } else {
            td3.innerHTML = 'login to order';
          }
        }
      }
      if(itemCounter == 0){
        // Show 'you have no checks' message
        document.getElementById("noItemsMessage").style.display = 'table-row';
      }
      if(loggedIn){
        app.bindAddToCartButtons();
      }
    } else {
      // If the request comes back as something other than 200, log the user out (on the assumption that the api is temporarily down or the users token is bad)
      app.logUserOut();
    }
  });
};

// Load the order history page specifically
app.loadOrderHistoryPage = function(){
  // Get the phone number from the current token, or log the user out if none is there
  var phone = typeof(app.config.sessionToken.phone) == 'string' ? app.config.sessionToken.phone : false;
  if(phone){
    // Fetch the user data
    var queryStringObject = {
      'phone' : phone
    };
    app.client.request(undefined,'api/users','GET',queryStringObject,undefined,function(statusCode,responsePayload){
      if(statusCode == 200){

        // Determine how many checks the user has
        var user = typeof(responsePayload) == 'object' ? responsePayload : {};
        var orders = [];
        if(user.hasOwnProperty('orders')){
          orders = user['orders'];
        }
        if(orders.length > 0){
          orders.sort(function(a,b){return(a-b)});
          for(var i = 0; i < orders.length; i++){
          // get order information from order file
            var orderQueryStringObject = {
              'orderId' : orders[i]
            };
            app.client.request(undefined,'api/orders','GET',orderQueryStringObject,undefined,function(statusCode,orderData){
              if(statusCode == 200){
                // Create table row for this order
                var table = document.getElementById("orderListTable");
                var tr = table.insertRow(-1);
                tr.classList.add('orderRow');
                var td0 = tr.insertCell(0);
                var td1 = tr.insertCell(1);
                var td2 = tr.insertCell(2);
                var td3 = tr.insertCell(3);
                td0.innerHTML = '<a href="order/detail?orderId='+orderData.orderId+'">'+orderData.orderId+'</a>';
                var dateInMS = (new Date(orderData.orderDate)).getTime();
                var timezoneOffset = (new Date(dateInMS)).getTimezoneOffset();
                var localShortDate = new Date(dateInMS + (timezoneOffset * 60 * 1000)).toLocaleDateString();
                td1.innerHTML = localShortDate;
                td2.innerHTML = orderData.deliveryAddress;
                td3.innerHTML = orderData.totalPrice.toLocaleString("en-US", {style:"currency", currency:"USD"});
              } else {
                var table = document.getElementById("orderListTable");
                var tr = table.insertRow(-1);
                var td0 = tr.insertCell(0);
                td0.setAttribute('colspan', 4);
                td0.innerHTML = "Error retrieving order information";
              }
            });
          }
        } else {
            document.getElementById("noItemsMessage").style.display = 'table-row';
        }
      } else {
          // If the request comes back as something other than 200, log the user out (on the assumption that the api is temporarily down or the users token is bad)
        //app.logUserOut();
      }
    });
  } else {
    //app.logUserOut();
  }
};

// Load the shopping cart page specifically
app.loadCartPage = function(){
  // Get the phone number from the current token, or log the user out if none is there
  var phone = typeof(app.config.sessionToken.phone) == 'string' ? app.config.sessionToken.phone : false;
  if(phone){
    // Fetch the user data
    var queryStringObject = {
      'phone' : phone
    };
    app.client.request(undefined,'api/carts','GET',queryStringObject,undefined,function(statusCode,responsePayload){

      if(statusCode == 200){
        var cart = typeof(responsePayload) == 'object' ? responsePayload : {};
        var cartItems = [];
        if(cart.hasOwnProperty('items')){
          cartItems = cart['items'];
        };
        if(cartItems.length > 0){
          // Get menu items so cart page can display descriptions
          app.client.request(undefined,'api/menu','GET',undefined,undefined,function(statusCode,menuItemData){
            if(statusCode == 200 && menuItemData){
              var countOfItems = cartItems.length;
              var count = 0;
              cartItems.forEach(function(item){
                count++;
                //Create table row for each cart item
                var table = document.getElementById("cartTable");
                var tr = table.insertRow(-1);
                tr.classList.add('cartRow');
                var td0 = tr.insertCell(0);
                td0.classList.add('menuDescription');
                var td1 = tr.insertCell(1);
                var td2 = tr.insertCell(2);
                var td3 = tr.insertCell(3);
                var td4 = tr.insertCell(4);
                td2.setAttribute('itemId', item['id']);
                td2.setAttribute('phone', phone);
                td4.setAttribute('itemId', item['id']);
                td4.setAttribute('phone', phone);
                td0.innerHTML = menuItemData[item['menuItemId']]['description'];
                td1.innerHTML = item['unitPrice'].toLocaleString("en-US", {style:"currency", currency:"USD"});
                td2.innerHTML = 'Qty:<input type="number" name="quantity" class="menuQty" min="1" max="99" step="1" value="'+item['quantity']+'" />';
                var subTotal = item['unitPrice'] * item['quantity'];
                td3.innerHTML = subTotal.toLocaleString("en-US", {style:"currency", currency:"USD"});
                td4.innerHTML = '<a href="#" id="removeFromCartButton">remove</a>';
                if(count == countOfItems){
                  var tr = table.insertRow(-1);
                  tr.classList.add('cartTotalRow');
                  var td0 = tr.insertCell(0);
                  td0.classList.add('menuDescription');
                  var td1 = tr.insertCell(1);
                  td1.setAttribute("colspan", 2);
                  td1.setAttribute("style" , "text-align:right;");
                  var td2 = tr.insertCell(2);
                  td0.innerHTML = '&nbsp;';
                  td1.innerHTML = 'Total Price';
                  td2.innerHTML = cart['totalPrice'].toLocaleString("en-US", {style:"currency", currency:"USD"});
                  app.bindUpdateCartButtons();
                  app.bindRemoveFromCartButtons();
                }
              });
              document.getElementById("checkoutButton").setAttribute('href', 'order/create');
            } else {
              // If the request comes back as something other than 200, log the user out (on the assumption that the api is temporarily down)
              // app.logUserOut();
              console.log('something is wrong');
            }
          });
        } else {
          document.getElementById("noItemsMessage").style.display = 'table-row';
        }
      } else {
        // If the request comes back as something other than 200, log the user out (on the assumption that the api is temporarily down or the users token is bad)
        app.logUserOut();
      }
    });
  } else {
    app.logUserOut();
  }
};

// Load the order create page specifically
app.loadOrderCreatePage = function(){
  // Get the phone number from the current token, or log the user out if none is there
  var phone = typeof(app.config.sessionToken.phone) == 'string' ? app.config.sessionToken.phone : false;
  if(phone){
    var queryStringObject = {
      'phone' : phone
    };
    // Get the total price from the cart
    app.client.request(undefined,'api/carts','GET',queryStringObject,undefined,function(statusCode,cartData){
      if(statusCode == 200){
        var totalPrice = cartData.totalPrice;

        // Fetch the user data
        app.client.request(undefined,'api/users','GET',queryStringObject,undefined,function(statusCode,responsePayload){
          if(statusCode == 200){
            // Put the data into the forms as values where needed
            document.querySelector("#orderPrice").innerHTML = totalPrice.toLocaleString("en-US", {style:"currency", currency:"USD"});
            document.querySelector(".displayPhoneInput").value = app._formatPhoneNumber(responsePayload.phone);
            document.querySelector(".emailInput").value = responsePayload.email;

            // Put the hidden phone field into both forms
            var hiddenPhoneInput = document.querySelector("input.hiddenPhoneNumberInput");
            hiddenPhoneInput.value = responsePayload.phone;
          } else {
            // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
            app.logUserOut();
          }
        });
        app.bindDateTimeControls();
        app.setDateControls();
      }
    });
  } else {
    app.logUserOut();
  }
};

// Load the order created (thank you) page specifically
app.loadOrderCreatedPage = function(){
  // Bind the order detail button's click event
  document.getElementById("orderDetailButton").addEventListener('click', function(e){
    e.preventDefault();
    var orderId = e.currentTarget.getAttribute("orderId")
    window.location = "order/detail?orderId="+orderId;
  });
};

app.loadOrderDetailPage = function(){
  // Get the phone number from the current token, or log the user out if none is there
  var phone = typeof(app.config.sessionToken.phone) == 'string' ? app.config.sessionToken.phone : false;
  var orderId = document.querySelector(".orderHeader").getAttribute("dataOrderNumber");
  if(phone && orderId){
    var queryStringObject = {
      'orderId' : orderId
    };
    // Get the total price from the cart
    app.client.request(undefined,'api/orders','GET',queryStringObject,undefined,function(statusCode,orderData){
      if(statusCode == 200){
        // Check if order belongs to the logged in user. If not, log the user out.
        if(orderData.phone == phone){
          // populate fields in template
          document.getElementById("orderNumberDisplay").innerHTML = orderId;
          document.getElementById("orderNameDisplay").innerHTML = orderData.userName;
          var dateInMS = (new Date(orderData.orderDate)).getTime();
          var timezoneOffset = (new Date(dateInMS)).getTimezoneOffset();
          var localShortDate = new Date(dateInMS + (timezoneOffset * 60 * 1000)).toLocaleDateString();
          document.getElementById("orderDateDisplay").innerHTML = localShortDate;
          document.getElementById("orderAddressDisplay").innerHTML = orderData.deliveryAddress;
          document.getElementById("orderDeliveryDateDisplay").innerHTML = orderData.deliveryDate;
          // Populate order item table
          var orderItems = [];
          if(orderData.hasOwnProperty('items')){
            orderItems = orderData['items'];
          };
          if(orderItems.length > 0){
            // Get menu items so cart page can display descriptions
            app.client.request(undefined,'api/menu','GET',undefined,undefined,function(statusCode,menuItemData){
              if(statusCode == 200 && menuItemData){
                var countOfItems = orderItems.length;
                var count = 0;
                orderItems.forEach(function(item){
                  count++;
                  //Create table row for each cart item
                  var table = document.getElementById("orderItemTable");
                  var tr = table.insertRow(-1);
                  tr.classList.add('orderRow');
                  var td0 = tr.insertCell(0);
                  td0.classList.add('orderItemQty');
                  var td1 = tr.insertCell(1);
                  td1.classList.add('menuDescription');
                  var td2 = tr.insertCell(2);
                  var td3 = tr.insertCell(3);
                  td0.innerHTML = item['quantity'];
                  td1.innerHTML = menuItemData[item['menuItemId']]['description'];
                  td2.innerHTML = item['unitPrice'].toLocaleString("en-US", {style:"currency", currency:"USD"});
                  var subTotal = item['unitPrice'] * item['quantity'];
                  td3.innerHTML = subTotal.toLocaleString("en-US", {style:"currency", currency:"USD"});
                  if(count == countOfItems){
                    var tr = table.insertRow(-1);
                    tr.classList.add('cartTotalRow');
                    var td0 = tr.insertCell(0);
                    td0.classList.add('menuDescription');
                    var td1 = tr.insertCell(1);
                    td1.setAttribute("colspan", 2);
                    td1.setAttribute("style" , "text-align:right;");
                    var td2 = tr.insertCell(2);
                    td0.innerHTML = '&nbsp;';
                    td1.innerHTML = 'Total Price';
                    td2.innerHTML = orderData['totalPrice'].toLocaleString("en-US", {style:"currency", currency:"USD"});
                  }
                });
              } else {
                // If the request comes back as something other than 200, log the user out (on the assumption that the api is temporarily down)
                // app.logUserOut();
                console.log('something is wrong');
              }
            });
          } else {
            document.getElementById("noItemsMessage").style.display = 'table-row';
          }
        } else {
          // If the request comes back as something other than 200, log the user out (on the assumption that the api is temporarily down or the users token is bad)
          app.logUserOut();
        }
      } else {
        app.logUserOut();
      }
    });
  } else {
    app.logUserOut();
  }
};

// format the 10 digit phone number for display as (000) 111-2222
app._formatPhoneNumber = function(phoneNumber){
  if(phoneNumber.length == 10){
    var match = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    } else {
      return phoneNumber;
    }
  } else {
    return phoneNumber;
  }
};

// set the date field to today's date
app.setDateControls = function() {
  // initialize date control
  var dateInput = document.getElementById("dateInput");

  var defaultDate = new Date(Date.now() + 60 * 60 * 1000);
  var dd = defaultDate.getDate();
  var mm = defaultDate.getMonth()+1; //January is 0!
  var yyyy = defaultDate.getFullYear();
  if(dd < 10){ dd='0'+dd }
  if(mm < 10){ mm='0'+mm }

  var today = yyyy+'-'+mm+'-'+dd;

  dateInput.defaultValue = today;
  // Set the min attribute on the date input
  dateInput.setAttribute("min", today);

  // Set max attribute for the date input
  var leadTime = document.querySelector(".timeWrapper").getAttribute("dateMax");
  maxDate = new Date(Date.now() + 1000 * 60 * 60 * leadTime);
  var mxdd = maxDate.getDate();
  var mxmm = maxDate.getMonth()+1; //January is 0!
  var mxyyyy = maxDate.getFullYear();
  if(mxdd < 10){ mxdd='0'+mxdd }
  if(mxmm < 10){ mxmm='0'+mxmm }

  var maxDateString = mxyyyy+'-'+mxmm+'-'+mxdd;
  dateInput.setAttribute("max", maxDateString);

  // get the various date values and initialize the date control values with defaults
  var hours = defaultDate.getHours();
  var minutes = defaultDate.getMinutes();
  var am_pm = hours >= 12 ? 1 : 0;
  hours = hours > 12 ? hours - 12 : hours;
  if(hours == 0){ hours = 12;}
  if(hours < 10){hours = "0"+hours;}
  document.getElementById("hourControl").selectedIndex = hours - 1;
  document.getElementById("minuteControl").selectedIndex = Math.floor(minutes/5);
  document.getElementById("am_pmControl").selectedIndex = am_pm;
  var hiddenDateInput = document.querySelector("input.hiddenDateInput");
  hiddenDateInput.value = new Date(defaultDate).toISOString();
}

// Init (bootstrapping)
app.init = function(){

  // Bind all form submissions
  app.bindForms();

  // Bind logout buttons
  app.bindLogoutButton();

  // Get the token from localstorage
  app.getSessionToken();

  // Renew token
  app.tokenRenewalLoop();

  // Load data on page
  app.loadDataOnPage();

};

// Call the init processes after the window loads
window.onload = function(){
  app.init();
};
