'use strict';

angular.module('fakiyaMainApp')
  .directive('abxLoadIndicator', function () {
    return {
      templateUrl: 'app/directives/abxLoadIndicator/abxLoadIndicator.html',
      restrict: 'E',     
      link: function (scope, element, attrs) {
        if(attrs.text){
           element.find('p').html(attrs.text);
        }
      }
    };
  });
