'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('partnercreate', {
        url: '/partnercreate',
        template: '<accounts.partnercreate></accounts.partnercreate>'
      });
  });
