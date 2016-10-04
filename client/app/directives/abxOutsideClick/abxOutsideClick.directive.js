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
                //safe apply
                //Solve Bug: 1862 Admin Console: Lists: Integrate with API:  The choose file link does not perform any action.
                var phase = scope.$root?scope.$root.$$phase:null;
                if(phase === '$apply' || phase === '$digest'){
                  scope.$eval(scopeExpression);
                }
                else{
                  scope.$apply(scopeExpression);
                }
            }
        });
      }
    };
  });