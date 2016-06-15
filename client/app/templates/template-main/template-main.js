'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap', {
         url:'/ap',
         templateUrl: 'app/templates/template-main/template-main.html'
      });
  });
