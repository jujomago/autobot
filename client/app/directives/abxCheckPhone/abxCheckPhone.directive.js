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
      	if(attrs.type === 'tel'){
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
			    	if(numberParsed.length === 10){
						number = new RegExp(/^\d+(-\d+)*$/);
						valid = (number.test(numberParsed)) ? true: false;
						ctrl.$setValidity('usphoneValidator', valid);
					}else{
						number = new RegExp(/^(011)(?:[0-9] ?){6,14}[0-9]$/);
						valid = (number.test(numberParsed)) ? true: false;
						ctrl.$setValidity('usphoneValidator', valid);
					}
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
