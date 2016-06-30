'use strict';

angular.module('fakiyaMainApp')
  .factory('authInterceptor', function ($cookies) {
    let tokentInjector={
   	     request: function(httpConfig) {
            if($cookies.get('auth_token')){
                console.log('===== sending TOKEN IN HEADER ====');             
                let token=$cookies.get('auth_token');
                httpConfig.headers.Authorization = 'Bearer '+token;            
            }
            return httpConfig;
          }
    };

    return tokentInjector;
  });
angular.module('fakiyaMainApp')
    .config(['$httpProvider', function($httpProvider) {
      //  $httpProvider.defaults.withCredentials = true;
        $httpProvider.interceptors.push('authInterceptor');
    }]);
    