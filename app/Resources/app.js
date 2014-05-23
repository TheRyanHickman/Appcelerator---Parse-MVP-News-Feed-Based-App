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
		

/* ******************************************
 * 
 *  Setup Controllers
 * 
 */	

		var launch = require("controllers/launch");
	
		
/* ******************************************
 * 
 *  Launch App
 *
 *  
 */


		launch();

		
		
