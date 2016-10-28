'use strict';

angular.module('fakiyaMainApp', [
  'fakiyaMainApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ui.mask',
  'ngStorage',
  'ngMessages',
  'angular-jwt'
])
  .config(function ($urlRouterProvider, $locationProvider, $httpProvider, $urlMatcherFactoryProvider) {
    $urlRouterProvider.otherwise('/');
    // Fix for bug 1691: URL should not be case-sensitive
    $urlMatcherFactoryProvider.caseInsensitive(true);
    $locationProvider.html5Mode(true);
    /*This change with httpProvider is for
    bug 1682: Admin Console: access flow:  The Admin console is displayed when the user does not logged in.
    bug 1683: Admin Console: access flow:  The form for create is being displaying.
    bug 1684: Admin Console: access flow:  The submenu is being displaying.
    */

    $httpProvider.defaults.cache = false;
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
    // disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
  }).run(function ($window, Global) { // jshint ignore:line
    //TODO: Remove or Evaluate this block after Event Bus is implemented
    $window.onbeforeunload = function () {
      if(Global.proccessIsRunning){
        return 'You have updating processes in progress';
      }
    };
  });
