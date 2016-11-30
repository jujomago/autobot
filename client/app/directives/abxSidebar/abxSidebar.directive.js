'use strict';

angular.module('fakiyaMainApp')
  .directive('abxSidebar', ['$location', function ($location) {

    function link(scope) {
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
