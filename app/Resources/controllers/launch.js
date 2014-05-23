/* ******************************************
 * 
 *  Launch
 * 
 */

var launch = function(reset) {
	
		
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


   
  	
	

		fb.addEventListener('login', function(e) {
			
		
			
		    if (e.success) {
		       
		       
		      
		        // setting auth data retrieved from Ti.Facebook login
				authData = {
				    "facebook" : {
				        "id" : ((Ti.Platform.osname == 'android') ? e.uid :  Ti.Facebook.uid) , //fb.uid, //Ti.Facebook.uid,
				         "access_token" :  ((Ti.Platform.osname == 'android') ? fb.getAccessToken() :  Ti.Facebook.accessToken), // fb.accessToken, //Ti.Facebook.accessToken,
				         "expiration_date" : '2014-03-15T22:59:59.803Z', // "format: yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
				    }
				};
				 
				
				 parseLoginCheck(authData.facebook.id, authData.facebook.access_token, 
				 	function(e){
				 		//Success User Exsits > Perform Traditional Login
				 		Parse.User.logIn(authData.facebook.id,  authData.facebook.access_token, {
					        success : function(user) {
					            // Do stuff after successful login.
					           
					            Ti.API.info("yay! logIn worked " + JSON.stringify(user));
					            console.log(Parse.User.current());
					           
					             init();
					        },
					        error : function(user, error) {
					            // Show the error message somewhere and let the user try again.
					             console.log('not in');
					            Ti.API.info("Error: " + error.code + " " + error.message);
					           
					        }
					   }); //TRADITIONAL LOGIN  
				 		
				 		
				 	},
				 	function(e){
				 		//Error Users Does Not Exsist > Create New Account Record
				 		console.log('error');
				 		console.log(e);
				 		
				 		var user = new Parse.User();
							user.set("authData", authData);
							user.set("password",  authData.facebook.access_token);
							user.set('username', authData.facebook.id);
							user.set("email",'');
							
							
							
							
							user.set("followers",0);
							user.set("following", 0);
							
							
							
							console.log('creating user...');
							
							user.signUp(null, {
								   	success: function(pusr) {
								   		
								   		alert('created user...');
								   		
								   		Parse.User.logIn(authData.facebook.id,  authData.facebook.access_token, {
					  						success: function(user) {
					  					
					  							console.log('loggin in user...');
					  							
					  							if (Ti.Platform.osname != 'android') registerPushServicesIOS();
					   						
					   							
					  							feed();
					  						}
					  					});
										   		
								   		
								   	}, 
								   	error: function(psur, error){
								   		console.log(error);
								   	}
							}); 
				 		
				 		
				 	}
				 );
				
				
				
				
				
				
		 	
				return; 
				 
				alert('legacy login'); 
				 
				Parse.User.logIn(e.data.username, ((Ti.Platform.osname == 'android') ? e.uid :  Ti.Facebook.uid), {
					  success: function(user) {
					    console.log('success logging into account');
					    
					   
					    
					     if (Ti.Platform.osname != 'android') registerPushServicesIOS();
					   
					    
					    feed();
					  
					       tracker.trackEvent({ category: "Access", action: "Sign In", label: "Facebook", value: 1 });
					    
					    
					  },
					  error: function(user, error) {
					    // The login failed. Check error to see why.
					   console.log(error);
					   	
					   	 
					   	  
					   		var user = new Parse.User();
							user.set("authData", authData);
							user.set("password",  ((Ti.Platform.osname == 'android') ? e.uid :  Ti.Facebook.uid));
							user.set('username', e.data.username );
							user.set("email", e.data.email);
							
							user.set("followers",0);
							user.set("following", 0);
							
							
							user.save(null, {
								   	success: function(pusr) {
								   		console.log('data returned success reponse');
								   		
								   		Parse.User.logIn(e.data.username, Ti.Facebook.uid, {
					  						success: function(user) {
					  							
					  							if (Ti.Platform.osname != 'android') registerPushServicesIOS();
					   						
					  							feed();
					  						}
					  					});
										   		
								   		
								   	}, 
								   	error: function(psur, error){
								   		console.log(error);
								   	}
							}); 
			            	
					   		
						} //create new account on error
					
					}); //parse login 
				 
				 
		      
		       // init(); 
		    } else if (e.error) {
		        alert('Debug:'+e.error);
		        activityIndicator.hide();
		    } else if (e.cancelled) {
		        alert("Debug: User Canceled");
		        activityIndicator.hide();
		    } else {
		    	
		    	alert(fb);
		    }
		});



 	win.add(hero);
 	win.add(signup);
	win.open();
	
	
	
	
	
};


module.exports = launch;