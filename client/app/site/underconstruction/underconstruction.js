'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.underconstruction', {
       url: '/underconstruction',
       template: '<underconstruction></underconstruction>'
      
     });
  });
