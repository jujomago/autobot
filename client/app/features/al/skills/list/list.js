'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('skills.list', {
        url: '/list',
        template: '<al.skills.list></al.skills.list>', 
         params: {
            message: null
         }
      });
  });
