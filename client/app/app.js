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
  'angular-jwt',
  'gridster'
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
    Global.maxSize=7;
    angular.element($window).on('resize', function () {
				let widthWindow = $window.innerWidth;
				if(widthWindow<=870)
				{
					Global.maxSize=3;
				}
				else
				{
					Global.maxSize=7;
				}
			});

    //--------Temporary patch, this will be removed---------------------
    $rootScope.$on('$stateChangeStart', function (event,toState,toParams) {
      let promise;
      let state = $injector.get('$state');
      let appLoggedin;
      if(!toParams.isLoggedInToAl && toState.name.indexOf('.al.')>-1){
        let ListService=$injector.get('ListsService');
        event.preventDefault();
        promise =ListService.getList('%$&unexisting_list)(*&^%^', {headers: {appName: 'al'}});
        appLoggedin = 'isLoggedInToAl';
      }
      else if(!toParams.isLoggedInToRqa && toState.name.indexOf('.rqa.')>-1){
        let ReportsService = $injector.get('ReportsService');
        event.preventDefault();
        promise = ReportsService.isRunning('%$&unexisting_identifier)(*&^%^', 'rqa');
        appLoggedin = 'isLoggedInToRqa';
      }
       if(promise){
         promise.catch(error => {
          if(error.statusCode!==409){
            toParams[appLoggedin] = true;
            state.go(toState.name,toParams);
          }
         });
      }
      return true;
    });
    //------------------------------------------------------------------
  });
