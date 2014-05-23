/* ******************************************
 * 
 *  Setup Modules
 * 
 */
		
		//Platform Specific Modules for image manipulation 
		if (Ti.Platform.osname != 'android'){
			var ImageFactory = require('ti.imagefactory');
		} else {
			var ImageFactory = require('ti.imagefactory');
			var ImageFactoryAndroid = require("fh.imagefactory");
		}
		
		//Initalize off canvas menu
		var NappDrawerModule = require('dk.napp.drawer');
		
		//Setup Analytics
		var GA = require('analytics.google');
		var tracker = GA.getTracker("UA-XXXXXXXX-1");
		
	
	
/* ******************************************
 * 
 *  Setup Key Scripts
 * 
 */	
 
 		Ti.include('lib/inc_compression.js');
		Ti.include('lib/cachedImageView.js');
		
		var _ = require('lib/underscore');
		var Parse = require("lib/ti.parse")();
		
		Titanium.App.Properties.setString("apiEndpoint",  "http://appname.parseapp.com/api/stream/");
		
		var Parse_Rest_Key = '';
		var Parse_App_Key = '';
		var FB_APPID = '';
		
/* ******************************************
 * 
 *  Setup Controllers
 * 
 */	

		var launch = require("controllers/launch");
		var registerPushServicesIOS = require("controllers/registerPushServicesIOS");
		var parseLoginCheck = require("controllers/parseLoginCheck");
		var getStream = require("controllers/getStream");
		var feed = require("controllers/feed");
		
/* ******************************************
 * 
 *  Launch App
 *
 *  
 */

	
		launch(Parse_App_Key, Parse_Rest_Key, FB_APPID);

		
		
