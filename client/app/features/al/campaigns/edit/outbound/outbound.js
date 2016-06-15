'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.campaignsEdit-outbound', {
        url: '/campaigns/edit-outbound',
        views:{
          'crud':{
            template: '<al.campaigns.edit.outbound></al.campaigns.edit.outbound>'
          }
        }, 
        params:{
          campaign:null
        }
      });
  });
