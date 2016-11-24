'use strict';

angular.module('fakiyaMainApp')
  .directive('abxAutoPlacementPopover', function ($window) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
      	let verifyPlacement = function(){
      		if($window.innerHeight - element.offset().top > 245){
      			attrs.$set('popoverPlacement', 'left-top');
      		}
      		else{
      			attrs.$set('popoverPlacement', 'left-bottom');
      		}
      	};
        angular.element($window).bind('resize',verifyPlacement);
        verifyPlacement();
      }
    };
  });
