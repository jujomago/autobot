'use strict';

angular.module('fakiyaMainApp')
  .filter('camelToHuman', function () {
    return function (input) {
      return input.replace(/([a-z])([A-Z])/g, '$1 $2');
    };
  });
