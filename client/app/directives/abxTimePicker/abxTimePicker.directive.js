'use strict';

angular.module('fakiyaMainApp')
  .directive('abxTimePicker', function () {
    return {
      templateUrl: 'app/directives/abxTimePicker/abxTimePicker.html',
      restrict: 'E',
      scope: {
      	timeFormat: '@',
        time: '=ngModel',
        validator: '=validator',
        strategy: '@'
      },

      link: function (scope, element, attrs) {
          let formatDates =function(format){
            if(format === 'h:mm a'){
              format = '?hh:mm a'
            }
            if(format === 'H:mm'){
              format = '?HH:mm'
            }
            return format; 
          }
      	scope.getTimeFormat = function(format){
          format = formatDates(format);
          format = format.replace(/[HhMmSs]/g,'9');
          return format.replace(/a/g,'AM');
        };
      }
    };
  });
