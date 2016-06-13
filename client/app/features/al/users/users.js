'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('users', {
        url: '/app/al/users',
        template: '<al.users></al.users>'
      });
  });
