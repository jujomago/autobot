'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider

      .state('underconstruction', {
       url: '/underconstruction',
       template: '<underconstruction></underconstruction>'
      
     });
  });
