'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('partneraccounts', {
        url: '/partneraccounts',
        template: '<accounts.partneraccounts></accounts.partneraccounts>'
      });
  });
