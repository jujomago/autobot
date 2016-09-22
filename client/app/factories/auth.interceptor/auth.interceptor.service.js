'use strict';

function configInterceptor($httpProvider,jwtOptionsProvider,appConfig){

	let tempTag=document.createElement('a');
	tempTag.href=appConfig.apiUri;
	let hostname=tempTag.hostname;
   
   jwtOptionsProvider.config({
	  whiteListedDomains: [hostname],
	  unauthenticatedRedirector:['$cookies','authManager','$location',function($cookies,authManager,$location){
	  	  console.log('cleaning old expired cookie');
		  $cookies.remove('auth_token');
          authManager.unauthenticate();
		  $location.path('/login'); 
	  }],	
	 
      tokenGetter:['$cookies','options',function($cookies,options) {
			let idToken=$cookies.get('auth_token'); 	

			let endUrl= /[^.]+$/.exec(options.url);
		
			if (endUrl[0] === 'html' || endUrl[0] === 'json') {
			return null;
			}

			return idToken;
       }]
    });

	$httpProvider.interceptors.push('jwtInterceptor');
}

configInterceptor.$inject = ['$httpProvider','jwtOptionsProvider','appConfig'];

angular.module('fakiyaMainApp')
	.config(configInterceptor)
	.run(function(authManager,jwtHelper,$cookies,$interval,AuthService){
		let minutes = 5 * 60 * 1000; //every 5 minutes
		$interval(()=>{				
				console.log('checking if token should be renewed');
				let token=$cookies.get('auth_token');
				if(token){
						var tokenDate = jwtHelper.getTokenExpirationDate(token);
						
						let today=new Date(); 
						let expDate=new Date(tokenDate);
					
						let diff = expDate.getTime() - today.getTime();    	
						let remainingMinutes= Math.round(diff / 60000);

						console.log(`remainingMinutes ${remainingMinutes}`);

						if(remainingMinutes<=30){
							console.info('CALLING RENEW TOKEN');
							AuthService.renewToken(token);
						}else{
							console.info(`token can survive ${remainingMinutes-30} minutes more`);
						}
				}else{
					console.warn('no exists cookie token!!');
				}				
		}, minutes);
		
		// Listen for 401 unauthorized requests and redirect
		// the user to the login page
		authManager.redirectWhenUnauthenticated();
	});

