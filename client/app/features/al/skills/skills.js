'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('skills', {
        url: '/app/al/skills',
        template: '<al.skills></al.skills>'
      });
  });
