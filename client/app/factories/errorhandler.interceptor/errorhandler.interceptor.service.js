'use strict';

angular.module('fakiyaMainApp')
	.factory('ErrorHandlerInterceptor', ['$q', '$location', '$injector' , function ($q, $location, $injector) {
		return {
			responseError: function error(response) {
				switch (response.status) {				
					case 404:	
						$location.path('/404');
						break;
					case 409:
						let app =JSON.parse(response.data.error);
						let AccountManager = $injector.get('AccountManager');
						AccountManager.getLastPartnerAccount(app.partnerName,app.appName);
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

