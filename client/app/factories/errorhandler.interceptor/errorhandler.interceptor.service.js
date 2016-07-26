'use strict';

angular.module('fakiyaMainApp')
	.factory('ErrorHandlerInterceptor', ['$q', '$location', function ($q, $location) {
		return {
			responseError: function error(response) {
				switch (response.status) {
					case 401:
						$location.path('/login');
						break;
					case 404:	
						$location.path('/404');
						break;
				}

				return $q.reject(response);
			}
		};

	}]);

angular.module('fakiyaMainApp')
	.config(['$httpProvider', function ($httpProvider) {
		$httpProvider.interceptors.push('ErrorHandlerInterceptor');
	}]);

