var parseLoginCheck = function(APP_ID, REST_KEY, u, p, success, error) {
	

/* ******************************************
 * 
 *  Alternative Login for Parse (Android Specific Middleware)
 * 
 */
	
	
	var request = Ti.Network.createHTTPClient();

		 request.onerror = function(e)
                {
                        console.log(e);
                        error(e);
                       
                };

		 request.onload = function(e){	
			    
		 		success(e);
		 		
			};
	
		 
		  request.open('GET', 'https://api.parse.com/1/login', true);
		  request.setRequestHeader('X-Parse-Application-Id', APP_ID);
		  request.setRequestHeader('X-Parse-REST-API-Key', REST_KEY);
		  request.setRequestHeader('Content-Type', 'application/json');
		  
		 
		  
		  var params = {};
		  params.username = u;
		  params.password= p;
		
				  
		  request.send(params);
		
};	
		
		
		
module.exports = parseLoginCheck;