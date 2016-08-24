(function(angular, undefined) {
'use strict';

angular.module('fakiyaMainApp.constants', [])
.constant('appConfig', {userRoles:['guest','user','admin'],apiUri:'http://localhost:9999/api'});
})(angular);