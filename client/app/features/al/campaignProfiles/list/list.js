'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.campaignProfiles', {
        url: '/campaignProfiles',
        views:{
          'crud':{
            template: '<al.campaign-profiles.list></al.campaign-profiles.list>', 
          }
        }
      });
  });
