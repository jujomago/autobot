'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.users', {
        url: '/users',
         views:{
          'crud':{
            template: '<al.users.list></al.users.list>', 
          }
        },
         params: {
            message: null
         }
      });
  });
