'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.campaignsEdit-inbound', {
        url: '/campaigns/edit-inbound',
        views:{
          'crud':{
            template: '<al.campaigns.edit.inbound></al.campaigns.edit.inbound>'
          }
        },
         params:{
          campaign:null
        }
      });
  });
