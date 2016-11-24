'use strict';

angular.module('fakiyaMainApp')
  .directive('abxCheckPhone', function () {
    return {
      restrict: 'A',
      require: '?ngModel',
      scope: {
      	ngModel: '=',
        filter:'@abxCheckPhone'
      },
      link: function (scope, element, attrs, ctrl) {
      	if(true){
			let number; 
	        let valid;
	        let first;
	        var lastValid = '';

	    	ctrl.$parsers.unshift(function(value) {
	            if(value){
	            	let numberParsed = value.replace(/[- () +]+/g, '');
	            	let filter = new RegExp(scope.filter.substr(1,scope.filter.length -2));
	            	first = numberParsed.substring(0,1);

	            	if(first === '1'){
	            		ctrl.$setValidity('usphoneValidator', false);
	            		return undefined;
	            	}
			    	if(numberParsed.length <= 10 && numberParsed.substr(0,3)!=='011'){
						number = new RegExp(/^[2-9]{1}[0-9]{9}$/im);
					}else{
						number = new RegExp(/^(?:011)(?:[. ()-]*\d){2,17}[. ()-]*$/g);
					}
					valid = (number.test(numberParsed)) ? true: false;
					ctrl.$setValidity('usphoneValidator', valid);
					
					if(filter.test(value)){
						value = numberParsed;
						lastValid = value;
						return valid ? value : undefined;
					}else{
						ctrl.$setViewValue(lastValid);
						ctrl.$render();
						value = lastValid;
					}
	            }else{
	            	ctrl.$setValidity('usphoneValidator', true);
	            	return value;
	            }
	        });	
      	}
      }
    };
  });
