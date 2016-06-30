'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.auth', {
        url: '/auth',
        template: '<ap.al.auth></ap.al.auth>'
      });
  });
