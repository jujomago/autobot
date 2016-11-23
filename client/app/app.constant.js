(function(angular, undefined) {
'use strict';

angular.module('fakiyaMainApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin'],apiUri:'http://192.168.14.104:9999/api'})

;
})(angular);