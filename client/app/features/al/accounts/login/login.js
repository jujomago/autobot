'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.login', {
        url: '/al/login',
        template: '<al.accounts.login></al.accounts.login>'
      });
  });
