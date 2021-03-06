'use strict';

angular.module('fakiyaMainApp')
  .directive('abxFieldValidator', function ($parse, FieldValidator) {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function (scope, element, attrs, ctrl) {
      	if(!attrs.strategy){
      		attrs.strategy = 'String';
      	}
      	else{
      		attrs.strategy = attrs.strategy[0].toUpperCase() + attrs.strategy.slice(1).toLowerCase();
      	}
        FieldValidator.setStrategy(attrs.strategy);
        let validator = FieldValidator.getMethods();
        
        let restrictions = $parse(attrs.abxFieldValidator)(scope);
        let model = $parse(attrs.ngModel)(scope);
        let validateField = function(value){
          console.log(value);
        let validateType = validator.validateType(value);
        ctrl.$setValidity('abxtype', validateType);
        if(restrictions && restrictions.length>0 && validateType){
          for(let i=0;i<restrictions.length;i++){
            let restriction = restrictions[i];
            let validate = validator[restriction.type];  
            if(validate){
                let validateResult = validate(restriction.value, value);
                let typeValidationResult = (restriction.type==='Required')?validateResult:!value||validateResult; 
                ctrl.$setValidity('abx'+restriction.type.toLowerCase(), typeValidationResult);
            }
          }
        }
          return value;
        };
        ctrl.$parsers.push(validateField);
        validateField(model);	
      }
    };
  });
