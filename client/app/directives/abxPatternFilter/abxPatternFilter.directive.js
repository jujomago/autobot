'use strict';

angular.module('fakiyaMainApp')
  .directive('abxPatternFilter', function () {
    return {
      restrict: 'A',
      scope: {
      	ngModel: '=',
        filter:'@abxPatternFilter',
      },
      link: function (scope) {
       var lastValid = '';
       var filter = new RegExp(scope.filter.substr(1,scope.filter.length -2));
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