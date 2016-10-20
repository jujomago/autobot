'use strict';

angular.module('fakiyaMainApp')
  .directive('abxRegexFilter', function () {
    return {
      require: '?ngModel',
      restrict: 'A',
      link: function (scope, element, attrs, ngModelCtrl) {
        if(!ngModelCtrl) {
        return; 
      }
      
      ngModelCtrl.$parsers.push(function(val) {
        let regex = new RegExp(attrs.abxRegexFilter, 'g')
        console.log(regex);
        var clean = val.replace(regex, '');
        console.log(clean);
        if (val !== clean) {
          ngModelCtrl.$setViewValue(clean);
          ngModelCtrl.$render();
        }
        return clean;
      });
      
      element.bind('keypress', function(event) {
        if(event.keyCode === 32) {
          event.preventDefault();
        }
      });
      }
    };
  });
