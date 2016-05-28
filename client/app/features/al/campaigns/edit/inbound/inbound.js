'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('campaigns.edit-inbound', {
        url: '/edit-inbound',
        template: '<al.campaigns.edit.inbound></al.campaigns.edit.inbound>',
         params:{
          campaign:null
        }
      });
  });
