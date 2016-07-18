'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.dispositionsCreate', {
        url: '/dispositions/create',
        views:{
          'crud':{
            template: '<al.dispositions.create></al.dispositions.create>', 
          }
        }
      });
  });
