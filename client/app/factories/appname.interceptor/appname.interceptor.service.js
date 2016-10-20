'use strict';

angular.module('fakiyaMainApp')
    .factory('appnameInterceptor', function($location) {

        var sessionInjector = {
            request: function(config) {
                let path =$location.path();
                if (config.url.indexOf('/api/') > -1) {
                    let match = path.match(/ap\/([^\/]+)\/?(.*)$/);
                    if(!config.headers.appName){
                        if (match !== null) {

                            config.headers.appName = match[1]; //The first group (0) is the enterily string
                        } else {
                            config.headers.appName = '';
                        }
                    }
                }

                return config;
            }
        };
        return sessionInjector;
    });
angular.module('fakiyaMainApp')
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('appnameInterceptor');
        /*$httpProvider.defaults.transformRequest = function (data) {
          if (data === undefined) {
            data = {};
            data.body = {};
            data.body.appName = 'Enrique!'
            //return data;
          }
          data.body.appName = 'Enrique!!';
          return $.param(data);
          //return data;
        }*/
    }]);
