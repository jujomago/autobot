'use strict';

angular.module('fakiyaMainApp')
  .directive('abxDefaultImageSwitch', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.bind('error', function() {
	        attrs.$set('src', attrs.abxDefaultImageSwitch);
	    });
      }
    };
  });
