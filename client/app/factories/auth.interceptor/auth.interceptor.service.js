'use strict';

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
}

authInterceptor.$inject = ['$q','$cookies', '$location'];


angular.module('fakiyaMainApp')
	.config(['$httpProvider', function ($httpProvider) {
		//  $httpProvider.defaults.withCredentials = true;
		$httpProvider.interceptors.push('authInterceptor');
	}])
	.factory('authInterceptor', authInterceptor);
