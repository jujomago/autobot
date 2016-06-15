'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.skillsEdit', {
        url: '/skills/edit?name',
         views:{
          'crud':{
            template: '<al.skills.edit></al.skills.edit>',
          }
        }
      });
  });
