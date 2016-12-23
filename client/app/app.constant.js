(function(angular, undefined) {
'use strict';

angular.module('fakiyaMainApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin'],apiUri:'http://10.0.0.2:9999/api'})

;
})(angular);