'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('apps', {
        url: '/apps',
        template: '<apps></apps>'
      });
  });
