'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.skills', {
        url: '/skills',
        views:{
          'crud':{
            template: '<al.skills.list></al.skills.list>', 
          }
        },
         params: {
            message: null
         }
      });
  });
