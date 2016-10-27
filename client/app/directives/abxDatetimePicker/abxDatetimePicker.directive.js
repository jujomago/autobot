'use strict';

angular.module('fakiyaMainApp')
  .directive('abxDatetimePicker', function () {
    return {
      templateUrl: 'app/directives/abxDatetimePicker/abxDatetimePicker.html',
      restrict: 'EA',
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
