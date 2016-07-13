'use strict';

angular.module('fakiyaMainApp')
  .filter('removeUnderscore', function () {
    return function (input) {
    	if(input){
    		return input.replace(/_/g, ' ');
    	}
    };
  });
