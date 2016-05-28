'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('campaigns', {
        url: '/campaigns',
        template: '<al.campaigns></al.campaigns>'
      });
  });
