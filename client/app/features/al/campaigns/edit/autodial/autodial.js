'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.campaignsEdit-autodial', {
        url: '/campaigns/edit-autodial/:name',
        views:{
          'crud':{
            template: '<al.campaigns.edit.autodial></al.campaigns.edit.autodial>'
          }
        }, 
        params:{
          campaign:null
        }
      });
  });
