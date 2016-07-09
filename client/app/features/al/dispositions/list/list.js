'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.dispositions', {
        url: '/dispositions',
        views:{
          'crud':{
            template: '<al.dispositions.list></al.dispositions.list>', 
          }
        },
         params: {
            message: null
         }
      });
  });
