'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.skillsCreate', {
        url: '/skills/create',
        views:{
          'crud':{
            template: '<al.skills.create></al.skills.create>',
          }
        }
        
      });
  });
