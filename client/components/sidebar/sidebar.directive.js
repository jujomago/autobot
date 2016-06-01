'use strict';

angular.module('fakiyaMainApp')
  .directive('sidebar', function () {
    return {
      templateUrl: 'components/sidebar/sidebar.html',
      restrict: 'EA'/*,
      link: function (scope, element, attrs) {
      }*/
    };
  });
