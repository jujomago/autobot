'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('skills.edit', {
        url: '/edit?name',
        template: '<al.skills.edit></al.skills.edit>'
      });
  });
