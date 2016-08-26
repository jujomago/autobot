'use strict';

angular.module('fakiyaMainApp')
  .directive('abxOnImageError', function () {
  	
    return {
		restrict: 'A',
		scope: {
			abxOnImageError: '='
		},
	    link: function (scope, element) {
	        element.bind('error', function() {
	        	scope.$apply(function () {
	        		scope.abxOnImageError=false;
	        	});
	        	return true;
	      	});
	    }
	};

  });
