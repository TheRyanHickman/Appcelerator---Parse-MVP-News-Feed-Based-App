var registerPushServicesIOS = function(APP_ID, REST_KEY) {
	

/* ******************************************
 * 
 *  Setup Push Notification Services
 * 
 */
	
		if (Ti.Platform.osname != 'android')
		{
			
			Ti.Network.registerForPushNotifications({
			    types:[
			        Titanium.Network.NOTIFICATION_TYPE_BADGE,
			        Titanium.Network.NOTIFICATION_TYPE_ALERT,
			        Titanium.Network.NOTIFICATION_TYPE_SOUND
			    ],
			    success: successCallback,
			    error: errorCallback,
			    callback: messageCallback
			});
			
		}
		
		function successCallback(e) {
		 //alert('success apn');
		 
		 var request = Ti.Network.createHTTPClient();

		 request.onerror = function(e)
                {
                        Ti.UI.createAlertDialog({title:'Error', message:e.error}).show();
                        Ti.API.info('IN ERROR ' + e.error);
                };

		 request.onload = function(e){	
			    
		 		//alert('returned APN'+e);
			
			};
	
		  var params = {
		    'deviceType': 'ios',
		    'deviceToken': e.deviceToken,
		    'channels': [''],
		    'user': {
		          "__type": "Pointer",
		          "className": "_User",
		          "objectId": Parse.User.current().id
		        }
		    
		  };
		
		 
		
		  // Register device token with Parse
		  //alert('sending apn to parse');
		  
		  request.open('POST', 'https://api.parse.com/1/installations', true);
		  request.setRequestHeader('X-Parse-Application-Id', APP_ID);
		  request.setRequestHeader('X-Parse-REST-API-Key', REST_KEY);
		  request.setRequestHeader('Content-Type', 'application/json');
		  
		  request.send(JSON.stringify(params));
		}
		
		// error callBack
		function errorCallback(e) {
			//alert (e.error);
		  Ti.API.info("Error during registration: " + e.error);
		}
		
		// message callBack
		function messageCallback(e) {
		  var message;
		  if (e['aps'] != undefined) {
		    if (e['aps']['alert'] != undefined) {
		      if (e['aps']['alert']['body'] != undefined) {
		        message = e['aps']['alert']['body'];
		      } else {
		        message = e['aps']['alert'];
		      }
		    } else {
		      message = 'No Alert content';
		    }
		  } else {
		    message = 'No APS content';
		  }
		  //alert(message);
		}


};	

module.exports = registerPushServicesIOS;