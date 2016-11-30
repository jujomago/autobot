'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.rqa.home', {
        url: '/home',
        template: '<rqa></rqa>'
      });
  });
