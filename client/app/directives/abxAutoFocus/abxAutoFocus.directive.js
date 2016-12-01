'use strict';

angular.module('fakiyaMainApp')
  .directive('abxAutoFocus', function ($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
      	let focusOnMe = $parse(attrs.abxAutoFocus)(scope);

        if(focusOnMe){ 
          angular.element(document).ready(() => {
            element.focus();
          });
        } 
      }
    };
  });
