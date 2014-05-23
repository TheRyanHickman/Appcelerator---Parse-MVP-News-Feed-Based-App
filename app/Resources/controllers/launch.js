/* ******************************************
 * 
 *  Launch
 * 
 */

var launch = function(reset, APP_ID, REST_KEY, FB_APPID) {
	
		
	//reset boolen is used to logout app
	if (reset == 'logout') fb.logout();	
	
	
	var win = Titanium.UI.createWindow({  
	    barColor: '#000',
	    tintColor:'black',
	    backgroundColor:'#000',
	    backgroundImage: '', //set image for background action bar on android
	    includeOpaqueBars: false,
		translucent: true,
		navBarHidden : true,
		orientationModes: [Ti.UI.PORTRAIT] //force portrait mode 
	});
	
	//Handle Routing for user
	win.addEventListener('focus', function(e){
		
		if (typeof Parse.User.current().id != 'undefined'){
		 
		 	tracker.trackScreen('login');
			Ti.API.info("Re-Launched App, Session Still Alive");
		 	
		 	//Route user to feed
		 	feed();
		 	
		
		} else {
			tracker.trackScreen('login');
			Ti.API.info("Launched Login Screen");
		}
		
	});
	
	
	//Activity Indiactor to manage user expectations associated with network activity
	var activityIndicator = Ti.UI.createActivityIndicator({
		  color: '#89D700',
		  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
		  message: '',
		  style:((Ti.Platform.osname == 'android') ? Ti.UI.ActivityIndicatorStyle.DARK : Ti.UI.iPhone.ActivityIndicatorStyle.LIGHT),
		  bottom:15,
		  height:Ti.UI.SIZE,
		  width:Ti.UI.SIZE,
		  zIndex: 50
		});
		
		
	win.add(activityIndicator);

	
	


	var signup = Ti.UI.createImageView({ preventDefaultImage: true,
		image: '/img/signup.png',
		left: '5%',
		top: ((Ti.Platform.osname === 'android') ? '1400px' : '1000px'),
		width: '90%',
		opacity: 0,
	});
							

	var hero = Ti.UI.createImageView({ 
		preventDefaultImage: true,
		image: '/img/hero.png',
		top: '835px',
		width:'75%',
		opacity: 1
	});


	
	signup.addEventListener('click', function() {
		
		tracker.trackScreen('Facebook');
		
		fb.authorize(); 
		activityIndicator.show();
	
	});


	var fb = require('facebook');
		fb.appid = FB_APPID;
		fb.permissions = ['read_stream'];  
		fb.forceDialogAuth = true;
  	
	

		fb.addEventListener('login', function(e) {
			
			if (e.success) {
		      
		        // setting auth data retrieved from Ti.Facebook login
				authData = {
				    "facebook" : {
				        "id" : ((Ti.Platform.osname == 'android') ? e.uid :  Ti.Facebook.uid) ,
				         "access_token" :  ((Ti.Platform.osname == 'android') ? fb.getAccessToken() :  Ti.Facebook.accessToken),
				         "expiration_date" : '2014-03-15T22:59:59.803Z', // "format: yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
				    }
				};
				 
				
				 parseLoginCheck(APP_ID, REST_KEY, authData.facebook.id, authData.facebook.access_token, 
				 	function(e){
				 		//Success User Exsits > Handle Traditional Login
				 		Parse.User.logIn(authData.facebook.id,  authData.facebook.access_token, {
					        success : function(user) {
					            // Launch Feed after successful login.
					           feed();
					        },
					        error : function(user, error) {
					            // Show the error message somewhere and let the user try again.
					            Ti.API.info("Error: " + error.code + " " + error.message);
					           
					        }
					   }); //TRADITIONAL LOGIN  
				 		
				 		
				 	},
				 	function(e){
				 		//Error - This User Does Not Exsist > Create New Account Record on Parse
				 		Ti.API.info("Error: " + e);
				 		
				 		var user = new Parse.User();
							user.set("authData", authData);
							user.set("password",  authData.facebook.access_token);
							user.set('username', authData.facebook.id);
							user.set("email",'');
							
							user.signUp(null, {
								   	success: function(pusr) {
								   		
								   		Parse.User.logIn(authData.facebook.id,  authData.facebook.access_token, {
					  						success: function(user) {
					  					
					  							if (Ti.Platform.osname != 'android') registerPushServicesIOS(APP_ID, REST_KEY);
					   							
					   							feed();
					  						}
					  					});
										   		
								   		
								   	}, 
								   	error: function(psur, e){
								   		Ti.API.info("Error: " + e);
								   	}
							}); 
				 		
				 		
				 	}
				 );
				
				
				
		    } else if (e.error) {
		        alert('Debug:'+e.error);
		        activityIndicator.hide();
		    } else if (e.cancelled) {
		        alert("Debug: User Canceled");
		        activityIndicator.hide();
		    } else {
		    	
		    	
		    }
		});



 	win.add(hero);
 	win.add(signup);
	win.open();
	
	
	
	
	
};


module.exports = launch;