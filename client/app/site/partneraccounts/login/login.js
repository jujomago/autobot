'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.login', {
        url: '/:partnerId/:appName/login/:username',
        template: '<partners.accounts.login></partners.accounts.login>',
        params: {
            message: null,
         }
      });
  });