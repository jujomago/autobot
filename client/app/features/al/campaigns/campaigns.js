'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('campaigns', {
        url: '/app/al/campaigns',
        template: '<al.campaigns></al.campaigns>'
      });
  });
