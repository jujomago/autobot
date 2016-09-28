'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
       url: '/dashboard',
       template: '<dashboard></dashboard>'
     });
  });
