/* ******************************************
 * 
 *  Ajax Poll Stream
 * 
 */


var getStream = function(mainView) {

			
			var url = Titanium.App.Properties.getString("apiEndpoint") +Parse.User.current().id; 
			
				var client = Ti.Network.createHTTPClient({
			     
			     onload : function(e) {
			      
			        tracker.trackEvent({ category: "Stream", action: "Update", label: "Success", value: 1 });
				   	var data = eval('('+this.responseText+')');
			        Titanium.App.Properties.setObject("cached", data);
			      	
			      	
			      	
			      	 tableData = [];
			         
			         for(i in data) {
		  					
		  					
		  					
		  					
		  					
		  					var whoUname = Ti.UI.createLabel({
								text: data[i].user.uname,
								color: '#fff',
								left: 15,
								top: ((Ti.Platform.osname == 'android') ? 15 : 10),
								width: '55%',
								id: data[i].user.objectId,
								font: { fontFamily: 'OpenSans-light', fontSize: ((Ti.Platform.osname == 'android') ? 15 : 15), fontWeight: 'OpenSans-Light' },
							});
					
							
							
							
							var whoPic = Ti.UI.createImageView({ preventDefaultImage: true,
								//image: data[i].user.avi,
								
								height:  ((Ti.Platform.osname == 'android') ? 30 : '60px'),
								left:  ((Ti.Platform.osname == 'android') ? '20px' : '10px'),
								top:  ((Ti.Platform.osname == 'android') ? '40px' : '12px'),
								width:  ((Ti.Platform.osname == 'android') ? 30 : '60px'),
								borderRadius:  ((Ti.Platform.osname == 'android') ? 50 : '15px'),
								opacity: 1,
								id:data[i].user.objectId,
								
							});
							
							
							if (typeof  data[i].user.avi != 'undefined') cachedImageView('profilePics', data[i].user.avi, whoPic);

							
						
							
							var userBlok = Ti.UI.createView({
								layout: 'horizontal',
								left: '0px',
								height: ((Ti.Platform.osname == 'android') ? '160px' : '100px'),
								width: '100%',
								borderColor: 'transparent',
								backgroundColor: '#96000000',
								id: data[i].user.objectId
							});
							
							
							
							
							userBlok.addEventListener('click', function(e){
								console.log(e.source.id);
								//showProfile(userBlok.id);
								
								showProfile(e.source.id);
							});
			
		
		
		
							var whenText = Ti.UI.createLabel({
								text: data[i].createdAt,
								color: '#3e3e3e',
								height: '80px',
								right: 0,
								top: ((Ti.Platform.osname == 'android') ? 12 : 0),
								width:  ((Ti.Platform.osname == 'android') ? '250px' : '150px'),
								textAlign: 'right',
								font: { fontFamily: 'OpenSans-light', fontSize: ((Ti.Platform.osname == 'android') ? 12 : 12), fontWeight: 'bold' },
								
							});
					
		
							
							
							userBlok.add(whoPic);
							userBlok.add(whoUname);
							userBlok.add(whenText);
		  					
		  					
		  					
							var item = Ti.UI.createView({
								layout: 'vertical',
								width: '100%',
								top: 0,
								height: Titanium.UI.SIZE,
								borderRadius: '3px',
								opacity: 1,
								index: i,
							});
							
							
							var itemBox = Ti.UI.createView({
								width: '100%',
								backgroundColor: '#1a1a1a',//'#f2f2f2',
								height: Ti.UI.SIZE,
								layout: 'vertical'
							});
							
							
							
							
							if (typeof data[i].image != 'undefined'){
							
									var itemImg = Ti.UI.createImageView({ preventDefaultImage: true,
										//image: data[i].image.url,
										height:  ((Ti.Platform.osname == 'android') ? '1150px' : '650px'),
										width: '100%',
										right: '0px',
										left: '0px',
										top: '0px',
										opacity: 1
									});
														
										
									if (typeof  data[i].image.url != 'undefined')  cachedImageView('feedPics', data[i].image.url, itemImg);	
											
															
									itemBox.add(itemImg);
							}
							
							
							
							
														
							var itemRules = Ti.UI.createLabel({
								text: data[i].message,//data[i].details,
								color: '#ffffff',
								width: '89%',
								top: ((Ti.Platform.osname == 'android') ? 10 : 0),
							
								height: Ti.UI.SIZE,
								textAlign: 'left',
								font: { fontFamily: 'OpenSans-light', fontSize: ((Ti.Platform.osname == 'android') ? 18 : 18) }
							});
							
							
							
							
							var deets = Ti.UI.createView({
								
								layout: 'horizontal',
								height:'90px',
								top: 10,
								width: '90%',
								textAlign: 'left',
								
							});
							
							
							var felxSpace = Ti.UI.createView({
								height: '80px',
								width: '100%'
							});
							
							var likes = Ti.UI.createLabel({
								text: data[i].likesCount ,//data[i].details,
								color: '#818181',
								width: '25%',
								left: 5,
								top: 10	,
								font: { fontFamily: 'OpenSans-light', fontSize: ((Ti.Platform.osname == 'android') ? 18 : 18) }
							});
						
							
							var likebtn = Ti.UI.createImageView({ preventDefaultImage: true,
							            width: 30,
							            top: 0,
							            left: 0,
							            image: ((data[i].likePost == false) ? '/img/like.png' : '/img/like_true.png'),
							            id: data[i].objectId,
							            state: false
							});

							
							
							deets.add(likebtn);
							deets.add(likes);
							
							
							
							
							
							commentbtn.addEventListener('click', function(e) {
			
								//alert('launching comment...' + e.source.id);
								launchComment(e.source.id, e.source.comments); 
								
								
							});
							
							
							

							likebtn.addEventListener('click', function(e) {
			
							
								
								if (e.source.state == true){
									
									var lke = parseInt(e.source.parent.children[1].text);
									lke = lke - 1;
									e.source.parent.children[1].text = lke;
									
									console.log('unlike');
									
								} else {
								
									
								
									e.source.parent.parent.children[0].children[0].animate(fadeIn);
								
									e.source.state = true;
									e.source.image = '/img/like_true.png';
									
									var lke = parseInt(e.source.parent.children[1].text);
									lke = lke + 1;
									e.source.parent.children[1].text = lke;
									
									setTimeout(function(){
										e.source.parent.parent.children[0].children[0].animate(fadeOut);
										},1000);

									
									likePost(e.source.id, function(){
										//alert('liked on server');
										
									});
									
								
								}
								
							});
							
							
							
							
							itemBox.add(deets);
							
							itemBox.add(itemRules);
							
							itemBox.add(felxSpace);
							
							item.add(itemBox);
							
							
							
		  					//mainView.add(item);
		  					var item_headBar = Ti.UI.createTableViewSection({ headerView: userBlok });
							var item_row = Ti.UI.createTableViewRow({
								touchEnabled: false,
    							height: 'auto',
    							selectionStyle: 'none',
    							selectedBackgroundColor:'transparent',
    							borderColor: 'transparent',
    							rowBackgroundColor:'transparent'
							});
							item_row.add(item);
		  					
		  					tableData.push(item_headBar);
		  					tableData.push(item_row);
		  			
		  			
		  			}
		  			
		  			
		  			   mainView.removeAllChildren();
		  			   
		  			   
		  		if (Ti.Platform.osname != 'android')
					{   
		  			   
						var control = Ti.UI.createRefreshControl({
						    tintColor:'#B6F245'
						});
						
				
					
					
						control.addEventListener('refreshstart',function(e){
							
							reloadContents();
							
						    setTimeout(function(){
						        control.endRefreshing();
						    }, 2000);
						});

					}
		  			   
		  			
		  			var feedTable = Ti.UI.createTableView({
								top: 0,
								refreshControl: ((Ti.Platform.osname == 'android') ? null : control),
								backgroundColor: 'black',
								data: tableData,
								borderColor: 'transparent',
							    rowBackgroundColor:'transparent',	
							 });
			         
			        
			       
			       
			        
			      
			       
			       mainView.add(feedTable);
		  		
			      	
			      	
			      	
			      
			     },
			     onerror : function(e) {
			         Ti.API.debug(e.error);
			         tracker.trackEvent({ category: "Stream", action: "Update", label: "Error:"+e.error, value: 1 });
			        
			        var dlg = Titanium.UI.createAlertDialog({
							  title: 'Network Error',
							  message:'Please check your network connection', 
							  buttonNames: ['Ok']
					});	
					dlg.show();
					
			        
			     },
			     cache : true, 
			     timeout : 5000 
			 });

			 client.setRequestHeader("Content-Type", "multipart/form-data");
			 client.open("POST", url);
			
			 client.send({ uid: Parse.User.current().id });
		
		
			
	};
	
	
module.exports = getStream;