'use strict';

angular.module('fakiyaMainApp')
  .directive('abxCheckPhone', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ctrl) {
      	if(attrs.type === 'tel'){
			let number; 
	        let valid;
	        let first;
	        ctrl.$parsers.unshift(function(value) {
	            if(value){
	            	let numberParsed = value.replace(/[- () +]+/g, '');
	            	first = numberParsed.substring(0,1);
	            	if(first === '1'){
	            		ctrl.$setValidity('usphoneValidator', false);
	            		return undefined;
	            	}

	            	if(numberParsed.length === 10){
	            		number = new RegExp(/^\d+(-\d+)*$/);
	            		valid = (number.test(numberParsed)) ? true: false;
	              		ctrl.$setValidity('usphoneValidator', valid);
	              		//value = numberParsed;
	            	}else{
	            		number = new RegExp(/^(011)(?:[0-9] ?){6,14}[0-9]$/);
	            		valid = (number.test(numberParsed)) ? true: false;
	              		ctrl.$setValidity('usphoneValidator', valid);
	              		//value = numberParsed;
	            	}
	            	return valid ? value : undefined;
	            }else{
	            	ctrl.$setValidity('usphoneValidator', true);
	            	return value;
	            }
	        });
      	}
      }
    };
  });
