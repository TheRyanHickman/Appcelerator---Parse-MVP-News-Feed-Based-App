/* ******************************************
 * 
 *  Feed
 * 
 */


var feed = function() {
	

	tracker.trackScreen('Main Screen Feed');
			
				


	if (Titanium.Platform.osname == 'android')
	{
		var winx = Titanium.UI.createView({  
		    title:'Feed',
		    orientationModes: [Ti.UI.PORTRAIT],
		    //tintColor:'#1a1a1a',
		    //barColor: '#1a1a1a',
		    backgroundColor:'#fff',
		    //includeOpaqueBars: false,
			//translucent: false,
			//statusBarStyle:Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK
		});
		
		
		
		
		
		
	
	} else {
	
		var winx = Titanium.UI.createWindow({  
		    title:'Feed',
		    //tintColor:'#1a1a1a',
		    //barColor: '#1a1a1a',
		    backgroundColor:'#fff',
		    //includeOpaqueBars: false,
			//translucent: false,
			//statusBarStyle:Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK
		});
		
		winx.addEventListener('focus', function(e){
			statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
		});
		
	}


	
	
	var activityIndicator = Ti.UI.createActivityIndicator({
	  color: '#34313e',
	  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
	  message: '',
	  style:((Ti.Platform.osname == 'android') ? Ti.UI.ActivityIndicatorStyle.DARK : Ti.UI.iPhone.ActivityIndicatorStyle.LIGHT),
	  top:15,
	  left:15,
	  height:Ti.UI.SIZE,
	  width:Ti.UI.SIZE
	});
	
	
	
	var titleLabel = Titanium.UI.createImageView({
				    width:'70%',
				    top:32,
				    height: 20,
				    left: '5%',
				    image: 'img/peakpmenuhead.png',
				   
				});
	
	
	
	
	var menuButton = Titanium.UI.createImageView({
				    image: 'img/traymenu.png',
				  	width: 25,
				  	height: 20
				}); 
				 
	
	
	
	
	
				 
	menuButton.addEventListener('click', function(e){
		drawer.toggleRightWindow();	
	});		
		
		
	
	if (Titanium.Platform.osname != 'android')
	{
		winx.setTitleControl(titleLabel);
		winx.setRightNavButton(menuButton);
		winx.setLeftNavButton(activityIndicator);
		activityIndicator.show();
	}
	
	
	
	
	var feedView = Ti.UI.createScrollView({
		contentWidth: 'auto',
	  contentHeight: 'auto',
	  top: 0,
	  showVerticalScrollIndicator: true,
	  showHorizontalScrollIndicator: true,
	  height: '100%',
	  width: '100%',
	  layout: 'vertical',
	  backgroundColor: '#fff'
	});

	winx.add(feedView);
	
	
	
	
	if (Ti.Platform.osname != 'android')
				{
					var navWin = Ti.UI.iOS.createNavigationWindow({
						window:winx,
						color: '#fff'
						
					});
				
					
				} 
	
	










/* ******************************************
 * 
 *  Create Off Canvas Menu
 * 
 */


var sliderMenu = function() {

	
	var traywin = Ti.UI.createView({
		backgroundColor: '#34313e',
		width: Ti.UI.FILL,
		height: Ti.UI.FILL
	});
	
	
	
	// create the label
	var profile_Name = Titanium.UI.createLabel({
	    color:'#34313e',
	    height:28,
	    width:'75%',
	    top:5,
	    left: 10,
	    text:Parse.User.current().getUsername(),
	    textAlign:'left',
	    font:{fontSize:22,fontFamily: 'OpenSans-Light'},
	    id:Parse.User.current().id
	});
	
	
	var profile_pic = Titanium.UI.createImageView({
	  	height:30,
	    width: 30,
	    top:5,
	    borderRadius: ((Ti.Platform.osname == 'android') ? 50 : 15),
	    left: 10,
	    image: Parse.User.current().get('profilePicUrl'),
	    id:Parse.User.current().id
	});
	
	if (Ti.Platform.osname == 'android') getMyImage(profile_pic, Parse.User.current().get('profilePicUrl'));
	
	
	console.log(Parse.User.current().get('profilePicUrl'));
	
	var profile_Card = Ti.UI.createView({
		layout: 'horizontal',
		width: '100%',
		height: Ti.UI.SIZE,
		top: 25,
		
	});
	
	profile_Card.addEventListener('click', function(e){
		showProfile(Parse.User.current().id);
	});
	
	profile_Card.add(profile_pic);
	profile_Card.add(profile_Name);
	
				
	traywin.add(profile_Card);			
	
	// Menu Titles
				var menuTitles = [
				   
				    {title: 'Home', color: '#fff', action:'home', img: '/img/home.png' },
				    {title: 'Settings', color: '#fff', action:'settings', img: '/img/settings.png' },
				   
				];
	
	
	
	tableData = [];
	
	menuTitles.forEach(function(x){
		
		var menuName = Titanium.UI.createLabel({
		    color:x.color,
		    height:26,
		    width:'75%',
		    top:15,
		    left: 55,
		    text:x.title,
		    action: x.action,
		    textAlign:'left',
		    font:{fontSize:22,fontFamily: 'OpenSans-Light'}
		});
		
		var img = Ti.UI.createImageView({ preventDefaultImage: true,
			image: x.img,
			action: x.action,
			width: 25,
			height: 25,
			left: 20
		});
		
		
		var item_row = Ti.UI.createTableViewRow({
			touchEnabled: false,
	    	height: 'auto',
	    	height: 50,
	    	action: x.action,
	    	backgroundSelectedColor: '#141414'
		});
				
		item_row.add(img);
		item_row.add(menuName);		
		
		
			  					
		tableData.push(item_row);
		
	});
	
	
	
	
	
	
	
	
	var tableView = Ti.UI.createTableView({
		data:tableData,
		top: 75,
		separatorColor: '#121212',
		backgroundColor: '#34313e', //#121212'
		zIndex: 999
	});
	
	tableView.addEventListener('click', function(e){
		
				
				  drawer.toggleRightWindow();
				
		
				  switch(e.rowData.action){
				  	
				  	case 'home':
				  		feed();
				  	break;
				  	
				  	case 'settings':
				  		settingsPanel();
				  	break;
				  	
				  	
				  
				  }
				    
				});
	
	traywin.add(tableView);
	return traywin;
};












if (Ti.Platform.osname != 'android')
{

		var drawer = NappDrawerModule.createDrawer({
			//leftWindow: leftMenuView,
			centerWindow: ((Titanium.Platform.osname == 'android') ? winx : navWin),
			rightWindow:  sliderMenu(navWin),
			closeDrawerGestureMode: NappDrawerModule.CLOSE_MODE_ALL,
			openDrawerGestureMode: NappDrawerModule.OPEN_MODE_ALL,
			showShadow: false, //no shadow in iOS7
			//leftDrawerWidth: 200,
			rightDrawerWidth: 200,
			statusBarStyle: NappDrawerModule.STATUSBAR_WHITE,  // remember to set UIViewControllerBasedStatusBarAppearance to false in tiapp.xml
			orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
		});

} else {

		var drawer = NappDrawerModule.createDrawer({
			fullscreen:false, 
			//leftWindow: leftMenuView,
			centerWindow: ((Titanium.Platform.osname == 'android') ? winx : navWin),
			rightWindow:  sliderMenu(winx),
			fading: 0.2, // 0-1
			parallaxAmount: 0.2, //0-1
			shadowWidth:"40dp", 
			//leftDrawerWidth: "200dp",
			rightDrawerWidth: 200,
			animationMode: NappDrawerModule.ANIMATION_NONE,
			closeDrawerGestureMode: NappDrawerModule.CLOSE_MODE_MARGIN,
			openDrawerGestureMode: NappDrawerModule.OPEN_MODE_ALL,
			orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
		});

}

drawer.open();




//Support for action bar on android
drawer.addEventListener('open', onNavDrawerWinOpen);
function onNavDrawerWinOpen(evt) {
    this.removeEventListener('open', onNavDrawerWinOpen);

    if(this.getActivity()) {
        
        var actionBar = this.getActivity().getActionBar();

        if (actionBar) {
            
            actionBar.icon = "/img/transparent_icon.png";
			actionBar.title = "Feed";
            
            actionBar.setDisplayHomeAsUp(false);

        } //actionbar
        
        var act = this.getActivity();
        act.onCreateOptionsMenu = function(e) {
		        var menu = e.menu;
		 
		 
		        var mainMenuItem = menu.add({
		            title : "Menu",
		            icon : "/img/menuiconHiRes.png",
		            showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
		        });
		        mainMenuItem.addEventListener("click", function(e) {
		           drawer.toggleRightWindow();	
		        });
		 
		       
		    };
        
    }    
}
	
	
getStream(feedView);
	
	
}; //<!--//feed-->	
	
	
module.exports = feed;