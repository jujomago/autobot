'use strict';

angular.module('fakiyaMainApp')
  .directive('abxDigitsOnly', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {      
        ngModelCtrl.$parsers.push(inputValue => {    
          let transformedInput = inputValue.replace(/[^0-9]/g,'');       
          if (transformedInput !== inputValue) {        
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
          }        
          return transformedInput;
        });
      }
    };
  });
