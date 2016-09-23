'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.partneraccounts', {
        url: '/:partnerId/:appName/partneraccounts/',
        template: '<accounts.partneraccounts></accounts.partneraccounts>'
      });
  });
