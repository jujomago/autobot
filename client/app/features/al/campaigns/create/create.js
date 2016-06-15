'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.campaignsCreate', {
        url: '/campaigns/create',
        views:{
          'crud':{
            template: '<al.campaigns.create></al.campaigns.create>'
          }
        }        
      });
  });
