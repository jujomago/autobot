'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.apps', {
        url: '/apps',
        params: {
            paramAppSelected: null
        },
        template: '<apps></apps>'
      });
  });
