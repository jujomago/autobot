'use strict';

angular.module('fakiyaMainApp')
  .directive('abxSidebar', ['$location', '$window', function ($location, $window) {

    function link(scope, element) {
      scope.checkActive = function (link) {
        return ($location.path().indexOf(link) >= 0) ? 'active' : '';
      };
      
     
    }

    return {
      templateUrl: 'app/directives/abxSidebar/abxSidebar.html',
      restrict: 'EA',
      link: link
    };
  }]);
