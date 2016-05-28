'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('campaigns.edit-autodial', {
        url: '/edit-autodial',
        template: '<al.campaigns.edit.autodial></al.campaigns.edit.autodial>',
        params:{
          campaign:null
        }
      });
  });
