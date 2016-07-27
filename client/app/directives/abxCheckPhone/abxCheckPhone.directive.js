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
	        ctrl.$parsers.unshift(function(value) {
	            if(value){
	            	let numberParsed = value.replace(/[- ()]+/g, '');
	            	if(numberParsed.length === 10){
	            		number = new RegExp(/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/);
	            		valid = (number.test(value)) ? true: false;
	              		ctrl.$setValidity('usphoneValidator', valid);
	              		//value = numberParsed;
	            	}else{
	            		number = new RegExp(/^(\+1|1)?[2-9]\d\d[2-9]\d{6}$/g);
	            		valid = (number.test(value)) ? true: false;
	              		ctrl.$setValidity('usphoneValidator', valid);
	              		//value = numberParsed;
	            	}
	            }
	            return valid ? value : undefined;
	        });
      	}
      }
    };
  });
