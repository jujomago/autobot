'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('partnersubscribe', {
        url: '/:partnerId/:appName/partner/subscribe',
        template: '<accounts.partnersubscribe></accounts.partnersubscribe>'
      });
  });
