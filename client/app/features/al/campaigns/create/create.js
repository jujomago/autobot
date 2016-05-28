'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('campaigns.create', {
        url: '/create',
        template: '<al.campaigns.create></al.campaigns.create>'
      });
  });
