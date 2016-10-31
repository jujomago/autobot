(function(angular, undefined) {
'use strict';

angular.module('fakiyaMainApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin'],apiUri:'http://192.168.17.81:9999/api'})

;
})(angular);