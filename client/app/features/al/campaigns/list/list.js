'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('campaigns.list', {
        url: '/list',
        template: '<al.campaigns.list></al.campaigns.list>',
          params: {
            message: null
         }
      });
  });
