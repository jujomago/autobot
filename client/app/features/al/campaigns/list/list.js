'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.campaigns', {
        url: '/campaigns',
         views:{
          'crud':{
            template:'<al.campaigns.list></al.campaigns.list>', 
          }
        },
         params: {
            message: null
         }      
      });
  });
