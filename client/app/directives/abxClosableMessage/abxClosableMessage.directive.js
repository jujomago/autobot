'use strict';

angular.module('fakiyaMainApp')
  .directive('abxClosableMessage', function () {
    return {
      templateUrl: 'app/directives/abxClosableMessage/abxClosableMessage.html',
      restrict: 'E',
      scope: {
      	message: '='
      },
      link: function (scope) {
      	scope.close = function(){
      		scope.message.show = false;
      	};
      }
    };
  });
