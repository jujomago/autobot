'use strict';

angular.module('fakiyaMainApp')
	.factory('ErrorHandlerInterceptor', ['$q', '$location', '$injector', function ($q, $location, $injector) {	
		
		return {
			request: function(config) {
			   let path=$location.path();
               let AuthService=$injector.get('AuthService');
			   //the home page of a user Authenticated is the dashboard.
			   if(AuthService.isAuthenticated() && (path==='/' || path==='/login') && config.url.indexOf('/api/')===-1)
				{				
					//cooming soon this path will be redirect to dashboard
					 $location.path('/underconstruction');
				}
               return config;
            },
			responseError: function error(response) {
				switch (response.status) {				
					case 404:	
						$location.path('/404');
						break;
					case 409:
						let appRouteKey =JSON.parse(response.data.error);
						let AccountManager = $injector.get('AccountManager');
						AccountManager.getLastPartnerAccount(appRouteKey.partnerName,appRouteKey.appName);
						break;
				}

				return $q.reject(response);
			}
		};

	}]
	);

angular.module('fakiyaMainApp')
	.config(['$httpProvider', function ($httpProvider) {
		$httpProvider.interceptors.push('ErrorHandlerInterceptor');
	}]);

