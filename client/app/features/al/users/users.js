'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('users', {
        url: '/users',
        template: '<al.users></al.users>'
      });
  });
