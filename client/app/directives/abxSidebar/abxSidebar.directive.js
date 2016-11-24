'use strict';

angular.module('fakiyaMainApp')
  .directive('abxSidebar', ['$location', '$window', function ($location, $window) {

    function link(scope, element) {
      scope.checkActive = function (link) {
        return ($location.path().indexOf(link) >= 0) ? 'active' : '';
      };
      
      let navbarHeight = 60;
      let footerHeight = 50;
      let minHeightSideBar;

      function calcMinHeight(innerHeight){
        console.log('calling minheight');
         minHeightSideBar = innerHeight - navbarHeight - footerHeight;
         element.css('min-height', minHeightSideBar);
      }
      
      calcMinHeight($window.innerHeight);
      angular.element($window).on('resize', function() {
            scope.$apply(function() {
                calcMinHeight($window.innerHeight);
            });
      });

     
    }

    return {
      templateUrl: 'app/directives/abxSidebar/abxSidebar.html',
      restrict: 'EA',
      link: link
    };
  }]);
