'use strict';

angular.module('fakiyaMainApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login?url',
        template: '<login></login>'
      });
  });
