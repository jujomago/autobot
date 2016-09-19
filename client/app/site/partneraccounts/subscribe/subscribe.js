'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.partnersubscribe', {
        url: '/:partnerId/:appName/partner/subscribe',
        template: '<accounts.partnersubscribe></accounts.partnersubscribe>'
      });
  });
