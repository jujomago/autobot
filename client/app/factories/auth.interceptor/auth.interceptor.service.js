'use strict';

function configInterceptor($httpProvider,jwtOptionsProvider){
 
   jwtOptionsProvider.config({

	  unauthenticatedRedirectPath: '/login',
	  unauthenticatedRedirector:['$cookies','authManager',function($cookies,authManager){
	  	   console.log('cleaning old expired cookie');
		  $cookies.remove('auth_token');
          authManager.unauthenticate();
	  }],	
	  whiteListedDomains: ['localhost'],
      tokenGetter:['$cookies','options',function($cookies,options) {

		let idToken=$cookies.get('auth_token'); 	
		let endUrl=options.url.substr(options.url.length - 5);		
	
		if (!idToken || endUrl === '.html' || endUrl === '.json') {
          return null;
        }
		
		return idToken;
        }]
    });

	$httpProvider.interceptors.push('jwtInterceptor');
}

configInterceptor.$inject = ['$httpProvider','jwtOptionsProvider'];

angular.module('fakiyaMainApp')
	.config(configInterceptor)
	.run(function(authManager, $cookies, $interval, AuthService){
		
		let minutes = 30 * 60 * 1000;
		$interval(()=> {
			if($cookies.get('auth_token')) {
				console.log('calling renew');
				AuthService.renewToken($cookies.get('auth_token'));
			}
		}, minutes);

		// Listen for 401 unauthorized requests and redirect
		// the user to the login page
		authManager.redirectWhenUnauthenticated();
	});

