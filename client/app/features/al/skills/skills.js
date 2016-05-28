'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('skills', {
        url: '/skills',
        template: '<al.skills></al.skills>'
      });
  });
