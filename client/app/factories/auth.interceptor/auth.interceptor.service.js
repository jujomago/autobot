'use strict';
/*
function authInterceptor($q,$cookies,$location) {
	let tokentInjector = {
		request: function (httpConfig) {
			httpConfig.headers = httpConfig.headers || {};
			if ($cookies.get('auth_token')) {
				console.log('===== sending TOKEN IN HEADER ====');
				let token = $cookies.get('auth_token');
				httpConfig.headers.Authorization = 'Bearer ' + token;
			}
			return httpConfig;
		},
		responseError: function (rejection) {
			if (rejection.status === 401) {
				 $location.path('/login'); 
			}
			return $q.reject(rejection); 
		}
	};

	return tokentInjector;
}*/

//authInterceptor.$inject = ['$q','$cookies', '$location'];
angular.module('fakiyaMainApp')
	.config(['$httpProvider','jwtOptionsProvider', function ($httpProvider,jwtOptionsProvider) {

    jwtOptionsProvider.config({
	  unauthenticatedRedirectPath: '/login',	
	  whiteListedDomains: ['localhost'],
      tokenGetter:['$cookies','options','jwtHelper','AuthService',function($cookies,options,jwtHelper,authService) {

		let idToken=$cookies.get('auth_token');  
		let endUrl=options.url.substr(options.url.length - 5);
		
		if (!idToken || endUrl === '.html' || endUrl === '.json') {
          return null;
        }  
			

		var tokenPayload = jwtHelper.decodeToken(idToken);
 		var expireDate = jwtHelper.getTokenExpirationDate(idToken);
  		var isExpired = jwtHelper.isTokenExpired(idToken);

  		console.log('token payload');
		console.log(tokenPayload);
		console.log(`expireDate:${expireDate}`);
		console.log(`isExpired:${isExpired}`);

		if(jwtHelper.isTokenExpired(idToken) || true){
			console.log('token has expired, sorry :(');
			$cookies.remove('auth_token')
			authService.renewToken();

		}else{
			return idToken;
		}


       // myService.doSomething();
        }]
    });

		//  $httpProvider.defaults.withCredentials = true;
	$httpProvider.interceptors.push('jwtInterceptor');
//		$httpProvider.interceptors.push('authInterceptor');
	}]);
	//.factory('authInterceptor', authInterceptor);
