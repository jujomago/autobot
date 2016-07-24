'use strict';

angular.module('fakiyaMainApp', [
  'fakiyaMainApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ngStorage',
  'ngMessages'
])
  .config(function ($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  }).run(function (lodash) {
    //this method is only for run the lodash deletion
  });
