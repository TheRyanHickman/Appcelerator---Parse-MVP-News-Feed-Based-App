/* ******************************************
 * 
 *  Ajax Poll Stream
 * 
 */


var getStream = function(mainView, launchCommentWin, launchComment) {

			Ti.API.info("called reload contents...");
			
			
			//refreshbtn.hide();
		  	
		  	//if (Ti.Platform.osname != 'android') activityIndicator.show();
					if (typeof Titanium.App.Properties.getObject("cached") != 'undefined')
					{
						
				        tracker.trackEvent({ category: "Feed", action: "Get Local", label: "Success", value: 1 });
					   	data = Titanium.App.Properties.getObject("cached");
				      	//drawActivityFeed(data, mainView);
			     	}	
		
		
			var url = "http://peakapi.parseapp.com/api/stream/"+Parse.User.current().id; //Titanium.App.Properties.getString("uid");
			
				console.log(url);
			
				var client = Ti.Network.createHTTPClient({
			     // function called when the response data is available
			     
			     onload : function(e) {
			      
			        Ti.API.info("successful http request...");
			      
			      	console.log(this.responseText);
			      
			     	//activityIndicator.hide();
			        tracker.trackEvent({ category: "Feed", action: "Get Remote", label: "Success", value: 1 });
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
								//alert('launch profile'+data[i].user.objectId);
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
							
							
							//itemBox.add(userBlok);
							
							
							
							
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
														
									var loveShow = Ti.UI.createImageView({ preventDefaultImage: true,
										 zIndex: 20,
										 top: 20,
							             image: '/img/love.png',
							             opacity: 0,
							             id: data[i].objectId
									});			
									
									itemImg.add(loveShow);
									
											
															
									itemBox.add(itemImg);
							}
							
							
							console.log('*****New Post*******');
							
					
							
							if (typeof data[i].intakeData != 'undefined')
							{
								
								var metricBlock = Ti.UI.createView({
									width: '95%',
									 zIndex: 99,
									 textAlign: 'right',
									
									 height: 55,
									 top: 260,
									 
									
									 //layout: 'horizontal'
									
								});
								
								itemImg.add(metricBlock);
								
								countballs = 0;
								
								function capitaliseFirstLetter(string)
									{
									    return string.charAt(0).toUpperCase() + string.slice(1);
									}
								
								data[i].intakeData.forEach(function(met){
												
												//console.log( met );
												
												var metric = Ti.UI.createButton({
													backgroundColor: '#B6F245',
													right: 5 + (countballs * 50),
													borderRadius: '20px',
													//title: capitaliseFirstLetter(met),
													name: met,
													opacity: .8,
													top: 5,
													textAlign: 'center',
													selected: false,
													width: '85px',
													height: '85px',
													color: '#1e1e1e',
													bottom: '100px',
													font: { fontFamily: 'OpenSans-Bold', fontSize: ((Ti.Platform.osname == 'android') ? 10 : 10) },
												});
												
												countballs++;
												
												var metricTxt = Ti.UI.createLabel({
													color: '#1e1e1e',
													text: capitaliseFirstLetter(met),
													title: capitaliseFirstLetter(met),
													name: met,
													top: 15,
													width: '100%',
													textAlign: 'center',
													font: { fontFamily: 'OpenSans-Bold', fontSize: ((Ti.Platform.osname == 'android') ? 10 : 10) },
											
												});
												
												metric.add(metricTxt);
												
												
												metricBlock.add(metric);
												
											});
								
								
							}
							
							
							
							//var string = '#hello This is an #example of some text with #hash-tags - http://www.example.com/#anchor but dont want the link';
							//string.replace(/(^|\s)(#[a-z\d-]+)/ig, "$1<span class='hash_tag'>$2</span>");
							//console.log(string);
							
														
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
								//backgroundColor: '#f7f7f7',//'#f7f7f7',
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
						
							var comments = Ti.UI.createLabel({
								text: data[i].commentsCount,//data[i].details,
								color: '#818181',
								width: '18%',
								left: 5,
								textAlign: 'left',
								top: 10	,
								font: { fontFamily: 'OpenSans-light', fontSize: ((Ti.Platform.osname == 'android') ? 18 : 18) }
							});
							
							
							var morelbl = Ti.UI.createLabel({
								text: 'More',
								color: '#818181',
								width: '15%',
								left: 5,
								textAlign: 'left',
								top: 8	,
								font: {
									fontFamily: 'OpenSans-light', 
									fontSize: ((Ti.Platform.osname == 'android') ? 18 : 18) }
							});
							
							
							console.log('Like Post:');
							console.log(data[i].likePost);
							console.log('_________________________');
							
							
							var likebtn = Ti.UI.createImageView({ preventDefaultImage: true,
							            width: 30,
							            top: 0,
							            left: 0,
							            image: ((data[i].likePost == false) ? '/img/like.png' : '/img/like_true.png'),
							            id: data[i].objectId,
							            state: false
							});

							
							var commentbtn = Ti.UI.createImageView({ preventDefaultImage: true,
										 width: 30,
										 top: 0,
							             left: 0,
							             image: '/img/comment.png',
							             id: data[i].objectId
							});
							
							
							
							
							
							
							
							
							
							var morebtn = Ti.UI.createImageView({ preventDefaultImage: true,
										 width: 30,
										 top: 0,
							             left: 0,
							             image: '/img/more.png',
							             id: data[i].objectId
							});
							
							
							
							function moredialog()
							{
								 var dialog = Ti.UI.createOptionDialog({
								 	  cancel: 1,
									  options: ['Report Post', "Cancel"],
									  selectedIndex: 2,
									  destructive: 0,
								});
								
								 dialog.addEventListener("click", function(x){
								 			if (x.index == 0)
								 			{
								 				
								 				
								 				var Report = Parse.Object.extend("Reports");
												var report = new Report();
												
												report.set('user', Parse.User.current());
												report.set('reportingPost', data[i].objectId);
												
										       				report.save(null, {
																success: function(activtyupdate) {
																
																console.log('data returned success reponse');
																				   		
																				
																}, 
																error: function(e, error){
																			alert(error);
																}
															}); 	
										       				
								 				
								 			}
									
								});
						
							     dialog.show();
							}
							
							morelbl.addEventListener("click", function(e){
							 moredialog();
							});
							
							morebtn.addEventListener("click", function(e){
							 moredialog();
							});
							
							
							commentbtn.x = 'hey';
							commentbtn.comments = data[i].commmentsArray;
							
							console.log(data[i].commmentsArray);
							
							
							
							
							deets.add(likebtn);
							deets.add(likes);
							
							deets.add(commentbtn);
							deets.add(comments);
							
							
							deets.add(morebtn);
							deets.add(morelbl);
							
							
							
							
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
			         
			        
			       
			       var spinArea = Ti.UI.createImageView({ preventDefaultImage: true,
								image: '/img/homespinner.png',
								top: 0,
								width: '291px',
								
								opacity: .4,
								anchorPoint : {
							        x : 0.5,
							        y : 0.5
							    },
							});
			        
			        
			        
			        var strongMan = Ti.UI.createImageView({ preventDefaultImage: true,
								image: '/img/profile.png',
								top: -50,
								width: 60,
								zIndex: 220,
								opacity: 1,
								anchorPoint : {
							        x : 0.5,
							        y : 0.5
							    },
							});
			        
			       
			         var areacut = Ti.UI.createImageView({ preventDefaultImage: true,
								image: '/img/areacut.png',
								top: 150,
								width: '100%',
								zIndex: 100,
								opacity: 1,
								anchorPoint : {
							        x : 0.5,
							        y : 0.5
							    },
							}); 
			        
			        
			        
			        var areaaDeets = Ti.UI.createLabel({
								text: 'This is your feed',
								color: '#818181',
								width: '85%',
								textAlign: 'center',
								top: 40,
								zIndex: 110,
								font: { fontFamily: 'OpenSans-light', fontSize: ((Ti.Platform.osname == 'android') ? 18 : 18) }
							});
			        
			        
			         var subAreaaDeets = Ti.UI.createLabel({
								text: 'When you record what you eat and how you workout it will show up here!',
								color: '#818181',
								width: '85%',
								textAlign: 'center',
								top: 10,
								zIndex: 110,
								font: { fontFamily: 'OpenSans-light', fontSize: ((Ti.Platform.osname == 'android') ? 14 : 14) }
							});
			        
			        
			        
			        var firstBtn = Ti.UI.createButton({
			        	backgroundColor: '#1a1a1a',
			        	top: 10,
			        	height: 60,
			        	color: '#818181',
			        	title: 'Record First Intake',
			        	font: { fontFamily: 'OpenSans-light', fontSize: ((Ti.Platform.osname == 'android') ? 18 : 18) },
			        	width: '85%'
			        });
			        
			        
			        firstBtn.addEventListener('click', function(e){
			        	intakeProcess();
			        });
			        
			        
			        var matrix2d = Ti.UI.create2DMatrix();
					matrix2d = matrix2d.rotate(180); // in degrees
					// matrix2d = matrix2d.scale(1.5); // scale to 1.5 times original size
					var a = Ti.UI.createAnimation({
					    transform: matrix2d,
					    duration: 12000,
					    repeat: 1000
					});
					 
					spinArea.animate(a);
			        
			        
			        
			        
			       mainView.backgroundColor = '#1e1e1e'; 
			       mainView.height = '100%';
			       
			        
			       //if( typeof Parse.User.current().get('activityCount') == 'undefined'){
			       	// var data = new Array();
			       //}
			       
			      // alert(Parse.User.current().get('activityCount'));
			       
			       if(data.length == 0)
			       {
			       
				       mainView.add(areacut);
				       mainView.add(spinArea);
				       mainView.add(strongMan);
				       mainView.add(areaaDeets); 
				       mainView.add(subAreaaDeets);
				       mainView.add(firstBtn);
				   
				   } else {      
			       	
			       		mainView.add(feedTable);
		  		}
			      	
			      	
			      	
			      
			     },
			     // function called when an error occurs, including a timeout
			     onerror : function(e) {
			         Ti.API.debug(e.error);
			         tracker.trackEvent({ category: "User_Feed", action: "Get", label: "Error:"+e.error, value: 1 });
			        //alert(e.error);
			        
			        var dlg = Titanium.UI.createAlertDialog({
											   		title: 'Network Error',
												    message:'Please check your network connection', 
												    buttonNames: ['Ok']
											  });	
											  
											  dlg.show();
			        
			     },
			     cache : true, 
			     timeout : 5000  // in milliseconds
			 });
			 // Prepare the connection.
			 client.setRequestHeader("Content-Type", "multipart/form-data");
			 client.open("POST", url);
			 // Send the request.
			
			 client.send({
			 	uid: Titanium.App.Properties.getString("uid")
			 });
		
		
			
	};
	
	
module.exports = getStream;