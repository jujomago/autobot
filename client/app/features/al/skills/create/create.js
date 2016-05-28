'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('skills.create', {
        url: '/create',
        template: '<al.skills.create></al.skills.create>'

      });
  });
