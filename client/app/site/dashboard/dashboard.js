'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.dashboard', {
       url: '/dashboard',
       template: '<dashboard></dashboard>'
     });
  });
