'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.usersEdit', {
        url: '/users/edit/:name',
        views:{
          'crud':{
            template: '<al.users.edit></al.users.edit>',
          }
        }
               
      });
  });
