'use strict';

angular.module('fakiyaMainApp')
  .directive('abxHideOnResize', function ($window) {
    return {
      scope: {
      	isOpen: '=popoverIsOpen'
      },
      restrict: 'A',
      link: function (scope, element, attrs) {
        angular.element($window).bind('resize',()=>{
        	scope.$apply(function () {
        	    scope.isOpen = false;
            });
        })
      }
    };
  });
