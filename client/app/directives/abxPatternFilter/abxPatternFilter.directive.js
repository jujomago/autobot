'use strict';
/**for any Regular Expressions
 * add parameter in the tag of input abx-pattern-filter and asign the RegExp, whitout modifiers 'gmi'
 * Example: /[a-zA-Z0-9\s]/ 
 * alphanumerics with whitespace: /[a-zA-Z0-9á-ú\s]/
 * numbers: /[0-9]/
 * email: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
 * before verify the regex in: https://regex101.com/r/zC1lU6/1 
 * *************************************************************
 * regular-expression parameter value of RegExp for match
 * */
angular.module('fakiyaMainApp')
  .directive('abxPatternFilter', function () {
    return {
      restrict: 'A',
      scope: {
      	ngModel: '=',
        filter:'@abxPatternFilter',
      },
      link: function (scope) {
       let lastValid = '';
       let filter = new RegExp(scope.filter.substr(1,scope.filter.length -2));
        scope.$watch('ngModel', function(newValue,oldValue) {
            if(scope.ngModel && !filter.test(newValue)) {
              if(!filter.test(oldValue)){
                scope.ngModel = lastValid;  
              }
              else{
                scope.ngModel = oldValue;
                lastValid = scope.ngModel;
              }
            }
        });
      }
    };
  });
