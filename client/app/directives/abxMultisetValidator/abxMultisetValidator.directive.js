'use strict';

angular.module('fakiyaMainApp')
  .directive('abxMultisetValidator', function (MultisetStrategy) {
    return {
      restrict: 'A',
      require: '?ngModel',
      scope: {
        ngModel: '=',
        restrictions: '=abxMultisetValidator'
      },
      link: function (scope, element, attrs,ctrl) {
      	let validator = MultisetStrategy.getMethods();
      	let restrictions = scope.restrictions;
        scope.$watchCollection('ngModel',function(newValue){
        	if(restrictions && restrictions.length>0){
            for(let i=0;i<restrictions.length;i++){
              let restriction = restrictions[i];
              let validate = validator[restriction.type];     
              if(validate){
              	ctrl.$setValidity('abx'+restriction.type.toLowerCase(), validate(restriction.value, newValue));
              }
            }
          }
        });
      }
    };
  });
