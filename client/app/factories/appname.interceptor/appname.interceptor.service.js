'use strict';

angular.module('fakiyaMainApp')
    .factory('appname.interceptor', function($location) {

        var sessionInjector = {
            request: function(config) {
                let path =$location.path();
                console.log('Current url path: ' + path);
                if (config.url.indexOf('/api/') > -1) {
                    let match = path.match(/app\/([^\/]+)\/?(.*)$/);
                    if (match != null) {
                        // matched text: match[0]
                        // match start: match.index
                        // capturing group n: match[n]
                        config.headers.appName = match[1]; //The first group (0) is the enterily string
                    } else {
                        config.headers.appName = '';
                    }
                    console.log('Interceptor value -> ' + config);
                    console.log(' url intercepted: ' + config.url);
                }

                return config;
            }
        };
        return sessionInjector;
    });
angular.module('fakiyaMainApp')
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('appname.interceptor');
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
