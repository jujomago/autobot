'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('users.list', {
        url: '/list',
        template: '<al.users.list></al.users.list>',
         params: {
            message: null
         }
      });
  });
