'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        template: '<home></home>'
      });
  });

