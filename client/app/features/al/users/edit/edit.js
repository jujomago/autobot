'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('users.edit', {
        url: '/edit/:name',
        template: '<al.users.edit></al.users.edit>'
      });
  });
