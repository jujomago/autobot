'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('users.create', {
        url: '/create',
        template: '<al.users.create></al.users.create>'
      });
  });
