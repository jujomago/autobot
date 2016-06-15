'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.usersCreate', {
        url: '/users/create',
        views:{
          'crud':{
            template: '<al.users.create></al.users.create>',
          }
        }
      });
  });
