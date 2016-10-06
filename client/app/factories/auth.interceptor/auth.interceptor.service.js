'use strict';

function configInterceptor($httpProvider,jwtOptionsProvider,appConfig){

	let tempTag=document.createElement('a');
	tempTag.href=appConfig.apiUri;
	let hostname=tempTag.hostname;
   
   jwtOptionsProvider.config({
	  whiteListedDomains: [hostname],
	  unauthenticatedRedirector:['$cookies','$location','authManager','jwtHelper',function($cookies,$location,authManager,jwtHelper){
	  	  let token=$cookies.get('auth_token');
		  if(token && jwtHelper.isTokenExpired(token) ){
			  console.log('cleaning old expired cookie');
			  $cookies.remove('auth_token');
		  }
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
	.run(function(authManager, RefreshToken){
		
		RefreshToken.checkToken();
		
		// Listen for 401 unauthorized requests and redirect
		// the user to the login page
		authManager.redirectWhenUnauthenticated();
	});

