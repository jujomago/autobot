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
    $urlRouterProvider.otherwise('/404');
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
  }).run(function (lodash, $window, Global, $rootScope, $injector) { // jshint ignore:line
    //this method is only for run the lodash deletion
    //TODO: Remove or Evaluate this block after Event Bus is implemented
    $window.onbeforeunload = function () {
      if(Global.proccessIsRunning){
        return 'You have updating processes in progress';
      }
    };

    //------
    $rootScope.$on('$stateChangeStart', function (event,toState,toParams) {
      if(!toParams.isLoggedIn && toState.name.indexOf('al')>-1){
        let state = $injector.get('$state');
        let ListService=$injector.get('ListsService');
        event.preventDefault();
        ListService.getList('%$&unexisting_list)(*&^%^', {headers: {appName: 'al'}})
       .catch(error => {
        if(error.statusCode!==409){
          toParams.isLoggedIn = true;
          state.go(toState.name,toParams);
        }
       });
      }
      return true;
    });
  });
