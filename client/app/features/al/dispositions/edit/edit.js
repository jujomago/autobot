'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.dispositionsEdit', {
        url: '/dispositions/edit?dispositionName',
        views:{
          'crud':{
            template: '<al.dispositions.edit></al.dispositions.edit>', 
          }
        }
      });
  });
