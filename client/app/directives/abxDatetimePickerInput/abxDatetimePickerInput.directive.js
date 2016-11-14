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
      link: function (scope) {
        scope.openDatePicker = function(){
          scope.opened = true;
        };
        if(!scope.datetime){
          scope.datetime = {};
        }
      }
    };
  });
