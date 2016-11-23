'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.rqa', {
        url: '/rqa',
        template: '<home></home>'
      });
  });
