'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('campaigns.edit-outbound', {
        url: '/edit-outbound',
        template: '<al.campaigns.edit.outbound></al.campaigns.edit.outbound>',
        params:{
          campaign:null
        }
      });
  });
