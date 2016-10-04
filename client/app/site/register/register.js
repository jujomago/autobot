'use strict';

angular.module('fakiyaMainApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('register', {
        url: '/register',
        template: '<register></register>'
      });
  });
