'use strict';

angular.module('fakiyaMainApp')
  .directive('abxDatePicker', function () {
    return {
      templateUrl: 'app/directives/abxDatePicker/abxDatePicker.html',
      restrict: 'A',
      scope: {
      	dateFormat: '@',
        name: '@',
        date: '=ngModel',
        validator: '=validator',
        strategy: '@'
      },
      link: function (scope, element, attrs) {
      	scope.openDatePicker = function(){
      		scope.opened = true;
      	}
      }
    };
  });
