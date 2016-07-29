'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.page', {
        url: '/apps/:appName',
        template: '<apppage></apppage>'
      });
  });
