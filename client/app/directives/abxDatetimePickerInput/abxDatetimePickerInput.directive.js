'use strict';

angular.module('fakiyaMainApp')
  .directive('abxDatetimePickerInput', function () {
    return {
      templateUrl: 'app/directives/abxDatetimePickerInput/abxDatetimePickerInput.html',
      restrict: 'E',
      scope: {
      	dateFormat: '@',
      	timeFormat: '@',
        datetime: '=ngModel'
      },
      link: function (scope, element, attrs) {
        scope.openDatePicker = function(){
          scope.opened = true;
        }
        if(!scope.datetime){
          scope.datetime = {};
        }
      }
    };
  });
