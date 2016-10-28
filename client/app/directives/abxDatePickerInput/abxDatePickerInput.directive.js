'use strict';

angular.module('fakiyaMainApp')
  .directive('abxDatePickerInput', function () {
    return {
      templateUrl: 'app/directives/abxDatePickerInput/abxDatePickerInput.html',
      restrict: 'E',
      require: 'ngModel',
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
