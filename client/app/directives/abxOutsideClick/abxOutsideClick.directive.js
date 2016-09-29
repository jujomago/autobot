'use strict';

angular.module('fakiyaMainApp')
  .directive('abxOutsideClick', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attributes) {

        let scopeExpression = attributes.abxOutsideClick;
         $(document).bind('click', function(event){
            var isClickedElementChildOfPopup = element
            .find(event.target)
            .length > 0;

            if (!isClickedElementChildOfPopup){
                scope.$apply(scopeExpression);
            }
        });
      }
    };
  });