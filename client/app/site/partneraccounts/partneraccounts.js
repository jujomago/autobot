'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('partneraccounts', {
        url: '/:partnerId/:appName/partneraccounts/',
        template: '<accounts.partneraccounts></accounts.partneraccounts>'
      });
  });
