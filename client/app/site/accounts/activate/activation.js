'use strict';

angular.module('fakiyaMainApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('activation', {
        url: '/accounts/activate?activationCode=',
        template: '<activation></activation>'
      });
  });
